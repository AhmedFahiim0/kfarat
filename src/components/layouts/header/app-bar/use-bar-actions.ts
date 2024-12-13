import { usePathname } from "next/navigation";
import useMenuMobile from "@/store/useMenuMobile";
import { useModalCartContext } from "@/context/ModalCartContext";
import { useModalWishlistContext } from "@/context/ModalWishlistContext";
import { useModalSearchContext } from "@/context/ModalSearchContext";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useBarActions = () => {
  const pathname = usePathname();

  const router = useRouter();

  const { openMenuMobile, handleMenuMobile } = useMenuMobile();

  const { openModalCart } = useModalCartContext();

  const { cartState } = useCart();

  const { openModalWishlist } = useModalWishlistContext();

  const { openModalSearch } = useModalSearchContext();

  const [fixedHeader, setFixedHeader] = useState<boolean>(false);

  const [lastScrollPosition, setLastScrollPosition] = useState<number>(0);

  const handleTypeClick = (type: string) => {
    router.push(`/shop/breadcrumb1?type=${type}`);
  };

  return {
    pathname,
    cartState,
    fixedHeader,
    openMenuMobile,
    lastScrollPosition,
    openModalCart,
    setFixedHeader,
    handleTypeClick,
    openModalSearch,
    handleMenuMobile,
    openModalWishlist,
    setLastScrollPosition,
  };
};
