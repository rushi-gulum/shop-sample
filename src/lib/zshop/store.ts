"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "sonner";
import {
  FREE_SHIPPING_THRESHOLD,
  PRODUCT_MAP,
  PROMO_CODES,
  STANDARD_SHIPPING,
} from "./data";
import type {
  CartItem,
  Order,
  Product,
  User,
  View,
} from "./types";

const MAX_COMPARE = 3;

function validId(id: unknown): id is string {
  return typeof id === "string" && id in PRODUCT_MAP;
}

function sanitizeCart(raw: unknown): CartItem[] {
  if (!Array.isArray(raw)) return [];
  const seen = new Set<string>();
  const out: CartItem[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const { id, qty } = item as Record<string, unknown>;
    if (!validId(id) || seen.has(id)) continue;
    const q = Math.min(99, Math.max(1, Math.floor(Number(qty) || 1)));
    seen.add(id);
    out.push({ id, qty: q });
  }
  return out;
}

function sanitizeIdList(raw: unknown, max?: number): string[] {
  if (!Array.isArray(raw)) return [];
  const out: string[] = [];
  for (const id of raw) {
    if (validId(id) && !out.includes(id)) out.push(id);
    if (max && out.length >= max) break;
  }
  return out;
}

function sanitizeStringList(raw: unknown, max: number): string[] {
  if (!Array.isArray(raw)) return [];
  const out: string[] = [];
  for (const term of raw) {
    if (typeof term !== "string") continue;
    const t = term.trim().slice(0, 60);
    if (t && !out.includes(t)) out.push(t);
    if (out.length >= max) break;
  }
  return out;
}

export interface Totals {
  itemCount: number;
  subtotal: number; // ₹
  listTotal: number; // ₹ (sum of compareAt)
  bundleSavings: number; // ₹
  promoDiscount: number; // ₹
  shipping: number; // ₹
  total: number; // ₹
  freeShippingRemaining: number; // ₹
  promoApplied: string | null;
  promoLabel: string | null;
  bundleBrand: string | null;
  bundleCount: number;
}

interface ZShopState {
  // persisted
  cart: CartItem[];
  wishlist: string[];
  compare: string[];
  recentlyViewed: string[];
  recentSearches: string[];
  user: User | null;
  orders: Order[];
  promo: string | null;

  // ephemeral
  view: View;
  cartOpen: boolean;
  chatOpen: boolean;
  signInOpen: boolean;
  signInIntent: string | null;
  quickViewId: string | null;
  checkoutOrderId: string | null;

  // actions
  navigate: (view: View) => void;
  openProduct: (id: string) => void;
  addToCart: (id: string, qty?: number, silent?: boolean) => void;
  removeFromCart: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (id: string) => void;
  toggleCompare: (id: string) => void;
  clearCompare: () => void;
  clearRecentlyViewed: () => void;
  addRecentSearch: (term: string) => void;
  removeRecentSearch: (term: string) => void;
  clearRecentSearches: () => void;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;
  signIn: (user: User) => void;
  signOut: () => void;
  placeOrder: (order: Order) => void;
  setCartOpen: (open: boolean) => void;
  setChatOpen: (open: boolean) => void;
  requestSignIn: (intent: string) => void;
  setSignInOpen: (open: boolean) => void;
  setQuickView: (id: string | null) => void;
  setCheckoutOrderId: (id: string | null) => void;
  totals: () => Totals;
  cartCount: () => number;
  isInWishlist: (id: string) => boolean;
  isInCompare: (id: string) => boolean;
}

