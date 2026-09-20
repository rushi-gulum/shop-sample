"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Banknote,
  CheckCircle2,
  Loader2,
  MapPin,
  PencilLine,
  PackageCheck,
  Truck,
  XCircle,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useZShop } from "@/lib/zshop/store";
import {
  DEMO_PINCODES,
  PINCODE_REGEX,
  deliveryEtaFromToday,
  lookupPincode,
  type PincodeInfo,
} from "@/lib/zshop/pincode";

/**
 * Home-page "pincode to check location" strip.
 *
 * Slim single-row entry above the hero: a 6-digit India PIN resolves into a
 * delivery location, ETA, COD availability and serviceability summary.
 * Shares the persisted delivery location with the PDP checker and header
 * ("Deliver to <City> <PIN>"), so a PIN checked here follows the shopper
 * across product pages, cart and checkout.
 */
export function DeliveryStrip() {
  const deliveryPin = useZShop((s) => s.deliveryPin);
  const setDeliveryLocation = useZShop((s) => s.setDeliveryLocation);
  const clearDeliveryLocation = useZShop((s) => s.clearDeliveryLocation);

  // transient UI state
  const [input, setInput] = useState("");
  const [checking, setChecking] = useState(false);
  const [invalid, setInvalid] = useState(false);
  /** a locally-checked PIN that is NOT persisted (unservicable results) */
  const [pendingPin, setPendingPin] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Derived state — the persisted store PIN is the single source of truth.
  const storeInfo = useMemo(
    () =>
      deliveryPin && PINCODE_REGEX.test(deliveryPin) ? lookupPincode(deliveryPin) : null,
    [deliveryPin]
  );
  const pendingInfo = useMemo(
    () => (pendingPin ? lookupPincode(pendingPin) : null),
    [pendingPin]
  );

  const info: PincodeInfo | null =
    pendingInfo ?? (storeInfo?.serviceable ? storeInfo : null);
  const status =
    checking
      ? "checking"
      : invalid
        ? "invalid"
        : info
          ? info.serviceable
            ? "ok"
            : "unservicable"
          : "idle";

  const runCheck = (pin: string) => {
    const trimmed = pin.trim();
    if (!PINCODE_REGEX.test(trimmed)) {
      setInvalid(true);
      return;
    }
    setChecking(true);
    setInvalid(false);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setChecking(false);
      const result = lookupPincode(trimmed);
      if (!result.serviceable) {
        setPendingPin(trimmed);
      } else {
        setPendingPin(null);
        setDeliveryLocation(result.pin, result.city);
      }
    }, 650);
  };

  const reset = () => {
    clearDeliveryLocation();
    setPendingPin(null);
    setInvalid(false);
    setChecking(false);
    setInput("");
  };

  return (
    <section
      aria-label="Check delivery location by PIN code"
      data-testid="home-pincode-strip"
      className="border-b border-neutral-200 bg-neutral-50/80 dark:border-neutral-200 dark:bg-neutral-50"
    >
      <div className="mx-auto max-w-7xl px-3 py-2.5 sm:px-6">
        {status !== "ok" ? (
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <div className="flex min-w-0 flex-1 items-center gap-2.5">
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neutral-950 text-white"
                aria-hidden
              >
                <MapPin className="h-4.5 w-4.5" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-bold leading-tight">
                  Check delivery to your location
                </p>
                <p className="text-xs leading-tight text-neutral-500">
                  Enter your PIN for delivery date, COD &amp; serviceability
                </p>
              </div>
            </div>
            <form
              className="flex w-full items-center gap-2 sm:ml-auto sm:w-auto"
              onSubmit={(e) => {
                e.preventDefault();
                runCheck(input);
              }}
            >
              <input
                value={input}
                onChange={(e) => {
                  setInput(e.target.value.replace(/\D/g, "").slice(0, 6));
                  if (invalid) setInvalid(false);
                }}
                inputMode="numeric"
                autoComplete="postal-code"
                maxLength={6}
                placeholder="Enter 6-digit PIN"
                aria-label="Delivery PIN code"
                aria-invalid={invalid}
                aria-describedby={invalid ? "home-pincode-error" : undefined}
                data-testid="home-pincode-input"
                className={cn(
                  "h-9 w-full min-w-0 flex-1 rounded-lg border bg-white px-3 text-sm font-semibold tracking-widest text-neutral-900 outline-none placeholder:font-normal placeholder:tracking-normal placeholder:text-neutral-400 focus:ring-2 focus:ring-neutral-950/30 sm:w-40 sm:flex-none",
                  invalid ? "border-sale" : "border-neutral-300"
                )}
              />
              <button
                type="submit"
                disabled={checking || input.length !== 6}
                className="flex h-9 shrink-0 items-center gap-1.5 rounded-lg bg-neutral-950 px-3.5 text-sm font-bold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {checking ? (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                ) : (
                  <PackageCheck className="h-4 w-4" aria-hidden />
                )}
                Check
              </button>
            </form>
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neutral-950 text-white"
              aria-hidden
            >
              <MapPin className="h-4.5 w-4.5" />
            </span>
            <p
              className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-sm"
              aria-live="polite"
              data-testid="home-pincode-result"
            >
              <span>
                Delivering to{" "}
                <span className="font-bold" data-testid="home-pincode-city">
                  {info?.city}, {info?.state}
                </span>{" "}
                <span className="font-semibold tracking-widest text-neutral-500">
                  {info?.pin}
                </span>
              </span>
              <span className="hidden text-neutral-300 sm:inline" aria-hidden>
                |
              </span>
              <span className="flex items-center gap-1">
                <Truck className="h-3.5 w-3.5 shrink-0 text-neutral-900" aria-hidden />
                Delivery by{" "}
                <span className="font-black" data-testid="home-pincode-eta">
                  {info ? deliveryEtaFromToday(info.maxDays) : ""}
                </span>
                {info?.express && (
                  <span className="flex items-center gap-0.5 rounded-full bg-neutral-950 px-2 py-0.5 text-[10px] font-bold text-white">
                    <Zap className="h-2.5 w-2.5" aria-hidden /> Express
                  </span>
                )}
              </span>
              <span className="hidden text-neutral-300 sm:inline" aria-hidden>
                |
              </span>
              <span className="flex items-center gap-1">
                {info?.cod ? (
                  <>
                    <Banknote className="h-3.5 w-3.5 shrink-0 text-success-600" aria-hidden />
                    <span className="text-success-700">COD available</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-3.5 w-3.5 shrink-0 text-neutral-400" aria-hidden />
                    <span className="text-neutral-600">Prepaid only</span>
                  </>
                )}
              </span>
            </p>
            <button
              className="ml-auto flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-xs font-bold text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-950"
              onClick={reset}
            >
              <PencilLine className="h-3.5 w-3.5" aria-hidden />
              Change
            </button>
          </div>
        )}

        {/* quick metro chips (idle state only) */}
        {status === "idle" && (
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
              Try:
            </span>
            {DEMO_PINCODES.map(({ pin, label }) => (
              <button
                key={pin}
                className="rounded-full border border-neutral-300 bg-white px-2.5 py-0.5 text-xs font-semibold text-neutral-700 transition hover:border-neutral-950 hover:text-neutral-950"
                onClick={() => {
                  setInput(pin);
                  runCheck(pin);
                }}
              >
                {pin} {label}
              </button>
            ))}
          </div>
        )}

        {/* error states */}
        {status === "invalid" && (
          <p
            id="home-pincode-error"
            role="alert"
            className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-sale"
            data-testid="home-pincode-error"
          >
            <XCircle className="h-4 w-4" aria-hidden />
            Please enter a valid 6-digit India PIN (e.g. 400050).
          </p>
        )}
        {status === "unservicable" && info && (
          <div
            role="alert"
            className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-lg border border-neutral-200 bg-white px-3 py-2"
            data-testid="home-pincode-unservicable"
          >
            <p className="flex items-center gap-1.5 text-sm font-bold">
              <XCircle className="h-4 w-4 shrink-0 text-sale" aria-hidden />
              No delivery to {info.city}, {info.state} — {info.pin} yet
            </p>
            <p className="text-xs text-neutral-600">
              This route isn&apos;t serviceable right now — our network expands monthly. Try a
              nearby PIN.
            </p>
            <button
              className="ml-auto flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-xs font-bold text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-950"
              onClick={reset}
            >
              <PencilLine className="h-3.5 w-3.5" aria-hidden />
              Change
            </button>
          </div>
        )}

        {/* subtle confirmation footer on ok */}
        {status === "ok" && info && (
          <p className="mt-1.5 flex items-center gap-1.5 text-[11px] text-neutral-500">
            <CheckCircle2 className="h-3 w-3 text-success-600" aria-hidden />
            Prices, delivery date &amp; COD across the site now reflect {info.city} {info.pin}.
          </p>
        )}
      </div>
    </section>
  );
}
