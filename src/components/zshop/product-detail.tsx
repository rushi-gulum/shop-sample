"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  BadgeCheck,
  Check,
  ChevronRight,
  Heart,
  Home,
  Minus,
  Plus,
  Scale,
  ShoppingCart,
  TrendingUp,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import {
  CATEGORY_MAP,
  PRODUCT_MAP,
  bundleFor,
  discountPercent,
  relatedProducts,
} from "@/lib/zshop/data";
import { usePrice, useZShop } from "@/lib/zshop/store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { StarRating } from "./star-rating";
import { ProductCard } from "./product-card";
import { cn } from "@/lib/utils";

export function ProductDetail({ id }: { id: string }) {
  const p = PRODUCT_MAP[id];
  const price = usePrice();
  const addToCart = useZShop((s) => s.addToCart);
  const toggleWishlist = useZShop((s) => s.toggleWishlist);
  const toggleCompare = useZShop((s) => s.toggleCompare);
  const inWishlist = useZShop((s) => s.wishlist.includes(id));
  const inCompare = useZShop((s) => s.compare.includes(id));
  const navigate = useZShop((s) => s.navigate);
  const requestSignIn = useZShop((s) => s.requestSignIn);
  const user = useZShop((s) => s.user);

  const [qty, setQtyLocal] = useState(1);
  const [imgIdx, setImgIdx] = useState(0);
  const [bundleSel, setBundleSel] = useState<string[]>([]);

  const gallery = useMemo(
    () => (p?.gallery && p.gallery.length > 1 ? p.gallery : p ? [p.image] : []),
    [p]
  );
  const related = useMemo(() => (p ? relatedProducts(p, 4) : []), [p]);
  const bundle = useMemo(() => (p ? bundleFor(p) : []), [p]);

  if (!p) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <p className="text-lg font-semibold">Product not found.</p>
        <Button className="mt-4" onClick={() => navigate({ name: "home" })}>
          Back to home
        </Button>
      </div>
    );
  }

  const category = CATEGORY_MAP[p.category];
  const discount = discountPercent(p);
  const savings = p.compareAt ? p.compareAt - p.price : 0;

  const bundleItems = [p, ...bundle];
  const selectedIds = [p.id, ...bundleSel];
  const bundleTotal = bundleItems
    .filter((b) => selectedIds.includes(b.id))
    .reduce((sum, b) => sum + b.price, 0);
  const bundleListTotal = bundleItems
    .filter((b) => selectedIds.includes(b.id))
    .reduce((sum, b) => sum + (b.compareAt ?? b.price), 0);

  function addSelectedBundle() {
    for (const pid of selectedIds) {
      addToCart(pid, 1, true);
    }
    toast.success(`Added ${selectedIds.length} items to cart`);
  }

  function buyNow() {
    addToCart(p!.id, qty, true);
    if (!user) {
      requestSignIn("checkout");
      return;
    }
    navigate({ name: "checkout" });
  }

  return (
    <div className="mx-auto max-w-7xl px-3 py-4 sm:px-6">
      {/* breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1.5 text-sm text-muted-foreground">
        <button
          className="flex items-center gap-1 hover:text-amber-600 dark:hover:text-amber-400"
          onClick={() => navigate({ name: "home" })}
        >
          <Home className="h-3.5 w-3.5" /> Home
        </button>
        <ChevronRight className="h-3.5 w-3.5" />
        <button
          className="hover:text-amber-600 dark:hover:text-amber-400"
          onClick={() => navigate({ name: "shop", category: p.category })}
        >
          {category?.name}
        </button>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="truncate text-foreground">{p.title}</span>
      </nav>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,420px)_1fr_300px]">
        {/* gallery */}
        <div>
          <div className="relative aspect-square overflow-hidden rounded-2xl border bg-card">
            <Image
              src={gallery[imgIdx] ?? p.image}
              alt={p.title}
              fill
              sizes="(max-width: 1024px) 100vw, 420px"
              priority
              className="object-cover"
            />
            <div className="absolute left-3 top-3 flex flex-col gap-1.5">
              {p.featured && (
                <Badge className="border-0 bg-amber-400 text-black">Featured</Badge>
              )}
              {p.newArrival && !p.featured && (
                <Badge className="border-0 bg-emerald-500 text-white">New</Badge>
              )}
              {discount !== null && (
                <Badge className="border-0 bg-rose-600 text-white">-{discount}%</Badge>
              )}
            </div>
            <button
              aria-label="Toggle wishlist"
              className={cn(
                "absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-105 dark:bg-neutral-800",
                inWishlist && "text-rose-600"
              )}
              onClick={() => toggleWishlist(p.id)}
            >
              <Heart className={cn("h-4.5 w-4.5", inWishlist && "fill-current")} />
            </button>
          </div>
          {gallery.length > 1 && (
            <div className="mt-3 flex gap-2">
              {gallery.map((g, i) => (
                <button
                  key={g + i}
                  aria-label={`View image ${i + 1}`}
                  className={cn(
                    "relative h-16 w-16 overflow-hidden rounded-lg border-2 transition",
                    i === imgIdx ? "border-amber-400" : "border-transparent opacity-70 hover:opacity-100"
                  )}
                  onClick={() => setImgIdx(i)}
                >
                  <Image src={g} alt="" fill sizes="64px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* info */}
        <div className="min-w-0">
          <p className="text-xs font-bold tracking-widest text-amber-600 dark:text-amber-400">
            {p.brand.toUpperCase()}
          </p>
          <h1 className="mt-1 text-2xl font-black leading-tight sm:text-3xl">{p.title}</h1>

          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
            <StarRating rating={p.rating} size={16} />
            <span className="font-semibold">{p.rating}</span>
            <button className="text-amber-600 underline-offset-2 hover:underline dark:text-amber-400">
              {p.ratingCount.toLocaleString()} ratings
            </button>
            {p.tags?.slice(0, 3).map((t) => (
              <span key={t} className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                #{t}
              </span>
            ))}
          </div>

          <div className="mt-4 border-y py-4">
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="text-3xl font-black">{price(p.price)}</span>
              {p.compareAt && (
                <>
                  <span className="text-lg text-muted-foreground line-through">
                    {price(p.compareAt)}
                  </span>
                  <Badge variant="destructive" className="bg-rose-600">
                    -{discount}%
                  </Badge>
                  <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                    You save {price(savings)}
                  </span>
                </>
              )}
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground">Inclusive of all taxes</p>
          </div>

          <p className="mt-4 leading-relaxed text-muted-foreground">{p.description}</p>

          <p className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
            <BadgeCheck className="h-4 w-4" aria-hidden />
            In stock — ships within 24 hours
          </p>

          {/* qty + subtotal + actions */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-lg border">
              <button
                aria-label="Decrease quantity"
                className="flex h-11 w-11 items-center justify-center rounded-l-lg hover:bg-muted"
                onClick={() => setQtyLocal((q) => Math.max(1, q - 1))}
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center font-bold" data-testid="detail-qty">
                {qty}
              </span>
              <button
                aria-label="Increase quantity"
                className="flex h-11 w-11 items-center justify-center rounded-r-lg hover:bg-muted"
                onClick={() => setQtyLocal((q) => Math.min(99, q + 1))}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground">
              Subtotal:{" "}
              <span className="font-bold text-foreground">{price(p.price * qty)}</span>
            </p>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Button
              size="lg"
              className="h-12 bg-amber-400 text-base font-bold text-neutral-950 hover:bg-amber-500"
              onClick={() => addToCart(p.id, qty)}
              data-testid="detail-add-to-cart"
            >
              <ShoppingCart className="mr-2 h-5 w-5" /> Add to cart
            </Button>
            <Button
              size="lg"
              className="h-12 bg-orange-600 text-base font-bold text-white hover:bg-orange-700"
              onClick={buyNow}
            >
              <Zap className="mr-2 h-5 w-5" /> Buy now
            </Button>
          </div>

          <button
            className={cn(
              "mt-3 flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition hover:text-amber-600 dark:hover:text-amber-400",
              inCompare && "text-amber-600 dark:text-amber-400"
            )}
            onClick={() => toggleCompare(p.id)}
          >
            <Scale className="h-4 w-4" />
            {inCompare ? "In comparison — remove" : "Add to compare"}
          </button>
        </div>

        {/* sidebar: specs + help */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="mb-3 text-base font-bold">Specifications</h3>
              <dl className="space-y-2.5 text-sm">
                {(p.specs ?? []).map((s) => (
                  <div key={s.label} className="flex items-start justify-between gap-3">
                    <dt className="text-muted-foreground">{s.label}</dt>
                    <dd className="text-right font-semibold">{s.value}</dd>
                  </div>
                ))}
                <div className="flex items-start justify-between gap-3">
                  <dt className="text-muted-foreground">Brand</dt>
                  <dd className="text-right font-semibold">{p.brand}</dd>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <dt className="text-muted-foreground">Category</dt>
                  <dd className="text-right font-semibold">{category?.name}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card className="border-violet-200 bg-violet-50 dark:border-violet-500/30 dark:bg-violet-950/40">
            <CardContent className="p-4">
              <h3 className="text-sm font-bold text-violet-700 dark:text-violet-300">
                Need help deciding?
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-violet-600/90 dark:text-violet-300/80">
                Our 24/7 shopping concierge can help you choose.
              </p>
              <Button
                variant="outline"
                className="mt-3 w-full border-violet-300 text-violet-700 hover:bg-violet-100 dark:text-violet-300"
                onClick={() => useZShop.getState().setChatOpen(true)}
              >
                Chat with expert
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* frequently bought together */}
      <Card className="mt-8">
        <CardContent className="p-4 sm:p-6">
          <h2 className="text-lg font-black">Frequently bought together</h2>
          <p className="text-sm text-muted-foreground">Bundle and save more on this combo.</p>
          <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-center">
            <div className="flex flex-1 flex-wrap items-center gap-3">
              {bundleItems.map((b, i) => (
                <div key={b.id} className="flex items-center gap-3">
                  {i > 0 && <Plus className="h-4 w-4 shrink-0 text-muted-foreground" />}
                  <label
                    className={cn(
                      "flex w-40 cursor-pointer flex-col gap-1.5 rounded-xl border p-2 transition",
                      selectedIds.includes(b.id)
                        ? "border-amber-400 bg-amber-50/50 dark:bg-amber-400/5"
                        : "opacity-70 hover:opacity-100"
                    )}
                  >
                    <span className="relative aspect-square overflow-hidden rounded-lg bg-muted">
                      <Image src={b.image} alt={b.title} fill sizes="160px" className="object-cover" />
                      {selectedIds.includes(b.id) && (
                        <span className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white">
                          <Check className="h-3 w-3" aria-hidden />
                        </span>
                      )}
                    </span>
                    <span className="text-[10px] font-bold tracking-widest text-amber-600 dark:text-amber-400">
                      {b.brand.toUpperCase()}
                    </span>
                    <span className="line-clamp-2 text-xs font-semibold leading-tight">
                      {b.title}
                    </span>
                    <span className="text-sm font-bold">{price(b.price)}</span>
                    {b.id !== p.id && (
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={bundleSel.includes(b.id)}
                        onChange={(e) =>
                          setBundleSel((sel) =>
                            e.target.checked ? [...sel, b.id] : sel.filter((x) => x !== b.id)
                          )
                        }
                      />
                    )}
                  </label>
                </div>
              ))}
            </div>

            <div className="w-full rounded-xl bg-muted/50 p-4 lg:w-64">
              <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                Bundle total
              </p>
              <p className="mt-1 text-2xl font-black">{price(bundleTotal)}</p>
              {bundleListTotal > bundleTotal && (
                <p className="text-sm text-muted-foreground">
                  <span className="line-through">{price(bundleListTotal)}</span>{" "}
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    Save {price(bundleListTotal - bundleTotal)}
                  </span>
                </p>
              )}
              <p className="mt-0.5 text-xs text-muted-foreground">
                {selectedIds.length} item{selectedIds.length === 1 ? "" : "s"} selected
              </p>
              <Button
                className="mt-3 w-full bg-amber-400 font-bold text-neutral-950 hover:bg-amber-500"
                onClick={addSelectedBundle}
              >
                <ShoppingCart className="mr-1.5 h-4 w-4" />
                {selectedIds.length > 1 ? "Add all to cart" : "Add to cart"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* popular in category */}
      <section className="mt-10" aria-labelledby="popular-in-category">
        <div className="mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-amber-500" />
          <h2 id="popular-in-category" className="text-xl font-black">
            Popular in this category
          </h2>
        </div>
        <p className="-mt-3 mb-4 text-sm text-muted-foreground">Top-rated picks shoppers love</p>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {related.map((r) => (
            <ProductCard key={r.id} id={r.id} />
          ))}
        </div>
      </section>
    </div>
  );
}
