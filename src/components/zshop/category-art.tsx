"use client";

import type { CategoryId } from "@/lib/zshop/types";

/**
 * Hand-crafted, multi-tone SVG illustrations for the "Shop by Category" grid.
 * Each illustration uses gradients + shading for a rich, realistic vector look.
 * All artwork is drawn on a 64x64 viewBox with a consistent ground shadow.
 */

function AudioArt() {
  return (
    <svg viewBox="0 0 64 64" role="img" aria-label="Audio" className="h-full w-full">
      <defs>
        <linearGradient id="za-aud-band" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fcd34d" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="za-aud-cup" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#57534e" />
          <stop offset="100%" stopColor="#292524" />
        </linearGradient>
        <linearGradient id="za-aud-pad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="57" rx="17" ry="3" fill="#1c1917" opacity=".1" />
      {/* headband */}
      <path
        d="M14 36v-7a18 18 0 0 1 36 0v7"
        fill="none"
        stroke="url(#za-aud-band)"
        strokeWidth="6.5"
        strokeLinecap="round"
      />
      <path
        d="M14 36v-7a18 18 0 0 1 36 0v7"
        fill="none"
        stroke="#fef3c7"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity=".65"
      />
      {/* sliders */}
      <rect x="11" y="32" width="5" height="10" rx="2.5" fill="#a8a29e" />
      <rect x="48" y="32" width="5" height="10" rx="2.5" fill="#a8a29e" />
      {/* ear cups */}
      <rect x="7" y="35" width="12.5" height="19" rx="6.2" fill="url(#za-aud-cup)" />
      <rect x="44.5" y="35" width="12.5" height="19" rx="6.2" fill="url(#za-aud-cup)" />
      {/* cushions */}
      <rect x="10.5" y="38" width="6" height="13" rx="3" fill="url(#za-aud-pad)" />
      <rect x="47.5" y="38" width="6" height="13" rx="3" fill="url(#za-aud-pad)" />
      {/* highlights */}
      <rect x="9" y="37.5" width="2.4" height="11" rx="1.2" fill="#fff" opacity=".18" />
      <rect x="46.5" y="37.5" width="2.4" height="11" rx="1.2" fill="#fff" opacity=".18" />
    </svg>
  );
}

function BeautyArt() {
  return (
    <svg viewBox="0 0 64 64" role="img" aria-label="Beauty" className="h-full w-full">
      <defs>
        <linearGradient id="za-bea-glass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fecdd3" />
          <stop offset="45%" stopColor="#fda4af" />
          <stop offset="100%" stopColor="#f43f5e" />
        </linearGradient>
        <linearGradient id="za-bea-liq" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fb7185" />
          <stop offset="100%" stopColor="#e11d48" />
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="58" rx="13" ry="2.8" fill="#1c1917" opacity=".1" />
      {/* dropper bulb */}
      <circle cx="32" cy="10.5" r="5.4" fill="#fb7185" />
      <circle cx="30" cy="8.8" r="1.7" fill="#fff" opacity=".5" />
      {/* collar */}
      <rect x="27.5" y="15" width="9" height="5.5" rx="1.8" fill="#be123c" />
      {/* neck */}
      <rect x="28.5" y="20.5" width="7" height="4" fill="#fecdd3" />
      {/* bottle body */}
      <path
        d="M22.5 27.5c0-3.2 2.8-5.5 5.8-5.5h7.4c3 0 5.8 2.3 5.8 5.5V49c0 4.2-3 7.5-6.8 7.5h-5.4c-3.8 0-6.8-3.3-6.8-7.5z"
        fill="url(#za-bea-glass)"
      />
      {/* liquid */}
      <path
        d="M25 34.5h14v14.6c0 2.9-1.9 5.2-4.4 5.2h-5.2c-2.5 0-4.4-2.3-4.4-5.2z"
        fill="url(#za-bea-liq)"
        opacity=".88"
      />
      {/* glass shine */}
      <rect x="25.4" y="28" width="2.3" height="19" rx="1.15" fill="#fff" opacity=".55" />
      {/* label */}
      <rect x="27" y="38" width="10" height="8.5" rx="1.7" fill="#fff" opacity=".95" />
      <path
        d="M29.4 41.2h5.2M29.4 43.8h3.4"
        stroke="#9f1239"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      {/* sparkles */}
      <path d="M49.5 13.5l1.3 3.2 3.2 1.3-3.2 1.3-1.3 3.2-1.3-3.2-3.2-1.3 3.2-1.3z" fill="#fbbf24" />
      <path
        d="M13.5 22.5l.9 2.2 2.2.9-2.2.9-.9 2.2-.9-2.2-2.2-.9 2.2-.9z"
        fill="#fbbf24"
        opacity=".8"
      />
    </svg>
  );
}

