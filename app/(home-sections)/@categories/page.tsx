import CategorySlider from "@/components/pages/home/categories";
import { fetchServerData } from "@/hooks/axios";
import React from "react";

type Props = {};

export default async function HomePageCategories({}: Props) {
  try {
    const resp = await fetchServerData("product/category");

    if (resp.ok) {
      const data = await resp.json();

      return <CategorySlider categories={data.data} />;
    }
  } catch (error: any) {
    return <div>{error.response?.data?.message}</div>;
  }
}
