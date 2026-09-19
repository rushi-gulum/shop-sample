"use client";

import { useEffect, useState } from "react";
import { Timer } from "lucide-react";
import { cn } from "@/lib/utils";

interface FlashCountdownProps {
  variant?: "card" | "hero";
  className?: string;
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

/**
 * Live countdown to the end of today (local time) — used for flash-sale banners.
 * SSR-safe: renders placeholder dashes until mounted on the client.
 */
export function FlashCountdown({ variant = "card", className }: FlashCountdownProps) {
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const calc = () => {
      const now = new Date();
      const end = new Date(now);
      end.setHours(23, 59, 59, 999);
      setLeft(Math.max(0, end.getTime() - now.getTime()));
    };
    calc();
    const timer = setInterval(calc, 1000);
    return () => clearInterval(timer);
  }, []);

  const h = left === null ? null : Math.floor(left / 3_600_000);
  const m = left === null ? null : Math.floor((left % 3_600_000) / 60_000);
  const s = left === null ? null : Math.floor((left % 60_000) / 1000);

  const boxBase =
    "flex min-w-11 flex-col items-center rounded-lg px-1.5 py-1 tabular-nums";
  const hero = variant === "hero";

  return (
    <span
      className={cn("inline-flex items-center gap-2", className)}
      role="timer"
      aria-label={h === null ? "Flash sale countdown" : `Flash sale ends in ${h} hours ${m} minutes ${s} seconds`}
    >
      <span
        className={cn(
          "flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide",
          hero ? "text-white/90" : "text-brand-600 dark:text-brand-400"
        )}
      >
        <Timer className="h-3.5 w-3.5" aria-hidden />
        Ends in
      </span>
      <span className="flex items-center gap-1.5">
        {[
          { v: h, unit: "hrs" },
          { v: m, unit: "min" },
          { v: s, unit: "sec" },
        ].map(({ v, unit }) => (
          <span
            key={unit}
            className={cn(
              boxBase,
              hero
                ? "bg-white/15 text-white backdrop-blur-sm ring-1 ring-inset ring-white/25"
                : "bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-200 dark:bg-brand-400/10 dark:text-brand-300 dark:ring-brand-400/20"
            )}
          >
            <span className="text-sm font-black leading-none sm:text-base">
              {v === null ? "––" : pad(v)}
            </span>
            <span
              className={cn(
                "text-[9px] font-bold uppercase leading-none",
                hero ? "text-white/70" : "text-brand-500/80 dark:text-brand-300/70"
              )}
            >
              {unit}
            </span>
          </span>
        ))}
      </span>
    </span>
  );
}