function BooksArt() {
  return (
    <svg viewBox="0 0 64 64" role="img" aria-label="Books" className="h-full w-full">
      <defs>
        <linearGradient id="za-boo-a" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2dd4bf" />
          <stop offset="100%" stopColor="#0d9488" />
        </linearGradient>
        <linearGradient id="za-boo-b" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fb7185" />
          <stop offset="100%" stopColor="#e11d48" />
        </linearGradient>
        <linearGradient id="za-boo-c" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="57" rx="21" ry="3.2" fill="#1c1917" opacity=".1" />
      {/* bottom book (teal) */}
      <rect x="9" y="44.5" width="45" height="10.5" rx="2.6" fill="url(#za-boo-a)" />
      <rect x="48.5" y="46.6" width="4.4" height="6.3" rx="1" fill="#ecfdf5" />
      <rect x="14" y="48.6" width="19" height="2.2" rx="1.1" fill="#ccfbf1" opacity=".9" />
      {/* middle book (rose) */}
      <rect x="13" y="34" width="40" height="10.5" rx="2.6" fill="url(#za-boo-b)" />
      <rect x="47.4" y="36.1" width="4.4" height="6.3" rx="1" fill="#fff1f2" />
      <rect x="18" y="38.1" width="15" height="2.2" rx="1.1" fill="#ffe4e6" opacity=".95" />
      {/* top book (amber) */}
      <rect x="17" y="23.5" width="33" height="10.5" rx="2.6" fill="url(#za-boo-c)" />
      <rect x="44.4" y="25.6" width="4.4" height="6.3" rx="1" fill="#fffbeb" />
      <rect x="21.5" y="27.6" width="12.5" height="2.2" rx="1.1" fill="#fef3c7" opacity=".95" />
      {/* bookmark ribbon */}
      <path d="M38.5 23.5h4.2v10.2l-2.1-2-2.1 2z" fill="#9f1239" />
      {/* top-edge pages hint on top book */}
      <rect x="19.5" y="24.6" width="23" height="1.4" rx=".7" fill="#fff" opacity=".35" />
    </svg>
  );
}

function ComputersArt() {
  return (
    <svg viewBox="0 0 64 64" role="img" aria-label="Computers" className="h-full w-full">
      <defs>
        <linearGradient id="za-com-lid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
        <linearGradient id="za-com-scr" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="55%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#14b8a6" />
        </linearGradient>
        <linearGradient id="za-com-base" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="55.5" rx="23" ry="3" fill="#1c1917" opacity=".1" />
      {/* lid */}
      <rect x="13.5" y="11" width="37" height="27" rx="3" fill="url(#za-com-lid)" />
      <rect x="16" y="13.5" width="32" height="22" rx="1.8" fill="url(#za-com-scr)" />
      {/* screen shine */}
      <path d="M18 33.5 36 13.5h6L20 35.5z" fill="#fff" opacity=".18" />
      {/* code lines */}
      <rect x="19.5" y="17.5" width="12" height="2.5" rx="1.25" fill="#fff" opacity=".92" />
      <rect x="19.5" y="22" width="19" height="2.5" rx="1.25" fill="#fff" opacity=".62" />
      <rect x="22.5" y="26.5" width="15" height="2.5" rx="1.25" fill="#fff" opacity=".42" />
      {/* camera */}
      <circle cx="32" cy="12.4" r=".9" fill="#94a3b8" />
      {/* base */}
      <path
        d="M9.5 40.5h45l3.2 6.2c.7 1.4-.3 3-1.9 3H8.2c-1.6 0-2.6-1.6-1.9-3z"
        fill="url(#za-com-base)"
      />
      {/* trackpad notch */}
      <path d="M26.5 40.5h11l1.1 2.6H25.4z" fill="#64748b" opacity=".55" />
    </svg>
  );
}

