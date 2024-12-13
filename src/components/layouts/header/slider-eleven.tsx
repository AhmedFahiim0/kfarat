"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css/bundle";
import "swiper/css/effect-fade";

const SliderEleven = () => {
  const router = useRouter();

  const handleTypeClick = (type: string) => {
    router.push(`/shop/breadcrumb1?type=${type}`);
  };

  const mainSliderData = [
    {
      title: "Don't Miss",
      heading: "All Your Car Needs in One Place!",
      description:
        "From tires and batteries to oil changes and car washes – we've got you covered.",
      image: "/images/home_banners/11.svg",
    },
    {
      title: "Exclusive Deals on Premium Tires",
      heading: "Up to 30% Off on Tires!",
      description:
        "Get premium quality tires at unbeatable discounts. Don't miss out!",
      image: "/images/home_banners/2.webp",
    },
    {
      title: "A Gift for Every Drive!",
      heading: "Buy 2 Tires, Get 2 Free!",
      description:
        "Drive safely and save big with our exclusive offer. Limited time only!",
      image: "/images/home_banners/3.webp",
    },
  ];

  const bannerAdsData = [
    {
      tag: "Started from 3 SAR/ Month",
      heading: "Optimize Your Fleet Management",
      subheading: "Track Expenses",
      price: " & Control Operations with Ease",
      image: "/images/home_banners/5.webp",
      type: "accessories",
    },
    {
      tag: "50% Off on Service",
      heading: "Affordable Car Care \n  Unmatched Quality",
      subheading: "Half the Price,",
      price: "Full Service! ",
      image: "/images/home_banners/4.webp",
      type: "accessories",
    },
  ];

  return (
    <>
      <div className="slider-block style-two w-full">
        <div className="container banner-block lg:pt-[30px] flex max-lg:flex-wrap gap-y-5 h-full w-full">
          <div className="slider-main lg:w-2/3 w-full lg:pr-[15px] max-lg:h-[300px] max-[420px]:h-[340px]">
            <Swiper
              spaceBetween={0}
              slidesPerView={1}
              loop={true}
              pagination={{ clickable: true }}
              modules={[Autoplay, Pagination]}
              className="w-full h-full relative rounded-3xl overflow-hidden"
              autoplay={{
                delay: 4000,
              }}
            >
              {mainSliderData.map((slide, index) => (
                <SwiperSlide key={index}>
                  <div className="slider-item h-full w-full flex bg-linear relative">
                    {/* Text Content */}
                    <div className="text-content relative z-10 pl-5 md:pl-[60px] basis-2/3 flex flex-col justify-center">
                      <div className="text-button-uppercase">{slide.title}</div>
                      <div className="heading2 lg:mt-3 mt-2">
                        {slide.heading}
                      </div>
                      <div className="body1 lg:mt-4 mt-3">
                        {slide.description}
                      </div>
                      <Link
                        href="/shop/breadcrumb-img"
                        className="button-main w-max lg:mt-8 mt-3"
                      >
                        Shop Now
                      </Link>
                    </div>

                    {/* Image Content */}
                    <div className="image-content basis-1/3 relative items-start flex justify-center mx-5">
                      <Image
                        src={slide.image}
                        width={2000}
                        height={2000}
                        alt={slide.heading}
                        priority={true}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Large Screen Banner Ads */}
          <div className="banner-ads-block lg:w-1/3 lg:pl-[15px] w-full max-lg:hidden">
            {bannerAdsData.map((banner, index) => (
              <div
                key={index}
                className={`banner-ads-item bg-linear rounded-2xl relative overflow-hidden  cursor-pointer h-56 flex items-center ${
                  index > 0 ? "lg:mt-8" : ""
                }`}
                onClick={() => handleTypeClick(banner.type)}
              >
                <div className="text-content relative z-[1] py-12 pl-8">
                  <div className="text-button-uppercase text-white bg-red px-2 py-0.5 inline-block rounded-sm">
                    {banner.tag}
                  </div>
                  <div className="heading6 mt-2 w-2/3">
                    {banner.heading.split("<br />").map((line, lineIndex) => (
                      <React.Fragment key={lineIndex}>
                        {line}
                        {lineIndex <
                          banner.heading.split("<br />").length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </div>
                  <div className="body1 mt-3 text-secondary w-2/3">
                    {banner.subheading}
                    <span className="text-red">{banner.price}</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <Image
                    src={banner.image}
                    width={200}
                    height={100}
                    alt="bg-img"
                    priority={true}
                    className="basis-1/3 absolute right-0  "
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Banner Ads Slider */}
          <div className="banner-ads-block lg:hidden w-full">
            <Swiper
              spaceBetween={20}
              slidesPerView={1}
              loop={true}
              pagination={{ clickable: true }}
              modules={[Autoplay, Pagination]}
              className="w-full h-full relative rounded-3xl"
              autoplay={{
                delay: 4000,
              }}
            >
              {bannerAdsData.map((banner, index) => (
                <SwiperSlide key={index}>
                  <div
                    key={index}
                    className={`banner-ads-item bg-linear rounded-2xl relative overflow-hidden  cursor-pointer h-56 flex items-center ${
                      index > 0 ? "lg:mt-8" : ""
                    }`}
                    onClick={() => handleTypeClick(banner.type)}
                  >
                    <div className="text-content relative z-[1] py-12 pl-8">
                      <div className="text-button-uppercase text-white bg-red px-2 py-0.5 inline-block rounded-sm">
                        {banner.tag}
                      </div>
                      <div className="heading6 mt-2 w-2/3">
                        {banner.heading
                          .split("<br />")
                          .map((line, lineIndex) => (
                            <React.Fragment key={lineIndex}>
                              {line}
                              {lineIndex <
                                banner.heading.split("<br />").length - 1 && (
                                <br />
                              )}
                            </React.Fragment>
                          ))}
                      </div>
                      <div className="body1 mt-3 text-secondary w-2/3">
                        {banner.subheading}
                        <span className="text-red">{banner.price}</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Image
                        src={banner.image}
                        width={200}
                        height={100}
                        alt="bg-img"
                        priority={true}
                        className="basis-1/3 absolute right-0 top-0 "
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
};

export default SliderEleven;
