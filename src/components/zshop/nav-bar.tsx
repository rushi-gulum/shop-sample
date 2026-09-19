"use client";

import { Sparkles } from "lucide-react";
import { CATEGORIES } from "@/lib/zshop/data";
import { useZShop } from "@/lib/zshop/store";
import { cn } from "@/lib/utils";

export function NavBar() {
  const navigate = useZShop((s) => s.navigate);
  const view = useZShop((s) => s.view);

  const activeCategory =
    view.name === "shop" && view.category && view.category !== "all"
      ? view.category
      : view.name === "deals"
        ? "__deals"
        : null;

  function goAll() {
    navigate({ name: "shop", category: "all" });
  }

  return (
    <nav aria-label="Shop categories" className="bg-brand-500 dark:bg-brand-500">
      <div className="mx-auto flex max-w-7xl items-center gap-0.5 overflow-x-auto px-3 py-1.5 sm:px-6 [&::-webkit-scrollbar]:hidden">
        <button
          className={cn(
            "flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-md px-2.5 py-1.5 text-sm font-bold text-white transition hover:bg-white/15",
            activeCategory === "__deals" && "bg-white/20"
          )}
          onClick={() => navigate({ name: "deals" })}
        >
          <Sparkles className="h-4 w-4" />
          Today&apos;s Deals
        </button>
        <button
          className={cn(
            "shrink-0 whitespace-nowrap rounded-md px-2.5 py-1.5 text-sm text-white/90 transition hover:bg-white/15",
            activeCategory === null && "font-bold"
          )}
          onClick={goAll}
        >
          All
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            className={cn(
              "shrink-0 whitespace-nowrap rounded-md px-2.5 py-1.5 text-sm text-white/90 transition hover:bg-white/15",
              activeCategory === c.id && "bg-white/20 font-semibold"
            )}
            onClick={() => navigate({ name: "shop", category: c.id })}
          >
            {c.name}
          </button>
        ))}
      </div>
    </nav>
  );
}
