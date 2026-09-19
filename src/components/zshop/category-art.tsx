import type { CategoryId } from "@/lib/zshop/types";

/**
 * Category artwork — Z Shop India (mobile store).
 * SHOP.CO monochrome system: black/gray shapes with restrained gold accents.
 * All illustrations live on a 64x64 viewBox with a soft ground shadow.
 */

function Ground({ cx = 32, cy = 56, rx = 20 }: { cx?: number; cy?: number; rx?: number }) {
  return <ellipse cx={cx} cy={cy} rx={rx} ry="2.6" fill="#171717" opacity=".08" />;
}

function SmartphonesArt() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden>
      <Ground />
      {/* back phone */}
      <rect x="20" y="8" width="20" height="40" rx="4.5" fill="#d4d4d8" />
      <rect x="21.8" y="10.5" width="16.4" height="35" rx="3" fill="#f4f4f5" />
      {/* front phone */}
      <rect x="26" y="14" width="21" height="40" rx="4.5" fill="#0a0a0a" />
      <rect x="27.8" y="16.5" width="17.4" height="35" rx="3" fill="#3f3f46" />
      <rect x="27.8" y="16.5" width="17.4" height="35" rx="3" fill="#18181b" opacity=".55" />
      {/* dynamic-island + screen glints */}
      <rect x="33.5" y="18.6" width="6" height="2" rx="1" fill="#0a0a0a" />
      <rect x="30" y="23.5" width="13" height="1.6" rx=".8" fill="#e4e4e7" opacity=".5" />
      <rect x="30" y="27" width="9" height="1.6" rx=".8" fill="#e4e4e7" opacity=".3" />
      {/* camera dots on back phone */}
      <circle cx="30" cy="42" r="1.6" fill="#a1a1aa" />
      <circle cx="34.5" cy="42" r="1.6" fill="#a1a1aa" />
    </svg>
  );
}

function IphoneArt() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden>
      <Ground />
      {/* body */}
      <rect x="21" y="8" width="22" height="44" rx="5" fill="#0a0a0a" />
      <rect x="22.5" y="9.5" width="19" height="41" rx="3.8" fill="#fafafa" />
      {/* camera module */}
      <rect x="25" y="12" width="11.5" height="11.5" rx="3.5" fill="#e4e4e7" />
      <circle cx="28.6" cy="15.6" r="2" fill="#18181b" />
      <circle cx="33.4" cy="15.6" r="2" fill="#18181b" />
      <circle cx="28.6" cy="20.2" r="2" fill="#18181b" />
      <circle cx="33.4" cy="20.2" r="1.2" fill="#ffc633" />
      {/* screen */}
      <rect x="25" y="26.5" width="14" height="21" rx="1.5" fill="#f4f4f5" />
      <rect x="27" y="30" width="10" height="1.4" rx=".7" fill="#d4d4d8" />
      <rect x="27" y="33.5" width="7" height="1.4" rx=".7" fill="#e4e4e7" />
      {/* side button */}
      <rect x="43" y="20" width="1.4" height="5" rx=".7" fill="#0a0a0a" />
    </svg>
  );
}

function FeaturePhoneArt() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden>
      <Ground />
      {/* body */}
      <rect x="22" y="7" width="20" height="46" rx="5" fill="#0a0a0a" />
      <rect x="23.5" y="8.5" width="17" height="43" rx="3.8" fill="#27272a" />
      {/* antenna */}
      <rect x="38.5" y="4" width="2.6" height="6" rx="1.2" fill="#0a0a0a" />
      {/* screen */}
      <rect x="26" y="11" width="12" height="8" rx="1.2" fill="#d4d4d8" />
      <rect x="26" y="11" width="12" height="3.4" rx="1.2" fill="#f4f4f5" opacity=".7" />
      {/* d-pad */}
      <circle cx="32" cy="25.5" r="3.4" fill="#52525b" />
      <circle cx="32" cy="25.5" r="1.4" fill="#a1a1aa" />
      {/* keypad 3x4 */}
      {[0, 1, 2, 3].map((row) =>
        [0, 1, 2].map((col) => (
          <rect
            key={`${row}-${col}`}
            x={25.4 + col * 4.9}
            y={31.5 + row * 4.9}
            width="4"
            height="3.9"
            rx="1.1"
            fill={row + col === 4 ? "#ffc633" : "#e4e4e7"}
          />
        ))
      )}
    </svg>
  );
}

