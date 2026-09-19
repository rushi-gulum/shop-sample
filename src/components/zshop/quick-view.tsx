"use client";

import Image from "next/image";
import { Heart, Scale, ShoppingCart, X } from "lucide-react";
import { CATEGORY_MAP, PRODUCT_MAP, discountPercent } from "@/lib/zshop/data";
import { usePrice, useZShop } from "@/lib/zshop/store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { StarRating } from "./star-rating";
import { cn } from "@/lib/utils";

export function QuickViewModal() {
  const quickViewId = useZShop((s) => s.quickViewId);
  const setQuickView = useZShop((s) => s.setQuickView);
  const openProduct = useZShop((s) => s.openProduct);
  const addToCart = useZShop((s) => s.addToCart);
  const toggleWishlist = useZShop((s) => s.toggleWishlist);
  const toggleCompare = useZShop((s) => s.toggleCompare);
  const inWishlist = useZShop((s) => (quickViewId ? s.wishlist.includes(quickViewId) : false));
  const inCompare = useZShop((s) => (quickViewId ? s.compare.includes(quickViewId) : false));
  const price = usePrice();

  const p = quickViewId ? PRODUCT_MAP[quickViewId] : null;

  return (
    <Dialog open={!!p} onOpenChange={(o) => !o && setQuickView(null)}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden">
        {p && (
          <div className="grid sm:grid-cols-2">
            <div className="relative aspect-square bg-muted/30 sm:aspect-auto sm:min-h-[380px]">
              <Image
                src={p.image}
                alt={p.title}
                fill
                sizes="(max-width: 640px) 100vw, 400px"
                className="object-cover"
              />
              {discountPercent(p) && (
                <Badge className="absolute left-3 top-3 border-0 bg-rose-600 text-white">
                  -{discountPercent(p)}%
                </Badge>
              )}
            </div>
            <div className="flex flex-col gap-2 p-5">
              <DialogHeader>
                <p className="text-[11px] font-bold tracking-widest text-amber-600 dark:text-amber-400">
                  {p.brand.toUpperCase()}
                </p>
                <DialogTitle className="text-left text-xl leading-snug">{p.title}</DialogTitle>
              </DialogHeader>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <StarRating rating={p.rating} />
                <span>
                  {p.rating} · {p.ratingCount.toLocaleString()} ratings
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black">{price(p.price)}</span>
                {p.compareAt && (
                  <span className="text-sm text-muted-foreground line-through">
                    {price(p.compareAt)}
                  </span>
                )}
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{p.description}</p>
              <Separator className="my-1" />
              <div className="text-xs text-muted-foreground">
                Category: {CATEGORY_MAP[p.category]?.name} ·{" "}
                {p.compareAt ? (
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    You save {price(p.compareAt - p.price)}
                  </span>
                ) : (
                  "In stock"
                )}
              </div>
              <div className="mt-auto flex flex-col gap-2 pt-2">
                <div className="flex gap-2">
                  <Button
                    className="flex-1 bg-amber-400 font-bold text-neutral-950 hover:bg-amber-500"
                    onClick={() => addToCart(p.id)}
                  >
                    <ShoppingCart className="mr-1 h-4 w-4" /> Add to cart
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label="Toggle wishlist"
                    className={cn(inWishlist && "border-rose-300 text-rose-600")}
                    onClick={() => toggleWishlist(p.id)}
                  >
                    <Heart className={cn("h-4 w-4", inWishlist && "fill-current")} />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label="Add to compare"
                    className={cn(inCompare && "border-amber-400 bg-amber-100 dark:bg-amber-400/20")}
                    onClick={() => toggleCompare(p.id)}
                  >
                    <Scale className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  className="font-semibold text-amber-600 hover:text-amber-600 dark:text-amber-400"
                  onClick={() => openProduct(p.id)}
                >
                  View full details
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function QuickViewCloseHint() {
  return <X className="hidden" />;
}
