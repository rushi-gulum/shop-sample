"use client";

import { useState } from "react";
import Image from "next/image";
import {
  BadgePercent,
  CheckCircle2,
  Gift,
  Minus,
  PartyPopper,
  Plus,
  ShoppingBag,
  Tag,
  Trash2,
  Truck,
  X,
} from "lucide-react";
import { FREE_SHIPPING_THRESHOLD, PRODUCT_MAP } from "@/lib/zshop/data";
import { usePrice, useZShop } from "@/lib/zshop/store";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export function CartDrawer() {
  const open = useZShop((s) => s.cartOpen);
  const setOpen = useZShop((s) => s.setCartOpen);
  const cart = useZShop((s) => s.cart);
  const setQty = useZShop((s) => s.setQty);
  const removeFromCart = useZShop((s) => s.removeFromCart);
  const clearCart = useZShop((s) => s.clearCart);
  const navigate = useZShop((s) => s.navigate);
  const user = useZShop((s) => s.user);
  const requestSignIn = useZShop((s) => s.requestSignIn);
  const applyPromo = useZShop((s) => s.applyPromo);
  const removePromo = useZShop((s) => s.removePromo);
  const totals = useZShop((s) => s.totals);
  const price = usePrice();

  const [promoInput, setPromoInput] = useState("");
  const [giftInput, setGiftInput] = useState("");
  const t = totals();

  function checkout() {
    if (cart.length === 0) return;
    setOpen(false);
    if (!user) {
      requestSignIn("checkout");
      return;
    }
    navigate({ name: "checkout" });
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="flex w-full flex-col p-0 sm:max-w-md">
        <SheetHeader className="flex-row items-center justify-between border-b bg-neutral-950 px-4 py-3 text-white">
          <SheetTitle className="flex items-center gap-2 text-white">
            <ShoppingBag className="h-5 w-5" />
            Your Cart
            <span className="text-sm font-semibold text-neutral-300">
              {t.itemCount} item{t.itemCount === 1 ? "" : "s"}
            </span>
          </SheetTitle>
        </SheetHeader>

        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-100 dark:bg-brand-400/10">
              <ShoppingBag className="h-9 w-9 text-brand-500" />
            </span>
            <h3 className="text-lg font-bold">Your cart is empty</h3>
            <p className="text-sm text-muted-foreground">
              Browse our catalog and add your favorite items.
            </p>
            <Button
              className="mt-2 gap-2 bg-brand-500 font-bold text-primary-foreground hover:bg-brand-600"
              onClick={() => navigate({ name: "shop", category: "all" })}
            >
              Start shopping <X className="hidden" />
            </Button>
          </div>
        ) : (
          <>
            {/* free shipping progress */}
            <div className="border-b bg-muted/40 px-4 py-3">
              {t.freeShippingRemaining > 0 ? (
                <p className="text-xs font-medium">
                  <Truck className="mr-1 inline h-3.5 w-3.5 text-brand-500" />
                  Add{" "}
                  <span className="font-bold text-brand-600 dark:text-brand-400">
                    {price(t.freeShippingRemaining)}
                  </span>{" "}
                  more for FREE shipping
                </p>
              ) : (
                <p className="flex items-center gap-1.5 text-xs font-semibold text-success-600 dark:text-success-400">
                  <PartyPopper className="h-3.5 w-3.5" aria-hidden />
                  You unlocked FREE shipping!
                </p>
              )}
              <Progress
                value={Math.min(100, (t.subtotal / FREE_SHIPPING_THRESHOLD) * 100)}
                className="mt-2 h-1.5"
              />
            </div>

            {/* items */}
            <div className="max-h-[38vh] flex-1 space-y-3 overflow-y-auto px-4 py-3">
              {cart.map((item) => {
                const p = PRODUCT_MAP[item.id];
                if (!p) return null;
                return (
                  <div
                    key={item.id}
                    className="flex gap-3 rounded-xl border bg-card p-2.5"
                    data-testid={`cart-item-${p.id}`}
                  >
                    <button
                      className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-muted"
                      onClick={() => {
                        setOpen(false);
                        useZShop.getState().openProduct(p.id);
                      }}
                      aria-label={`View ${p.title}`}
                    >
                      <Image src={p.image} alt={p.title} fill sizes="64px" className="object-cover" />
                    </button>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-bold tracking-widest text-brand-600 dark:text-brand-400">
                        {p.brand.toUpperCase()}
                      </p>
                      <p className="truncate text-sm font-semibold">{p.title}</p>
                      <div className="mt-1 flex items-center justify-between">
                        <div className="flex items-center rounded-lg border">
                          <button
                            aria-label="Decrease quantity"
                            className="flex h-7 w-7 items-center justify-center rounded-l-lg hover:bg-muted"
                            onClick={() => setQty(item.id, item.qty - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-7 text-center text-xs font-bold">{item.qty}</span>
                          <button
                            aria-label="Increase quantity"
                            className="flex h-7 w-7 items-center justify-center rounded-r-lg hover:bg-muted"
                            onClick={() => setQty(item.id, item.qty + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="text-sm font-bold">{price(p.price * item.qty)}</span>
                      </div>
                    </div>
                    <button
                      aria-label={`Remove ${p.title} from cart`}
                      className="h-fit rounded-md p-1 text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                );
              })}
              <button
                className="w-full rounded-lg border border-dashed py-2 text-xs font-semibold text-muted-foreground transition hover:border-destructive/40 hover:text-destructive"
                onClick={clearCart}
              >
                Clear cart
              </button>
            </div>

            {/* promo + gift card */}
            <div className="space-y-2 border-t px-4 py-3">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Promo code (try WELCOME15)"
                    className="h-9 pl-8 text-xs"
                    data-testid="promo-input"
                  />
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-9"
                  disabled={!promoInput.trim()}
                  onClick={() => {
                    if (applyPromo(promoInput)) setPromoInput("");
                  }}
                >
                  Apply
                </Button>
              </div>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Gift className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-electric-500" />
                  <Input
                    value={giftInput}
                    onChange={(e) => setGiftInput(e.target.value)}
                    placeholder="Gift card code (try ZGIFT50)"
                    className="h-9 pl-8 text-xs"
                  />
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-9"
                  disabled={!giftInput.trim()}
                  onClick={() =>
                    toast.info("Gift cards are illustrative in this demo", {
                      description: "Try promo codes instead.",
                    })
                  }
                >
                  Apply
                </Button>
              </div>
              {t.promoApplied && (
                <div className="flex items-center justify-between rounded-lg bg-success-50 px-3 py-1.5 text-xs text-success-700 dark:bg-success-950/50 dark:text-success-300">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    {t.promoApplied} applied — {t.promoLabel}
                  </span>
                  <button className="font-semibold underline" onClick={removePromo}>
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* savings banners */}
            {t.bundleBrand && (
              <div className="mx-4 mb-2 rounded-lg border border-brand-200 bg-brand-50 px-3 py-2 text-xs dark:border-brand-500/30 dark:bg-brand-400/10">
                <p className="flex items-center gap-1.5 font-bold text-brand-700 dark:text-brand-400">
                  <Gift className="h-3.5 w-3.5" aria-hidden />
                  {t.bundleBrand} bundle — save 10%
                </p>
                <p className="mt-0.5 text-muted-foreground">
                  {t.bundleCount} {t.bundleBrand} items qualify. You save {price(t.bundleSavings)}.
                </p>
              </div>
            )}

            {/* totals */}
            <div className="space-y-1.5 border-t px-4 py-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">{price(t.subtotal)}</span>
              </div>
              {t.listTotal > t.subtotal && (
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Deal savings</span>
                  <span className="font-semibold text-success-600 dark:text-success-400">
                    −{price(t.listTotal - t.subtotal)}
                  </span>
                </div>
              )}
              {t.promoDiscount > 0 && (
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Promo {t.promoApplied}</span>
                  <span className="font-semibold text-success-600 dark:text-success-400">
                    −{price(t.promoDiscount)}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-semibold">
                  {t.shipping === 0 ? (
                    <span className="text-success-600 dark:text-success-400">FREE</span>
                  ) : (
                    price(t.shipping)
                  )}
                </span>
              </div>
              <Separator className="my-1" />
              <div className="flex justify-between text-base">
                <span className="font-bold">Total</span>
                <span className="font-black">{price(t.total)}</span>
              </div>
              <Button
                className="mt-2 w-full bg-brand-500 py-2.5 font-bold text-primary-foreground hover:bg-brand-600"
                onClick={checkout}
                data-testid="checkout-button"
              >
                <BadgePercent className="mr-1 h-4 w-4" />
                Proceed to checkout
              </Button>
              <p className="text-center text-[11px] text-muted-foreground">
                Secure 256-bit SSL encrypted checkout
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