function TabletsArt() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden>
      <Ground />
      <rect x="12" y="10" width="40" height="44" rx="4.5" fill="#0a0a0a" />
      <rect x="14.2" y="12.2" width="35.6" height="39.6" rx="2.8" fill="#fafafa" />
      {/* app grid */}
      {[0, 1, 2, 3].map((row) =>
        [0, 1, 2, 3].map((col) => (
          <rect
            key={`${row}-${col}`}
            x={19.5 + col * 7.4}
            y={18 + row * 7.4}
            width="4.6"
            height="4.6"
            rx="1.2"
            fill={row === 0 && col === 0 ? "#ffc633" : "#d4d4d8"}
          />
        ))
      )}
      {/* camera */}
      <circle cx="32" cy="49.6" r="1" fill="#a1a1aa" />
    </svg>
  );
}

function WearablesArt() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden>
      <Ground />
      {/* straps */}
      <path d="M25 10h14v10H25z" fill="#3f3f46" />
      <path d="M25 44h14v10H25z" fill="#3f3f46" />
      <path d="M25 10h14v4H25zM25 50h14v4H25z" fill="#27272a" />
      {/* case */}
      <rect x="20" y="19" width="24" height="26" rx="7" fill="#0a0a0a" />
      <rect x="22.2" y="21.2" width="19.6" height="21.6" rx="5.4" fill="#18181b" />
      {/* time + rings */}
      <text
        x="32"
        y="34.5"
        textAnchor="middle"
        fontSize="8.5"
        fontWeight="800"
        fill="#fafafa"
        fontFamily="system-ui, sans-serif"
      >
        10:09
      </text>
      <rect x="26.5" y="38" width="11" height="1.6" rx=".8" fill="#ffc633" />
      {/* crown */}
      <rect x="44" y="27" width="2.6" height="6" rx="1.3" fill="#0a0a0a" />
    </svg>
  );
}

function AudioArt() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden>
      <Ground />
      {/* case */}
      <path d="M18 30c0-6.6 6.3-11 14-11s14 4.4 14 11v6c0 4.4-3.6 8-8 8H26c-4.4 0-8-3.6-8-8v-6z" fill="#0a0a0a" />
      <path d="M18 33h28v3c0 4.4-3.6 8-8 8H26c-4.4 0-8-3.6-8-8v-3z" fill="#27272a" />
      {/* buds */}
      <circle cx="26.5" cy="26.5" r="4.6" fill="#fafafa" />
      <circle cx="26.5" cy="26.5" r="1.8" fill="#737373" />
      <circle cx="37.5" cy="26.5" r="4.6" fill="#fafafa" />
      <circle cx="37.5" cy="26.5" r="1.8" fill="#737373" />
      {/* pairing light */}
      <circle cx="32" cy="40.5" r="1.3" fill="#ffc633" />
    </svg>
  );
}

function ChargersArt() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden>
      <Ground />
      {/* body */}
      <rect x="20" y="18" width="24" height="28" rx="5" fill="#fafafa" stroke="#0a0a0a" strokeWidth="2" />
      {/* prongs */}
      <rect x="27" y="10" width="3" height="8" rx="1.2" fill="#0a0a0a" />
      <rect x="34" y="10" width="3" height="8" rx="1.2" fill="#0a0a0a" />
      {/* ports */}
      <rect x="25.5" y="23.5" width="5" height="8" rx="1.4" fill="#0a0a0a" />
      <rect x="33.5" y="23.5" width="5" height="8" rx="1.4" fill="#0a0a0a" />
      <rect x="25.5" y="23.5" width="2" height="8" rx="1" fill="#3f3f46" />
      <rect x="33.5" y="23.5" width="2" height="8" rx="1" fill="#3f3f46" />
      {/* bolt */}
      <path d="M33.6 35.5l-4.8 6h3.2l-1.4 5 5-6.4h-3.2l1.2-4.6z" fill="#ffc633" />
    </svg>
  );
}