function ElectronicsArt() {
  return (
    <svg viewBox="0 0 64 64" role="img" aria-label="Electronics" className="h-full w-full">
      <defs>
        <linearGradient id="za-ele-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3f3f46" />
          <stop offset="100%" stopColor="#18181b" />
        </linearGradient>
        <linearGradient id="za-ele-scr" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#0d9488" />
          <stop offset="60%" stopColor="#2dd4bf" />
          <stop offset="100%" stopColor="#99f6e4" />
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="58" rx="12" ry="2.6" fill="#1c1917" opacity=".1" />
      {/* body */}
      <rect x="20" y="6.5" width="24" height="49" rx="6" fill="url(#za-ele-body)" />
      {/* screen */}
      <rect x="22.4" y="10.5" width="19.2" height="41" rx="4" fill="url(#za-ele-scr)" />
      {/* punch-hole camera */}
      <circle cx="32" cy="13.8" r="1.5" fill="#134e4a" />
      <circle cx="32" cy="13.8" r=".6" fill="#5eead4" />
      {/* screen shine */}
      <path d="M24.5 46 40 16v9.5L29 48z" fill="#fff" opacity=".15" />
      {/* app tiles */}
      <rect x="26" y="20.5" width="5.2" height="5.2" rx="1.5" fill="#fff" opacity=".9" />
      <rect x="33" y="20.5" width="5.2" height="5.2" rx="1.5" fill="#fff" opacity=".55" />
      <rect x="26" y="28" width="5.2" height="5.2" rx="1.5" fill="#fff" opacity=".55" />
      <rect x="33" y="28" width="5.2" height="5.2" rx="1.5" fill="#fff" opacity=".9" />
      {/* home indicator */}
      <rect x="28.5" y="47.5" width="7" height="1.6" rx=".8" fill="#fff" opacity=".6" />
      {/* side buttons */}
      <rect x="44" y="19" width="1.6" height="6.5" rx=".8" fill="#71717a" />
      <rect x="18.4" y="17" width="1.6" height="5" rx=".8" fill="#71717a" />
      {/* signal arcs */}
      <path
        d="M45.5 8.2c3.4.9 6 3.5 6.9 6.9"
        stroke="#fbbf24"
        strokeWidth="1.9"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M46.6 3.6c5.3 1.3 9.3 5.4 10.5 10.7"
        stroke="#fbbf24"
        strokeWidth="1.9"
        fill="none"
        strokeLinecap="round"
        opacity=".5"
      />
    </svg>
  );
}

