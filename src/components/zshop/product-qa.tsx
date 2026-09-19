"use client";

import { useMemo, useState } from "react";
import { BadgeCheck, HelpCircle, MessageSquareText, Send, ThumbsUp, User2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/zshop/types";

interface QAItem {
  q: string;
  a: string;
  by: string;
  votes: number;
}

const QA_POOL: Array<QAItem> = [
  {
    q: "Is this product genuine and covered under brand warranty?",
    a: "Yes — 100% genuine, sourced from authorised distributors. Full brand warranty and a GST invoice in your name are included in the box.",
    by: "Ganesh Electronics Support",
    votes: 142,
  },
  {
    q: "Can I pay cash on delivery for this item?",
    a: "Yes, COD is available on most PIN codes — use the PIN checker above to confirm for your area. A ₹49 handling fee applies on COD orders.",
    by: "Ganesh Electronics Support",
    votes: 98,
  },
  {
    q: "What is the return window if I face any issue?",
    a: "7-day easy replacement from delivery. Raise it from Orders → Need help and we arrange a free doorstep pickup — no questions asked.",
    by: "Ganesh Electronics Support",
    votes: 76,
  },
  {
    q: "Is no-cost EMI available without a credit card?",
    a: "No-cost EMI needs a credit card, but Debit Card EMI works on select HDFC, ICICI, Axis and SBI debit cards. Standard EMI starts around price/12 per month.",
    by: "Ganesh Electronics Support",
    votes: 64,
  },
  {
    q: "Will I get a proper bill for warranty and service claims?",
    a: "Yes — a GST invoice with your name is emailed and packed with the parcel. It's accepted at every brand service centre in India.",
    by: "Ganesh Electronics Support",
    votes: 51,
  },
  {
    q: "How fast is delivery to metro cities?",
    a: "Metro PINs (Delhi NCR, Mumbai, Bengaluru, Hyderabad, Chennai, Pune, Kolkata, Ahmedabad) get express delivery in 1–2 days, most even next-day.",
    by: "Ganesh Electronics Support",
    votes: 45,
  },
  {
    q: "Does the box include all original accessories?",
    a: "Yes — every unit ships in a sealed retail box with all India-standard accessories listed by the brand.",
    by: "Ganesh Electronics Support",
    votes: 37,
  },
  {
    q: "Do you offer exchange for my old device?",
    a: "Yes — doorstep exchange is available on most PIN codes. The final value is confirmed after a quick agent inspection at your home.",
    by: "Ganesh Electronics Support",
    votes: 29,
  },
];

interface LocalQuestion {
  q: string;
  a: null;
  by: string;
  votes: number;
}

/** Deterministic per-product selection + vote jitter so each PDP feels unique but stable. */
function qaFor(product: Product): QAItem[] {
  const h = product.id
    .split("")
    .reduce((n, ch) => (n * 33 + ch.charCodeAt(0)) % 1000, 7);
  const start = h % QA_POOL.length;
  const count = 3 + (h % 2); // 3–4 questions
  return Array.from({ length: count }, (_, i) => {
    const item = QA_POOL[(start + i * 3) % QA_POOL.length];
    return { ...item, votes: item.votes + (h % 13) };
  });
}

export function ProductQA({ product }: { product: Product }) {
  const items = useMemo(() => qaFor(product), [product]);
  const [extra, setExtra] = useState<LocalQuestion[]>([]);
  const [question, setQuestion] = useState("");
  const [voted, setVoted] = useState<Record<number, true>>({});

  const postQuestion = () => {
    const q = question.trim();
    if (q.length < 8) {
      toast.error("Please write a slightly longer question (min 8 characters)");
      return;
    }
    setExtra((prev) => [
      { q, a: null, by: "You", votes: 0 },
      ...prev,
    ]);
    setQuestion("");
    toast.success("Question posted — our team typically replies within 6 hours");
  };

  return (
    <section
      className="mt-10"
      aria-labelledby="product-qa-heading"
      data-testid="product-qa"
    >
      <div className="mb-4 flex items-center gap-2">
        <MessageSquareText className="h-5 w-5 text-brand-500" aria-hidden />
        <h2 id="product-qa-heading" className="text-xl font-black">
          Questions &amp; answers
        </h2>
        <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-bold text-muted-foreground">
          {items.length + extra.length}
        </span>
      </div>
      <p className="-mt-2 mb-4 text-sm text-muted-foreground">
        Real questions from shoppers, answered by the Ganesh Electronics team.
      </p>

      <div className="space-y-3">
        {extra.map((item, i) => (
          <article
            key={`mine-${i}`}
            className="rounded-xl border border-dashed border-neutral-300 bg-muted/30 p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm font-bold leading-snug">{item.q}</p>
              <span className="shrink-0 rounded-full bg-rating/20 px-2 py-0.5 text-[10px] font-bold text-neutral-800">
                Awaiting answer
              </span>
            </div>
            <p className="mt-1.5 flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <User2 className="h-3 w-3" aria-hidden />
              Asked by You · just now · typically answered within 6 hours
            </p>
          </article>
        ))}

        {items.map((item, i) => (
          <article
            key={item.q}
            className="rounded-xl border border-neutral-200 bg-card p-4 transition hover:border-neutral-300 dark:border-neutral-200"
          >
            <div className="flex items-start gap-2.5">
              <HelpCircle className="mt-0.5 h-4 w-4 shrink-0 text-neutral-900" aria-hidden />
              <p className="text-sm font-bold leading-snug">{item.q}</p>
            </div>

            <div className="mt-3 flex items-start gap-2.5 border-t border-neutral-100 pt-3 dark:border-neutral-100">
              <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-success-600" aria-hidden />
              <div className="min-w-0 flex-1">
                <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-700">
                  {item.a}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <span className="text-[11px] font-bold text-neutral-900">
                    {item.by}
                    <span className="ml-1 rounded bg-neutral-950 px-1 py-px text-[9px] font-bold text-white">
                      TEAM
                    </span>
                  </span>
                  <button
                    className={cn(
                      "flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold transition",
                      voted[i]
                        ? "border-success-500 bg-success-50 text-success-700"
                        : "border-neutral-300 text-neutral-600 hover:border-neutral-950 hover:text-neutral-950"
                    )}
                    aria-pressed={!!voted[i]}
                    aria-label={`Mark this answer helpful — ${item.votes} people found it helpful`}
                    onClick={() => setVoted((v) => ({ ...v, [i]: true }))}
                  >
                    <ThumbsUp className="h-3 w-3" aria-hidden />
                    Helpful ({item.votes + (voted[i] ? 1 : 0)})
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* ask a question */}
      <div className="mt-4 rounded-xl border border-neutral-200 bg-neutral-50/70 p-4 dark:border-neutral-200 dark:bg-neutral-50">
        <label htmlFor="ask-question" className="text-sm font-bold">
          Have a question about this product?
        </label>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Our product specialists and recent buyers will answer it here.
        </p>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <Input
            id="ask-question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="e.g. Does it support fast charging out of the box?"
            maxLength={160}
            className="h-10 flex-1 bg-white"
            onKeyDown={(e) => {
              if (e.key === "Enter") postQuestion();
            }}
          />
          <Button
            className="h-10 bg-brand-500 font-bold text-primary-foreground hover:bg-brand-600"
            onClick={postQuestion}
          >
            <Send className="mr-1.5 h-4 w-4" aria-hidden />
            Post question
          </Button>
        </div>
      </div>
    </section>
  );
}
