import { useState, useContext, useMemo } from "react";
import { RegionProviderContext } from "@/providers/region-provider";
import { useQuery } from "@tanstack/react-query";
import { useGlobalServices } from "@/services/globals";
import { useLocale } from "next-intl";

const useCitiesActions = () => {
  const locale = useLocale();

  const { getCitiesList } = useGlobalServices();

  const currentRagion = useContext(RegionProviderContext);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [searchTerm, setSearchTerm] = useState<string>("");

  /* --------- get cities list -------- */
  const { data } = useQuery({
    queryFn: getCitiesList,
    queryKey: ["cities_list"],
    enabled: isModalOpen,
    select: (data) =>
      data.map((city: TCity) => ({
        coordinates: city.coordinates,
        name: city.name[locale as any],
        area: city.area,
      })),
  });

  /* --------- filtered cities on search -------- */
  const filteredCities = useMemo(() => {
    return data?.filter((city: TCity) =>
      city.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, data]);

  const onSelectRegion = (city: TCity) => {
    const region = {
      lat: city.coordinates?.lat,
      lng: city.coordinates?.lng,
      city: city?.name,
      country: city.area?.country?.name[locale as any] || "Saudi Arabia",
    };

    currentRagion?.setRegion(region);

    localStorage.setItem("user_ragion", JSON.stringify(region));

    sessionStorage.removeItem("user_ragion");

    setIsModalOpen(false);
  };

  return {
    data,
    searchTerm,
    isModalOpen,
    currentRagion,
    filteredCities,
    setSearchTerm,
    onSelectRegion,
    setIsModalOpen,
  };
};

export { useCitiesActions };
