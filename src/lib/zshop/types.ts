export type CategoryId =
  | "audio"
  | "beauty"
  | "books"
  | "computers"
  | "electronics"
  | "fashion"
  | "grocery"
  | "home-kitchen"
  | "sports-outdoors"
  | "toys-games";

export interface Category {
  id: CategoryId;
  name: string;
  emoji: string;
  blurb: string;
}

export interface Spec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  title: string;
  brand: string;
  category: CategoryId;
  price: number; // USD base price
  compareAt?: number; // original price (list)
  rating: number; // 0 - 5
  ratingCount: number;
  description: string;
  image: string;
  gallery?: string[];
  tags?: string[];
  featured?: boolean;
  newArrival?: boolean;
  specs?: Spec[];
}

export interface CartItem {
  id: string;
  qty: number;
}

export type CurrencyCode = "USD" | "EUR" | "GBP" | "CNY" | "JPY";

export interface CurrencyInfo {
  code: CurrencyCode;
  label: string;
  symbol: string;
  rate: number; // vs USD
}

export interface OrderLine {
  id: string;
  title: string;
  image: string;
  price: number;
  qty: number;
}

export interface Order {
  id: string;
  placedAt: number;
  lines: OrderLine[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  status: "Processing" | "Shipped" | "Out for delivery" | "Delivered";
  eta: string;
  address: {
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
}

export type View =
  | { name: "home" }
  | { name: "product"; id: string }
  | { name: "shop"; category?: CategoryId | "all"; query?: string }
  | { name: "deals" }
  | { name: "wishlist" }
  | { name: "compare" }
  | { name: "checkout" }
  | { name: "orders" }
  | { name: "account" };

export interface User {
  name: string;
  email: string;
}
