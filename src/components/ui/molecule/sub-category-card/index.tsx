"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import AnimatedCounter from "../../atoms/animated-counter";

interface Props {
  image: string;
  name: string;
  numberOfProducts: number;
  onSubCategoryClicked: () => void;
}
const SubCategoryCard = ({
  image,
  name,
  numberOfProducts,
  onSubCategoryClicked,
}: Props) => {
  const t = useTranslations();

  return (
    <div
      className="trending-item block relative cursor-pointer"
      onClick={onSubCategoryClicked}
    >
      <div className="bg-img rounded-[32px] overflow-hidden">
        <Image
          src={image}
          width={1000}
          height={1000}
          alt={name.toLowerCase()}
          priority={true}
          className="w-full"
        />
      </div>
      <div className="trending-name text-center mt-5 space-y-2">
        <span className="heading6 block">{name}</span>
        <span className="text-sm text-secondary2">
          +
          <AnimatedCounter endValue={numberOfProducts} duration={2500} />
          {t("products")}
        </span>
      </div>
    </div>
  );
};

export default SubCategoryCard;
