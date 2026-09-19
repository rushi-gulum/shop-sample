"use client";

import { useState } from "react";
import {
  ArrowUp,
  BadgePercent,
  Banknote,
  Facebook,
  Instagram,
  PackageCheck,
  ShieldCheck,
  Twitter,
  Youtube,
  Wallet,
} from "lucide-react";
import { useZShop } from "@/lib/zshop/store";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { CategoryId } from "@/lib/zshop/types";

const TRUST = [
  { icon: Banknote, title: "COD Available", sub: "Pay cash on delivery" },
  { icon: PackageCheck, title: "7-Day Replacement", sub: "Easy returns & refunds" },
  { icon: ShieldCheck, title: "100% Genuine", sub: "Brand warranty & GST invoice" },
  { icon: Wallet, title: "Flexible Payment", sub: "UPI, cards, EMI & more" },
];

const SERVICE_LINKS = [
  "Track your order",
  "Your wishlist",
  "Your account",
  "Repair & service booking",
  "EMI & financing",
  "Trade-in / buyback",
];
const ABOUT_LINKS = [
  "Our story",
  "Careers",
  "Store locator",
  "Bulk & corporate orders",
  "Affiliate program",
  "Terms of service",
];

export function Footer() {
  const [email, setEmail] = useState("");
  const navigate = useZShop((s) => s.navigate);
  const user = useZShop((s) => s.user);
  const requestSignIn = useZShop((s) => s.requestSignIn);

  function goShop(label: string, category?: CategoryId) {
    if (category) navigate({ name: "shop", category });
    else if (label === "All products") navigate({ name: "shop", category: "all" });
    else navigate({ name: "deals" });
  }

  function goService(label: string) {
    if (label === "Track your order") {
      navigate({ name: "orders" });
    } else if (label === "Your wishlist") {
      if (user) navigate({ name: "wishlist" });
      else requestSignIn("wishlist");
    } else if (label === "Your account") {
      if (user) navigate({ name: "account" });
      else requestSignIn("account");
    } else if (label === "EMI & financing" || label === "Trade-in / buyback") {
      navigate({ name: "shop", category: "refurbished" });
    } else if (label === "Repair & service booking") {
      useZShop.getState().setChatOpen(true);
    } else {
      toast.info(`${label} — demo link`, { description: "This page is illustrative in the demo." });
    }
  }

  function goAbout(label: string) {
    toast.info(`${label} — demo link`, { description: "This page is illustrative in the demo." });
  }

  function subscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    toast.success("You're in! Watch your inbox for exclusive deals.", {
      description: `Subscribed ${email}`,
    });
    setEmail("");
  }

  return (
    <footer className="mt-12">
      {/* back to top */}
      <button
        className="w-full bg-neutral-800 py-3 text-sm font-semibold text-white transition hover:bg-neutral-700"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        Back to top
      </button>

      {/* trust row */}
      <div className="border-b bg-neutral-950 text-neutral-200">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-6 sm:px-6 lg:grid-cols-4">
          {TRUST.map(({ icon: Icon, title, sub }) => (
            <div key={title} className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neutral-800">
                <Icon className="h-4.5 w-4.5 text-brand-400" />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-sm font-bold text-white">{title}</span>
                <span className="text-xs text-neutral-400">{sub}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* link columns */}
      <div className="bg-neutral-950 text-neutral-300">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-2 lg:grid-cols-5">
          <div>
            <h3 className="text-lg font-black text-white">Z Shop</h3>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-neutral-400">
              India&apos;s trusted mobile store — phones, accessories &amp; more, delivered PAN-India.
            </p>
            <div className="mt-4 flex items-center gap-2">
              {[
                { icon: Twitter, label: "Twitter" },
                { icon: Facebook, label: "Facebook" },
                { icon: Instagram, label: "Instagram" },
                { icon: Youtube, label: "YouTube" },
              ].map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-800 text-neutral-300 transition hover:bg-neutral-950 hover:text-white"
                  onClick={() => toast.info(`${label} — demo link`)}
                >
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-white">Shop</h4>
            <ul className="space-y-2 text-sm">
              {[
                "All products",
                "Today's Deals",
                "Smartphones",
                "iPhone",
                "Audio",
                "Accessories",
                "Refurbished",
              ].map((label) => (
                <li key={label}>
                  <button
                    className="transition hover:text-brand-400"
                    onClick={() =>
                      goShop(
                        label,
                        label === "Smartphones"
                          ? "smartphones"
                          : label === "iPhone"
                            ? "iphone"
                            : label === "Audio"
                              ? "audio"
                              : label === "Accessories"
                                ? "cases"
                                : label === "Refurbished"
                                  ? "refurbished"
                                  : undefined
                      )
                    }
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-white">
              Help & Services
            </h4>
            <ul className="space-y-2 text-sm">
              {SERVICE_LINKS.map((label) => (
                <li key={label}>
                  <button className="transition hover:text-brand-400" onClick={() => goService(label)}>
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-white">
              About Z Shop
            </h4>
            <ul className="space-y-2 text-sm">
              {ABOUT_LINKS.map((label) => (
                <li key={label}>
                  <button className="transition hover:text-brand-400" onClick={() => goAbout(label)}>
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-white">
              Get exclusive deals on WhatsApp & email
            </h4>
            <p className="mb-3 text-sm text-neutral-400">
              Join 5,00,000+ shoppers across India. Unsubscribe anytime.
            </p>
            <form className="flex gap-2" onSubmit={subscribe}>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10 border-neutral-700 bg-neutral-900 text-white placeholder:text-neutral-500"
              />
              <Button type="submit" className="h-10 bg-brand-500 font-bold text-primary-foreground hover:bg-brand-600">
                Subscribe
              </Button>
            </form>
            <div className="mt-4 flex items-center gap-2">
              <BadgePercent className="h-4 w-4 text-neutral-500" />
              <span className="text-[11px] text-neutral-500">
                UPI · PhonePe · Paytm · RuPay · Visa · Mastercard · EMI · COD
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-800">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-neutral-500 sm:flex-row sm:px-6">
            <span>© 2025 Z Shop India. Phones, accessories & more — delivered PAN-India. Demo storefront.</span>
            <span className="flex items-center gap-1">
              <ArrowUp className="h-3 w-3" /> Built with Next.js & shadcn/ui
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
