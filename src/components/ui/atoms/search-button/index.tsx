"use client";
import Image from "next/image";

const SearchButton = ({
  onClick = () => {},
  leftIcon = "/images/icons/search_icon.svg",
  rightIcon = "/images/icons/action_button.svg",
  buttonText = "Search by Ampere",
  buttonStyle = "",
  textStyle = "",
  containerStyle = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`button-main py-2 rounded-md bg-white md:mt-7 mt-3 animate-float button-main-radiant hover:bg-secfill ${buttonStyle}`}
    >
      <div className={`flex gap-5 items-center max-w-sm ${containerStyle}`}>
        {leftIcon && (
          <Image src={leftIcon} alt="left-icon" width={24} height={24} />
        )}
        <p
          className={`text-[#666666] normal-case font-normal text-md ${textStyle}`}
        >
          {buttonText}
        </p>
        {rightIcon && (
          <Image src={rightIcon} alt="right-icon" width={38} height={38} />
        )}
      </div>
    </button>
  );
};

export default SearchButton;
