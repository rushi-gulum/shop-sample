"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  BadgeCheck,
  CreditCard,
  Landmark,
  Lock,
  MapPin,
  PackageCheck,
  PartyPopper,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Truck,
  Wallet,
} from "lucide-react";
import { toast } from "sonner";
import { PRODUCT_MAP } from "@/lib/zshop/data";
import { usePrice, useZShop } from "@/lib/zshop/store";
import type { Order } from "@/lib/zshop/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

type PaymentMethod = "card" | "wallet" | "cod";

function makeOrderId() {
  return `ZS-${Date.now().toString(36).toUpperCase().slice(-6)}-${Math.floor(Math.random() * 900 + 100)}`;
}

export function CheckoutView() {
  const cart = useZShop((s) => s.cart);
  const user = useZShop((s) => s.user);
  const navigate = useZShop((s) => s.navigate);
  const placeOrder = useZShop((s) => s.placeOrder);
  const totals = useZShop((s) => s.totals);
  const price = usePrice();

  const [form, setForm] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
    street: user ? "123 Market Street, Apt 4B" : "",
    city: user ? "San Francisco" : "",
    state: user ? "CA" : "",
    zip: user ? "94105" : "",
    country: "United States",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [payment, setPayment] = useState<PaymentMethod>("card");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [placing, setPlacing] = useState(false);

  const t = totals();
  const lines = useMemo(
    () =>
      cart
        .map((c) => ({ item: c, product: PRODUCT_MAP[c.id] }))
        .filter((l) => l.product),
    [cart]
  );

  function set(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  }

  function formatCardNumber(v: string) {
    return v
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(\d{4})(?=\d)/g, "$1 ");
  }

  function formatExpiry(v: string) {
    const digits = v.replace(/\D/g, "").slice(0, 4);
    if (digits.length <= 2) return digits;
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }

  function autofillDemoCard() {
    setForm((f) => ({
      ...f,
      cardName: (f.name || "Alex Shopper").toUpperCase(),
      cardNumber: "4242 4242 4242 4242",
      expiry: "12/28",
      cvv: "123",
    }));
    setErrors({});
    toast.success("Demo card details filled");
  }

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email is required";
    if (!form.street.trim()) e.street = "Street address is required";
    if (!form.city.trim()) e.city = "City is required";
    if (!form.state.trim()) e.state = "State is required";
    if (!/^\d{4,10}$/.test(form.zip.trim())) e.zip = "Valid ZIP is required";
    if (payment === "card") {
      if (form.cardNumber.replace(/\s/g, "").length !== 16) e.cardNumber = "Enter a 16-digit card number";
      if (!/^\d{2}\/\d{2}$/.test(form.expiry)) e.expiry = "MM/YY format";
      if (!/^\d{3,4}$/.test(form.cvv)) e.cvv = "3-4 digits";
      if (!form.cardName.trim()) e.cardName = "Name on card is required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function confirmOrder() {
    if (!validate()) {
      return;
    }
    setPlacing(true);
    setTimeout(() => {
      const order: Order = {
        id: makeOrderId(),
        placedAt: Date.now(),
        lines: lines.map((l) => ({
          id: l.product.id,
          title: l.product.title,
          image: l.product.image,
          price: l.product.price,
          qty: l.item.qty,
        })),
        subtotal: t.subtotal,
        discount: t.bundleSavings + t.promoDiscount + (t.listTotal - t.subtotal),
        shipping: t.shipping,
        total: t.total,
        status: "Processing",
        eta: new Date(Date.now() + 3 * 86400000).toLocaleDateString("en-US", {
          weekday: "long",
          month: "short",
          day: "numeric",
        }),
        address: {
          name: form.name,
          street: form.street,
          city: form.city,
          state: form.state,
          zip: form.zip,
          country: form.country,
        },
      };
      placeOrder(order);
      setPlacing(false);
      window.scrollTo({ top: 0 });
    }, 1200);
  }

  /* ---------- order confirmation ---------- */
  const placedId = useZShop((s) => s.checkoutOrderId);
  const placedOrder = useZShop((s) => s.orders.find((o) => o.id === placedId));

  if (placedOrder) {
    return (
      <div className="mx-auto max-w-2xl px-3 py-10 sm:px-6" data-testid="order-confirmation">
        <Card className="border-success-200 dark:border-success-500/40">
          <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-success-100 dark:bg-success-950/50">
              <PackageCheck className="h-10 w-10 text-success-600 dark:text-success-400" />
            </span>
            <div>
              <h1 className="flex items-center justify-center gap-2 text-2xl font-black">
                Order confirmed!
                <PartyPopper className="h-6 w-6 text-brand-500" aria-hidden />
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Thanks, {placedOrder.address.name.split(" ")[0]}. Your order{" "}
                <span className="font-bold text-foreground">{placedOrder.id}</span> is being packed.
              </p>
            </div>
            <div className="w-full rounded-xl bg-muted/50 p-4 text-left text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Order total</span>
                <span className="font-black">{price(placedOrder.total)}</span>
              </div>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-muted-foreground">Estimated delivery</span>
                <span className="font-semibold text-success-600 dark:text-success-400">
                  {placedOrder.eta}
                </span>
              </div>
              <Separator className="my-3" />
              <ul className="space-y-2">
                {placedOrder.lines.map((l) => (
                  <li key={l.id} className="flex items-center gap-3">
                    <span className="relative h-10 w-10 overflow-hidden rounded-md bg-muted">
                      <Image src={l.image} alt="" fill sizes="40px" className="object-cover" />
                    </span>
                    <span className="min-w-0 flex-1 truncate text-sm">{l.title}</span>
                    <span className="text-xs text-muted-foreground">×{l.qty}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex gap-3">
              <Button
                className="bg-brand-500 font-bold text-white hover:bg-brand-600"
                onClick={() => {
                  useZShop.getState().setCheckoutOrderId(null);
                  navigate({ name: "orders" });
                }}
              >
                Track your order
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  useZShop.getState().setCheckoutOrderId(null);
                  navigate({ name: "home" });
                }}
              >
                Continue shopping
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  /* ---------- empty cart guard ---------- */
  if (lines.length === 0) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 px-3 py-20 text-center sm:px-6">
        <span className="flex h-24 w-24 items-center justify-center rounded-full bg-muted">
          <ShoppingCart className="h-11 w-11 text-muted-foreground/40" aria-hidden />
        </span>
        <h1 className="text-2xl font-black">Your cart is empty</h1>
        <p className="text-sm text-muted-foreground">Add a few products before checking out.</p>
        <Button
          className="mt-2 bg-brand-500 font-bold text-white hover:bg-brand-600"
          onClick={() => navigate({ name: "shop", category: "all" })}
        >
          Start shopping
        </Button>
      </div>
    );
  }

  const inputCls = (field: string) =>
    cn(errors[field] && "border-rose-400 focus-visible:ring-rose-300");

  return (
    <div className="mx-auto max-w-7xl px-3 py-4 sm:px-6" data-testid="checkout-view">
      <h1 className="text-2xl font-black sm:text-3xl">Checkout</h1>
      <p className="mt-0.5 text-sm text-muted-foreground">
        <Lock className="mr-1 inline h-3.5 w-3.5 text-success-600" />
        Secure 256-bit SSL encrypted checkout — demo only, no real payment is taken.
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-5">
          {/* address */}
          <Card>
            <CardContent className="p-5">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-500 text-sm font-black text-white">
                  1
                </span>
                <MapPin className="h-4.5 w-4.5 text-brand-600" /> Shipping address
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Label htmlFor="co-name">Full name</Label>
                  <Input
                    id="co-name"
                    className={inputCls("name")}
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    placeholder="Alex Shopper"
                  />
                  {errors.name && <p className="mt-1 text-xs text-rose-500">{errors.name}</p>}
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="co-email">Email</Label>
                  <Input
                    id="co-email"
                    type="email"
                    className={inputCls("email")}
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    placeholder="you@example.com"
                  />
                  {errors.email && <p className="mt-1 text-xs text-rose-500">{errors.email}</p>}
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="co-street">Street address</Label>
                  <Input
                    id="co-street"
                    className={inputCls("street")}
                    value={form.street}
                    onChange={(e) => set("street", e.target.value)}
                    placeholder="123 Main Street, Apt 4B"
                  />
                  {errors.street && <p className="mt-1 text-xs text-rose-500">{errors.street}</p>}
                </div>
                <div>
                  <Label htmlFor="co-city">City</Label>
                  <Input
                    id="co-city"
                    className={inputCls("city")}
                    value={form.city}
                    onChange={(e) => set("city", e.target.value)}
                    placeholder="San Francisco"
                  />
                  {errors.city && <p className="mt-1 text-xs text-rose-500">{errors.city}</p>}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="co-state">State</Label>
                    <Input
                      id="co-state"
                      className={inputCls("state")}
                      value={form.state}
                      onChange={(e) => set("state", e.target.value)}
                      placeholder="CA"
                    />
                    {errors.state && <p className="mt-1 text-xs text-rose-500">{errors.state}</p>}
                  </div>
                  <div>
                    <Label htmlFor="co-zip">ZIP</Label>
                    <Input
                      id="co-zip"
                      className={inputCls("zip")}
                      value={form.zip}
                      onChange={(e) => set("zip", e.target.value)}
                      placeholder="94105"
                    />
                    {errors.zip && <p className="mt-1 text-xs text-rose-500">{errors.zip}</p>}
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="co-country">Country</Label>
                  <Input id="co-country" value={form.country} onChange={(e) => set("country", e.target.value)} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* payment */}
          <Card>
            <CardContent className="p-5">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-500 text-sm font-black text-white">
                  2
                </span>
                <CreditCard className="h-4.5 w-4.5 text-brand-600" /> Payment method
                <button
                  type="button"
                  onClick={autofillDemoCard}
                  className="ml-auto flex items-center gap-1 rounded-full border border-dashed border-brand-400 px-2.5 py-1 text-xs font-semibold text-brand-600 transition hover:bg-brand-50 dark:text-brand-400 dark:hover:bg-brand-400/10"
                >
                  <Sparkles className="h-3 w-3" /> Autofill demo card
                </button>
              </h2>
              <RadioGroup value={payment} onValueChange={(v) => setPayment(v as PaymentMethod)} className="grid gap-3 sm:grid-cols-3">
                {[
                  { value: "card", label: "Credit / Debit card", icon: CreditCard },
                  { value: "wallet", label: "Z Wallet", icon: Wallet },
                  { value: "cod", label: "Cash on delivery", icon: Landmark },
                ].map(({ value, label, icon: Icon }) => (
                  <Label
                    key={value}
                    htmlFor={`pay-${value}`}
                    className={cn(
                      "flex cursor-pointer items-center gap-2.5 rounded-xl border p-3.5 text-sm font-semibold transition",
                      payment === value && "border-brand-400 bg-brand-50 dark:bg-brand-400/10"
                    )}
                  >
                    <RadioGroupItem id={`pay-${value}`} value={value} className="sr-only" />
                    <Icon className="h-4.5 w-4.5 text-brand-600" />
                    {label}
                  </Label>
                ))}
              </RadioGroup>

              {payment === "card" && (
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <Label htmlFor="cc-name">Name on card</Label>
                    <Input
                      id="cc-name"
                      className={inputCls("cardName")}
                      value={form.cardName}
                      onChange={(e) => set("cardName", e.target.value)}
                      placeholder="ALEX SHOPPER"
                    />
                    {errors.cardName && <p className="mt-1 text-xs text-rose-500">{errors.cardName}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="cc-num">Card number</Label>
                    <Input
                      id="cc-num"
                      inputMode="numeric"
                      className={cn("font-mono", inputCls("cardNumber"))}
                      value={form.cardNumber}
                      onChange={(e) => set("cardNumber", formatCardNumber(e.target.value))}
                      placeholder="4242 4242 4242 4242"
                    />
                    {errors.cardNumber && <p className="mt-1 text-xs text-rose-500">{errors.cardNumber}</p>}
                  </div>
                  <div>
                    <Label htmlFor="cc-exp">Expiry</Label>
                    <Input
                      id="cc-exp"
                      inputMode="numeric"
                      className={cn("font-mono", inputCls("expiry"))}
                      value={form.expiry}
                      onChange={(e) => set("expiry", formatExpiry(e.target.value))}
                      placeholder="12/28"
                    />
                    {errors.expiry && <p className="mt-1 text-xs text-rose-500">{errors.expiry}</p>}
                  </div>
                  <div>
                    <Label htmlFor="cc-cvv">CVV</Label>
                    <Input
                      id="cc-cvv"
                      inputMode="numeric"
                      type="password"
                      className={cn("font-mono", inputCls("cvv"))}
                      value={form.cvv}
                      onChange={(e) => set("cvv", e.target.value.replace(/\D/g, "").slice(0, 4))}
                      placeholder="•••"
                    />
                    {errors.cvv && <p className="mt-1 text-xs text-rose-500">{errors.cvv}</p>}
                  </div>
                </div>
              )}
              {payment === "wallet" && (
                <p className="mt-4 rounded-lg bg-muted/60 p-3 text-sm text-muted-foreground">
                  Z Wallet balance is illustrative — the demo order will be marked as paid via wallet.
                </p>
              )}
              {payment === "cod" && (
                <p className="mt-4 rounded-lg bg-muted/60 p-3 text-sm text-muted-foreground">
                  Pay in cash when your order arrives. A $2.99 handling fee may apply (waived in demo).
                </p>
              )}
            </CardContent>
          </Card>

          {/* delivery */}
          <Card>
            <CardContent className="p-5">
              <h2 className="mb-3 flex items-center gap-2 text-lg font-bold">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-500 text-sm font-black text-white">
                  3
                </span>
                <Truck className="h-4.5 w-4.5 text-brand-600" /> Delivery
              </h2>
              <div className="flex items-center justify-between rounded-xl border border-success-200 bg-success-50 p-4 dark:border-success-500/40 dark:bg-success-950/30">
                <div className="flex items-center gap-3">
                  <BadgeCheck className="h-5 w-5 text-success-600 dark:text-success-400" />
                  <div>
                    <p className="text-sm font-bold">FREE Standard Shipping</p>
                    <p className="text-xs text-muted-foreground">
                      Arrives in 3–5 business days
                    </p>
                  </div>
                </div>
                <span className="text-sm font-black text-success-600 dark:text-success-400">
                  {t.shipping === 0 ? "FREE" : price(t.shipping)}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* summary */}
        <div>
          <Card className="sticky top-4">
            <CardContent className="p-5">
              <h2 className="mb-4 text-lg font-bold">Order summary</h2>
              <ul className="max-h-56 space-y-3 overflow-y-auto pr-1">
                {lines.map(({ item, product }) => (
                  <li key={item.id} className="flex items-center gap-3">
                    <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-muted">
                      <Image src={product.image} alt="" fill sizes="48px" className="object-cover" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold">{product.title}</span>
                      <span className="text-xs text-muted-foreground">Qty {item.qty}</span>
                    </span>
                    <span className="text-sm font-bold">{price(product.price * item.qty)}</span>
                  </li>
                ))}
              </ul>
              <Separator className="my-4" />
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">{price(t.subtotal)}</span>
                </div>
                {t.listTotal > t.subtotal && (
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Deal savings</span>
                    <span className="font-semibold text-success-600 dark:text-success-400">
                      −{price(t.listTotal - t.subtotal)}
                    </span>
                  </div>
                )}
                {t.bundleSavings > 0 && (
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Bundle {t.bundleBrand}</span>
                    <span className="font-semibold text-success-600 dark:text-success-400">
                      −{price(t.bundleSavings)}
                    </span>
                  </div>
                )}
                {t.promoDiscount > 0 && (
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Promo {t.promoApplied}</span>
                    <span className="font-semibold text-success-600 dark:text-success-400">
                      −{price(t.promoDiscount)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-semibold">
                    {t.shipping === 0 ? (
                      <span className="text-success-600 dark:text-success-400">FREE</span>
                    ) : (
                      price(t.shipping)
                    )}
                  </span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between text-base">
                  <span className="font-bold">Order total</span>
                  <span className="font-black">{price(t.total)}</span>
                </div>
              </div>
              <Button
                className="mt-4 h-12 w-full bg-brand-500 text-base font-bold text-white hover:bg-brand-600 disabled:opacity-60"
                onClick={confirmOrder}
                disabled={placing}
                data-testid="place-order"
              >
                {placing ? (
                  <>
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-neutral-900 border-t-transparent" />
                    Processing…
                  </>
                ) : (
                  <>
                    <ShieldCheck className="mr-2 h-5 w-5" />
                    Place your order
                  </>
                )}
              </Button>
              <p className="mt-2 text-center text-[11px] text-muted-foreground">
                By placing your order you agree to Z Shop&apos;s demo terms.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
