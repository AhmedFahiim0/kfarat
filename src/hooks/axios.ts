import axios from "axios";

const baseHeader = {
  accept: "application/json",
  lang: "en",
  "city-id": "65b7ad6725ff410ef2a27d4a",
  "Access-Control-Allow-Origin": "*",
};

export const useAxios = (
  contentType?: "aplication/json" | "multipart/form-data"
) => {
  const token = "";

  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
      ...baseHeader,
      "Content-Type": contentType as string,
      authorization: `Bearer ${token}`,
    },
  });
};

export const fetchServerData = (url: string) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
    headers: {
      ...baseHeader,
      "Content-Type": "application/json",
    },
  });
};
