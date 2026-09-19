"use client";

import { useState, useRef, useEffect } from "react";
import {
  ChevronDown,
  Heart,
  MapPin,
  Moon,
  Scale,
  Search,
  ShoppingCart,
  Sun,
  Monitor,
  User2,
  Package,
  LogOut,
} from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { CURRENCIES, PRODUCT_MAP, searchProducts } from "@/lib/zshop/data";
import { usePrice, useZShop } from "@/lib/zshop/store";
import type { CurrencyCode } from "@/lib/zshop/types";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export function Header() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();
  const price = usePrice();

  const cartCount = useZShop((s) => s.cart.reduce((n, c) => n + c.qty, 0));
  const wishlistCount = useZShop((s) => s.wishlist.length);
  const compareCount = useZShop((s) => s.compare.length);
  const currency = useZShop((s) => s.currency);
  const setCurrency = useZShop((s) => s.setCurrency);
  const user = useZShop((s) => s.user);
  const navigate = useZShop((s) => s.navigate);
  const openProduct = useZShop((s) => s.openProduct);
  const setCartOpen = useZShop((s) => s.setCartOpen);
  const requestSignIn = useZShop((s) => s.requestSignIn);
  const signOut = useZShop((s) => s.signOut);

  const suggestions = query.trim().length >= 1 ? searchProducts(query).slice(0, 6) : [];

  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  function submitSearch() {
    if (!query.trim()) return;
    setFocused(false);
    navigate({ name: "shop", query: query.trim() });
  }

  function goWishlist() {
    if (!user) {
      requestSignIn("wishlist");
      return;
    }
    navigate({ name: "wishlist" });
  }

  return (
    <header className="bg-brand-500 dark:bg-brand-500">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-3 py-2.5 sm:gap-3 sm:px-6">
        {/* logo */}
        <button
          aria-label="Z Shop home"
          className="flex items-center gap-2.5 rounded-md px-1 py-1 hover:opacity-90"
          onClick={() => navigate({ name: "home" })}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-950 text-lg font-black text-brand-400 shadow-md">
            Z
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="text-lg font-black text-neutral-950">Z Shop</span>
            <span className="text-[11px] font-medium text-neutral-800/80">
              Shop smarter, live better
            </span>
          </span>
        </button>

        {/* deliver to */}
        <div className="hidden items-center gap-1.5 rounded-md px-2 py-1 text-neutral-950 lg:flex">
          <MapPin className="h-5 w-5" />
          <span className="flex flex-col leading-tight">
            <span className="text-[11px] text-neutral-800/70">Deliver to</span>
            <span className="text-sm font-bold">United States</span>
          </span>
        </div>

        {/* currency */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              aria-label="Switch currency"
              className="hidden h-9 gap-1 rounded-md px-2 text-neutral-950 hover:bg-brand-300 md:flex"
            >
              <span className="text-base font-bold">$</span>
              <span className="text-sm font-bold">{currency}</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-60">
            <DropdownMenuLabel>Display currency</DropdownMenuLabel>
            <DropdownMenuRadioGroup
              value={currency}
              onValueChange={(v) => setCurrency(v as CurrencyCode)}
            >
              {Object.values(CURRENCIES).map((c) => (
                <DropdownMenuRadioItem key={c.code} value={c.code}>
                  <span className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-brand-100 text-xs font-bold text-neutral-900">
                      {c.symbol}
                    </span>
                    <span className="flex flex-col">
                      <span className="text-sm font-semibold">{c.code}</span>
                      <span className="text-[11px] text-muted-foreground">{c.label}</span>
                    </span>
                  </span>
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
            <p className="px-2 pb-2 pt-1 text-[11px] leading-snug text-muted-foreground">
              Rates are illustrative for demo only. Prices update instantly across the site.
            </p>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* search */}
        <div ref={searchRef} className="relative order-last flex w-full flex-1 sm:order-none sm:w-auto sm:min-w-[220px]">
          <form
            className="flex w-full overflow-hidden rounded-lg bg-white shadow-sm ring-2 ring-transparent focus-within:ring-brand-600/60"
            onSubmit={(e) => {
              e.preventDefault();
              submitSearch();
            }}
          >
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              aria-label="Search Z Shop"
              placeholder="Search products, brands and categories..."
              className="h-10 w-full bg-transparent px-3.5 text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
            />
            <button
              type="submit"
              aria-label="Search"
              className="flex w-12 items-center justify-center bg-brand-500 text-white transition hover:bg-brand-600"
            >
              <Search className="h-4.5 w-4.5" />
            </button>
          </form>

          {/* live suggestions */}
          {focused && suggestions.length > 0 && (
            <div className="absolute left-0 right-0 top-full z-50 mt-1.5 overflow-hidden rounded-xl border bg-popover shadow-xl">
              {suggestions.map((p) => (
                <button
                  key={p.id}
                  className="flex w-full items-center gap-3 px-3 py-2 text-left transition hover:bg-accent"
                  onClick={() => {
                    setFocused(false);
                    setQuery("");
                    openProduct(p.id);
                  }}
                >
                  <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md bg-muted">
                    <Image src={p.image} alt="" fill sizes="40px" className="object-cover" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">{p.title}</span>
                    <span className="block text-xs text-muted-foreground">
                      {p.brand} · {price(p.price)}
                    </span>
                  </span>
                </button>
              ))}
              <button
                className="w-full border-t bg-muted/40 px-3 py-2 text-center text-xs font-semibold text-brand-600 hover:bg-muted"
                onClick={submitSearch}
              >
                See all results for &ldquo;{query.trim()}&rdquo;
              </button>
            </div>
          )}
        </div>

        {/* account */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              aria-label="Hello, Sign in Account"
              className="h-10 flex-col items-start justify-center gap-0 rounded-md px-2 text-neutral-950 hover:bg-brand-300"
            >
              <span className="flex items-center gap-1 text-[11px] leading-tight text-neutral-800/80">
                Hello, {user ? user.name : "Sign in"}
                <ChevronDown className="h-3 w-3" />
              </span>
              <span className="text-sm font-bold leading-tight">Account</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {user ? (
              <>
                <DropdownMenuLabel>
                  <span className="block text-sm">{user.name}</span>
                  <span className="block text-xs font-normal text-muted-foreground">{user.email}</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate({ name: "account" })}>
                  <User2 className="h-4 w-4" /> Your Account
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuItem onClick={() => requestSignIn("account")}>
                  <User2 className="h-4 w-4" /> Sign in
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => requestSignIn("register")}>
                  <User2 className="h-4 w-4" /> Create account
                </DropdownMenuItem>
              </>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate({ name: "orders" })}>
              <Package className="h-4 w-4" /> Your Orders
            </DropdownMenuItem>
            <DropdownMenuItem onClick={goWishlist}>
              <Heart className="h-4 w-4" /> Your Wishlist
            </DropdownMenuItem>
            {user && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut}>
                  <LogOut className="h-4 w-4" /> Sign out
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* theme */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle theme"
              className="h-10 w-10 rounded-md text-neutral-950 hover:bg-brand-300"
            >
              <Sun className="h-5 w-5 dark:hidden" />
              <Moon className="hidden h-5 w-5 dark:block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuLabel>Appearance</DropdownMenuLabel>
            <DropdownMenuRadioGroup value={theme ?? "light"} onValueChange={setTheme}>
              <DropdownMenuRadioItem value="light">
                <Sun className="mr-1 h-4 w-4" /> Light
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="dark">
                <Moon className="mr-1 h-4 w-4" /> Dark
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="system">
                <Monitor className="mr-1 h-4 w-4" /> System
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* compare */}
        <button
          aria-label={`Compare ${compareCount} products`}
          className="relative hidden h-10 w-10 items-center justify-center rounded-md text-neutral-950 transition hover:bg-brand-300 sm:flex"
          onClick={() => navigate({ name: "compare" })}
        >
          <Scale className="h-5.5 w-5.5" />
          {compareCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-brand-600 px-1 text-[10px] font-bold text-white">
              {compareCount}
            </span>
          )}
        </button>

        {/* wishlist */}
        <button
          aria-label={`Wishlist with ${wishlistCount} items`}
          className="relative flex h-10 w-10 items-center justify-center rounded-md text-neutral-950 transition hover:bg-brand-300"
          onClick={goWishlist}
        >
          <Heart className="h-5.5 w-5.5" />
          {wishlistCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-brand-600 px-1 text-[10px] font-bold text-white">
              {wishlistCount}
            </span>
          )}
        </button>

        {/* cart */}
        <button
          aria-label={`Cart with ${cartCount} items`}
          className={cn(
            "relative flex h-10 items-center gap-1.5 rounded-md px-2 text-neutral-950 transition hover:bg-brand-300"
          )}
          onClick={() => setCartOpen(true)}
        >
          <span className="relative">
            <ShoppingCart className="h-6 w-6" />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-600 px-1 text-[11px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </span>
          <span className="hidden text-sm font-bold md:inline">Cart</span>
        </button>
      </div>
    </header>
  );
}
