"use client";

import { ChevronRight } from "lucide-react";
import { CATEGORIES } from "@/lib/zshop/data";
import { useZShop } from "@/lib/zshop/store";

export function CategoryChips() {
  const navigate = useZShop((s) => s.navigate);

  return (
    <section aria-labelledby="shop-by-category" className="mx-auto max-w-7xl px-3 pt-8 sm:px-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 id="shop-by-category" className="text-xl font-black sm:text-2xl">
          Shop by category
        </h2>
        <button
          className="flex items-center gap-1 text-sm font-semibold text-amber-600 transition hover:gap-2 dark:text-amber-400"
          onClick={() => navigate({ name: "shop", category: "all" })}
        >
          View all <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-10">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            className="group flex flex-col items-center gap-2 rounded-xl border bg-card px-2 py-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-amber-400/60 hover:shadow-md"
            onClick={() => navigate({ name: "shop", category: c.id })}
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-2xl transition-transform group-hover:scale-110 dark:bg-amber-400/15">
              {c.emoji}
            </span>
            <span className="text-center text-xs font-semibold leading-tight sm:text-sm">
              {c.name}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