function CablesArt() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden>
      <Ground />
      {/* coiled cable */}
      <path
        d="M14 44c-3-8 6-13 12-9s-2 12 6 13 14-4 12-11c-1.6-5.4-8-5-9 0s5 8 10 6"
        fill="none"
        stroke="#0a0a0a"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <path
        d="M14 44c-3-8 6-13 12-9s-2 12 6 13 14-4 12-11c-1.6-5.4-8-5-9 0s5 8 10 6"
        fill="none"
        stroke="#3f3f46"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeDasharray="2.4 4"
      />
      {/* connector A (USB-C) */}
      <rect x="42" y="38" width="9" height="6" rx="2.4" fill="#0a0a0a" transform="rotate(18 46.5 41)" />
      {/* connector B (USB-A) */}
      <rect x="9.5" y="41.5" width="8.5" height="6.5" rx="1.6" fill="#3f3f46" transform="rotate(-24 13.7 44.7)" />
      <rect x="11.2" y="43.4" width="4.4" height="2.6" rx=".6" fill="#fafafa" transform="rotate(-24 13.4 44.7)" />
      {/* speed sparks */}
      <path d="M50 28l1.4 3 3 1.4-3 1.4-1.4 3-1.4-3-3-1.4 3-1.4z" fill="#ffc633" />
    </svg>
  );
}

function PowerbanksArt() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden>
      <Ground />
      <rect x="12" y="20" width="40" height="24" rx="6" fill="#0a0a0a" />
      <rect x="12" y="20" width="40" height="10" rx="6" fill="#27272a" opacity=".8" />
      {/* ports */}
      <rect x="18" y="33" width="7" height="4.6" rx="1.2" fill="#3f3f46" />
      <rect x="18" y="33" width="2.6" height="4.6" rx="1" fill="#a1a1aa" />
      <rect x="27" y="33" width="7" height="4.6" rx="1.2" fill="#3f3f46" />
      {/* led indicators */}
      <circle cx="42" cy="35.4" r="1.2" fill="#ffc633" />
      <circle cx="46" cy="35.4" r="1.2" fill="#52525b" />
      <circle cx="50" cy="35.4" r="1.2" fill="#52525b" />
      {/* bolt badge */}
      <path d="M32 24l-4.4 7.4h3.2l-1.4 6.2 6.2-8.2h-3.4l1.4-5.4z" fill="#ffc633" />
    </svg>
  );
}

function CasesArt() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden>
      <Ground />
      {/* case body */}
      <rect x="20" y="8" width="24" height="46" rx="5.5" fill="#27272a" />
      <rect x="22.4" y="10.4" width="19.2" height="41.2" rx="3.6" fill="#3f3f46" />
      {/* camera cutout */}
      <rect x="25.5" y="12.5" width="10.5" height="10.5" rx="3" fill="#0a0a0a" />
      <circle cx="28.6" cy="15.8" r="1.9" fill="#52525b" />
      <circle cx="33.2" cy="15.8" r="1.9" fill="#52525b" />
      <circle cx="28.6" cy="20.2" r="1.9" fill="#52525b" />
      {/* inner clear window */}
      <rect x="25.5" y="27" width="13" height="20" rx="2" fill="#18181b" opacity=".65" />
      {/* raised corner bumpers */}
      <path d="M20 13.5a5.5 5.5 0 015.5-5.5h.5v3h-.5a2.5 2.5 0 00-2.5 2.5v.5h-3z" fill="#0a0a0a" />
      <path d="M44 13.5A5.5 5.5 0 0038.5 8H38v3h.5a2.5 2.5 0 012.5 2.5v.5h3z" fill="#0a0a0a" />
    </svg>
  );
}

