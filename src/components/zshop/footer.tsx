"use client";

import { useState } from "react";
import {
  ArrowUp,
  CreditCard,
  Facebook,
  Instagram,
  RefreshCcw,
  ShieldCheck,
  Truck,
  Twitter,
  Youtube,
  Wallet,
} from "lucide-react";
import { useZShop } from "@/lib/zshop/store";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const TRUST = [
  { icon: Truck, title: "Free Shipping", sub: "On orders $99+" },
  { icon: RefreshCcw, title: "30-Day Returns", sub: "No questions asked" },
  { icon: ShieldCheck, title: "Secure Payment", sub: "256-bit encryption" },
  { icon: Wallet, title: "Flexible Payment", sub: "Cards, wallets & more" },
];

const HELP_LINKS = [
  "Your orders",
  "Your wishlist",
  "Your account",
  "Customer service",
  "Returns & refunds",
  "Privacy policy",
];
const ABOUT_LINKS = [
  "Our story",
  "Careers",
  "Press",
  "Sustainability",
  "Affiliate program",
  "Terms of service",
];

export function Footer() {
  const [email, setEmail] = useState("");
  const navigate = useZShop((s) => s.navigate);
  const user = useZShop((s) => s.user);
  const requestSignIn = useZShop((s) => s.requestSignIn);

  function goShop(label: string, category?: "electronics" | "computers" | "audio" | "fashion") {
    if (category) navigate({ name: "shop", category });
    else if (label === "All products") navigate({ name: "shop", category: "all" });
    else navigate({ name: "deals" });
  }

  function goHelp(label: string) {
    if (label === "Your orders") {
      navigate({ name: "orders" });
    } else if (label === "Your wishlist") {
      if (user) navigate({ name: "wishlist" });
      else requestSignIn("wishlist");
    } else if (label === "Your account") {
      if (user) navigate({ name: "account" });
      else requestSignIn("account");
    } else if (label === "Customer service") {
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
              Your one-stop shop for everything you love. Shop smarter, live better.
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
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-800 text-neutral-300 transition hover:bg-brand-500 hover:text-white"
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
                "Electronics",
                "Computers",
                "Audio",
                "Fashion",
              ].map((label) => (
                <li key={label}>
                  <button
                    className="transition hover:text-brand-400"
                    onClick={() =>
                      goShop(
                        label,
                        label === "Electronics"
                          ? "electronics"
                          : label === "Computers"
                            ? "computers"
                            : label === "Audio"
                              ? "audio"
                              : label === "Fashion"
                                ? "fashion"
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
              Help & Settings
            </h4>
            <ul className="space-y-2 text-sm">
              {HELP_LINKS.map((label) => (
                <li key={label}>
                  <button className="transition hover:text-brand-400" onClick={() => goHelp(label)}>
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
              Get exclusive deals in your inbox
            </h4>
            <p className="mb-3 text-sm text-neutral-400">
              Join 50,000+ shoppers. Unsubscribe anytime.
            </p>
            <form className="flex gap-2" onSubmit={subscribe}>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10 border-neutral-700 bg-neutral-900 text-white placeholder:text-neutral-500"
              />
              <Button type="submit" className="h-10 bg-brand-500 font-bold text-white hover:bg-brand-600">
                Subscribe
              </Button>
            </form>
            <div className="mt-4 flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-neutral-500" />
              <span className="text-[11px] text-neutral-500">
                VISA · Mastercard · AMEX · PayPal · Apple Pay
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-800">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-neutral-500 sm:flex-row sm:px-6">
            <span>© 2025 Z Shop. Shop smarter, live better. All rights reserved. Demo storefront.</span>
            <span className="flex items-center gap-1">
              <ArrowUp className="h-3 w-3" /> Built with Next.js & shadcn/ui
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
