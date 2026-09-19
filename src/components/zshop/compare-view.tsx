"use client";

import Image from "next/image";
import { Home, ChevronRight, Scale, ShoppingCart, Star, X } from "lucide-react";
import { CATEGORY_MAP, PRODUCT_MAP, discountPercent } from "@/lib/zshop/data";
import { usePrice, useZShop } from "@/lib/zshop/store";
import { ProductCard } from "./product-card";
import { Button } from "@/components/ui/button";
import { StarRating } from "./star-rating";

export function CompareView() {
  const compare = useZShop((s) => s.compare);
  const navigate = useZShop((s) => s.navigate);
  const toggleCompare = useZShop((s) => s.toggleCompare);
  const clearCompare = useZShop((s) => s.clearCompare);
  const addToCart = useZShop((s) => s.addToCart);
  const price = usePrice();

  const items = compare.map((id) => PRODUCT_MAP[id]).filter(Boolean);

  const specRows: { label: string; render: (id: string) => React.ReactNode }[] = [
    { label: "Price", render: (id) => <span className="text-base font-black">{price(PRODUCT_MAP[id].price)}</span> },
    {
      label: "Discount",
      render: (id) => {
        const d = discountPercent(PRODUCT_MAP[id]);
        return d ? (
          <span className="font-semibold text-brand-600 dark:text-brand-400">-{d}%</span>
        ) : (
          <span className="text-muted-foreground">—</span>
        );
      },
    },
    {
      label: "Rating",
      render: (id) => (
        <span className="flex items-center gap-1.5">
          <StarRating rating={PRODUCT_MAP[id].rating} size={12} />
          <span className="text-xs text-muted-foreground">({PRODUCT_MAP[id].ratingCount.toLocaleString()})</span>
        </span>
      ),
    },
    { label: "Brand", render: (id) => <span className="font-semibold">{PRODUCT_MAP[id].brand}</span> },
    {
      label: "Category",
      render: (id) => CATEGORY_MAP[PRODUCT_MAP[id].category]?.name ?? "—",
    },
    { label: "Availability", render: () => <span className="font-semibold text-emerald-600 dark:text-emerald-400">In stock</span> },
    {
      label: "Best for",
      render: (id) => <span className="text-xs text-muted-foreground">{PRODUCT_MAP[id].tags?.slice(0, 3).map((t) => `#${t}`).join(" ") || "—"}</span>,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-3 py-4 sm:px-6" data-testid="compare-view">
      <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1.5 text-sm text-muted-foreground">
        <button
          className="flex items-center gap-1 hover:text-brand-600 dark:hover:text-brand-400"
          onClick={() => navigate({ name: "home" })}
        >
          <Home className="h-3.5 w-3.5" /> Home
        </button>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground">Compare Products</span>
      </nav>

      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-black sm:text-3xl">
            <Scale className="h-6 w-6 text-brand-500" />
            Compare Products
          </h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {items.length} of 3 selected — side-by-side specs
          </p>
        </div>
        {items.length > 0 && (
          <Button variant="outline" onClick={clearCompare}>
            <X className="mr-1 h-4 w-4" /> Clear all
          </Button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed py-16 text-center">
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-100 dark:bg-brand-400/10">
            <Scale className="h-9 w-9 text-brand-500" />
          </span>
          <h3 className="text-lg font-bold">Nothing to compare yet</h3>
          <p className="max-w-sm text-sm text-muted-foreground">
            Add up to 3 products using the scale icon on any product card.
          </p>
          <Button
            className="bg-brand-400 font-bold text-neutral-950 hover:bg-brand-500"
            onClick={() => navigate({ name: "shop", category: "all" })}
          >
            Browse products
          </Button>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-2xl border bg-card">
            <table className="w-full min-w-[640px] border-collapse">
              <thead>
                <tr>
                  <th className="w-28 border-b p-3 text-left text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    Product
                  </th>
                  {items.map((p) => (
                    <th key={p.id} className="border-b p-3 text-left align-top">
                      <div className="relative">
                        <button
                          aria-label={`Remove ${p.title} from comparison`}
                          className="absolute -right-1 -top-1 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 text-white shadow"
                          onClick={() => toggleCompare(p.id)}
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                        <div className="relative mx-auto aspect-square w-28 overflow-hidden rounded-xl bg-muted">
                          <Image src={p.image} alt={p.title} fill sizes="112px" className="object-cover" />
                        </div>
                        <p className="mt-2 line-clamp-2 min-h-9 text-sm font-semibold leading-snug">
                          {p.title}
                        </p>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {specRows.map((row, i) => (
                  <tr key={row.label} className={i % 2 === 0 ? "bg-muted/30" : ""}>
                    <td className="p-3 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                      {row.label}
                    </td>
                    {items.map((p) => (
                      <td key={p.id} className="p-3 text-sm">
                        {row.render(p.id)}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <td className="p-3" />
                  {items.map((p) => (
                    <td key={p.id} className="p-3">
                      <Button
                        size="sm"
                        className="w-full bg-brand-400 font-bold text-neutral-950 hover:bg-brand-500"
                        onClick={() => addToCart(p.id)}
                      >
                        <ShoppingCart className="mr-1 h-3.5 w-3.5" /> Add to cart
                      </Button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* recommendations */}
          <section className="mt-10">
            <h2 className="mb-4 text-xl font-black">You might also like</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
              {[...new Set(items.map((p) => p.category))]
                .flatMap((cat) =>
                  Object.values(PRODUCT_MAP).filter((p) => p.category === cat && !compare.includes(p.id))
                )
                .slice(0, 4)
                .map((p) => (
                  <ProductCard key={p.id} id={p.id} />
                ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
