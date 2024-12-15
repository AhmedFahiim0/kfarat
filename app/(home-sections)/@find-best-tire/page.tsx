import CategorySlider from "@/components/pages/home/categories";
import FindBesttTire from "@/components/pages/home/find-best-tire";
import { tiresCategory } from "@/data/categories";
import { fetchServerData } from "@/hooks/axios";
import React from "react";

type Props = {};

export default async function HomePageFindBestTire({}: Props) {
  try {
    // const resp = await fetchServerData("");

    // if (resp.ok) {
    //   const data = await resp.json();

    return <FindBesttTire subCategory={tiresCategory} />;
    // }
  } catch (error: any) {
    return <div>{error.response?.data?.message}</div>;
  }
}