function FashionArt() {
  return (
    <svg viewBox="0 0 64 64" role="img" aria-label="Fashion" className="h-full w-full">
      <defs>
        <linearGradient id="za-fas-up" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fb7185" />
          <stop offset="100%" stopColor="#e11d48" />
        </linearGradient>
        <linearGradient id="za-fas-sole" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fffbeb" />
          <stop offset="100%" stopColor="#fcd34d" />
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="56.5" rx="25" ry="3.2" fill="#1c1917" opacity=".1" />
      {/* upper */}
      <path
        d="M9 46.5c-1.2-8.5 1.6-16.2 7.8-19.3 4.6-2.3 8.8-.6 13.4 2.5 5.6 3.8 12.8 6.7 20.4 8.2 3.9.8 7.5 2 8.6 4.4.8 1.8.7 4.2-1.2 4.2z"
        fill="url(#za-fas-up)"
      />
      {/* heel counter */}
      <path
        d="M9 46.5c-.9-6.8.9-13.2 4.9-16.7l4.6 3.3c-2.5 3.7-3.6 8.5-3.2 13.4z"
        fill="#9f1239"
        opacity=".6"
      />
      {/* toe cap */}
      <path
        d="M45 38.2c3.6.9 7.2 2 8.4 4.3.7 1.4.7 2.6.2 4H40.5c.2-3 1.8-6.1 4.5-8.3z"
        fill="#fff1f2"
        opacity=".9"
      />
      {/* amber stripe */}
      <path
        d="M15.5 46.5c4.2-6.8 9.4-11 15.6-13.1l1.9 2.7c-5.7 2.1-10.4 6.2-14 10.4z"
        fill="#fbbf24"
        opacity=".92"
      />
      {/* laces */}
      <path
        d="M19.5 32.5l6.5 3.1M22 28.7l6.5 3.1M24.7 25l6.2 3"
        stroke="#fff1f2"
        strokeWidth="2.3"
        strokeLinecap="round"
      />
      {/* collar */}
      <path
        d="M14.2 31.6c2.4-2.9 5.7-4.6 9-4.5l-1.4 3.2c-2.5-.1-5.1.4-7.6 1.3z"
        fill="#881337"
      />
      {/* sole */}
      <rect x="5" y="46.5" width="54" height="8" rx="4" fill="url(#za-fas-sole)" />
      <path d="M9 50.5h46" stroke="#f59e0b" strokeWidth="1.2" opacity=".5" />
      {/* tread */}
      <path
        d="M14 52.5v2.5M21 52.5v2.5M28 52.5v2.5M35 52.5v2.5M42 52.5v2.5M49 52.5v2.5"
        stroke="#d97706"
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity=".55"
      />
    </svg>
  );
}

function GroceryArt() {
  return (
    <svg viewBox="0 0 64 64" role="img" aria-label="Grocery" className="h-full w-full">
      <defs>
        <linearGradient id="za-gro-bas" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="57.5" rx="21" ry="3" fill="#1c1917" opacity=".1" />
      {/* handle */}
      <path
        d="M20.5 25.5c0-7.2 5.1-12.5 11.5-12.5s11.5 5.3 11.5 12.5"
        fill="none"
        stroke="#92400e"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      {/* baguette */}
      <g transform="rotate(22 40 15)">
        <rect x="30" y="12" width="20" height="6.4" rx="3.2" fill="#fcd34d" />
        <path
          d="M34 15.2l2.2-1.6M38.6 15.2l2.2-1.6M43.2 15.2l2.2-1.6"
          stroke="#d97706"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </g>
      {/* orange fruit */}
      <circle cx="21.5" cy="22.5" r="6.8" fill="#f97316" />
      <circle cx="19.4" cy="20.4" r="2" fill="#fff" opacity=".4" />
      <ellipse cx="20.6" cy="15.4" rx="3.6" ry="1.8" fill="#16a34a" transform="rotate(-26 20.6 15.4)" />
      {/* leafy green */}
      <ellipse cx="36.5" cy="21" rx="7.4" ry="4.8" fill="#4ade80" transform="rotate(16 36.5 21)" />
      <path
        d="M32.8 22.6c2-2.3 5.3-3.4 8.3-2.7"
        stroke="#15803d"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />
      {/* basket body */}
      <path
        d="M11 27h42l-3.1 21.6a5 5 0 0 1-5 4.4H19.1a5 5 0 0 1-5-4.4z"
        fill="url(#za-gro-bas)"
      />
      {/* rim */}
      <rect x="8.5" y="24.5" width="47" height="5.6" rx="2.8" fill="#92400e" />
      {/* weave */}
      <path
        d="M20.5 31.5l2 21M29 31.5l1 21M37.5 31.5l-1 21M46 31.5l-2 21"
        stroke="#b45309"
        strokeWidth="1.6"
        opacity=".5"
      />
      <path d="M12.9 39.5h38.2M14.4 46.5h35.2" stroke="#b45309" strokeWidth="1.6" opacity=".5" />
    </svg>
  );
}

