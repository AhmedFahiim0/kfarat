"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { usePathname } from "next/navigation";
import Product from "@/components/ui/molecule/Product";
import productData from "@/data/Product.json";
import useMenuMobile from "@/store/useMenuMobile";
import { useModalCartContext } from "@/context/ModalCartContext";
import { useModalWishlistContext } from "@/context/ModalWishlistContext";
import { useModalSearchContext } from "@/context/ModalSearchContext";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
// import PhoneLoginModal from "@/components/Modal/PhoneLoginModel";
import { batteriesCategory, tiresCategory } from "@/data/categories";
import SaudiCitySelector from "@/components/ui/atoms/country-selector";
import { cn } from "@/utils/functions/conditional-classes";
import { useTranslations } from "next-intl";

const AppBar = () => {
  const t = useTranslations();

  const pathname = usePathname();

  const router = useRouter();

  const { openMenuMobile, handleMenuMobile } = useMenuMobile();

  const { openModalCart } = useModalCartContext();

  const { cartState } = useCart();

  const { openModalWishlist } = useModalWishlistContext();

  const { openModalSearch } = useModalSearchContext();

  const [fixedHeader, setFixedHeader] = useState(false);

  const [lastScrollPosition, setLastScrollPosition] = useState(0);

  const handleTypeClick = (type: string) => {
    router.push(`/shop/breadcrumb1?type=${type}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setFixedHeader(scrollPosition > 0 && scrollPosition < lastScrollPosition);
      setLastScrollPosition(scrollPosition);
    };

    // Gắn sự kiện cuộn khi component được mount
    window.addEventListener("scroll", handleScroll);

    // Hủy sự kiện khi component bị unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollPosition]);

  return (
    <>
      <div
        className={`header-menu style-one ${
          fixedHeader ? " fixed" : "relative"
        } bg-white w-full md:h-[74px] h-[56px]`}
      >
        <div className="container mx-auto h-full">
          <div className="header-main flex justify-between h-full">
            <div
              className="menu-mobile-icon lg:hidden flex items-center"
              onClick={handleMenuMobile}
            >
              <i className="icon-category text-2xl"></i>
            </div>
            {/* left side*/}
            <div className="flex gap-10">
              <Link href={"/"} className="flex items-center w-32 sm:w-auto">
                <Image
                  src={"/images/main_logo.svg"}
                  alt="Logo"
                  width={160}
                  height={42}
                  className="heading4"
                />
              </Link>
              <SaudiCitySelector />
            </div>

            {/* menu */}
            <div className="menu-main h-full max-lg:hidden">
              <ul className="flex items-center gap-8 h-full">
                {/* Home link */}
                <li className="h-full relative">
                  <Link
                    href="#!"
                    className={cn(
                      "text-button-uppercase duration-300 h-full flex items-center justify-center gap-1",
                      { "active text-black": pathname?.includes("/") }
                    )}
                  >
                    {t("home")}
                  </Link>
                </li>

                {/* Catgory menu */}
                <li className="h-full">
                  <Link
                    href="#!"
                    className="text-button-uppercase duration-300 h-full flex items-center justify-center"
                  >
                    {t("category")}
                  </Link>
                  <div className="mega-menu absolute top-[74px] left-0 bg-white w-screen">
                    <div className="container">
                      <div className="flex justify-between py-8">
                        <div className="nav-link basis-2/3 grid grid-cols-4 gap-y-8">
                          <div className="nav-item">
                            <div className="text-button-uppercase pb-2">
                              {tiresCategory.title}
                            </div>
                            <ul>
                              {tiresCategory.items.map((item, index) => (
                                <li key={index}>
                                  <div
                                    onClick={() => handleTypeClick(item.name)}
                                    className="link text-secondary duration-300 cursor-pointer"
                                  >
                                    {item.name}
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        {/* ads block */}
                        <div className="banner-ads-block pl-2.5 basis-1/3">
                          <div
                            className="banner-ads-item bg-linear rounded-2xl relative overflow-hidden cursor-pointer"
                            onClick={() => handleTypeClick("swimwear")}
                          >
                            <div className="text-content py-14 pl-8 relative z-[1]">
                              <div className="text-button-uppercase text-white bg-red px-2 py-0.5 inline-block rounded-sm">
                                Save $10
                              </div>
                              <div className="heading6 mt-2">
                                Dive into Savings <br />
                                on Swimwear
                              </div>
                              <div className="body1 mt-3 text-secondary">
                                Starting at{" "}
                                <span className="text-red">$59.99</span>
                              </div>
                            </div>
                            <Image
                              src={"/images/slider/bg2-2.png"}
                              width={200}
                              height={100}
                              alt="bg-img"
                              className="basis-1/3 absolute right-0 top-0 duration-700"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                {/* deals menu */}
                <li className="h-full">
                  <Link
                    href="#!"
                    className="text-button-uppercase duration-300 h-full flex items-center justify-center"
                  >
                    {t("deals")}
                  </Link>

                  <div className="mega-menu absolute top-[74px] left-0 bg-white w-screen">
                    <div className="container">
                      <div className="flex justify-between py-8">
                        <div className="nav-link basis-2/3 flex justify-between pr-12">
                          <div className="nav-item">
                            <ul>
                              <li>
                                <Link
                                  href={"/shop/breadcrumb-img"}
                                  className={`link text-secondary duration-300 ${
                                    pathname === "/shop/breadcrumb-img"
                                      ? "active"
                                      : ""
                                  }`}
                                >
                                  Shop Breadcrumb IMG
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="recent-product pl-2.5 basis-1/3">
                          <div className="text-button-uppercase pb-2">
                            Recent Products
                          </div>
                          <div className="list-product hide-product-sold  grid grid-cols-2 gap-5 mt-3">
                            {productData
                              .filter((item) => item.action === "add to cart")
                              .slice(0, 2)
                              .map((prd, index) => (
                                <Product key={index} data={prd} type="grid" />
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                {/* Help and advice menu */}
                <li className="h-full relative">
                  <Link
                    href="#!"
                    className="text-button-uppercase duration-300 h-full flex items-center justify-center"
                  >
                    {t("help_and_advice")}
                  </Link>
                  <div className="sub-menu py-3 px-5 -left-10 absolute bg-white rounded-b-xl">
                    <ul className="w-full">
                      <li>
                        <Link
                          href="/blog/default"
                          className={`text-secondary duration-300 ${
                            pathname === "/blog/default" ? "active" : ""
                          }`}
                        >
                          Blog Default
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>

                {/* About Us  link*/}
                <li className="h-full relative">
                  <Link
                    href="/pages/about"
                    className="text-button-uppercase duration-300 h-full flex items-center justify-center "
                  >
                    {t("about_us")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* actions */}
            <div className="right flex gap-12">
              <div className="max-md:hidden search-icon flex items-center cursor-pointer relative">
                <Icon.MagnifyingGlass
                  size={24}
                  color="black"
                  onClick={openModalSearch}
                />
                <div className="line absolute bg-line w-px h-6 -right-6"></div>
              </div>
              <div className="list-action flex items-center gap-4">
                {/* <PhoneLoginModal /> */}
                <div
                  className="max-md:hidden wishlist-icon flex items-center cursor-pointer"
                  onClick={openModalWishlist}
                >
                  <Icon.Heart size={24} color="black" />
                </div>
                <div
                  className="cart-icon sm:flex items-center relative cursor-pointer hidden "
                  onClick={openModalCart}
                >
                  <Icon.Handbag size={24} color="black" />
                  <span className="quantity cart-quantity absolute -right-1.5 -top-1.5 text-xs text-white bg-black w-4 h-4 flex items-center justify-center rounded-full">
                    {cartState.cartArray.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppBar;
