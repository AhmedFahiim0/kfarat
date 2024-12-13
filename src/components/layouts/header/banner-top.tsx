import { cn } from "@/utils/functions/conditional-classes";
import React from "react";
import Marquee from "react-fast-marquee";

interface Props {
  className: string;
  textColor: string;
  bgLine: string;
}

const BannerTop: React.FC<Props> = ({ className }) => {
  return (
    <>
      <div
        className={cn(
          "banner-top banner-top bg-gradient-to-r from-[#0072ff] to-[#003f88]",
          className
        )}
      >
        <Marquee>
          <div className={`text-button-uppercase px-8 text-white`}>
            Get 10% off on selected items
          </div>
          <div className={`line w-8 h-px bg-white`}></div>
          <div className={`text-button-uppercase px-8 text-white`}>
            New customers save 10% with the code GET10
          </div>
          <div className={`line w-8 h-px bg-white`}></div>
          <div className={`text-button-uppercase px-8 text-white`}>
            10% off swim suits
          </div>
          <div className={`line w-8 h-px bg-white`}></div>
          <div className={`text-button-uppercase px-8 text-white`}>
            Free shipping on all orders over $50
          </div>
          <div className={`line w-8 h-px bg-white`}></div>
          <div className={`text-button-uppercase px-8 text-white`}>
            10% off on all summer essentials!
          </div>
          <div className={`line w-8 h-px bg-white`}></div>
          <div className={`text-button-uppercase px-8 text-white`}>
            Get summer-ready: 10% off swim suits
          </div>
          <div className={`line w-8 h-px bg-white`}></div>
          <div className={`text-button-uppercase px-8 text-white`}>
            10% off on all product
          </div>
          <div className={`line w-8 h-px bg-white`}></div>
        </Marquee>
      </div>
    </>
  );
};

export default BannerTop;
