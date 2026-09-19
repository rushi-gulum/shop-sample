"use client";

import { CreditCard, Headset, ShieldCheck, Truck } from "lucide-react";

const ITEMS = [
  { icon: Truck, title: "Free Shipping", sub: "On orders over $99" },
  { icon: ShieldCheck, title: "Secure Payment", sub: "256-bit encryption" },
  { icon: Headset, title: "24/7 Support", sub: "Always here for you" },
  { icon: CreditCard, title: "Easy Returns", sub: "30-day money back" },
];

export function TrustBadges() {
  return (
    <section aria-label="Store benefits" className="mx-auto max-w-7xl px-3 pt-4 sm:px-6">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {ITEMS.map(({ icon: Icon, title, sub }) => (
          <div
            key={title}
            className="flex items-center justify-center gap-3 rounded-xl border bg-card px-3 py-4 text-center shadow-sm"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-100 dark:bg-brand-400/15">
              <Icon className="h-5 w-5 text-brand-600 dark:text-brand-400" />
            </span>
            <span className="flex flex-col items-start leading-tight">
              <span className="text-sm font-bold sm:text-base">{title}</span>
              <span className="text-xs text-muted-foreground">{sub}</span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
