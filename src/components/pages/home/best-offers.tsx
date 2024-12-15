"use client";

import React, { useState } from "react";
import { countdownTime } from "@/store/countdownTime";
import Link from "next/link";
import Product from "@/components/ui/molecule/Product";
import FilterTabs from "@/components/ui/molecule/filter-tabs";
import { useTranslations } from "next-intl";

interface Props {
  data: Array<TProduct>;
  start: number;
  limit: number;
}

const BestOffers: React.FC<Props> = ({ data, start, limit }) => {
  const t = useTranslations();

  const [timeLeft, setTimeLeft] = useState(countdownTime());

  const [activeTab, setActiveTab] = useState<string>("1");

  const tabs = [
    { id: "1", name: "tires" },
    { id: "2", name: "batteries" },
    { id: "3", name: "oil" },
    { id: "4", name: "road-assist" },
    { id: "5", name: "accessories" },
  ];

  const handleTabClick = (type: string) => {
    setActiveTab(type);
  };

  const filteredProducts = data.filter((product) => product.type === activeTab);

  return (
    <>
      <div className="whate-new-block md:pt-20 pt-10">
        <div className="container">
          <div className="heading flex flex-col items-center text-center">
            <div className="flex">
              <div className="heading3 mx-2">{t("best_offers")}</div>
              <div className="deal-time bg-red py-1 px-5 rounded-lg">
                <div className="heading6 text-white">
                  <span className="day">{timeLeft.days}</span>
                  <span>D : </span>
                  <span className="hour">{timeLeft.hours}</span>
                  <span>H : </span>
                  <span className="minute">{timeLeft.minutes}</span>
                  <span>M : </span>
                  <span className="second">
                    {timeLeft.seconds < 10
                      ? `0${timeLeft.seconds}`
                      : timeLeft.seconds}
                  </span>
                  <span>S</span>
                </div>
              </div>
            </div>

            <div className="menu-tab flex items-center gap-2 p-1 bg-surface rounded-2xl mt-6">
              <FilterTabs
                tabs={tabs}
                activeTab={activeTab}
                onTabClick={handleTabClick}
              />
            </div>
          </div>

          {/* products list */}
          <div className="list-product hide-product-sold grid lg:grid-cols-4 grid-cols-2 sm:gap-[30px] gap-[20px] md:mt-10 mt-6">
            {filteredProducts.slice(start, limit).map((prd, index) => (
              <Product data={prd} type="grid" key={index} />
            ))}
          </div>

          <div className="block-button flex items-center justify-center w-full md:mt-10 mt-6 mb-10  ">
            <Link href={"/shop"} className="button-main text-center">
              {t("view_all_products")}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default BestOffers;
