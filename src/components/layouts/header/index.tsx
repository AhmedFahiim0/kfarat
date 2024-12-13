import React from "react";
import TopNav from "./top-nav";
import AppBar from "./app-bar";
import SliderEleven from "./slider-eleven";
import BannerTop from "./banner-top";

type Props = {};

export default function Header({}: Props) {
  return (
    <>
      <TopNav />

      <AppBar />

      <BannerTop className="py-3" textColor="text-white" bgLine="bg-black" />

      {/* <SliderEleven /> */}
    </>
  );
}
