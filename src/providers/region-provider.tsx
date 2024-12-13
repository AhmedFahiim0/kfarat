"use client";

import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

interface TRegionProvider {
  lat: number | null;
  lng: number | null;
  city: string;
  country: string;
}

interface TRegionProviderContext {
  region: TRegionProvider | null;
  setRegion: React.Dispatch<React.SetStateAction<TRegionProvider | null>>;
}

interface Props {
  children: React.ReactNode;
}

export const RegionProviderContext =
  createContext<TRegionProviderContext | null>(null);

export const DEFAULT_REGION = "riyadh";

export default function RegionProvider({ children }: Props) {
  const [region, setRegion] = useState<TRegionProvider | null>(null);

  /* -- Set default region in session on deny loction access - */
  const setUserDefaultRegion = () => {
    const defaultRegion = {
      lat: null,
      lng: null,
      country: "Saudi Arabia",
      city: DEFAULT_REGION,
    };

    sessionStorage.setItem("user_ragion", JSON.stringify(defaultRegion));

    setRegion(defaultRegion);
  };

  /* -- Get user ragion on allow location access - */
  const getUserCurrentRegion = async (coords: GeolocationCoordinates) => {
    try {
      const { data: region } = await axios.post(
        "https://kafaratplus-api-4.tecfy.co/api/general/lookup/coordinatesToLookup",
        {
          coordinates: {
            lat: coords.latitude,
            lng: coords.longitude,
          },
        }
      );

      // save the region if the user inside Saudiarabia otherwise save the default one
      if (region.success) {
        localStorage.setItem("user_ragion", JSON.stringify(region));
        setRegion(region);
      } else {
        setUserDefaultRegion();
      }
    } catch {
      setUserDefaultRegion();
    }
  };

  useEffect(() => {
    const savedRegion =
      localStorage.getItem("user_ragion") ||
      sessionStorage.getItem("user_ragion");

    if (savedRegion) {
      const parsedRegion = JSON.parse(savedRegion);
      setRegion(parsedRegion);
    } else {
      const getUserLocation = () => {
        navigator.geolocation.getCurrentPosition(
          (coords) => {
            getUserCurrentRegion(coords.coords);
          },
          () => setUserDefaultRegion()
        );
      };

      getUserLocation();
    }
  }, []);

  return (
    <RegionProviderContext.Provider value={{ region, setRegion }}>
      {children}
    </RegionProviderContext.Provider>
  );
}
