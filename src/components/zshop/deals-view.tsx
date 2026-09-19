"use client";

import { Flame, Home, ChevronRight, Sparkles } from "lucide-react";
import { dealProducts } from "@/lib/zshop/data";
import { useZShop } from "@/lib/zshop/store";
import { ProductCard } from "./product-card";

export function DealsView() {
  const navigate = useZShop((s) => s.navigate);
  const deals = dealProducts();

  return (
    <div className="mx-auto max-w-7xl px-3 py-4 sm:px-6" data-testid="deals-view">
      <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1.5 text-sm text-muted-foreground">
        <button
          className="flex items-center gap-1 hover:text-amber-600 dark:hover:text-amber-400"
          onClick={() => navigate({ name: "home" })}
        >
          <Home className="h-3.5 w-3.5" /> Home
        </button>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground">Today&apos;s Deals</span>
      </nav>

      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-rose-600 via-orange-500 to-amber-500 p-6 text-white shadow-md sm:p-10">
        <span className="pointer-events-none absolute -right-4 -top-6 text-[110px] leading-none opacity-15">
          🔥
        </span>
        <span className="flex w-fit items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
          <Flame className="h-3 w-3" /> Hot deals
        </span>
        <h1 className="mt-3 text-3xl font-black sm:text-4xl">Today&apos;s Deals</h1>
        <p className="mt-1 max-w-md text-sm text-white/90 sm:text-base">
          Save big on the products you love. Limited time only.
        </p>
        <span className="absolute right-6 top-1/2 hidden -translate-y-1/2 text-6xl opacity-30 md:block">
          <Sparkles />
        </span>
      </div>

      <p className="mb-4 mt-6 text-sm font-semibold text-rose-600 dark:text-rose-400">
        ⏰ {deals.length} live deals — refreshed every morning at 6 AM
      </p>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
        {deals.map((p) => (
          <ProductCard key={p.id} id={p.id} />
        ))}
      </div>
    </div>
  );
}
