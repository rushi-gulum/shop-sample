"use client";

import { ArrowRight, Crown, RefreshCcw, Recycle, Sparkles } from "lucide-react";
import { useZShop } from "@/lib/zshop/store";

export function PromoCards() {
  const requestSignIn = useZShop((s) => s.requestSignIn);

  return (
    <section aria-label="Membership offers" className="mx-auto max-w-7xl px-3 pt-8 sm:px-6">
      <div className="grid gap-4 md:grid-cols-2">
        {/* Z Prime */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 p-6 text-white shadow-md sm:p-8">
          <Crown
            aria-hidden
            className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 opacity-15"
          />
          <span className="w-fit rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
            Membership
          </span>
          <h3 className="mt-3 text-2xl font-black sm:text-3xl">Join Z Prime</h3>
          <p className="mt-1.5 max-w-sm text-sm text-white/90">
            Free same-day delivery, exclusive deals, and more.
          </p>
          <button
            className="mt-5 flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-violet-700 shadow transition hover:gap-3"
            onClick={() => requestSignIn("prime")}
          >
            Try free for 30 days <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Trade & Save */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 p-6 text-white shadow-md sm:p-8">
          <Recycle
            aria-hidden
            className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 opacity-15"
          />
          <span className="flex w-fit items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
            <RefreshCcw className="h-3 w-3" /> Trade-in
          </span>
          <h3 className="mt-3 text-2xl font-black sm:text-3xl">Trade & Save</h3>
          <p className="mt-1.5 max-w-sm text-sm text-white/90">
            Get up to 50% back when you trade in eligible devices.
          </p>
          <button
            className="mt-5 flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-teal-700 shadow transition hover:gap-3"
            onClick={() =>
              useZShop.getState().navigate({ name: "shop", category: "electronics" })
            }
          >
            <Sparkles className="h-4 w-4" /> See trade-in offers
          </button>
        </div>
      </div>
    </section>
  );
}
