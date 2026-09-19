"use client";

import { ChevronRight } from "lucide-react";
import { CATEGORIES } from "@/lib/zshop/data";
import { useZShop } from "@/lib/zshop/store";
import { CategoryArt } from "./category-art";

export function CategoryChips() {
  const navigate = useZShop((s) => s.navigate);

  return (
    <section aria-labelledby="shop-by-category" className="mx-auto max-w-7xl px-3 pt-8 sm:px-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 id="shop-by-category" className="text-xl font-black sm:text-2xl">
          Shop by category
        </h2>
        <button
          className="flex items-center gap-1 text-sm font-semibold text-brand-600 transition hover:gap-2 dark:text-brand-400"
          onClick={() => navigate({ name: "shop", category: "all" })}
        >
          View all <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-10">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            aria-label={`Shop ${c.name}`}
            title={c.blurb}
            className="group flex flex-col items-center gap-2.5 rounded-2xl border bg-card px-2 py-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/70 hover:shadow-lg"
            onClick={() => navigate({ name: "shop", category: c.id })}
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-b from-brand-50 to-brand-100 ring-1 ring-inset ring-brand-200/70 transition-transform duration-300 group-hover:scale-105 dark:from-brand-400/10 dark:to-brand-400/15 dark:ring-brand-400/20">
              <span className="h-12 w-12">
                <CategoryArt id={c.id} />
              </span>
            </span>
            <span className="text-center text-xs font-bold leading-tight sm:text-sm">
              {c.name}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
