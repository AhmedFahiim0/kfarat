import WeekHighlights from "@/components/pages/home/week-highlights";
import { batteriesCategory } from "@/data/categories";
import React from "react";
import productData from "@/data/Product.json";

type Props = {};

export default async function HomePageWeekhighlights({}: Props) {
  try {
    // const resp = await fetchServerData("");

    // if (resp.ok) {
    //   const data = await resp.json();

    return (
      <WeekHighlights
        data={productData}
        start={0}
        limit={8}
        subCategory={batteriesCategory}
        type="batteries"
      />
    );
    // }
  } catch (error: any) {
    return <div>{error.response.data.message}</div>;
  }
}