function ScreenProtectionArt() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden>
      <Ground />
      {/* phone behind */}
      <rect x="24" y="8" width="22" height="44" rx="4.5" fill="#0a0a0a" />
      <rect x="25.6" y="9.6" width="18.8" height="40.8" rx="3.2" fill="#f4f4f5" />
      {/* glass sheet applying */}
      <path d="M15 15.5l14-5.4 3.2 8.2-14 5.4z" fill="#e4e4e7" opacity=".92" />
      <path d="M15 15.5l14-5.4 1 2.6-14 5.4z" fill="#fafafa" />
      {/* squeegee card */}
      <rect x="12" y="26" width="12" height="8" rx="1.6" fill="#0a0a0a" transform="rotate(-12 18 30)" />
      {/* bubbles being pushed out */}
      <circle cx="24" cy="24.5" r="1.1" fill="#a1a1aa" />
      <circle cx="20.5" cy="22.5" r=".8" fill="#d4d4d8" />
      {/* sparkle */}
      <path d="M44 18l1.6 3.6 3.6 1.6-3.6 1.6L44 28.4l-1.6-3.6-3.6-1.6 3.6-1.6z" fill="#ffc633" />
    </svg>
  );
}

function StandsMountsArt() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden>
      <Ground />
      {/* phone on stand */}
      <rect x="22" y="10" width="20" height="34" rx="4" fill="#0a0a0a" transform="rotate(-8 32 27)" />
      <rect x="23.8" y="11.8" width="16.4" height="30.4" rx="2.6" fill="#fafafa" transform="rotate(-8 32 27)" />
      <rect x="26.5" y="16" width="10" height="1.5" rx=".75" fill="#d4d4d8" transform="rotate(-8 31.5 16.7)" />
      <rect x="26.5" y="20" width="7" height="1.5" rx=".75" fill="#e4e4e7" transform="rotate(-8 30 20.7)" />
      {/* stand base + arm */}
      <path d="M14 47c0-2 1.6-3.6 3.6-3.6h28.8c2 0 3.6 1.6 3.6 3.6v1.4H14v-1.4z" fill="#0a0a0a" />
      <path d="M28 44l10-9 4 4.4L36 45z" fill="#3f3f46" />
      {/* grip pads */}
      <rect x="26.5" y="45.6" width="11" height="2" rx="1" fill="#52525b" />
    </svg>
  );
}

function CreatorGearArt() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden>
      <Ground />
      {/* phone in clamp */}
      <rect x="24" y="7" width="17" height="30" rx="3.4" fill="#0a0a0a" />
      <rect x="25.6" y="8.6" width="13.8" height="26.8" rx="2.2" fill="#f4f4f5" />
      {/* clamp jaw */}
      <path d="M21.5 12h3v9h-3zM40.5 12h3v9h-3z" fill="#27272a" />
      {/* gimbal arm + handle */}
      <path d="M28.5 37h8l1.5 6h-11z" fill="#3f3f46" />
      <rect x="25.5" y="43" width="14" height="12" rx="4" fill="#0a0a0a" />
      <circle cx="32.5" cy="49" r="2.2" fill="#52525b" />
      <rect x="28" y="52.8" width="9" height="1.3" rx=".65" fill="#ffc633" />
    </svg>
  );
}

function CarAccessoriesArt() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden>
      <Ground />
      {/* vent slats */}
      <rect x="8" y="12" width="26" height="16" rx="3" fill="#27272a" />
      <rect x="10.5" y="15" width="21" height="2" rx="1" fill="#52525b" />
      <rect x="10.5" y="19" width="21" height="2" rx="1" fill="#52525b" />
      <rect x="10.5" y="23" width="21" height="2" rx="1" fill="#52525b" />
      {/* mount arm */}
      <path d="M34 20h6l6 4v5h-4v-3l-3-2h-5z" fill="#0a0a0a" />
      {/* magnet head + phone */}
      <rect x="40" y="14" width="13" height="22" rx="3" fill="#0a0a0a" />
      <rect x="41.6" y="15.6" width="9.8" height="18.8" rx="1.8" fill="#fafafa" />
      <circle cx="46.5" cy="27" r="1.4" fill="#ffc633" />
      {/* navigation arrow on screen */}
      <path d="M46.5 18.5l3.4 7h-2.4l.6 4-3.4-5h2.4l-1.6-3.2z" fill="#0a0a0a" opacity=".75" />
    </svg>
  );
}

