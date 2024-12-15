import LastChance from "@/components/pages/home/last-chance";
import React from "react";

type Props = {};

export default async function HomePageLastChance({}: Props) {
  try {
    // const resp = await fetchServerData("");

    // if (resp.ok) {
    //   const data = await resp.json();

    return <LastChance />;
    // }
  } catch (error: any) {
    return <div>{error.response.data.message}</div>;
  }
}
