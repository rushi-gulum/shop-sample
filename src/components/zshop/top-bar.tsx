"use client";

import { BadgePercent, ShieldCheck, Truck } from "lucide-react";

export function TopBar() {
  return (
    <div className="bg-neutral-950 text-neutral-200">
      <div className="mx-auto flex h-9 max-w-7xl items-center justify-between gap-2 px-3 text-xs sm:px-6">
        <div className="flex min-w-0 items-center gap-3 overflow-hidden">
          <span className="hidden items-center gap-1.5 sm:flex">
            <Truck className="h-3.5 w-3.5 shrink-0 text-brand-400" />
            Free shipping on orders over $99
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
            <span className="hidden xs:inline sm:inline">Secure payment</span>
          </span>
          <span className="hidden items-center gap-1.5 md:flex">
            <BadgePercent className="h-3.5 w-3.5 shrink-0 text-brand-400" />
            Use code <strong className="font-semibold text-brand-300">WELCOME15</strong> for 15% off
          </span>
        </div>
        <div className="flex items-center gap-1.5 whitespace-nowrap">
          <span className="text-neutral-400">Ship to:</span>
          <span className="font-semibold text-white">US</span>
        </div>
      </div>
    </div>
  );
}