export const useZShop = create<ZShopState>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],
      compare: [],
      recentlyViewed: [],
      recentSearches: [],
      user: null,
      orders: [],
      promo: null,

      view: { name: "home" },
      cartOpen: false,
      chatOpen: false,
      signInOpen: false,
      signInIntent: null,
      quickViewId: null,
      checkoutOrderId: null,

      navigate: (view) => {
        set({ view, cartOpen: false, quickViewId: null });
        if (typeof window !== "undefined") {
          window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
        }
      },

      openProduct: (id) => {
        if (!validId(id)) return;
        const cur = get().recentlyViewed.filter((x) => x !== id);
        set({
          view: { name: "product", id },
          recentlyViewed: [id, ...cur].slice(0, 8),
          cartOpen: false,
          quickViewId: null,
        });
        if (typeof window !== "undefined") {
          window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
        }
      },

      addToCart: (id, qty = 1, silent = false) => {
        if (!validId(id)) return;
        const cart = get().cart;
        const existing = cart.find((c) => c.id === id);
        const p = PRODUCT_MAP[id];
        const next = existing
          ? cart.map((c) => (c.id === id ? { ...c, qty: Math.min(99, c.qty + qty) } : c))
          : [...cart, { id, qty }];
        set({ cart: next });
        if (!silent) {
          toast.success(`Added "${p.title}" to cart`, {
            action: { label: "View cart", onClick: () => set({ cartOpen: true }) },
          });
        }
      },

      removeFromCart: (id) => {
        const p = PRODUCT_MAP[id];
        set({ cart: get().cart.filter((c) => c.id !== id) });
        if (p) toast(`Removed "${p.title}" from cart`);
      },

      setQty: (id, qty) => {
        if (!validId(id)) return;
        if (qty <= 0) {
          get().removeFromCart(id);
          return;
        }
        set({
          cart: get().cart.map((c) =>
            c.id === id ? { ...c, qty: Math.min(99, qty) } : c
          ),
        });
      },

      clearCart: () => {
        set({ cart: [], promo: null });
        toast("Cart cleared");
      },

      toggleWishlist: (id) => {
        if (!validId(id)) return;
        const { wishlist } = get();
        const p = PRODUCT_MAP[id];
        if (wishlist.includes(id)) {
          set({ wishlist: wishlist.filter((w) => w !== id) });
          toast(`Removed "${p.title}" from wishlist`);
        } else {
          set({ wishlist: [id, ...wishlist] });
          toast.success(`Added "${p.title}" to wishlist`, {
            action: { label: "View", onClick: () => get().navigate({ name: "wishlist" }) },
          });
        }
      },

      toggleCompare: (id) => {
        if (!validId(id)) return;
        const { compare } = get();
        const p = PRODUCT_MAP[id];
        if (compare.includes(id)) {
          set({ compare: compare.filter((c) => c !== id) });
          toast(`Removed "${p.title}" from comparison`);
        } else {
          if (compare.length >= MAX_COMPARE) {
            toast.error(`You can compare up to ${MAX_COMPARE} products`);
            return;
          }
          set({ compare: [...compare, id] });
          toast.success(`Added "${p.title}" to comparison (${compare.length + 1}/${MAX_COMPARE})`);
        }
      },

      clearCompare: () => set({ compare: [] }),

      clearRecentlyViewed: () => {
        set({ recentlyViewed: [] });
        toast("Recently viewed cleared");
      },

      addRecentSearch: (term) => {
        const t = term.trim().slice(0, 60);
        if (!t) return;
        set({ recentSearches: [t, ...get().recentSearches.filter((x) => x !== t)].slice(0, 6) });
      },

      removeRecentSearch: (term) => {
        set({ recentSearches: get().recentSearches.filter((x) => x !== term) });
      },

      clearRecentSearches: () => set({ recentSearches: [] }),

      applyPromo: (code) => {
        const norm = code.trim().toUpperCase();
        if (!norm) return false;
        if (PROMO_CODES[norm]) {
          set({ promo: norm });
          toast.success(PROMO_CODES[norm].label);
          return true;
        }
        toast.error(`Promo code "${norm}" is not valid`);
        return false;
      },

      removePromo: () => set({ promo: null }),

      signIn: (user) => {
        const intent = get().signInIntent;
        set({ user, signInOpen: false, signInIntent: null });
        toast.success(`Welcome, ${user.name}!`);
        // continue the action that required auth
        if (intent === "checkout" && get().cart.length > 0) {
          set({ view: { name: "checkout" } });
        } else if (intent === "wishlist") {
          set({ view: { name: "wishlist" } });
        } else if (intent === "account" || intent === "register" || intent === "prime") {
          set({ view: { name: "account" } });
        }
      },

      signOut: () => {
        set({ user: null, view: { name: "home" } });
        toast("Signed out. See you soon!");
      },

      placeOrder: (order) => {
        set({
          orders: [order, ...get().orders],
          cart: [],
          promo: null,
          checkoutOrderId: order.id,
        });
      },

      setCartOpen: (open) => set({ cartOpen: open }),
      setChatOpen: (open) => set({ chatOpen: open }),

      requestSignIn: (intent) =>
        set({ signInOpen: true, signInIntent: intent }),

      setSignInOpen: (open) => set({ signInOpen: open, signInIntent: open ? get().signInIntent : null }),

      setQuickView: (id) => set({ quickViewId: id }),

      setCheckoutOrderId: (id) => set({ checkoutOrderId: id }),

      totals: () => {
        const { cart, promo } = get();
        const itemCount = cart.reduce((n, c) => n + c.qty, 0);
        let subtotal = 0;
        let listTotal = 0;
        for (const item of cart) {
          const p = PRODUCT_MAP[item.id];
          if (!p) continue;
          subtotal += p.price * item.qty;
          listTotal += (p.compareAt ?? p.price) * item.qty;
        }

        // Bundle savings: 10% off when 2+ items from the same brand in cart
        const brandQty = new Map<string, { qty: number; amount: number }>();
        for (const item of cart) {
          const p = PRODUCT_MAP[item.id];
          if (!p) continue;
          const b = brandQty.get(p.brand) ?? { qty: 0, amount: 0 };
          b.qty += item.qty;
          b.amount += p.price * item.qty;
          brandQty.set(p.brand, b);
        }
        let bundleSavings = 0;
        let bundleBrand: string | null = null;
        let bundleCount = 0;
        for (const [brand, b] of brandQty) {
          if (b.qty >= 2 && b.amount * 0.1 > bundleSavings) {
            bundleSavings = b.amount * 0.1;
            bundleBrand = brand;
            bundleCount = b.qty;
          }
        }

        let promoDiscount = 0;
        let promoApplied: string | null = null;
        let promoLabel: string | null = null;
        if (promo && PROMO_CODES[promo]) {
          promoDiscount = subtotal * (PROMO_CODES[promo].value / 100);
          promoApplied = promo;
          promoLabel = PROMO_CODES[promo].label;
        }

        const afterDiscounts = Math.max(0, subtotal - bundleSavings - promoDiscount);
        const shipping =
          itemCount === 0 || afterDiscounts >= FREE_SHIPPING_THRESHOLD
            ? 0
            : STANDARD_SHIPPING;
        const total = afterDiscounts + shipping;
        const freeShippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - afterDiscounts);

        return {
          itemCount,
          subtotal,
          listTotal,
          bundleSavings,
          promoDiscount,
          shipping,
          total,
          freeShippingRemaining,
          promoApplied,
          promoLabel,
          bundleBrand,
          bundleCount,
        };
      },

      cartCount: () => get().cart.reduce((n, c) => n + c.qty, 0),

      isInWishlist: (id) => get().wishlist.includes(id),
      isInCompare: (id) => get().compare.includes(id),
    }),
    {
      name: "zshop-store-v4",
      version: 4,
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (s) => ({
        cart: s.cart,
        wishlist: s.wishlist,
        compare: s.compare,
        recentlyViewed: s.recentlyViewed,
        recentSearches: s.recentSearches,
        user: s.user,
        orders: s.orders,
        promo: s.promo,
      }),
      merge: (persisted, current) => {
        const base = { ...current };
        try {
          const p = (persisted ?? {}) as Record<string, unknown>;
          base.cart = sanitizeCart(p.cart);
          base.wishlist = sanitizeIdList(p.wishlist);
          base.compare = sanitizeIdList(p.compare, MAX_COMPARE);
          base.recentlyViewed = sanitizeIdList(p.recentlyViewed, 8);
          base.recentSearches = sanitizeStringList(p.recentSearches, 6);
          if (p.user && typeof p.user === "object") {
            const u = p.user as Record<string, unknown>;
            if (typeof u.email === "string" && u.email.includes("@")) {
              base.user = {
                name: typeof u.name === "string" && u.name ? u.name : "Shopper",
                email: u.email,
              };
            }
          }
          if (typeof p.promo === "string" && p.promo in PROMO_CODES) {
            base.promo = p.promo;
          }
          if (Array.isArray(p.orders)) {
            base.orders = (p.orders as Order[]).filter(
              (o) =>
                o &&
                typeof o.id === "string" &&
                typeof o.total === "number" &&
                Array.isArray(o.lines)
            );
          }
        } catch {
          // corrupted storage — start fresh rather than crash
        }
        return base;
      },
    }
  )
);

// ---------- helpers ----------

const INR_FORMATTER = new Intl.NumberFormat("en-IN", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

/** All prices on Z Shop India are rupees (₹), lakh-grouped: ₹1,09,999 */
export function formatPrice(inr: number): string {
  const rounded = Math.round(inr);
  return `₹${INR_FORMATTER.format(rounded)}`;
}

export function usePrice() {
  return (inr: number) => formatPrice(inr);
}

export function productById(id: string): Product | undefined {
  return PRODUCT_MAP[id];
}

export { MAX_COMPARE };
