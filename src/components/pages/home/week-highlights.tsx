"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import Product from "@/components/ui/molecule/Product";
import { useTranslations } from "next-intl";
import FilterTabs from "@/components/ui/molecule/filter-tabs";

interface Props {
  data: Array<TProduct>;
  start: number;
  limit: number;
  subCategory?: TCategory_1;
  type?: string;
}

const WeekHighlights: React.FC<Props> = ({
  data,
  start,
  limit,
  subCategory,
  type,
}) => {
  const t = useTranslations();

  const [activeTab, setActiveTab] = useState<string>(
    subCategory?.items[0]?.name || "" // Default to the first subcategory if available
  );

  const onTabClick = (type: string) => {
    setActiveTab(type);
  };

  const filteredProducts = data.filter(
    (product) => product.category === activeTab && product.type === type
  );

  return (
    <>
      <div className="tab-features-block md:pt-20 pt-10">
        <div className="container">
          <div className="heading flex items-center justify-between gap-5 flex-wrap">
            <div className="heading3">{t("week_highlights")}</div>
            <div className="menu-tab flex items-center gap-2 p-1 bg-surface rounded-2xl">
              <FilterTabs
                tabs={subCategory?.items || []}
                activeTab={activeTab}
                onTabClick={onTabClick}
              />
            </div>
          </div>

          <div className="list-product hide-product-sold section-swiper-navigation style-outline style-center style-small-border md:mt-10 mt-6">
            <Swiper
              spaceBetween={12}
              slidesPerView={2}
              navigation
              loop={true}
              modules={[Navigation, Autoplay]}
              breakpoints={{
                576: {
                  slidesPerView: 2,
                  spaceBetween: 12,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                992: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
                1200: {
                  slidesPerView: 4,
                  spaceBetween: 30,
                },
              }}
              className="h-full"
            >
              {filteredProducts.slice(start, limit).map((prd, index) => (
                <SwiperSlide key={index}>
                  <Product
                    data={prd}
                    type={type === "road" ? "road" : "grid"}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="block-button flex items-center justify-center w-full md:mt-10 mt-6">
            <Link
              href={"/shop/breadcrumb-img"}
              className="button-main text-center"
            >
              {t("view_all_products")}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeekHighlights;
