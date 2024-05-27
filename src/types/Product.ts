export interface Product {
  id: string;
  images: { url: string }[];
  url: string;
  price: number;
  prices: { amount: number; currency_code: string }[];
  description: string;
  material: string;
  options: { values: { value: string }[] }[];
  collection: Collection;
  collections: Collection[];
  title: string;
  query: string;
  variants: Variant[];
  products: string[];
}

export interface Variant {
  id: string;
  prices: { amount: number; currency_code: string }[];
  options: { values: { value: string }[] }[];
}

export interface Collection {
  title: string;
}
