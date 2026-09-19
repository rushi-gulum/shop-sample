"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useZShop } from "@/lib/zshop/store";
import { TopBar } from "./top-bar";
import { Header } from "./header";
import { NavBar } from "./nav-bar";
import { Footer } from "./footer";
import { CartDrawer } from "./cart-drawer";
import { QuickViewModal } from "./quick-view";
import { SignInModal } from "./sign-in-modal";
import { ChatWidget } from "./chat-widget";
import { HomeView } from "./home-view";
import { ShopView } from "./shop-view";
import { DealsView } from "./deals-view";
import { ProductDetail } from "./product-detail";
import { WishlistView } from "./wishlist-view";
import { CompareView } from "./compare-view";
import { CheckoutView } from "./checkout-view";
import { OrdersView } from "./orders-view";
import { AccountView } from "./account-view";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

export function ZShopApp() {
  const view = useZShop((s) => s.view);
  const [showTop, setShowTop] = useState(false);

  // rehydrate persisted store client-side (skipHydration: true) — avoids SSR mismatches
  useEffect(() => {
    try {
      useZShop.persist.rehydrate();
    } catch {
      // corrupted storage — ignore and start fresh
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopBar />
      <Header />
      <NavBar />

      <main className="flex-1">
        {view.name === "home" && <HomeView />}
        {view.name === "product" && <ProductDetail id={view.id} />}
        {view.name === "shop" && (
          <ShopView category={view.category ?? "all"} query={view.query} />
        )}
        {view.name === "deals" && <DealsView />}
        {view.name === "wishlist" && <WishlistView />}
        {view.name === "compare" && <CompareView />}
        {view.name === "checkout" && <CheckoutView />}
        {view.name === "orders" && <OrdersView />}
        {view.name === "account" && <AccountView />}
      </main>

      <Footer />

      {/* overlays */}
      <CartDrawer />
      <QuickViewModal />
      <SignInModal />
      <ChatWidget />

      {/* back to top floating */}
      <button
        aria-label="Back to top"
        className={cn(
          "fixed bottom-20 left-5 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-brand-500 text-primary-foreground shadow-lg transition-all hover:bg-brand-600",
          showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
        )}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ArrowUp className="h-5 w-5" />
      </button>

      <Toaster position="top-center" richColors closeButton />
    </div>
  );
}
