import BestOffers from "@/components/pages/home/best-offers";
import React from "react";
import productData from "@/data/Product.json";

type Props = {};

export default async function HomePageBestOffers({}: Props) {
  try {
    // const resp = await fetchServerData("");

    // if (resp.ok) {
    //   const data = await resp.json();

    return <BestOffers data={productData} start={0} limit={4} />;
    // }
  } catch (error: any) {
    return <div>{error.response.data.message}</div>;
  }
}
