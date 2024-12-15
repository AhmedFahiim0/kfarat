type TLocale = "ar" | "en";

interface TProduct {
  id: string;
  category: string;
  type: string;
  name: string;
  gender: string;
  new: boolean;
  sale: boolean;
  rate: number;
  price: number;
  originPrice: number;
  brand: string;
  sold: number;
  quantity: number;
  quantityPurchase: number;
  sizes: Array<string>;
  variation: Variation[];
  thumbImage: Array<string>;
  images: Array<string>;
  description: string;
  action: string;
  slug: string;
}

interface TCity {
  coordinates: { lat: number; lng: number };
  name: string;
  area: { country: { name: string } };
}

interface TCategory {
  id: string;
  image: string;
  topBarIcon: string;
  icon: string;
  productProperties: Array<{
    dbName: string;
    isAdd: boolean;
    isDropdownFilter: boolean;
    isEdit: boolean;
    isGrid: boolean;
    isImage: boolean;
    isRequired: boolean;
    isSearchContains: boolean;
    isUnique: boolean;
    isViewInProdutCard: boolean;
    name: { en: string; ar: string };
    primaryFilter: boolean;
    propertyType: string;
    sort: number | null;
    valueType: string;
  }>;
  code: { ar: string; en: string };
  name: { ar: string; en: string };
  description: { ar: string; en: string };
  type: { code: string };
  isHideVehicleProductsSearchBar: boolean;
}

interface TCategory_1 {
  title: string;
  type: string;
  bgImage: string;
  items: CategoryItem[];
  searchButton?: SearchButtonProps;
  bannerTitle?: string;
  bannerSubTitle?: string;
  bannerBgImage?: string;
  bannerTextColor?: string;
}
