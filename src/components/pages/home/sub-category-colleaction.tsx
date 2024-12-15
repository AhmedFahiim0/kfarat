"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css/bundle";
import SubCategoryCard from "@/components/ui/molecule/sub-category-card";

interface Props {
  subCategory: TCategory_1;
}

export default function SubCategoryCollection({ subCategory }: Props) {
  const onSubCategoryClicked = () => {};

  return (
    <div className="trending-block style-six md:pt-20 pt-10">
      <div className="container">
        <div className="heading3 text-center">{subCategory.title}</div>
        <div className="list-trending section-swiper-navigation style-small-border style-outline md:mt-10 mt-6">
          <Swiper
            spaceBetween={12}
            slidesPerView={2}
            navigation
            modules={[Navigation, Autoplay]}
            breakpoints={{
              360: {
                slidesPerView: 3,
                spaceBetween: 12,
              },
              576: {
                slidesPerView: 3,
                spaceBetween: 12,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              992: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
              1290: {
                slidesPerView: 6,
                spaceBetween: 30,
              },
            }}
            className="h-full"
          >
            {subCategory.items.map((item) => (
              <SwiperSlide key={item.image}>
                <SubCategoryCard
                  {...item}
                  onSubCategoryClicked={onSubCategoryClicked}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
