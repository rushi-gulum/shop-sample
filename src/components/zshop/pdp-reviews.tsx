"use client";

import { useMemo, useState } from "react";
import { BadgeCheck, MessageSquarePlus, Star, ThumbsUp } from "lucide-react";
import { toast } from "sonner";
import { ratingBreakdown, reviewsFor, type Review } from "@/lib/zshop/data";
import type { Product } from "@/lib/zshop/types";
import { useZShop } from "@/lib/zshop/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { StarRating } from "./star-rating";
import { cn } from "@/lib/utils";

const AVATAR_STYLES = [
  "bg-brand-100 text-brand-700 dark:bg-brand-400/15 dark:text-brand-300",
  "bg-electric-100 text-electric-700 dark:bg-electric-400/15 dark:text-electric-300",
  "bg-success-100 text-success-700 dark:bg-success-400/15 dark:text-success-300",
  "bg-amber-100 text-amber-700 dark:bg-amber-400/15 dark:text-amber-300",
];

function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function PdpReviews({ product }: { product: Product }) {
  const user = useZShop((s) => s.user);
  const baseReviews = useMemo(() => reviewsFor(product.id), [product.id]);
  const breakdown = useMemo(() => ratingBreakdown(product), [product]);

  const [userReviews, setUserReviews] = useState<Review[]>([]);
  const [voted, setVoted] = useState<Record<string, boolean>>({});
  const [sortBy, setSortBy] = useState<"helpful" | "recent">("helpful");
  const [formOpen, setFormOpen] = useState(false);
  const [formRating, setFormRating] = useState(0);
  const [formHover, setFormHover] = useState(0);
  const [formTitle, setFormTitle] = useState("");
  const [formBody, setFormBody] = useState("");
  const [formName, setFormName] = useState(user?.name ?? "");

  const all = [...userReviews, ...baseReviews];
  const reviews =
    sortBy === "helpful"
      ? [...all].sort((a, b) => b.helpful - a.helpful)
      : all; // user reviews first (newest), then deterministic order

  const recommendPct = breakdown
    .filter((b) => b.stars >= 4)
    .reduce((sum, b) => sum + b.pct, 0);

  function toggleHelpful(id: string) {
    setVoted((v) => {
      const next = { ...v, [id]: !v[id] };
      return next;
    });
  }

  function submitReview() {
    if (formRating < 1) {
      toast.error("Please choose a star rating");
      return;
    }
    if (formBody.trim().length < 10) {
      toast.error("Review must be at least 10 characters");
      return;
    }
    const review: Review = {
      id: `local-${Date.now()}`,
      author: formName.trim() || user?.name || "You",
      rating: formRating,
      date: "Just now",
      title: formTitle.trim() || "My review",
      body: formBody.trim(),
      verified: true,
      helpful: 0,
    };
    setUserReviews((r) => [review, ...r]);
    setFormRating(0);
    setFormTitle("");
    setFormBody("");
    setFormOpen(false);
    toast.success("Thanks for your review! It is now live.");
  }

  return (
    <section id="reviews" aria-labelledby="pdp-reviews-title" className="mt-10 scroll-mt-24">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <MessageSquarePlus className="h-5 w-5 text-brand-500" aria-hidden />
        <h2 id="pdp-reviews-title" className="text-xl font-black sm:text-2xl">
          Customer reviews
        </h2>
        <Button
          size="sm"
          className="ml-auto bg-brand-500 font-bold text-white hover:bg-brand-600"
          onClick={() => setFormOpen((o) => !o)}
          aria-expanded={formOpen}
        >
          {formOpen ? "Close" : "Write a review"}
        </Button>
      </div>

      {/* summary + breakdown */}
      <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
        <div className="flex flex-col items-center justify-center rounded-2xl border bg-card p-6 text-center">
          <p className="text-5xl font-black tabular-nums">{product.rating.toFixed(1)}</p>
          <StarRating rating={product.rating} size={18} className="mt-2" />
          <p className="mt-1.5 text-sm text-muted-foreground">
            {product.ratingCount.toLocaleString()} ratings · {all.length} reviews
          </p>
          <p className="mt-3 rounded-full bg-success-50 px-3 py-1 text-xs font-bold text-success-700 dark:bg-success-400/10 dark:text-success-300">
            {recommendPct}% recommend this product
          </p>
        </div>

        <div className="rounded-2xl border bg-card p-5">
          <div className="space-y-2.5">
            {breakdown.map((b) => (
              <div key={b.stars} className="flex items-center gap-3 text-sm">
                <span className="flex w-10 items-center gap-1 font-semibold tabular-nums">
                  {b.stars}
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden />
                </span>
                <div
                  className="h-2.5 flex-1 overflow-hidden rounded-full bg-muted"
                  role="img"
                  aria-label={`${b.stars} stars: ${b.pct}%`}
                >
                  <div
                    className="h-full rounded-full bg-brand-500 transition-all"
                    style={{ width: `${b.pct}%` }}
                  />
                </div>
                <span className="w-16 text-right text-xs tabular-nums text-muted-foreground">
                  {b.pct}%
                </span>
              </div>
            ))}
          </div>

          {/* write-review form */}
          {formOpen && (
            <div className="mt-5 rounded-xl border bg-muted/40 p-4">
              <p className="text-sm font-bold">Rate this product</p>
              <div className="mt-1.5 flex items-center gap-1" role="radiogroup" aria-label="Your rating">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    role="radio"
                    aria-checked={formRating === n}
                    aria-label={`${n} star${n > 1 ? "s" : ""}`}
                    className="rounded p-0.5 transition hover:scale-110"
                    onMouseEnter={() => setFormHover(n)}
                    onMouseLeave={() => setFormHover(0)}
                    onClick={() => setFormRating(n)}
                  >
                    <Star
                      className={cn(
                        "h-7 w-7 transition-colors",
                        n <= (formHover || formRating)
                          ? "fill-amber-400 text-amber-400"
                          : "text-muted-foreground/40"
                      )}
                    />
                  </button>
                ))}
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <Input
                  placeholder="Your name"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  aria-label="Your name"
                />
                <Input
                  placeholder="Review title"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  aria-label="Review title"
                />
              </div>
              <Textarea
                className="mt-3 min-h-24"
                placeholder="What did you like or dislike? (min. 10 characters)"
                value={formBody}
                onChange={(e) => setFormBody(e.target.value)}
                aria-label="Review body"
              />
              <div className="mt-3 flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => setFormOpen(false)}>
                  Cancel
                </Button>
                <Button
                  size="sm"
                  className="bg-brand-500 font-bold text-white hover:bg-brand-600"
                  onClick={submitReview}
                >
                  Submit review
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* sort */}
      <div className="mt-5 flex items-center gap-2 text-sm">
        <span className="font-semibold text-muted-foreground">Sort by</span>
        {(["helpful", "recent"] as const).map((s) => (
          <button
            key={s}
            className={cn(
              "rounded-full px-3 py-1 font-semibold transition",
              sortBy === s
                ? "bg-brand-500 text-white"
                : "bg-muted text-muted-foreground hover:text-foreground"
            )}
            onClick={() => setSortBy(s)}
            aria-pressed={sortBy === s}
          >
            {s === "helpful" ? "Most helpful" : "Most recent"}
          </button>
        ))}
      </div>

      {/* review cards */}
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {reviews.map((r, i) => (
          <article
            key={r.id}
            className="rounded-2xl border bg-card p-5 transition-shadow hover:shadow-sm"
          >
            <div className="flex items-start gap-3">
              <span
                aria-hidden
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-black",
                  AVATAR_STYLES[i % AVATAR_STYLES.length]
                )}
              >
                {initials(r.author)}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                  <p className="text-sm font-bold">{r.author}</p>
                  {r.verified && (
                    <span className="flex items-center gap-0.5 text-xs font-semibold text-success-600 dark:text-success-400">
                      <BadgeCheck className="h-3.5 w-3.5" aria-hidden />
                      Verified purchase
                    </span>
                  )}
                </div>
                <div className="mt-0.5 flex items-center gap-2">
                  <StarRating rating={r.rating} size={13} />
                  <span className="text-xs text-muted-foreground">{r.date}</span>
                </div>
              </div>
            </div>
            <h3 className="mt-3 text-sm font-bold">{r.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{r.body}</p>
            <button
              className={cn(
                "mt-3 flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition",
                voted[r.id]
                  ? "border-brand-300 bg-brand-50 text-brand-700 dark:border-brand-400/40 dark:bg-brand-400/10 dark:text-brand-300"
                  : "text-muted-foreground hover:border-brand-300 hover:text-brand-600 dark:hover:text-brand-400"
              )}
              onClick={() => toggleHelpful(r.id)}
              aria-pressed={!!voted[r.id]}
            >
              <ThumbsUp className={cn("h-3.5 w-3.5", voted[r.id] && "fill-current")} aria-hidden />
              Helpful ({r.helpful + (voted[r.id] ? 1 : 0)})
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