function StorageArt() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden>
      <Ground />
      {/* SD adapter */}
      <rect x="17" y="14" width="24" height="34" rx="2.5" fill="#fafafa" stroke="#0a0a0a" strokeWidth="2" />
      {/* contact pins */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x={20 + i * 3.4} y="16.5" width="1.8" height="4.5" rx=".5" fill="#ffc633" />
      ))}
      {/* label */}
      <rect x="20.5" y="26" width="17" height="14" rx="1.4" fill="#e4e4e7" />
      <rect x="23" y="29.5" width="12" height="2" rx="1" fill="#737373" />
      <rect x="23" y="33.5" width="8" height="2" rx="1" fill="#a1a1aa" />
      {/* microSD leaning */}
      <rect x="39" y="30" width="13" height="18" rx="2.2" fill="#0a0a0a" transform="rotate(8 45.5 39)" />
      <path d="M39 30h13v5h-13z" fill="#27272a" transform="rotate(8 45.5 39)" opacity=".001" />
      <path d="M42 32.6l1.8 2.6h-1.2l.5 3.4-2.8-4h1.4l-1-2z" fill="#ffc633" transform="rotate(8 45.5 39)" />
    </svg>
  );
}

function GamingArt() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden>
      <Ground />
      {/* phone */}
      <rect x="20" y="10" width="22" height="42" rx="4.4" fill="#0a0a0a" />
      <rect x="21.8" y="12.4" width="18.4" height="37.2" rx="2.8" fill="#18181b" />
      {/* crosshair */}
      <circle cx="31" cy="29" r="7.5" fill="none" stroke="#fafafa" strokeWidth="1.6" />
      <path d="M31 19v5M31 34v5M21 29h5M36 29h5" stroke="#fafafa" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="31" cy="29" r="1.6" fill="#ffc633" />
      {/* triggers */}
      <path d="M14 16l8-4v9l-8-1z" fill="#ff3333" opacity=".9" />
      <path d="M50 16l-8-4v9l8-1z" fill="#ff3333" opacity=".9" />
      {/* thumb circles */}
      <circle cx="26.5" cy="44.5" r="3.4" fill="none" stroke="#52525b" strokeWidth="1.6" />
      <circle cx="37.5" cy="44.5" r="3.4" fill="none" stroke="#52525b" strokeWidth="1.6" />
    </svg>
  );
}

function ProductivityArt() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden>
      <Ground />
      {/* hub body */}
      <rect x="10" y="24" width="36" height="18" rx="4.5" fill="#0a0a0a" />
      <rect x="10" y="24" width="36" height="7" rx="4.5" fill="#27272a" opacity=".9" />
      {/* ports on face */}
      <rect x="15" y="33.5" width="8.5" height="3.4" rx="1" fill="#52525b" />
      <rect x="26" y="33.5" width="8.5" height="3.4" rx="1" fill="#52525b" />
      <rect x="37" y="33.5" width="6.5" height="3.4" rx="1" fill="#52525b" />
      <rect x="15" y="33.5" width="2.6" height="3.4" rx=".8" fill="#a1a1aa" />
      {/* host cable to right */}
      <path d="M46 33c6 0 8-4 12-4" fill="none" stroke="#0a0a0a" strokeWidth="3" strokeLinecap="round" />
      <rect x="56" y="26.6" width="4.6" height="4.8" rx="1.2" fill="#0a0a0a" />
      {/* stylus crossing top */}
      <rect x="24" y="9" width="3.2" height="14" rx="1.6" fill="#fafafa" stroke="#0a0a0a" strokeWidth="1.4" transform="rotate(-24 25.6 16)" />
      <path d="M20.4 7.6l1.6-.7.8 1.8-1.6.7z" fill="#0a0a0a" transform="rotate(-24 21.2 8.5)" />
    </svg>
  );
}