function HomeKitchenArt() {
  return (
    <svg viewBox="0 0 64 64" role="img" aria-label="Home and Kitchen" className="h-full w-full">
      <defs>
        <linearGradient id="za-hom-body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2dd4bf" />
          <stop offset="55%" stopColor="#14b8a6" />
          <stop offset="100%" stopColor="#0f766e" />
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="57" rx="18" ry="3" fill="#1c1917" opacity=".1" />
      {/* steam */}
      <path
        d="M26.5 9.5c-1.8 2.1 1.8 3.5 0 5.6M33.5 8c-1.8 2.1 1.8 3.5 0 5.6"
        stroke="#cbd5e1"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        opacity=".85"
      />
      {/* handle (behind body) */}
      <path
        d="M23 18.5c-6.2 1.6-9.4 6.2-9.4 11.4 0 4.6 2.6 8.2 6.7 9.9"
        fill="none"
        stroke="#134e4a"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      {/* spout */}
      <path
        d="M44.5 29.5c4.2.9 7.3 3.8 8.3 7.8l-4.8 1.5c-.8-3-2.7-5-5.2-5.9z"
        fill="#0f766e"
      />
      {/* body */}
      <path
        d="M17 34.5c0-9.2 6.7-15.5 15-15.5s15 6.3 15 15.5V48c0 2.5-2 4.5-4.5 4.5h-21c-2.5 0-4.5-2-4.5-4.5z"
        fill="url(#za-hom-body)"
      />
      {/* lid */}
      <rect x="24" y="15" width="16" height="5" rx="2.5" fill="#115e59" />
      <circle cx="32" cy="13.4" r="2.6" fill="#0f766e" />
      {/* water window */}
      <rect x="38" y="36.5" width="5" height="12" rx="2.5" fill="#ccfbf1" opacity=".9" />
      {/* shine */}
      <rect x="21.5" y="27" width="2.6" height="19" rx="1.3" fill="#fff" opacity=".25" />
      {/* base plate */}
      <rect x="14.5" y="52" width="35" height="4" rx="2" fill="#57534e" />
    </svg>
  );
}

function SportsArt() {
  return (
    <svg viewBox="0 0 64 64" role="img" aria-label="Sports and Outdoors" className="h-full w-full">
      <defs>
        <linearGradient id="za-spo-bar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e7e5e4" />
          <stop offset="50%" stopColor="#a8a29e" />
          <stop offset="100%" stopColor="#78716c" />
        </linearGradient>
        <linearGradient id="za-spo-plate" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#52525b" />
          <stop offset="100%" stopColor="#27272a" />
        </linearGradient>
      </defs>
      <ellipse cx="33" cy="56" rx="18" ry="2.8" fill="#1c1917" opacity=".08" />
      <g transform="rotate(-24 32 34)">
        {/* bar */}
        <rect x="16.5" y="31.2" width="31" height="5.6" rx="2.8" fill="url(#za-spo-bar)" />
        {/* grip lines */}
        <path
          d="M26 31.7v4.6M32 31.7v4.6M38 31.7v4.6"
          stroke="#78716c"
          strokeWidth="1"
          opacity=".7"
        />
        {/* inner plates */}
        <rect x="12.5" y="26.5" width="6.5" height="15" rx="2.4" fill="url(#za-spo-plate)" />
        <rect x="45" y="26.5" width="6.5" height="15" rx="2.4" fill="url(#za-spo-plate)" />
        {/* outer plates */}
        <rect x="7" y="23" width="8" height="22" rx="3" fill="#3f3f46" />
        <rect x="49" y="23" width="8" height="22" rx="3" fill="#3f3f46" />
        {/* highlights */}
        <rect x="8.6" y="25" width="2" height="18" rx="1" fill="#fff" opacity=".22" />
        <rect x="50.6" y="25" width="2" height="18" rx="1" fill="#fff" opacity=".22" />
        <rect x="14" y="28.5" width="1.6" height="11" rx=".8" fill="#fff" opacity=".18" />
      </g>
      {/* motion arcs */}
      <path
        d="M13.5 48.5c3.3 2.7 7.4 3.9 11.6 3.5"
        stroke="#f97316"
        strokeWidth="2.3"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M9.5 43c4.7 3.9 10.7 5.7 16.8 5.1"
        stroke="#fb923c"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        opacity=".55"
      />
    </svg>
  );
}

