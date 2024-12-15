"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

interface Props {
  categories: TCategory[];
}

const CategorySlider = ({ categories }: Props) => {
  const t = useTranslations();

  const router = useRouter();

  const locale = useLocale() as TLocale;

  console.log(categories);

  const handleTypeClick = (type: string) => {
    router.push(`/shop/roadbreadcrum?type=${type}`);
  };

  return (
    <div className="trending-block style-nine md:pt-20 pt-10">
      <div className="container">
        <div className="heading3 text-center">{t("category")}</div>
        <div className="list-trending section-swiper-navigation style-small-border style-center style-outline md:mt-10 mt-6">
          <Swiper
            spaceBetween={12}
            slidesPerView={2}
            navigation
            loop={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
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
                slidesPerView: 5,
                spaceBetween: 30,
              },
            }}
            className="h-full"
          >
            {categories?.map((category, idx) => (
              <SwiperSlide key={idx}>
                <div
                  className="trending-item block relative cursor-pointer bg-black/10 rounded-2xl  overflow-hidden"
                  onClick={() => handleTypeClick(category.id)}
                >
                  <div className="bg-img">
                    <Image
                      src={category.icon}
                      width={1000}
                      height={1000}
                      priority={true}
                      alt=""
                      className="w-full h-[243px]"
                    />
                  </div>
                  <div className="hidden trending-name bg-white absolute bottom-5 left-1/2 -translate-x-1/2 px-5 h-10 rounded-xl sm:flex items-center justify-center duration-500 hover:bg-maincolor hover:text-white">
                    <span className="heading6 truncate">
                      {category.code[locale]}
                    </span>
                  </div>
                </div>
                <div className="sm:hidden trending-name bg-white  text-center  rounded-xl flex items-center justify-center duration-500">
                  <span className="heading6">{category.code[locale]}</span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default CategorySlider;
