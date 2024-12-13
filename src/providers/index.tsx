import React from "react";
import { CartProvider } from "@/context/CartContext";
import { ModalCartProvider } from "@/context/ModalCartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { ModalWishlistProvider } from "@/context/ModalWishlistContext";
import { CompareProvider } from "@/context/CompareContext";
import { ModalCompareProvider } from "@/context/ModalCompareContext";
import { ModalSearchProvider } from "@/context/ModalSearchContext";
import { ModalQuickviewProvider } from "@/context/ModalQuickviewContext";
import LanguageProvier from "./language-provider";
import ReactQueryProvider from "./query-providers";
import LayoutProvider from "@/components/layouts";
import RegionProvider from "./region-provider";

const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ReactQueryProvider>
      <LanguageProvier>
        <CartProvider>
          <ModalCartProvider>
            <WishlistProvider>
              <ModalWishlistProvider>
                <CompareProvider>
                  <ModalCompareProvider>
                    <ModalSearchProvider>
                      <ModalQuickviewProvider>
                        <RegionProvider>
                          <LayoutProvider>{children}</LayoutProvider>
                        </RegionProvider>
                      </ModalQuickviewProvider>
                    </ModalSearchProvider>
                  </ModalCompareProvider>
                </CompareProvider>
              </ModalWishlistProvider>
            </WishlistProvider>
          </ModalCartProvider>
        </CartProvider>
      </LanguageProvier>
    </ReactQueryProvider>
  );
};

export default GlobalProvider;
