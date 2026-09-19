export type CategoryId =
  | "smartphones"
  | "iphone"
  | "feature-phones"
  | "tablets"
  | "wearables"
  | "audio"
  | "chargers"
  | "cables"
  | "powerbanks"
  | "cases"
  | "screen-protection"
  | "stands-mounts"
  | "creator-gear"
  | "car-accessories"
  | "storage"
  | "gaming"
  | "productivity"
  | "connectivity"
  | "cleaning-care"
  | "refurbished";

export interface Category {
  id: CategoryId;
  name: string;
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
  price: number; // INR (₹) — prices are always rupees on the India store
  compareAt?: number; // original MRP (list)
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
    zip: string; // 6-digit PIN code
    country: string;
    phone?: string;
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
