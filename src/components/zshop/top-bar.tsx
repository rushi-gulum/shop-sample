"use client";

import { useEffect, useState } from "react";
import { BadgePercent, RotateCcw, ShieldCheck, Truck, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Announcement {
  icon: LucideIcon;
  text: string;
  highlight?: string;
  suffix?: string;
}

const MESSAGES: Announcement[] = [
  { icon: Truck, text: "FREE delivery on orders above", highlight: "₹499" },
  { icon: BadgePercent, text: "Use code", highlight: "FESTIVE10", suffix: "for an extra 10% off" },
  { icon: RotateCcw, text: "7-day easy returns & replacement, no questions asked" },
  { icon: ShieldCheck, text: "COD, UPI, Cards & EMI available across India" },
];

export function TopBar() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % MESSAGES.length), 4000);
    return () => clearInterval(t);
  }, [paused]);

  const { icon: Icon, text, highlight, suffix } = MESSAGES[idx];

  return (
    <div
      className="bg-neutral-950 text-neutral-200"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto flex h-9 max-w-7xl items-center justify-between gap-2 px-3 text-xs sm:px-6">
        <div className="flex min-w-0 items-center gap-3" aria-live="polite">
          <p
            key={idx}
            className="flex min-w-0 animate-in fade-in slide-in-from-bottom-1 items-center gap-1.5 truncate duration-500"
          >
            <Icon className="h-3.5 w-3.5 shrink-0 text-neutral-400" aria-hidden />
            <span className="truncate">
              {text}
              {highlight && <strong className="font-semibold text-white"> {highlight}</strong>}
              {suffix && <span> {suffix}</span>}
            </span>
          </p>
          <span className="hidden shrink-0 items-center gap-1 sm:flex" aria-hidden>
            {MESSAGES.map((_, i) => (
              <button
                key={i}
                tabIndex={-1}
                aria-label={`Show announcement ${i + 1}`}
                className={cn(
                  "h-1 rounded-full transition-all",
                  i === idx ? "w-3 bg-white" : "w-1 bg-white/30 hover:bg-white/60"
                )}
                onClick={() => setIdx(i)}
              />
            ))}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-1.5 whitespace-nowrap">
          <span className="text-neutral-400">Delivering across:</span>
          <span className="font-semibold text-white">India 🇮🇳</span>
        </div>
      </div>
    </div>
  );
}
