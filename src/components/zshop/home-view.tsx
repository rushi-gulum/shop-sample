"use client";

import { ChevronRight, Flame, Sparkles, TrendingUp } from "lucide-react";
import { dealProducts, featuredProducts, newArrivals } from "@/lib/zshop/data";
import { useZShop } from "@/lib/zshop/store";
import { HeroCarousel } from "./hero-carousel";
import { TrustBadges } from "./trust-badges";
import { CategoryChips } from "./category-chips";
import { ProductCard } from "./product-card";
import { PromoCards } from "./promo-cards";

export function HomeView() {
  const navigate = useZShop((s) => s.navigate);
  const deals = dealProducts().slice(0, 6);
  const featured = featuredProducts();
  const arrivals = newArrivals();

  return (
    <div data-testid="home-view">
      <TrustBadges />
      <HeroCarousel />
      <CategoryChips />

      {/* Today's deals */}
      <section aria-labelledby="todays-deals" className="mx-auto max-w-7xl px-3 pt-10 sm:px-6">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <h2 id="todays-deals" className="flex items-center gap-2 text-xl font-black sm:text-2xl">
            <Flame className="h-5 w-5 text-rose-600" />
            Today&apos;s Deals
          </h2>
          <span className="rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-bold text-rose-600 dark:bg-rose-950/50 dark:text-rose-400">
            Limited time
          </span>
          <button
            className="ml-auto flex items-center gap-1 text-sm font-semibold text-amber-600 transition hover:gap-2 dark:text-amber-400"
            onClick={() => navigate({ name: "deals" })}
          >
            See all deals <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {deals.map((p) => (
            <ProductCard key={p.id} id={p.id} />
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section aria-labelledby="featured-products" className="mx-auto max-w-7xl px-3 pt-10 sm:px-6">
        <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
          <h2 id="featured-products" className="text-xl font-black sm:text-2xl">
            Featured products
          </h2>
          <button
            className="flex items-center gap-1 text-sm font-semibold text-amber-600 transition hover:gap-2 dark:text-amber-400"
            onClick={() => navigate({ name: "shop", category: "all" })}
          >
            See more <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <p className="mb-4 text-sm text-muted-foreground">Handpicked for you</p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {featured.slice(0, 8).map((p) => (
            <ProductCard key={p.id} id={p.id} />
          ))}
        </div>
      </section>

      {/* Promos */}
      <PromoCards />

      {/* New arrivals */}
      <section aria-labelledby="new-arrivals" className="mx-auto max-w-7xl px-3 pt-10 sm:px-6">
        <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
          <h2 id="new-arrivals" className="flex items-center gap-2 text-xl font-black sm:text-2xl">
            <TrendingUp className="h-5 w-5 text-emerald-500" />
            New arrivals
          </h2>
          <button
            className="flex items-center gap-1 text-sm font-semibold text-amber-600 transition hover:gap-2 dark:text-amber-400"
            onClick={() => navigate({ name: "shop", category: "all" })}
          >
            See more <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <p className="mb-4 text-sm text-muted-foreground">Fresh in stock</p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {arrivals.map((p) => (
            <ProductCard key={p.id} id={p.id} />
          ))}
        </div>
      </section>

      {/* recently viewed */}
      <RecentlyViewed />
    </div>
  );
}

function RecentlyViewed() {
  const recentlyViewed = useZShop((s) => s.recentlyViewed);
  if (recentlyViewed.length === 0) return null;
  return (
    <section aria-label="Recently viewed" className="mx-auto max-w-7xl px-3 pt-10 sm:px-6">
      <div className="mb-4 flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-amber-500" />
        <h2 className="text-xl font-black">Recently viewed</h2>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {recentlyViewed.slice(0, 6).map((id) => (
          <ProductCard key={id} id={id} />
        ))}
      </div>
    </section>
  );
}
