"use client";

import { Heart, Home, ChevronRight, ShoppingCart } from "lucide-react";
import { PRODUCT_MAP } from "@/lib/zshop/data";
import { usePrice, useZShop } from "@/lib/zshop/store";
import { ProductCard } from "./product-card";
import { Button } from "@/components/ui/button";

export function WishlistView() {
  const wishlist = useZShop((s) => s.wishlist);
  const navigate = useZShop((s) => s.navigate);
  const addToCart = useZShop((s) => s.addToCart);
  const price = usePrice();

  const items = wishlist.map((id) => PRODUCT_MAP[id]).filter(Boolean);
  const total = items.reduce((sum, p) => sum + p.price, 0);

  return (
    <div className="mx-auto max-w-7xl px-3 py-4 sm:px-6" data-testid="wishlist-view">
      <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1.5 text-sm text-muted-foreground">
        <button
          className="flex items-center gap-1 hover:text-brand-600 dark:hover:text-brand-400"
          onClick={() => navigate({ name: "home" })}
        >
          <Home className="h-3.5 w-3.5" /> Home
        </button>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground">Your Wishlist</span>
      </nav>

      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-black sm:text-3xl">
            <Heart className="h-6 w-6 fill-brand-600 text-brand-600" />
            Your Wishlist
          </h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {items.length} saved item{items.length === 1 ? "" : "s"}
            {items.length > 0 && <> · worth {price(total)}</>}
          </p>
        </div>
        {items.length > 0 && (
          <Button
            className="bg-brand-500 font-bold text-white hover:bg-brand-600"
            onClick={() => {
              for (const p of items) addToCart(p.id, 1, true);
              useZShop.getState().setCartOpen(true);
            }}
          >
            <ShoppingCart className="mr-1.5 h-4 w-4" /> Add all to cart
          </Button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed py-16 text-center">
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-100 dark:bg-brand-950/40">
            <Heart className="h-9 w-9 text-brand-500" />
          </span>
          <h3 className="text-lg font-bold">Your wishlist is empty</h3>
          <p className="max-w-sm text-sm text-muted-foreground">
            Tap the heart on any product to save it here for later.
          </p>
          <Button
            className="bg-brand-500 font-bold text-white hover:bg-brand-600"
            onClick={() => navigate({ name: "shop", category: "all" })}
          >
            Discover products
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.id} id={p.id} />
          ))}
        </div>
      )}
    </div>
  );
}
