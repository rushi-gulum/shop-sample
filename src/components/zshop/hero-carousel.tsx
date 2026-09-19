"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Headphones,
  House,
  Sparkles,
  Zap,
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
  gradient: string;
  image: string;
  deco: LucideIcon;
}

const SLIDES: Slide[] = [
  {
    badge: "Mega Tech Sale",
    title: "Next-gen gadgets, today",
    sub: "Save up to 40% on flagship laptops, phones & audio gear",
    cta: "Shop Electronics",
    category: "electronics",
    gradient: "from-orange-500 via-amber-500 to-orange-600",
    image: "/products/hero-tech.jpg",
    deco: Zap,
  },
  {
    badge: "Sound Stage",
    title: "Feel every beat",
    sub: "Premium headphones & speakers with immersive audio",
    cta: "Explore Audio",
    category: "audio",
    gradient: "from-rose-600 via-pink-600 to-rose-500",
    image: "/products/headphones2.jpg",
    deco: Headphones,
  },
  {
    badge: "Cozy Home",
    title: "Upgrade your space",
    sub: "Smart appliances & kitchen essentials up to 30% off",
    cta: "Shop Home",
    category: "home-kitchen",
    gradient: "from-teal-600 via-emerald-600 to-teal-500",
    image: "/products/hero-home.jpg",
    deco: House,
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
                "relative flex min-h-[300px] w-full shrink-0 items-center justify-between bg-gradient-to-br sm:min-h-[380px] md:min-h-[420px]",
                slide.gradient
              )}
            >
              {/* decorative icon watermarks */}
              <slide.deco
                aria-hidden
                className="pointer-events-none absolute left-6 top-6 h-10 w-10 text-white opacity-20"
              />
              <slide.deco
                aria-hidden
                className="pointer-events-none absolute bottom-10 right-[38%] h-20 w-20 text-white opacity-10"
              />

              <div className="relative z-10 flex max-w-[60%] flex-col gap-3 p-6 sm:p-10 md:p-12">
                <span className="w-fit rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                  <Sparkles className="mr-1 inline h-3 w-3" />
                  {slide.badge}
                </span>
                <h1 className="text-2xl font-black leading-tight text-white drop-shadow-sm sm:text-4xl md:text-5xl">
                  {slide.title}
                </h1>
                <p className="max-w-md text-sm text-white/90 sm:text-base">{slide.sub}</p>
                <button
                  className="group mt-1 flex w-fit items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-neutral-900 shadow-lg transition hover:gap-3 hover:shadow-xl"
                  onClick={() => navigate({ name: "shop", category: slide.category as never })}
                >
                  {slide.cta}
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>

              <div className="relative mr-6 hidden h-[75%] w-[32%] min-w-[240px] items-center justify-center sm:mr-10 md:flex">
                <div className="relative h-full w-full overflow-hidden rounded-2xl border-4 border-white/30 shadow-2xl">
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
          className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/25 text-white opacity-0 backdrop-blur-sm transition hover:bg-black/45 focus:opacity-100 group-hover:opacity-100 md:opacity-60"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          aria-label="Next slide"
          onClick={next}
          className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/25 text-white opacity-0 backdrop-blur-sm transition hover:bg-black/45 focus:opacity-100 md:opacity-60"
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
                i === index ? "w-7 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
