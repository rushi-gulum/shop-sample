"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Headphones,
  Smartphone,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { useZShop } from "@/lib/zshop/store";
import { cn } from "@/lib/utils";

interface Slide {
  badge: string;
  title: string;
  sub: string;
  cta: string;
  category: string;
  surface: string;
  image: string;
  deco: LucideIcon;
}

const SLIDES: Slide[] = [
  {
    badge: "Mega Mobile Fest",
    title: "Flagship phones, festive prices",
    sub: "iPhone 15 Pro Max, Galaxy S24 Ultra & more — save up to ₹20,000",
    cta: "Shop Smartphones",
    category: "smartphones",
    surface: "bg-surface-hero",
    image: "/products/android-ultra.png",
    deco: Smartphone,
  },
  {
    badge: "iPhone Store",
    title: "The iPhone you want, in stock",
    sub: "Latest, Pro & previous-gen iPhones with 1-year Apple India warranty",
    cta: "Explore iPhone",
    category: "iphone",
    surface: "bg-surface-warm",
    image: "/products/iphone-pro.png",
    deco: Sparkles,
  },
  {
    badge: "Sound & Style",
    title: "Audio & wearables under ₹2,999",
    sub: "boAt, Noise, JBL earbuds, neckbands & smartwatches with COD",
    cta: "Shop Audio",
    category: "audio",
    surface: "bg-surface",
    image: "/products/headphones2.jpg",
    deco: Headphones,
  },
];

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const navigate = useZShop((s) => s.navigate);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = useCallback(() => setIndex((i) => (i + 1) % SLIDES.length), []);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length),
    []
  );

  useEffect(() => {
    if (paused) return;
    timer.current = setInterval(next, 5000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused, next]);

  return (
    <section
      aria-label="Featured promotions"
      className="mx-auto max-w-7xl px-3 pt-4 sm:px-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative overflow-hidden rounded-2xl shadow-md">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {SLIDES.map((slide) => (
            <div
              key={slide.title}
              className={cn(
                "relative flex min-h-[300px] w-full shrink-0 items-center justify-between sm:min-h-[380px] md:min-h-[420px]",
                slide.surface
              )}
            >
              {/* decorative icon watermarks */}
              <slide.deco
                aria-hidden
                className="pointer-events-none absolute left-6 top-6 h-10 w-10 text-black opacity-[0.06]"
              />
              <slide.deco
                aria-hidden
                className="pointer-events-none absolute bottom-10 right-[38%] h-20 w-20 text-black opacity-5"
              />

              <div className="relative z-10 flex max-w-[60%] flex-col gap-3 p-6 sm:p-10 md:p-12">
                <span className="w-fit rounded-full bg-neutral-950 px-3 py-1 text-xs font-semibold text-white">
                  <Sparkles className="mr-1 inline h-3 w-3" />
                  {slide.badge}
                </span>
                <h1 className="text-2xl font-black leading-tight text-neutral-950 sm:text-4xl md:text-5xl">
                  {slide.title}
                </h1>
                <p className="max-w-md text-sm text-neutral-600 sm:text-base">{slide.sub}</p>
                <button
                  className="group mt-1 flex w-fit items-center gap-2 rounded-lg bg-neutral-950 px-5 py-2.5 text-sm font-bold text-white shadow-lg transition hover:bg-neutral-800 hover:gap-3 hover:shadow-xl"
                  onClick={() => navigate({ name: "shop", category: slide.category as never })}
                >
                  {slide.cta}
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>

              <div className="relative mr-6 hidden h-[75%] w-[32%] min-w-[240px] items-center justify-center sm:mr-10 md:flex">
                <div className="relative h-full w-full overflow-hidden rounded-2xl border-4 border-black/10 shadow-2xl">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    sizes="30vw"
                    priority={slide === SLIDES[0]}
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* arrows */}
        <button
          aria-label="Previous slide"
          onClick={prev}
          className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-neutral-950 opacity-0 shadow-sm backdrop-blur-sm transition hover:bg-white focus:opacity-100 group-hover:opacity-100 md:opacity-60"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          aria-label="Next slide"
          onClick={next}
          className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-neutral-950 opacity-0 shadow-sm backdrop-blur-sm transition hover:bg-white focus:opacity-100 md:opacity-60"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* dots */}
        <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
          {SLIDES.map((s, i) => (
            <button
              key={s.title}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={cn(
                "h-2 rounded-full transition-all",
                i === index ? "w-7 bg-neutral-950" : "w-2 bg-black/20 hover:bg-black/40"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
