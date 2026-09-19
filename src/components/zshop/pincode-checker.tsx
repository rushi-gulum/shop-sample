"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  BadgeCheck,
  Banknote,
  CheckCircle2,
  Loader2,
  MapPin,
  PackageCheck,
  PencilLine,
  RefreshCcw,
  Repeat2,
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

interface PincodeCheckerProps {
  /** product price in INR — used to decide the free-delivery line */
  price: number;
}

export function PincodeChecker({ price }: PincodeCheckerProps) {
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
    if (!PINCODE_REGEX.test(pin)) {
      setInvalid(true);
      return;
    }
    setChecking(true);
    setInvalid(false);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setChecking(false);
      const result = lookupPincode(pin);
      if (!result.serviceable) {
        setPendingPin(pin);
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

  const freeShip = price >= 499;

  return (
    <section
      aria-label="Check delivery for your PIN code"
      data-testid="pincode-checker"
      className="mt-4 rounded-xl border border-neutral-200 bg-neutral-50/70 p-4 dark:border-neutral-200 dark:bg-neutral-50"
    >
      {/* header row / input */}
      <div className="flex flex-wrap items-center gap-3">
        <MapPin className="h-5 w-5 shrink-0 text-neutral-900" aria-hidden />
        {status !== "ok" ? (
          <>
            <p className="min-w-0 flex-1 text-sm font-bold">Check delivery &amp; COD at your PIN</p>
            <form
              className="flex w-full items-center gap-2 sm:w-auto"
              onSubmit={(e) => {
                e.preventDefault();
                runCheck(input.trim());
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
                aria-describedby={invalid ? "pincode-error" : undefined}
                className={cn(
                  "h-10 w-full min-w-0 flex-1 rounded-lg border bg-white px-3 text-sm font-semibold tracking-widest text-neutral-900 outline-none placeholder:font-normal placeholder:tracking-normal placeholder:text-neutral-400 focus:ring-2 focus:ring-neutral-950/30 sm:w-44 sm:flex-none",
                  invalid ? "border-sale" : "border-neutral-300"
                )}
              />
              <button
                type="submit"
                disabled={checking || input.length !== 6}
                className="flex h-10 shrink-0 items-center gap-1.5 rounded-lg bg-neutral-950 px-4 text-sm font-bold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {checking ? (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                ) : (
                  <PackageCheck className="h-4 w-4" aria-hidden />
                )}
                Check
              </button>
            </form>
          </>
        ) : (
          <>
            <p className="min-w-0 flex-1 text-sm">
              Deliver to{" "}
              <span className="font-bold" data-testid="pincode-city">
                {info?.city}, {info?.state}
              </span>{" "}
              <span className="font-semibold tracking-widest text-neutral-500">— {info?.pin}</span>
            </p>
            <button
              className="flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-xs font-bold text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-950"
              onClick={reset}
            >
              <PencilLine className="h-3.5 w-3.5" aria-hidden />
              Change
            </button>
          </>
        )}
      </div>

      {/* quick metro chips (idle state only) */}
      {status === "idle" && (
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
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
          id="pincode-error"
          role="alert"
          className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-sale"
          data-testid="pincode-error"
        >
          <XCircle className="h-4 w-4" aria-hidden />
          Please enter a valid 6-digit India PIN (e.g. 400050).
        </p>
      )}
      {status === "unservicable" && info && (
        <div
          role="alert"
          className="mt-3 rounded-lg border border-neutral-200 bg-white p-3"
          data-testid="pincode-unservicable"
        >
          <p className="flex items-center gap-1.5 text-sm font-bold">
            <XCircle className="h-4 w-4 text-sale" aria-hidden />
            No delivery to {info.city}, {info.state} — {info.pin} yet
          </p>
          <p className="mt-1 text-xs leading-relaxed text-neutral-600">
            This route isn&apos;t serviceable right now. Our network expands monthly — try a
            nearby PIN or add a prepaid order via a friend&apos;s address.
          </p>
        </div>
      )}

      {/* result card */}
      {status === "ok" && info && (
        <div
          className="mt-3 rounded-lg border border-neutral-200 bg-white p-3.5"
          data-testid="pincode-result"
        >
          <p className="flex flex-wrap items-center gap-1.5 text-sm" aria-live="polite">
            <Truck className="h-4 w-4 shrink-0 text-neutral-900" aria-hidden />
            <span>
              Delivery by{" "}
              <span className="font-black" data-testid="pincode-eta">
                {deliveryEtaFromToday(info.maxDays)}
              </span>
              {info.maxDays - info.minDays > 0 && (
                <span className="text-neutral-500"> (within {info.maxDays} days)</span>
              )}
            </span>
            {info.express && (
              <span className="ml-auto flex items-center gap-1 rounded-full bg-neutral-950 px-2.5 py-0.5 text-[11px] font-bold text-white">
                <Zap className="h-3 w-3" aria-hidden /> Express metro
              </span>
            )}
          </p>

          <div className="mt-3 grid gap-2 border-t border-neutral-100 pt-3 text-xs sm:grid-cols-2">
            <p className="flex items-center gap-1.5 font-semibold">
              {info.cod ? (
                <>
                  <Banknote className="h-4 w-4 shrink-0 text-success-600" aria-hidden />
                  <span className="text-success-700">COD available</span>
                  <span className="font-normal text-neutral-500">· pay at doorstep</span>
                </>
              ) : (
                <>
                  <XCircle className="h-4 w-4 shrink-0 text-neutral-400" aria-hidden />
                  <span className="text-neutral-600">Prepaid only</span>
                  <span className="font-normal text-neutral-500">· COD restricted route</span>
                </>
              )}
            </p>
            <p className="flex items-center gap-1.5 font-semibold">
              <BadgeCheck
                className={cn(
                  "h-4 w-4 shrink-0",
                  freeShip ? "text-success-600" : "text-neutral-400"
                )}
                aria-hidden
              />
              {freeShip ? (
                <>
                  <span className="text-success-700">Free delivery</span>
                  <span className="font-normal text-neutral-500">on this order</span>
                </>
              ) : (
                <>
                  <span className="text-neutral-600">₹79 delivery</span>
                  <span className="font-normal text-neutral-500">· free above ₹499</span>
                </>
              )}
            </p>
            <p className="flex items-center gap-1.5 font-semibold">
              <Repeat2 className="h-4 w-4 shrink-0 text-neutral-900" aria-hidden />
              {info.exchangeAvailable ? (
                <>
                  <span>Exchange available</span>
                  <span className="font-normal text-neutral-500">at your doorstep</span>
                </>
              ) : (
                <span className="text-neutral-600">No exchange on this PIN</span>
              )}
            </p>
            <p className="flex items-center gap-1.5 font-semibold">
              <RefreshCcw className="h-4 w-4 shrink-0 text-neutral-900" aria-hidden />
              <span>7-day easy returns</span>
              <span className="font-normal text-neutral-500">· free pickup</span>
            </p>
          </div>

          <p className="mt-2.5 flex items-center gap-1.5 border-t border-neutral-100 pt-2.5 text-[11px] text-neutral-500">
            <CheckCircle2 className="h-3.5 w-3.5 text-success-600" aria-hidden />
            Ships from {info.hub} · dispatched within 24 hrs of payment/COD confirmation
          </p>
        </div>
      )}
    </section>
  );
}
