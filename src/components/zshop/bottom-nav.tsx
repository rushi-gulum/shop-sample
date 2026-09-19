"use client";

import { House, LayoutGrid, Flame, Heart, ShoppingCart } from "lucide-react";
import { useZShop } from "@/lib/zshop/store";
import { cn } from "@/lib/utils";

const ITEMS = [
  { key: "home", label: "Home", icon: House },
  { key: "shop", label: "Shop", icon: LayoutGrid },
  { key: "deals", label: "Deals", icon: Flame },
  { key: "wishlist", label: "Wishlist", icon: Heart },
] as const;

export function BottomNav() {
  const view = useZShop((s) => s.view);
  const navigate = useZShop((s) => s.navigate);
  const setCartOpen = useZShop((s) => s.setCartOpen);
  const requestSignIn = useZShop((s) => s.requestSignIn);
  const user = useZShop((s) => s.user);
  const cartCount = useZShop((s) => s.cart.reduce((n, c) => n + c.qty, 0));
  const wishlistCount = useZShop((s) => s.wishlist.length);

  function activeKey(): string | null {
    if (view.name === "product" || view.name === "shop") return "shop";
    if (view.name === "home") return "home";
    if (view.name === "deals") return "deals";
    if (view.name === "wishlist") return "wishlist";
    return null;
  }

  const active = activeKey();

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-neutral-950 text-white lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid grid-cols-5">
        {ITEMS.map(({ key, label, icon: Icon }) => {
          const isActive = active === key;
          const badge = key === "wishlist" ? wishlistCount : 0;
          return (
            <button
              key={key}
              aria-current={isActive ? "page" : undefined}
              aria-label={label}
              className={cn(
                "relative flex min-h-14 flex-col items-center justify-center gap-0.5 py-1.5 text-[10px] font-semibold transition-colors",
                isActive ? "text-white" : "text-white/60 hover:text-white/90"
              )}
              onClick={() => {
                if (key === "wishlist" && !user) {
                  requestSignIn("wishlist");
                  return;
                }
                navigate(
                  key === "shop"
                    ? { name: "shop", category: "all" }
                    : ({ name: key } as never)
                );
              }}
            >
              <span
                className={cn(
                  "absolute inset-x-4 top-0 h-0.5 rounded-full bg-white transition-opacity",
                  isActive ? "opacity-100" : "opacity-0"
                )}
                aria-hidden
              />
              <span className="relative">
                <Icon className={cn("h-5 w-5", isActive && "fill-white/15")} />
                {badge > 0 && (
                  <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-1 text-[9px] font-bold text-neutral-950">
                    {badge}
                  </span>
                )}
              </span>
              {label}
            </button>
          );
        })}
        <button
          aria-label={`Cart with ${cartCount} items`}
          className={cn(
            "relative flex min-h-14 flex-col items-center justify-center gap-0.5 py-1.5 text-[10px] font-semibold transition-colors",
            "text-white/60 hover:text-white/90"
          )}
          onClick={() => setCartOpen(true)}
        >
          <span className="relative">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-1 text-[9px] font-bold text-neutral-950">
                {cartCount}
              </span>
            )}
          </span>
          Cart
        </button>
      </div>
    </nav>
  );
}
