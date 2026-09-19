"use client";

import { useState } from "react";
import { BadgePercent, ChevronDown, CreditCard, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/zshop/store";
import { Card, CardContent } from "@/components/ui/card";

interface BankOffer {
  bank: string;
  initials: string;
  text: string;
  sub?: string;
}

/** Deterministic bank offers scaled to the product price — typical Indian marketplace offers. */
function offersFor(price: number): BankOffer[] {
  const instantCap = Math.min(2000, Math.round((price * 0.1) / 10) * 10);
  const flatOff = Math.min(1500, Math.max(100, Math.round((price * 0.05) / 50) * 50));
  return [
    {
      bank: "HDFC Bank",
      initials: "H",
      text: `10% instant discount on HDFC Bank Credit Cards, up to ${formatPrice(instantCap)}`,
      sub: "Min. txn ₹5,000 · incl. RuPay credit",
    },
    {
      bank: "ICICI",
      initials: "I",
      text: `Flat ${formatPrice(flatOff)} off on ICICI Bank Credit Cards (non-EMI)`,
      sub: "Auto-applied at checkout",
    },
    {
      bank: "Axis",
      initials: "A",
      text: `5% unlimited cashback on Axis Bank Cards`,
      sub: "Credited within 90 days",
    },
    {
      bank: "SBI",
      initials: "S",
      text: "No-cost EMI on 3, 6 & 9-month tenures",
      sub: "Debit & credit card EMI · all major banks",
    },
  ];
}

export function BankOffers({ price }: { price: number }) {
  const [expanded, setExpanded] = useState(false);
  const offers = offersFor(price);
  const visible = expanded ? offers : offers.slice(0, 2);

  return (
    <Card data-testid="bank-offers">
      <CardContent className="p-4">
        <h3 className="flex items-center gap-1.5 text-base font-bold">
          <BadgePercent className="h-4.5 w-4.5" aria-hidden />
          Bank offers & EMI
        </h3>
        <ul className="mt-3 space-y-3" aria-label="Available bank offers">
          {visible.map((o) => (
            <li key={o.bank} className="flex items-start gap-2.5">
              <span
                aria-hidden
                className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-neutral-950 text-[11px] font-black text-white"
              >
                {o.initials}
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-semibold leading-snug">{o.text}</span>
                {o.sub && (
                  <span className="mt-0.5 block text-[11px] text-muted-foreground">{o.sub}</span>
                )}
              </span>
            </li>
          ))}
        </ul>

        <button
          className="mt-3 flex w-full items-center justify-center gap-1 rounded-md border border-dashed border-neutral-300 py-1.5 text-xs font-bold text-neutral-700 transition hover:border-neutral-950 hover:text-neutral-950"
          aria-expanded={expanded}
          onClick={() => setExpanded((e) => !e)}
        >
          {expanded ? "Show fewer offers" : `See all ${offers.length} offers`}
          <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", expanded && "rotate-180")} aria-hidden />
        </button>

        <p className="mt-3 flex items-start gap-1.5 border-t border-neutral-100 pt-2.5 text-[11px] leading-relaxed text-muted-foreground">
          <CreditCard className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
          RuPay, UPI & EMI accepted. Festive bank offers can&apos;t be clubbed with each other.
        </p>
        <p className="mt-1.5 flex items-start gap-1.5 text-[11px] leading-relaxed text-muted-foreground">
          <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neutral-900" aria-hidden />
          Extra 5% off with Ganesh Prime — code{" "}
          <span className="font-bold text-neutral-900">GPRIME5</span>
        </p>
      </CardContent>
    </Card>
  );
}