function ToysGamesArt() {
  return (
    <svg viewBox="0 0 64 64" role="img" aria-label="Toys and Games" className="h-full w-full">
      <defs>
        <linearGradient id="za-toy-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#52525b" />
          <stop offset="100%" stopColor="#27272a" />
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="54" rx="21" ry="3" fill="#1c1917" opacity=".1" />
      {/* body */}
      <path
        d="M20.5 17.5h23c7.8 0 13 6.3 14 14.6.8 6.5-1.3 12.9-5.6 12.9-3.4 0-5.3-3.4-6.9-6.4-.8-1.5-1.4-2.6-2.5-2.6h-19c-1.1 0-1.7 1.1-2.5 2.6-1.6 3-3.5 6.4-6.9 6.4-4.3 0-6.4-6.4-5.6-12.9 1-8.3 6.2-14.6 14-14.6z"
        fill="url(#za-toy-body)"
      />
      {/* top highlight */}
      <path
        d="M22 20h20c3.9 0 6.9 1.6 9.2 4.3-2.9-1.7-6.1-2.3-9.2-2.3H22c-3.1 0-6.3.6-9.2 2.3C15.1 21.6 18.1 20 22 20z"
        fill="#fff"
        opacity=".14"
      />
      {/* d-pad */}
      <path d="M23 26.5h4.4v4.4h4.4v4.4h-4.4v4.4H23v-4.4h-4.4v-4.4H23z" fill="#e4e4e7" />
      <path d="M23 26.5h4.4v8.8H23z" fill="#f4f4f5" opacity=".6" />
      {/* action buttons */}
      <circle cx="40.4" cy="28.2" r="2.6" fill="#f43f5e" />
      <circle cx="45.8" cy="33.4" r="2.6" fill="#fbbf24" />
      <circle cx="40.4" cy="38.6" r="2.6" fill="#34d399" />
      <circle cx="35" cy="33.4" r="2.6" fill="#38bdf8" />
      {/* center lights */}
      <rect x="28.6" y="23.6" width="3.4" height="1.9" rx=".95" fill="#a1a1aa" />
      <rect x="34" y="23.6" width="3.4" height="1.9" rx=".95" fill="#a1a1aa" />
      {/* wrist sparks */}
      <path d="M8 20.5l1 2.4 2.4 1-2.4 1-1 2.4-1-2.4-2.4-1 2.4-1z" fill="#fbbf24" opacity=".85" />
      <path d="M56.5 47l.8 1.9 1.9.8-1.9.8-.8 1.9-.8-1.9-1.9-.8 1.9-.8z" fill="#fbbf24" opacity=".7" />
    </svg>
  );
}

const ART: Record<CategoryId, () => React.JSX.Element> = {
  audio: AudioArt,
  beauty: BeautyArt,
  books: BooksArt,
  computers: ComputersArt,
  electronics: ElectronicsArt,
  fashion: FashionArt,
  grocery: GroceryArt,
  "home-kitchen": HomeKitchenArt,
  "sports-outdoors": SportsArt,
  "toys-games": ToysGamesArt,
};

export function CategoryArt({ id }: { id: CategoryId }) {
  const Art = ART[id] ?? AudioArt;
  return <Art />;
}
