"use client";

import { useMemo, useState } from "react";
import { ChevronRight, Home, Search, SlidersHorizontal, X } from "lucide-react";
import {
  BRANDS,
  CATEGORIES,
  CATEGORY_MAP,
  PRODUCTS,
  dealProducts,
} from "@/lib/zshop/data";
import { usePrice, useZShop } from "@/lib/zshop/store";
import type { CategoryId } from "@/lib/zshop/types";
import { ProductCard } from "./product-card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { StarRating } from "./star-rating";
import { cn } from "@/lib/utils";

type SortKey = "featured" | "price-asc" | "price-desc" | "rating" | "discount";

const SORT_LABELS: Record<SortKey, string> = {
  featured: "Featured first",
  "price-asc": "Price: low to high",
  "price-desc": "Price: high to low",
  rating: "Highest rated",
  discount: "Biggest discount",
};

interface ShopViewProps {
  category?: CategoryId | "all";
  query?: string;
}

export function ShopView({ category = "all", query }: ShopViewProps) {
  const navigate = useZShop((s) => s.navigate);
  const price = usePrice();
  const [sort, setSort] = useState<SortKey>("featured");
  const [maxPrice, setMaxPrice] = useState(5000);
  const [minRating, setMinRating] = useState(0);
  const [onlyDeals, setOnlyDeals] = useState(false);
  const [brands, setBrands] = useState<string[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const isSearch = !!query;
  const activeCategory: CategoryId | "all" = category;

  const base = useMemo(() => {
    let list = PRODUCTS;
    if (isSearch) return list; // filter below via query
    if (activeCategory !== "all") list = list.filter((p) => p.category === activeCategory);
    return list;
  }, [activeCategory, isSearch]);

  const results = useMemo(() => {
    let list = base;
    if (query) {
      const q = query.trim().toLowerCase();
      const terms = q.split(/\s+/);
      list = list.filter((p) => {
        const cat = CATEGORY_MAP[p.category];
        const hay = [p.title, p.brand, cat?.name ?? "", ...(p.tags ?? []), p.description]
          .join(" ")
          .toLowerCase();
        return terms.every((t) => hay.includes(t));
      });
    }
    list = list.filter(
      (p) => p.price <= maxPrice && p.rating >= minRating && (brands.length === 0 || brands.includes(p.brand))
    );
    if (onlyDeals) list = list.filter((p) => p.compareAt && p.compareAt > p.price);

    const sorted = [...list];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "discount":
        sorted.sort((a, b) => {
          const da = a.compareAt ? 1 - a.price / a.compareAt : 0;
          const db = b.compareAt ? 1 - b.price / b.compareAt : 0;
          return db - da;
        });
        break;
      default:
        sorted.sort(
          (a, b) => Number(b.featured ?? false) - Number(a.featured ?? false) || b.rating - a.rating
        );
    }
    return sorted;
  }, [base, query, maxPrice, minRating, brands, onlyDeals, sort]);

  const title = isSearch
    ? `Results for "${query}"`
    : activeCategory === "all"
      ? "All products"
      : (CATEGORY_MAP[activeCategory]?.name ?? "Shop");
  const blurb = isSearch
    ? null
    : activeCategory === "all"
      ? `${PRODUCTS.length} products across every category`
      : CATEGORY_MAP[activeCategory]?.blurb;

  const activeFilterCount =
    (maxPrice < 5000 ? 1 : 0) + (minRating > 0 ? 1 : 0) + (onlyDeals ? 1 : 0) + brands.length;

  function clearFilters() {
    setMaxPrice(5000);
    setMinRating(0);
    setOnlyDeals(false);
    setBrands([]);
  }

  const filtersPanel = (
    <div className="space-y-6">
      {/* categories */}
      {!isSearch && (
        <div>
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wide">Category</h3>
            <button
              className="text-xs font-semibold text-amber-600 hover:underline dark:text-amber-400"
              onClick={() => navigate({ name: "shop", category: "all" })}
            >
              Clear
            </button>
          </div>
          <ul className="space-y-0.5">
            <li>
              <button
                className={cn(
                  "w-full rounded-lg px-2.5 py-1.5 text-left text-sm transition hover:bg-muted",
                  activeCategory === "all" && "bg-amber-50 font-semibold text-amber-700 dark:bg-amber-400/10 dark:text-amber-400"
                )}
                onClick={() => navigate({ name: "shop", category: "all" })}
              >
                All categories
              </button>
            </li>
            {CATEGORIES.map((c) => (
              <li key={c.id}>
                <button
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-sm transition hover:bg-muted",
                    activeCategory === c.id &&
                      "bg-amber-50 font-semibold text-amber-700 dark:bg-amber-400/10 dark:text-amber-400"
                  )}
                  onClick={() => navigate({ name: "shop", category: c.id })}
                >
                  {c.name}
                  {activeCategory === c.id && <span className="text-amber-500">✓</span>}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* price */}
      <div>
        <h3 className="mb-2 text-sm font-bold uppercase tracking-wide">Price range</h3>
        <Slider
          value={[maxPrice]}
          min={10}
          max={5000}
          step={10}
          onValueChange={([v]) => setMaxPrice(v)}
          aria-label="Maximum price"
        />
        <div className="mt-1.5 flex justify-between text-xs text-muted-foreground">
          <span>{price(10)}</span>
          <span className="font-semibold text-foreground">Up to {price(maxPrice)}</span>
        </div>
      </div>

      {/* rating */}
      <div>
        <h3 className="mb-2 text-sm font-bold uppercase tracking-wide">Rating</h3>
        <ul className="space-y-1">
          {[4, 3, 2, 1].map((r) => (
            <li key={r}>
              <button
                className={cn(
                  "flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm transition hover:bg-muted",
                  minRating === r && "bg-amber-50 font-semibold dark:bg-amber-400/10"
                )}
                onClick={() => setMinRating((cur) => (cur === r ? 0 : r))}
              >
                <StarRating rating={r} size={13} /> <span className="text-xs">& up</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* deals */}
      <div>
        <h3 className="mb-2 text-sm font-bold uppercase tracking-wide">On sale</h3>
        <div className="flex items-center gap-2">
          <Checkbox
            id="only-deals"
            checked={onlyDeals}
            onCheckedChange={(v) => setOnlyDeals(v === true)}
          />
          <Label htmlFor="only-deals" className="text-sm">
            Show only deals
          </Label>
        </div>
      </div>

      {/* brands */}
      <div>
        <h3 className="mb-2 text-sm font-bold uppercase tracking-wide">Brands</h3>
        <div className="max-h-44 space-y-1.5 overflow-y-auto pr-1">
          {BRANDS.map((b) => (
            <div key={b} className="flex items-center gap-2">
              <Checkbox
                id={`brand-${b}`}
                checked={brands.includes(b)}
                onCheckedChange={(v) =>
                  setBrands((cur) => (v === true ? [...cur, b] : cur.filter((x) => x !== b)))
                }
              />
              <Label htmlFor={`brand-${b}`} className="text-sm">
                {b}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {activeFilterCount > 0 && (
        <Button variant="outline" className="w-full" onClick={clearFilters}>
          <X className="mr-1 h-4 w-4" /> Clear all filters ({activeFilterCount})
        </Button>
      )}
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-3 py-4 sm:px-6" data-testid="shop-view">
      {/* breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1.5 text-sm text-muted-foreground">
        <button
          className="flex items-center gap-1 hover:text-amber-600 dark:hover:text-amber-400"
          onClick={() => navigate({ name: "home" })}
        >
          <Home className="h-3.5 w-3.5" /> Home
        </button>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground">{isSearch ? `Results for "${query}"` : title}</span>
      </nav>

      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-black sm:text-3xl">
            {isSearch && <Search className="h-6 w-6 text-amber-500" />}
            {title}
          </h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {results.length} of {isSearch ? PRODUCTS.length : base.length} products
            {blurb ? ` · ${blurb}` : ""}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* mobile filters */}
          <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:hidden">
                <SlidersHorizontal className="mr-1 h-4 w-4" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-[11px] font-bold text-black">
                    {activeFilterCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 overflow-y-auto">
              <SheetHeader className="px-4 pb-0">
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="px-4 pb-6">{filtersPanel}</div>
            </SheetContent>
          </Sheet>

          <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
            <SelectTrigger className="w-44" aria-label="Sort products">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(SORT_LABELS).map(([k, label]) => (
                <SelectItem key={k} value={k}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-6">
        {/* desktop sidebar */}
        <aside className="hidden w-56 shrink-0 lg:block" aria-label="Product filters">
          <div className="sticky top-4">{filtersPanel}</div>
        </aside>

        {/* grid */}
        <div className="min-w-0 flex-1">
          {results.length === 0 ? (
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed py-16 text-center">
              <span className="text-4xl">🔍</span>
              <h3 className="text-lg font-bold">No products found</h3>
              <p className="max-w-sm text-sm text-muted-foreground">
                Try adjusting your search or filters. Clearing filters may help.
              </p>
              <div className="flex gap-2">
                <Button variant="outline" onClick={clearFilters}>
                  Clear filters
                </Button>
                <Button
                  className="bg-amber-400 font-bold text-neutral-950 hover:bg-amber-500"
                  onClick={() => navigate({ name: "shop", category: "all" })}
                >
                  Browse all products
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
              {results.map((p) => (
                <ProductCard key={p.id} id={p.id} />
              ))}
            </div>
          )}

          {/* cross-sell: deals strip */}
          {!isSearch && activeCategory === "all" && (
            <div className="mt-8 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-black text-white">🔥 Today&apos;s hottest deals</h3>
                  <p className="text-sm text-white/85">
                    Up to {Math.max(...dealProducts().map((d) => (d.compareAt ? Math.round((1 - d.price / d.compareAt) * 100) : 0)))}% off —
                    limited time only
                  </p>
                </div>
                <Button
                  className="bg-white font-bold text-orange-600 hover:bg-white/90"
                  onClick={() => navigate({ name: "deals" })}
                >
                  See all deals
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
