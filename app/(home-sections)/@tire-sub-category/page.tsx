import SubCategoryCollection from "@/components/pages/home/sub-category-colleaction";
import { tiresCategory } from "@/data/categories";
import React from "react";

type Props = {};

export default async function HomePageTiresCollection({}: Props) {
  try {
    // const resp = await fetchServerData("");

    // if (resp.ok) {
    //   const data = await resp.json();

    return <SubCategoryCollection subCategory={tiresCategory} />;
    // }
  } catch (error: any) {
    return <div>{error.response.data.message}</div>;
  }
}
