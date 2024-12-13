import axios from "axios";

const useGlobalServices = () => {
  const getCitiesList = async () => {
    try {
      const data = await axios(
        "https://kafaratplus-api-4.tecfy.co/api/general/lookup/city"
      );

      return data.data?.data;
    } catch {}
  };

  return { getCitiesList };
};

export { useGlobalServices };
