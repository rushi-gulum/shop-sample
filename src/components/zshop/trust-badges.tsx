"use client";

import { Banknote, Headset, RotateCcw, ShieldCheck } from "lucide-react";

const ITEMS = [
  { icon: Banknote, title: "COD Available", sub: "Cash on delivery PAN-India" },
  { icon: ShieldCheck, title: "100% Genuine", sub: "Brand warranty & GST invoice" },
  { icon: Headset, title: "24/7 Support", sub: "In English & Hindi" },
  { icon: RotateCcw, title: "7-Day Replacement", sub: "Easy returns & refunds" },
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
