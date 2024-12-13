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
