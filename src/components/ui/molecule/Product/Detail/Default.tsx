"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductType } from "@/type/ProductType";
import Product from "..";
import Rate from "@/components/Other/Rate";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Scrollbar } from "swiper/modules";
import "swiper/css/bundle";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import SwiperCore from "swiper/core";
import { useCart } from "@/context/CartContext";
import { useModalCartContext } from "@/context/ModalCartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useModalWishlistContext } from "@/context/ModalWishlistContext";
import { useCompare } from "@/context/CompareContext";
import { useModalCompareContext } from "@/context/ModalCompareContext";
import ModalSizeguide from "@/components/Modal/ModalSizeguide";
import { notify } from "@/lib/toast";
import { useRouter } from "next/navigation";
SwiperCore.use([Navigation, Thumbs]);

interface Props {
  data: Array<ProductType>;
  productId: string | number | null;
}
interface Service {
  type: string;
  description: string;
  icon: string;
  price: number;
}
const Default: React.FC<Props> = ({ data, productId }) => {
  const swiperRef: any = useRef();
  const [photoIndex, setPhotoIndex] = useState(0);
  const [openPopupImg, setOpenPopupImg] = useState(false);
  const [openSizeGuide, setOpenSizeGuide] = useState<boolean>(false);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);
  const [activeColor, setActiveColor] = useState<string>("");
  const [activeSize, setActiveSize] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string | undefined>(
    "specifications"
  );
  const { addToCart, updateCart, cartState } = useCart();
  const { openModalCart } = useModalCartContext();
  const { addToWishlist, removeFromWishlist, wishlistState } = useWishlist();
  const { openModalWishlist } = useModalWishlistContext();
  const { addToCompare, removeFromCompare, compareState } = useCompare();
  const { openModalCompare } = useModalCompareContext();
  let productMain = data.find(
    (product) => product.id === productId
  ) as ProductType;
  if (productMain === undefined) {
    productMain = data[0];
  }

  const percentSale = Math.floor(
    100 - (productMain?.price / productMain?.originPrice) * 100
  );
  const tireDetails = [
    { title: "Tire Size", value: "275/45R21", bg: true },
    { title: "Pattern", value: "Blue Hp", bg: false },
    { title: "Load / speed index", value: "110 W", bg: false },
    { title: "Year of Manufacture", value: "2025", bg: true },
    { title: "Brand origin", value: "South Korea", bg: false },
    { title: "Warranty", value: "3 years warranty", bg: false },
    { title: "Warranty", value: "3 years warranty", bg: true },
    { title: "Warranty", value: "3 years warranty", bg: false },
    { title: "Warranty", value: "3 years warranty", bg: false },
    { title: "Warranty", value: "3 years warranty", bg: true },
    { title: "Warranty", value: "3 years warranty", bg: false },
  ];
  const handleOpenSizeGuide = () => {
    setOpenSizeGuide(true);
  };

  const handleCloseSizeGuide = () => {
    setOpenSizeGuide(false);
  };

  const handleSwiper = (swiper: SwiperCore) => {
    // Do something with the thumbsSwiper instance
    setThumbsSwiper(swiper);
  };

  const handleActiveColor = (item: string) => {
    setActiveColor(item);
  };
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>();
  const [isServiceOpen, setIsServiceOpen] = useState(false);

  const services = [
    {
      type: "Delivery Only",
      description: "Delivery without installation",
      icon: "/images/delivery_option/1.svg",
      price: 50,
    },
    {
      type: "Delivery and Installation",
      description: "delivery to any location with installation",
      icon: "/images/delivery_option/3.svg",
      price: 100,
    },
    {
      type: "Installation at Service Centers",
      description: "installation  at our service centers",
      icon: "/images/delivery_option/2.svg",
      price: 75,
    },
  ];
  const splitOptions = [
    {
      name: "tabby",
      logo: "/images/splits/tabby.png",
      gradient: "from-[#3BFFA9] to-[#3BFFC4]",
      logoClass: "h-5 w-auto",
    },
    {
      name: "tamara",
      logo: "/images/splits/tamara.png",
      gradient: "from-[#C1E3F9] to-[#FBC57F]",
      logoClass: "h-5 w-auto",
    },
    {
      name: "mispay",
      logo: "/images/splits/mispay.png",
      gradient: "from-[#5b26c7] to-[#411699]",
      logoClass: "h-5 w-auto",
    },
  ];
  const handleActiveSize = (item: string) => {
    setActiveSize(item);
  };

  const handleIncreaseQuantity = () => {
    productMain.quantityPurchase += 1;
    updateCart(
      productMain.id,
      productMain.quantityPurchase + 1,
      activeSize,
      activeColor
    );
  };

  const handleDecreaseQuantity = () => {
    if (productMain.quantityPurchase > 1) {
      productMain.quantityPurchase -= 1;
      updateCart(
        productMain.id,
        productMain.quantityPurchase - 1,
        activeSize,
        activeColor
      );
    }
  };

  const router = useRouter();

  const handleAddToCart = (isBuyNow = false) => {
    if (selectedService) {
      setIsServiceOpen(false);

      const isItemInCart = cartState.cartArray.find(
        (item) => item.id === productMain.id
      );

      if (!isItemInCart) {
        addToCart({ ...productMain });
      }

      updateCart(
        productMain.id,
        productMain.quantityPurchase,
        activeSize,
        activeColor
      );

      if (isBuyNow) {
        router.push("/checkout2");
      } else {
        openModalCart();
      }
    } else {
      setIsDropdownOpen(true);
      setIsServiceOpen(true);
      notify.warn("Please select a delivery service");
    }
  };

  const handleAddToWishlist = () => {
    // if product existed in wishlit, remove from wishlist and set state to false
    if (
      wishlistState.wishlistArray.some((item) => item.id === productMain.id)
    ) {
      removeFromWishlist(productMain.id);
    } else {
      // else, add to wishlist and set state to true
      addToWishlist(productMain);
    }
    openModalWishlist();
  };

  const handleAddToCompare = () => {
    // if product existed in wishlit, remove from wishlist and set state to false
    if (compareState.compareArray.length < 3) {
      if (
        compareState.compareArray.some((item) => item.id === productMain.id)
      ) {
        removeFromCompare(productMain.id);
      } else {
        // else, add to wishlist and set state to true
        addToCompare(productMain);
      }
    } else {
      alert("Compare up to 3 products");
    }

    openModalCompare();
  };

  const handleActiveTab = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="product-detail default">
        <div className="featured-product underwear md:py-20 py-10">
          <div className="container flex justify-between gap-y-6 flex-wrap">
            <div className="list-img md:w-1/2 md:pr-[45px] w-full">
              <Swiper
                slidesPerView={1}
                spaceBetween={0}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[Thumbs]}
                className="mySwiper2 rounded-2xl overflow-hidden"
              >
                {productMain.images.map((item, index) => (
                  <SwiperSlide
                    key={index}
                    onClick={() => {
                      swiperRef.current?.slideTo(index);
                      setOpenPopupImg(true);
                    }}
                  >
                    <Image
                      src={item}
                      width={1000}
                      height={1000}
                      alt="prd-img"
                      className="w-full aspect-[4/4] object-contain"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <Swiper
                onSwiper={(swiper) => {
                  handleSwiper(swiper);
                }}
                spaceBetween={0}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[Navigation, Thumbs]}
                className="mySwiper"
              >
                {productMain.images.map((item, index) => (
                  <SwiperSlide key={index}>
                    <Image
                      src={item}
                      width={1000}
                      height={1000}
                      alt="prd-img"
                      className="w-full aspect-[1] object-contain rounded-xl"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className={`popup-img ${openPopupImg ? "open" : ""}`}>
                <span
                  className="close-popup-btn absolute top-4 right-4 z-[2] cursor-pointer"
                  onClick={() => {
                    setOpenPopupImg(false);
                  }}
                >
                  <Icon.X className="text-3xl text-white" />
                </span>
                <Swiper
                  spaceBetween={0}
                  slidesPerView={1}
                  modules={[Navigation, Thumbs]}
                  navigation={true}
                  loop={true}
                  className="popupSwiper"
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                  }}
                >
                  {productMain.images.map((item, index) => (
                    <SwiperSlide
                      key={index}
                      onClick={() => {
                        setOpenPopupImg(false);
                      }}
                    >
                      <Image
                        src={item}
                        width={1000}
                        height={1000}
                        alt="prd-img"
                        className="w-full aspect-[3/4] object-cover rounded-xl"
                        onClick={(e) => {
                          e.stopPropagation(); // prevent
                        }}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <PaymentList />
            </div>

            <div className="product-infor md:w-1/2 w-full lg:pl-[15px] md:pl-2">
              <div className="flex justify-between">
                <div>
                  <div className="caption2 text-secondary font-semibold uppercase">
                    {productMain.type}
                  </div>
                  <Image
                    src={"/images/product_info/Michelin-logo-blue@2x.webp"}
                    width={500}
                    height={100}
                    alt="blo"
                    className="h-20 w-auto"
                  />
                  <div className="heading4 mt-1">{productMain.name}</div>
                </div>

                <div
                  className={`add-wishlist-btn w-12 h-12 flex items-center justify-center border border-line cursor-pointer rounded-xl duration-300 hover:bg-black hover:text-white ${
                    wishlistState.wishlistArray.some(
                      (item) => item.id === productMain.id
                    )
                      ? "active"
                      : ""
                  }`}
                  onClick={handleAddToWishlist}
                >
                  {wishlistState.wishlistArray.some(
                    (item) => item.id === productMain.id
                  ) ? (
                    <>
                      <Icon.Heart
                        size={24}
                        weight="fill"
                        className="text-white"
                      />
                    </>
                  ) : (
                    <>
                      <Icon.Heart size={24} />
                    </>
                  )}
                </div>
              </div>
              <div className="flex items-center mt-3">
                <Rate currentRate={productMain.rate} size={14} />
                <span className="caption1 text-secondary">(1.234 reviews)</span>
              </div>
              <div className="flex items-center gap-3 flex-wrap mt-5 pb-6 border-b border-line">
                <div className="product-price heading5">
                  ${productMain.price}.00
                </div>
                <div className="w-px h-4 bg-line"></div>
                <div className="product-origin-price font-normal text-secondary2">
                  <del>${productMain.originPrice}.00</del>
                </div>
                {productMain.originPrice && (
                  <div className="product-sale caption2 font-semibold bg-green px-3 py-0.5 inline-block rounded-full">
                    -{percentSale}%
                  </div>
                )}
                <div className="left">
                  <button
                    onClick={() => {
                      window.location.href = "#description-section";
                      if (activeTab != "description")
                        handleActiveTab("description");
                    }}
                    className="text-secondary mt-2 line-clamp-2 bg-transparent border-none p-0 text-left cursor-pointer"
                  >
                    Keep your home organized, yet elegant with storage cabinets
                    by Onita Patio Furniture. These cabinets not only make a
                    great storage units, but also bring a great decorative
                    accent to your decor. Traditionally designed, they are
                    perfect to be used in the hallway, living room, bedroom,
                    office or any place where you need to store or display
                    things. Made of high quality materials, they are sturdy and
                    durable for years. Bring one-of-a-kind look to your interior
                    with furniture from Onita Furniture!
                  </button>
                </div>
              </div>
              <div className="list-action mt-6">
                <div className="sm:flex gap-3 items-center">
                  <div className="text-title ">Fitment Options :</div>
                  <div className="select-block w-full mt-2 relative">
                    <div
                      className={` text-button py-2 pl-3 pr-8  w-full bg-white rounded-lg  border border-line cursor-pointer relative ${
                        isDropdownOpen
                          ? isServiceOpen
                            ? " border-red border-1"
                            : " border-maincolor border-1"
                          : "border-line"
                      }`}
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      {selectedService ? (
                        <div className="flex gap-2">
                          <Image
                            src={selectedService.icon}
                            alt={selectedService.type}
                            width={24}
                            height={24}
                            className="h-6 w-6"
                          />
                          <div className="flex justify-between w-full items-center">
                            <div>
                              <div className="text-gray font-medium">
                                {selectedService.type}
                              </div>
                              <div className="text-gray text-xs font-light">
                                {selectedService.description}
                              </div>
                            </div>

                            <div className="text-maincolor text-sm font-medium">
                              {selectedService.price} SAR
                            </div>
                          </div>
                        </div>
                      ) : (
                        "Select a service"
                      )}
                      <Icon.CaretDown
                        size={12}
                        className="absolute top-1/2 -translate-y-1/2 md:right-4 right-2"
                      />
                    </div>

                    {isDropdownOpen && (
                      <div className="absolute z-10 top-full left-0 w-full mt-1 border border-line rounded-lg bg-white shadow-lg  ">
                        {services.map((service, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-start gap-2 p-2 hover:bg-gray-100 cursor-pointer hover:bg-[#f8f8f8] "
                            onClick={() => {
                              setSelectedService(service);
                              setIsDropdownOpen(false);
                            }}
                          >
                            <Image
                              src={service.icon}
                              alt={service.type}
                              width={24}
                              height={24}
                              className="h-6 w-6"
                            />

                            <div className="flex justify-between w-full">
                              <div className="text-gray text-xs">
                                <div className="text-gray text-title">
                                  {service.type}
                                </div>
                                {service.description}
                              </div>
                              <div className="text-maincolor text-sm font-bold">
                                {service.price} SAR
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-title mt-5">Quantity:</div>
                <div className="choose-quantity flex items-center lg:justify-between gap-5 gap-y-3 mt-3">
                  <div className="quantity-block md:p-3 max-md:py-1.5 max-md:px-3 flex items-center justify-between rounded-lg border border-line sm:w-[180px] w-[120px] flex-shrink-0">
                    <Icon.Minus
                      size={20}
                      onClick={handleDecreaseQuantity}
                      className={`${
                        productMain.quantityPurchase === 1 ? "disabled" : ""
                      } cursor-pointer`}
                    />
                    <div className="body1 font-semibold">
                      {productMain.quantityPurchase}
                    </div>
                    <Icon.Plus
                      size={20}
                      onClick={handleIncreaseQuantity}
                      className="cursor-pointer"
                    />
                  </div>
                  <div
                    onClick={() => handleAddToCart(false)}
                    className="py-4 px-10 w-full text-sm leading-5 text-center bg-white text-black font-semibold uppercase rounded-2xl border border-line cursor-pointer transition-all duration-400 ease-in-out hover:text-white hover:bg-maincolor"
                  >
                    Add To Cart
                  </div>
                </div>
                <div
                  className="button-block mt-5"
                  onClick={() => handleAddToCart(true)}
                >
                  <div className="button-main w-full text-center">
                    Buy It Now
                  </div>
                </div>
                <div className="flex items-center lg:gap-20 gap-8 mt-5 pb-6 border-b border-line">
                  <div
                    className="compare flex items-center gap-3 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCompare();
                    }}
                  >
                    <div className="compare-btn md:w-12 md:h-12 w-10 h-10 flex items-center justify-center border border-line cursor-pointer rounded-xl duration-300 hover:bg-black hover:text-white">
                      <Icon.ArrowsCounterClockwise className="heading6" />
                    </div>
                    <span>Compare</span>
                  </div>
                  <div className="share flex items-center gap-3 cursor-pointer">
                    <div className="share-btn md:w-12 md:h-12 w-10 h-10 flex items-center justify-center border border-line cursor-pointer rounded-xl duration-300 hover:bg-black hover:text-white">
                      <Icon.ShareNetwork weight="fill" className="heading6" />
                    </div>
                    <span>Share Products</span>
                  </div>
                </div>
                <div className="more-infor mt-6">
                  <div className=" ">
                    <p className="   text-title mb-3">
                      Installment in monthly installments starting from{" "}
                      {productMain.price / 4}
                      SAR
                    </p>
                    <div className="relative w-full">
                      <div className="flex overflow-x-auto gap-2 sm:gap-5  scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent pb-3 ">
                        {splitOptions.map((option) => (
                          <div key={option.name} className="flex-none">
                            <div className="split-payments">
                              <div className="ml-3 ">
                                <Image
                                  src={option.logo}
                                  alt={option.name}
                                  width={300}
                                  height={100}
                                  className={option.logoClass}
                                />
                              </div>
                              <div className="relative w-[220px] bg-white rounded-[5px] p-[1.5px]">
                                <div
                                  className={`absolute inset-0 rounded-[5px] bg-gradient-to-r ${option.gradient}`}
                                  aria-hidden="true"
                                />
                                <div className="relative bg-white rounded-[5px]">
                                  <p className="px-3 py-2 text-sm">
                                    Split 4 payments of {productMain?.price / 4}{" "}
                                    SAR - No interest or late fees
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="desc-tab md:pb-20 pb-10">
          <div className="container">
            <div className="flex items-center justify-center w-full">
              <div className="menu-tab flex items-center md:gap-[60px] gap-8">
                <div
                  className={`tab-item heading5 has-line-before text-secondary2 hover:text-black duration-300 ${
                    activeTab === "specifications" ? "active" : ""
                  }`}
                  onClick={() => handleActiveTab("specifications")}
                >
                  Specifications
                </div>
                <div
                  id="description-section"
                  className={`tab-item heading5 has-line-before text-secondary2 hover:text-black duration-300 ${
                    activeTab === "description" ? "active" : ""
                  }`}
                  onClick={() => handleActiveTab("description")}
                >
                  Description
                </div>
                <div
                  className={`tab-item heading5 has-line-before text-secondary2 hover:text-black duration-300 ${
                    activeTab === "fitfor" ? "active" : ""
                  }`}
                  onClick={() => handleActiveTab("fitfor")}
                >
                  Fit For
                </div>
              </div>
            </div>
            <div className="desc-block mt-8">
              <div
                className={`desc-item description ${
                  activeTab === "description" ? "open" : ""
                }`}
              >
                <div className="grid md:grid-cols-2 gap-8 gap-y-5">
                  <div className="left">
                    <div className="heading6">Description</div>
                    <div className="text-secondary mt-2">
                      Keep your home organized, yet elegant with storage
                      cabinets by Onita Patio Furniture. These cabinets not only
                      make a great storage units, but also bring a great
                      decorative accent to your decor. Traditionally designed,
                      they are perfect to be used in the hallway, living room,
                      bedroom, office or any place where you need to store or
                      display things. Made of high quality materials, they are
                      sturdy and durable for years. Bring one-of-a-kind look to
                      your interior with furniture from Onita Furniture!
                    </div>
                  </div>
                  <div className="right">
                    <div className="heading6">About This Products</div>
                    <div className="list-feature">
                      <div className="item flex gap-1 text-secondary mt-1">
                        <Icon.Dot size={28} />
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit.
                        </p>
                      </div>
                      <div className="item flex gap-1 text-secondary mt-1">
                        <Icon.Dot size={28} />
                        <p>
                          Nulla luctus libero quis mauris vestibulum dapibus.
                        </p>
                      </div>
                      <div className="item flex gap-1 text-secondary mt-1">
                        <Icon.Dot size={28} />
                        <p>
                          Maecenas ullamcorper erat mi, vel consequat enim
                          suscipit at.
                        </p>
                      </div>
                      <div className="item flex gap-1 text-secondary mt-1">
                        <Icon.Dot size={28} />
                        <p>
                          Quisque consectetur nibh ac urna molestie scelerisque.
                        </p>
                      </div>
                      <div className="item flex gap-1 text-secondary mt-1">
                        <Icon.Dot size={28} />
                        <p>
                          Mauris in nisl scelerisque massa consectetur pretium
                          sed et mauris.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`desc-item specifications flex items-center justify-center   ${
                  activeTab === "specifications" ? "open" : ""
                }`}
              >
                <div className="lg:w-1/2 sm:w-3/4 w-full sm:grid sm:grid-cols-2">
                  {tireDetails.map((detail, index) => {
                    // Adjust index to start from 1 instead of 0
                    const displayIndex = index + 1;

                    // Check if index is part of the desired pattern
                    const isHighlighted =
                      displayIndex % 4 === 1 || displayIndex % 4 === 2;

                    return (
                      <div
                        key={index}
                        className={`item flex items-center justify-between gap-8 py-3 px-2 ${
                          isHighlighted ? "bg-surface" : ""
                        }`}
                      >
                        <div
                          className={`text-title ${
                            index % 2 !== 0 ? "mx-5" : ""
                          } font-bold`}
                        >
                          {detail.title}
                        </div>
                        <p>{detail.value}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="grid lg:grid-cols-4 grid-cols-2 gap-[30px] md:mt-10 mt-6 w-full">
              <div className="item">
                <Image
                  src={"/images/product_info/1.svg"}
                  alt=""
                  width={400}
                  height={400}
                  className="h-10 w-10"
                />
                <div className="heading6 mt-4">Easy Shopping</div>
                <div className="text-secondary mt-2">
                  Effortless online shopping with quick delivery and mobile
                  services to your location.
                </div>
              </div>
              <div className="item">
                <Image
                  src={"/images/product_info/2.svg"}
                  alt=""
                  width={400}
                  height={400}
                  className="h-10 w-10"
                />
                <div className="heading6 mt-4"> Full Service</div>
                <div className="text-secondary mt-2">
                  Book tire, oil, and battery services at our centers or through
                  mobile service units.
                </div>
              </div>
              <div className="item">
                <Image
                  src={"/images/product_info/3.svg"}
                  alt=""
                  width={400}
                  height={400}
                  className="h-10 w-10"
                />
                <div className="heading6 mt-4">Top Quality</div>
                <div className="text-secondary mt-2">
                  Top brands with guaranteed quality at affordable prices.
                </div>
              </div>
              <div className="item">
                <Image
                  src={"/images/product_info/4.svg"}
                  alt=""
                  width={400}
                  height={400}
                  className="h-10 w-10"
                />
                <div className="heading6 mt-4">Expert Support</div>
                <div className="text-secondary mt-2">
                  Our team is ready to assist and guide you to the best
                  solutions for your car.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="review-block md:py-20 py-10 bg-surface">
          <div className="container">
            <div
              className={`desc-item review-block ${
                activeTab === "review" ? "open" : ""
              }`}
            >
              <div className="top-overview flex max-sm:flex-col items-center justify-between gap-12 gap-y-4">
                <div className="left flex max-sm:flex-col gap-y-4 items-center justify-between lg:w-1/2 sm:w-2/3 w-full sm:pr-5">
                  <div className="rating black-start flex flex-col items-center">
                    <div className="text-display">4.6</div>
                    <Rate currentRate={3} size={17} />
                    <div className="text-center whitespace-nowrap mt-1">
                      (1,968 Ratings)
                    </div>
                  </div>
                  <div className="list-rating w-2/3">
                    <div className="item flex items-center justify-end gap-1.5">
                      <div className="flex items-center gap-1">
                        <div className="caption1">5</div>
                        <Icon.Star size={14} weight="fill" />
                      </div>
                      <div className="progress bg-line relative w-3/4 h-2">
                        <div className="progress-percent absolute bg-[#ecb018] w-[50%] h-full left-0 top-0"></div>
                      </div>
                      <div className="caption1">50%</div>
                    </div>
                    <div className="item flex items-center justify-end gap-1.5 mt-1">
                      <div className="flex items-center gap-1">
                        <div className="caption1">4</div>
                        <Icon.Star size={14} weight="fill" />
                      </div>
                      <div className="progress bg-line relative w-3/4 h-2">
                        <div className="progress-percent absolute bg-[#ecb018] w-[20%] h-full left-0 top-0"></div>
                      </div>
                      <div className="caption1">20%</div>
                    </div>
                    <div className="item flex items-center justify-end gap-1.5 mt-1">
                      <div className="flex items-center gap-1">
                        <div className="caption1">3</div>
                        <Icon.Star size={14} weight="fill" />
                      </div>
                      <div className="progress bg-line relative w-3/4 h-2">
                        <div className="progress-percent absolute bg-[#ecb018] w-[10%] h-full left-0 top-0"></div>
                      </div>
                      <div className="caption1">10%</div>
                    </div>
                    <div className="item flex items-center justify-end gap-1.5 mt-1">
                      <div className="flex items-center gap-1">
                        <div className="caption1">2</div>
                        <Icon.Star size={14} weight="fill" />
                      </div>
                      <div className="progress bg-line relative w-3/4 h-2">
                        <div className="progress-percent absolute bg-[#ecb018] w-[10%] h-full left-0 top-0"></div>
                      </div>
                      <div className="caption1">10%</div>
                    </div>
                    <div className="item flex items-center justify-end gap-1.5 mt-1">
                      <div className="flex items-center gap-2">
                        <div className="caption1">1</div>
                        <Icon.Star size={14} weight="fill" />
                      </div>
                      <div className="progress bg-line relative w-3/4 h-2">
                        <div className="progress-percent absolute bg-[#ecb018] w-[10%] h-full left-0 top-0"></div>
                      </div>
                      <div className="caption1">10%</div>
                    </div>
                  </div>
                </div>
                <div className="right">
                  <Link
                    href={"#form-review"}
                    className="button-main bg-white text-black border border-black hover:border-maincolor whitespace-nowrap"
                  >
                    Write Reviews
                  </Link>
                </div>
              </div>
              <div className="mt-8">
                <div className="heading flex items-center justify-between flex-wrap gap-4">
                  <div className="heading4">03 Comments</div>
                  <div className="right flex items-center gap-3">
                    <label htmlFor="select-filter" className="uppercase">
                      Sort by:
                    </label>
                    <div className="select-block relative">
                      <select
                        id="select-filter"
                        name="select-filter"
                        className="text-button py-2 pl-3 md:pr-14 pr-10 rounded-lg bg-white border border-line"
                        defaultValue={"Sorting"}
                      >
                        <option value="Sorting" disabled>
                          Sorting
                        </option>
                        <option value="newest">Newest</option>
                        <option value="5star">5 Star</option>
                        <option value="4star">4 Star</option>
                        <option value="3star">3 Star</option>
                        <option value="2star">2 Star</option>
                        <option value="1star">1 Star</option>
                      </select>
                      <Icon.CaretDown
                        size={12}
                        className="absolute top-1/2 -translate-y-1/2 md:right-4 right-2"
                      />
                    </div>
                  </div>
                </div>
                <div className="list-review mt-6">
                  <div className="item">
                    <div className="heading flex items-center justify-between">
                      <div className="user-infor flex gap-4">
                        <div className="avatar">
                          <Image
                            src={"/images/avatar/1.png"}
                            width={200}
                            height={200}
                            alt="img"
                            className="w-[52px] aspect-square rounded-full"
                          />
                        </div>
                        <div className="user">
                          <div className="flex items-center gap-2">
                            <div className="text-title">Tony Nguyen</div>
                            <div className="span text-line">-</div>
                            <Rate currentRate={5} size={12} />
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="text-secondary2">1 days ago</div>
                            <div className="text-secondary2">-</div>
                            <div className="text-secondary2">
                              <span>Yellow</span> / <span>XL</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="more-action cursor-pointer">
                        <Icon.DotsThree size={24} weight="bold" />
                      </div>
                    </div>
                    <div className="mt-3">
                      I can{String.raw`'t`} get enough of the fashion pieces
                      from this brand. They have a great selection for every
                      occasion and the prices are reasonable. The shipping is
                      fast and the items always arrive in perfect condition.
                    </div>
                    <div className="action mt-3">
                      <div className="flex items-center gap-4">
                        <div className="like-btn flex items-center gap-1 cursor-pointer">
                          <Icon.HandsClapping size={18} />
                          <div className="text-button">20</div>
                        </div>
                        <Link
                          href={"#form-review"}
                          className="reply-btn text-button text-secondary cursor-pointer hover:text-black"
                        >
                          Reply
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="item mt-8">
                    <div className="heading flex items-center justify-between">
                      <div className="user-infor flex gap-4">
                        <div className="avatar">
                          <Image
                            src={"/images/avatar/2.png"}
                            width={200}
                            height={200}
                            alt="img"
                            className="w-[52px] aspect-square rounded-full"
                          />
                        </div>
                        <div className="user">
                          <div className="flex items-center gap-2">
                            <div className="text-title">Guy Hawkins</div>
                            <div className="span text-line">-</div>
                            <Rate currentRate={4} size={12} />
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="text-secondary2">1 days ago</div>
                            <div className="text-secondary2">-</div>
                            <div className="text-secondary2">
                              <span>Yellow</span> / <span>XL</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="more-action cursor-pointer">
                        <Icon.DotsThree size={24} weight="bold" />
                      </div>
                    </div>
                    <div className="mt-3">
                      I can{String.raw`'t`} get enough of the fashion pieces
                      from this brand. They have a great selection for every
                      occasion and the prices are reasonable. The shipping is
                      fast and the items always arrive in perfect condition.
                    </div>
                    <div className="action mt-3">
                      <div className="flex items-center gap-4">
                        <div className="like-btn flex items-center gap-1 cursor-pointer">
                          <Icon.HandsClapping size={18} />
                          <div className="text-button">20</div>
                        </div>
                        <Link
                          href={"#form-review"}
                          className="reply-btn text-button text-secondary cursor-pointer hover:text-black"
                        >
                          Reply
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="item mt-8">
                    <div className="heading flex items-center justify-between">
                      <div className="user-infor flex gap-4">
                        <div className="avatar">
                          <Image
                            src={"/images/avatar/3.png"}
                            width={200}
                            height={200}
                            alt="img"
                            className="w-[52px] aspect-square rounded-full"
                          />
                        </div>
                        <div className="user">
                          <div className="flex items-center gap-2">
                            <div className="text-title">John Smith</div>
                            <div className="span text-line">-</div>
                            <Rate currentRate={5} size={12} />
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="text-secondary2">1 days ago</div>
                            <div className="text-secondary2">-</div>
                            <div className="text-secondary2">
                              <span>Yellow</span> / <span>XL</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="more-action cursor-pointer">
                        <Icon.DotsThree size={24} weight="bold" />
                      </div>
                    </div>
                    <div className="mt-3">
                      I can{String.raw`'t`} get enough of the fashion pieces
                      from this brand. They have a great selection for every
                      occasion and the prices are reasonable. The shipping is
                      fast and the items always arrive in perfect condition.
                    </div>
                    <div className="action mt-3">
                      <div className="flex items-center gap-4">
                        <div className="like-btn flex items-center gap-1 cursor-pointer">
                          <Icon.HandsClapping size={18} />
                          <div className="text-button">20</div>
                        </div>
                        <Link
                          href={"#form-review"}
                          className="reply-btn text-button text-secondary cursor-pointer hover:text-black"
                        >
                          Reply
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="form-review" className="form-review pt-6">
                  <div className="heading4">Leave A comment</div>
                  <form className="grid sm:grid-cols-2 gap-4 gap-y-5 md:mt-6 mt-3">
                    <div className="name ">
                      <input
                        className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                        id="username"
                        type="text"
                        placeholder="Your Name *"
                        required
                      />
                    </div>
                    <div className="mail ">
                      <input
                        className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                        id="email"
                        type="email"
                        placeholder="Your Email *"
                        required
                      />
                    </div>
                    <div className="col-span-full message">
                      <textarea
                        className="border border-line px-4 py-3 w-full rounded-lg"
                        id="message"
                        name="message"
                        placeholder="Your message *"
                        required
                      ></textarea>
                    </div>
                    <div className="col-span-full flex items-start -mt-2 gap-2">
                      <input
                        type="checkbox"
                        id="saveAccount"
                        name="saveAccount"
                        className="mt-1.5"
                      />
                      <label className="" htmlFor="saveAccount">
                        Save my name, email, and website in this browser for the
                        next time I comment.
                      </label>
                    </div>
                    <div className="col-span-full sm:pt-3">
                      <button className="button-main bg-white text-black border border-black hover:border-maincolor">
                        Submit Reviews
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="related-product md:py-20 py-10">
          <div className="container">
            <div className="heading3 text-center">Related Products</div>
            <div className="list-product hide-product-sold  grid lg:grid-cols-4 grid-cols-2 md:gap-[30px] gap-5 md:mt-10 mt-6">
              {data
                .slice(Number(productId), Number(productId) + 4)
                .map((item, index) => (
                  <Product key={index} data={item} type="grid" />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Default;

const PaymentList = () => {
  const heading = "Guaranteed safe checkout";
  const paymentImages = [
    { src: "/images/payment/0.svg", alt: "Visa", width: 500, height: 450 },
    {
      src: "/images/payment/1.png",
      alt: "Mastercard",
      width: 500,
      height: 450,
    },
    { src: "/images/payment/2.webp", alt: "PayPal", width: 500, height: 450 },
    { src: "/images/payment/3.webp", alt: "Stripe", width: 500, height: 450 },
    {
      src: "/images/payment/4.webp",
      alt: "Google Pay",
      width: 500,
      height: 450,
    },
    { src: "/images/payment/5.jpg", alt: "Apple Pay", width: 500, height: 450 },
  ];

  return (
    <div className="list-payment-wrapper flex items-center justify-center">
      <div className="main-content lg:pt-8 pt-6 lg:pb-6 pb-4 sm:px-4 px-3 border border-line rounded-xl relative max-md:w-2/3 max-sm:w-full w-4/5">
        <div className="heading6 px-5 bg-white absolute -top-[14px] left-1/2 -translate-x-1/2 whitespace-nowrap">
          {heading}
        </div>
        <div className="list grid grid-cols-6">
          {paymentImages.map((image, index) => (
            <div
              key={index}
              className="item flex items-center justify-center lg:px-3 px-1"
            >
              <Image
                src={image.src}
                width={image.width}
                height={image.height}
                alt={image.alt}
                className="w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
