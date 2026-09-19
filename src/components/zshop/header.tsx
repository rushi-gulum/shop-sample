"use client";

import { useState, useRef, useEffect } from "react";
import {
  ChevronDown,
  Clock,
  Heart,
  MapPin,
  Moon,
  Scale,
  Search,
  ShoppingCart,
  Sun,
  Monitor,
  TrendingUp,
  User2,
  Package,
  LogOut,
  X,
} from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { PRODUCT_MAP, searchProducts } from "@/lib/zshop/data";
import { usePrice, useZShop } from "@/lib/zshop/store";
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

const TRENDING = [
  "iphone 15",
  "5g phones under 20000",
  "boat airdopes",
  "power bank 20000mah",
  "s24 ultra",
  "smartwatch under 3000",
];

export function Header() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { theme, setTheme } = useTheme();
  const price = usePrice();

  const cartCount = useZShop((s) => s.cart.reduce((n, c) => n + c.qty, 0));
  const wishlistCount = useZShop((s) => s.wishlist.length);
  const compareCount = useZShop((s) => s.compare.length);
  const user = useZShop((s) => s.user);
  const navigate = useZShop((s) => s.navigate);
  const openProduct = useZShop((s) => s.openProduct);
  const setCartOpen = useZShop((s) => s.setCartOpen);
  const requestSignIn = useZShop((s) => s.requestSignIn);
  const signOut = useZShop((s) => s.signOut);
  const recentSearches = useZShop((s) => s.recentSearches);
  const addRecentSearch = useZShop((s) => s.addRecentSearch);
  const removeRecentSearch = useZShop((s) => s.removeRecentSearch);
  const clearRecentSearches = useZShop((s) => s.clearRecentSearches);

  const trimmed = query.trim();
  const suggestions = trimmed.length >= 1 ? searchProducts(trimmed).slice(0, 6) : [];
  const showDiscovery = focused && trimmed.length === 0;
  const showSuggestions = focused && trimmed.length >= 1 && suggestions.length > 0;

  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  // "/" or Cmd/Ctrl+K focuses the search field (skipped while typing)
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      const typing =
        !!target &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);
      const isSlash = e.key === "/" && !typing && !e.metaKey && !e.ctrlKey && !e.altKey;
      const isCmdK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";
      if (isSlash || isCmdK) {
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
        setFocused(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function submitSearch(term?: string) {
    const q = (term ?? query).trim();
    if (!q) return;
    addRecentSearch(q);
    setFocused(false);
    if (!term) setQuery(q);
    navigate({ name: "shop", query: q });
  }

  function goWishlist() {
    if (!user) {
      requestSignIn("wishlist");
      return;
    }
    navigate({ name: "wishlist" });
  }

  return (
    <header className="border-b border-neutral-200 bg-white dark:border-neutral-200 dark:bg-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-3 py-2.5 sm:gap-3 sm:px-6">
        {/* logo */}
        <button
          aria-label="Z Shop home"
          className="flex items-center gap-2.5 rounded-md px-1 py-1 hover:opacity-90"
          onClick={() => navigate({ name: "home" })}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-950 text-lg font-black text-white shadow-md">
            Z
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="text-lg font-black text-neutral-950">Z Shop</span>
            <span className="text-[11px] font-medium text-neutral-800/80">
              India&apos;s mobile store
            </span>
          </span>
        </button>

        {/* deliver to */}
        <div className="hidden items-center gap-1.5 rounded-md px-2 py-1 text-neutral-950 lg:flex">
          <MapPin className="h-5 w-5" />
          <span className="flex flex-col leading-tight">
            <span className="text-[11px] text-neutral-800/70">Deliver to</span>
            <span className="text-sm font-bold">India</span>
          </span>
        </div>

        {/* search */}
        <div ref={searchRef} className="relative order-last flex w-full flex-1 sm:order-none sm:w-auto sm:min-w-[220px]">
          <form
            className="flex w-full overflow-hidden rounded-lg bg-neutral-100 shadow-sm ring-2 ring-transparent focus-within:ring-neutral-950/40"
            onSubmit={(e) => {
              e.preventDefault();
              submitSearch();
            }}
          >
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              aria-label="Search Z Shop"
              aria-keyshortcuts="/ Meta+K Control+K"
              placeholder="Search for phones, earbuds, brands and more..."
              className="h-10 w-full bg-transparent px-3.5 text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
            />
            {!focused && !query && (
              <kbd
                aria-hidden
                className="mr-2 hidden shrink-0 items-center self-center rounded-md border border-neutral-200 bg-white px-1.5 py-0.5 text-[10px] font-bold text-neutral-400 sm:inline-flex"
              >
                /
              </kbd>
            )}
            <button
              type="submit"
              aria-label="Search"
              className="flex w-12 items-center justify-center bg-neutral-950 text-white transition hover:bg-neutral-800"
            >
              <Search className="h-4.5 w-4.5" />
            </button>
          </form>

          {/* discovery: trending + recent searches (empty query) */}
          {showDiscovery && (
            <div
              role="dialog"
              aria-label="Search suggestions"
              className="absolute left-0 right-0 top-full z-50 mt-1.5 overflow-hidden rounded-xl border bg-popover shadow-xl"
            >
              <div className="grid gap-0 sm:grid-cols-2">
                <div className="p-3 sm:border-r">
                  <p className="flex items-center gap-1.5 px-1 pb-2 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                    <TrendingUp className="h-3.5 w-3.5" aria-hidden /> Trending now
                  </p>
                  <ul>
                    {TRENDING.map((t) => (
                      <li key={t}>
                        <button
                          className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition hover:bg-accent"
                          onClick={() => submitSearch(t)}
                        >
                          <TrendingUp
                            className="h-3.5 w-3.5 shrink-0 text-muted-foreground"
                            aria-hidden
                          />
                          <span className="truncate font-medium">{t}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-t p-3 sm:border-t-0">
                  <p className="flex items-center justify-between px-1 pb-2 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" aria-hidden /> Recent searches
                    </span>
                    {recentSearches.length > 0 && (
                      <button
                        className="text-[10px] font-semibold normal-case underline underline-offset-2 transition hover:text-foreground"
                        onClick={clearRecentSearches}
                      >
                        Clear all
                      </button>
                    )}
                  </p>
                  {recentSearches.length === 0 ? (
                    <p className="px-2.5 py-6 text-center text-xs text-muted-foreground">
                      Your recent searches will appear here.
                    </p>
                  ) : (
                    <ul>
                      {recentSearches.map((t) => (
                        <li key={t} className="group/term relative">
                          <button
                            className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 pr-9 text-left text-sm transition hover:bg-accent"
                            onClick={() => submitSearch(t)}
                          >
                            <Clock
                              className="h-3.5 w-3.5 shrink-0 text-muted-foreground"
                              aria-hidden
                            />
                            <span className="truncate font-medium">{t}</span>
                          </button>
                          <button
                            aria-label={`Remove recent search: ${t}`}
                            className="absolute right-1.5 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground opacity-0 transition hover:bg-muted hover:text-foreground focus:opacity-100 group-hover/term:opacity-100"
                            onClick={() => removeRecentSearch(t)}
                          >
                            <X className="h-3.5 w-3.5" aria-hidden />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* live suggestions */}
          {showSuggestions && (
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
                className="w-full border-t bg-muted/40 px-3 py-2 text-center text-xs font-semibold text-brand-600 hover:bg-muted dark:text-brand-400"
                onClick={() => submitSearch()}
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
              className="h-10 flex-col items-start justify-center gap-0 rounded-md px-2 text-neutral-950 hover:bg-neutral-100"
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
              className="h-10 w-10 rounded-md text-neutral-950 hover:bg-neutral-100"
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
          className="relative hidden h-10 w-10 items-center justify-center rounded-md text-neutral-950 transition hover:bg-neutral-100 sm:flex"
          onClick={() => navigate({ name: "compare" })}
        >
          <Scale className="h-5.5 w-5.5" />
          {compareCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-neutral-950 px-1 text-[10px] font-bold text-white">
              {compareCount}
            </span>
          )}
        </button>

        {/* wishlist */}
        <button
          aria-label={`Wishlist with ${wishlistCount} items`}
          className="relative flex h-10 w-10 items-center justify-center rounded-md text-neutral-950 transition hover:bg-neutral-100"
          onClick={goWishlist}
        >
          <Heart className="h-5.5 w-5.5" />
          {wishlistCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-neutral-950 px-1 text-[10px] font-bold text-white">
              {wishlistCount}
            </span>
          )}
        </button>

        {/* cart */}
        <button
          aria-label={`Cart with ${cartCount} items`}
          className={cn(
            "relative flex h-10 items-center gap-1.5 rounded-md px-2 text-neutral-950 transition hover:bg-neutral-100"
          )}
          onClick={() => setCartOpen(true)}
        >
          <span className="relative">
            <ShoppingCart className="h-6 w-6" />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-neutral-950 px-1 text-[11px] font-bold text-white">
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
