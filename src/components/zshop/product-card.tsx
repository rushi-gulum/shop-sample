"use client";

import { Heart, Scale, Eye, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { PRODUCT_MAP, discountPercent, CATEGORY_MAP } from "@/lib/zshop/data";
import { usePrice, useZShop } from "@/lib/zshop/store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StarRating } from "./star-rating";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  id: string;
  className?: string;
  hideBadges?: boolean;
}

export function ProductCard({ id, className, hideBadges }: ProductCardProps) {
  const p = PRODUCT_MAP[id];
  const price = usePrice();
  const openProduct = useZShop((s) => s.openProduct);
  const addToCart = useZShop((s) => s.addToCart);
  const toggleWishlist = useZShop((s) => s.toggleWishlist);
  const toggleCompare = useZShop((s) => s.toggleCompare);
  const inWishlist = useZShop((s) => s.wishlist.includes(id));
  const inCompare = useZShop((s) => s.compare.includes(id));
  const setQuickView = useZShop((s) => s.setQuickView);

  if (!p) return null;
  const discount = discountPercent(p);
  const category = CATEGORY_MAP[p.category];

  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl border bg-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg",
        className
      )}
      data-testid={`product-card-${p.id}`}
    >
      {/* image area */}
      <div
        className="relative aspect-square cursor-pointer overflow-hidden bg-muted/30"
        onClick={() => openProduct(p.id)}
        role="link"
        aria-label={`View ${p.title}`}
      >
        <Image
          src={p.image}
          alt={p.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* badges */}
        {!hideBadges && (
          <div className="absolute left-2 top-2 flex flex-col items-start gap-1">
            {p.featured && (
              <Badge className="border-0 bg-amber-400 text-black shadow-sm hover:bg-amber-400">
                Featured
              </Badge>
            )}
            {p.newArrival && !p.featured && (
              <Badge className="border-0 bg-emerald-500 text-white shadow-sm hover:bg-emerald-500">
                New
              </Badge>
            )}
            {discount !== null && (
              <Badge className="border-0 bg-rose-600 text-white shadow-sm hover:bg-rose-600">
                -{discount}%
              </Badge>
            )}
          </div>
        )}

        {/* hover actions */}
        <div className="absolute right-2 top-2 flex flex-col gap-1.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100 focus-within:opacity-100">
          <Button
            size="icon"
            variant="secondary"
            aria-label={inWishlist ? "Remove from wishlist" : "Toggle wishlist"}
            className={cn(
              "h-8 w-8 rounded-full shadow-sm",
              inWishlist && "bg-rose-600 text-white hover:bg-rose-600 hover:text-white"
            )}
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(p.id);
            }}
          >
            <Heart className={cn("h-4 w-4", inWishlist && "fill-current")} />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            aria-label="Quick view"
            className="h-8 w-8 rounded-full shadow-sm"
            onClick={(e) => {
              e.stopPropagation();
              setQuickView(p.id);
            }}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            aria-label={inCompare ? "Remove from compare" : "Add to compare"}
            className={cn(
              "h-8 w-8 rounded-full shadow-sm",
              inCompare && "bg-amber-400 text-black hover:bg-amber-400"
            )}
            onClick={(e) => {
              e.stopPropagation();
              toggleCompare(p.id);
            }}
          >
            <Scale className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* body */}
      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-bold tracking-widest text-amber-600 dark:text-amber-400">
            {p.brand.toUpperCase()}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <StarRating rating={p.rating} size={11} />
            <span>({p.ratingCount.toLocaleString()})</span>
          </span>
        </div>

        <h3
          className="line-clamp-2 cursor-pointer text-sm font-semibold leading-snug hover:text-amber-600 dark:hover:text-amber-400"
          onClick={() => openProduct(p.id)}
        >
          {p.title}
        </h3>

        <p className="line-clamp-2 text-xs text-muted-foreground">{p.description}</p>

        <div className="mt-auto flex items-center justify-between pt-1.5">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-bold">{price(p.price)}</span>
            {p.compareAt && (
              <span className="text-xs text-muted-foreground line-through">
                {price(p.compareAt)}
              </span>
            )}
          </div>
          <span className="sr-only">Category {category?.name}</span>
        </div>

        <Button
          className="mt-1 w-full gap-2 bg-amber-400 font-semibold text-black hover:bg-amber-500"
          size="sm"
          onClick={() => addToCart(p.id)}
        >
          <ShoppingCart className="h-4 w-4" />
          Add to cart
        </Button>
      </div>
    </div>
  );
}
