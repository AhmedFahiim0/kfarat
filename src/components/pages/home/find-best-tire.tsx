"use client";
import React from "react";
import Image from "next/image";
import { useModalSearchContext } from "@/context/ModalSearchContext";
import SearchButton from "@/components/ui/atoms/search-button";

interface BannerTiresProps {
  subCategory?: TCategory_1;
}
const FindBesttTire: React.FC<BannerTiresProps> = ({ subCategory }) => {
  const textColorClass = subCategory?.bannerTextColor || "text-white";

  const name = subCategory?.title;
  const { openModalSearch } = useModalSearchContext();

  return (
    <>
      <div className="banner-block style-toys-kids mt-20">
        <div className="container">
          <div className="content md:rounded-[28px] rounded-2xl overflow-hidden relative">
            <Image
              src={
                subCategory?.bannerBgImage ||
                "/images/new_banners/search_tires.png"
              }
              width={3000}
              height={2000}
              alt="bg"
              priority={true}
              className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
            />

            <div className="text-content xl:pl-[120px] md:pl-20 pl-10 md:py-[85px] py-12">
              <div className="xl:w-1/3 w-2/3">
                <div className={`text-sub-display ${textColorClass}`}>
                  {subCategory?.bannerSubTitle || "We made it easy for you!"}
                </div>
                <div className={`heading2 md:mt-4 mt-2 ${textColorClass}`}>
                  {subCategory?.bannerTitle ||
                    "Search by tire size or vehicle type now."}
                </div>
              </div>
              {subCategory?.searchButton?.buttonText && (
                <SearchButton
                  onClick={openModalSearch}
                  buttonText={subCategory?.searchButton?.buttonText}
                  leftIcon={subCategory?.searchButton?.leftIcon}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FindBesttTire;