function ConnectivityArt() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden>
      <Ground />
      {/* hotspot device */}
      <rect x="20" y="30" width="24" height="22" rx="5" fill="#fafafa" stroke="#0a0a0a" strokeWidth="2" />
      <circle cx="32" cy="41" r="2.4" fill="#0a0a0a" />
      <rect x="29" y="47" width="6" height="1.6" rx=".8" fill="#ffc633" />
      {/* signal waves */}
      <path d="M22 22a14 14 0 0120 0" fill="none" stroke="#0a0a0a" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M26 27a8 8 0 0112 0" fill="none" stroke="#0a0a0a" strokeWidth="2.4" strokeLinecap="round" />
      {/* SIM chip corner */}
      <rect x="38" y="33.5" width="4.4" height="4.4" rx=".8" fill="#ffc633" />
    </svg>
  );
}

function CleaningCareArt() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden>
      <Ground />
      {/* spray bottle */}
      <path d="M20 30h8v4.5c3 1.2 5 4 5 7.5v6c0 2.8-2.2 5-5 5h-8c-2.8 0-5-2.2-5-5v-6c0-3.5 2-6.3 5-7.5V30z" fill="#fafafa" stroke="#0a0a0a" strokeWidth="2" />
      <rect x="21" y="22" width="6" height="8" rx="1.4" fill="#e4e4e7" />
      <path d="M27 22h5l3-4 1.5 2.5-2.5 1.5h-7z" fill="#0a0a0a" />
      <rect x="22" y="38" width="4" height="9" rx="1.6" fill="#ffc633" />
      {/* cloth */}
      <path d="M42 36l9 3-2 10-9-3 2-10z" fill="#27272a" />
      <path d="M42 36l9 3-.7 3.4-9-3 .7-3.4z" fill="#3f3f46" />
      {/* sparkle */}
      <path d="M46 20l1.5 3.4 3.4 1.5-3.4 1.5L46 29.8l-1.5-3.4-3.4-1.5 3.4-1.5z" fill="#ffc633" />
    </svg>
  );
}

function RefurbishedArt() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden>
      <Ground />
      {/* phone */}
      <rect x="20" y="8" width="22" height="42" rx="4.5" fill="#0a0a0a" />
      <rect x="21.8" y="10" width="18.4" height="38" rx="3" fill="#f4f4f5" />
      {/* certification ribbon */}
      <circle cx="42" cy="44" r="9.5" fill="#fafafa" stroke="#0a0a0a" strokeWidth="2" />
      <path
        d="M42 37.5a6.5 6.5 0 11-4.6 1.9 6.47 6.47 0 014.6-1.9z"
        fill="none"
        stroke="#0a0a0a"
        strokeWidth="0"
      />
      <path d="M38.5 44.5l2.6 2.6 4.6-5" fill="none" stroke="#00a844" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M36 51.5l-2 6 4-2 2 3 2-7" fill="#0a0a0a" />
      {/* screen lines */}
      <rect x="25" y="15" width="12" height="1.5" rx=".75" fill="#d4d4d8" />
      <rect x="25" y="19" width="8" height="1.5" rx=".75" fill="#e4e4e7" />
    </svg>
  );
}

const ART: Record<CategoryId, () => React.JSX.Element> = {
  smartphones: SmartphonesArt,
  iphone: IphoneArt,
  "feature-phones": FeaturePhoneArt,
  tablets: TabletsArt,
  wearables: WearablesArt,
  audio: AudioArt,
  chargers: ChargersArt,
  cables: CablesArt,
  powerbanks: PowerbanksArt,
  cases: CasesArt,
  "screen-protection": ScreenProtectionArt,
  "stands-mounts": StandsMountsArt,
  "creator-gear": CreatorGearArt,
  "car-accessories": CarAccessoriesArt,
  storage: StorageArt,
  gaming: GamingArt,
  productivity: ProductivityArt,
  connectivity: ConnectivityArt,
  "cleaning-care": CleaningCareArt,
  refurbished: RefurbishedArt,
};

export function CategoryArt({ id }: { id: CategoryId }) {
  const Art = ART[id] ?? SmartphonesArt;
  return <Art />;
}
