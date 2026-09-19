"use client";

import Image from "next/image";
import {
  ChevronRight,
  ClipboardList,
  Home,
  Navigation,
  Package,
  PackageCheck,
  ShoppingCart,
  Truck,
} from "lucide-react";
import { usePrice, useZShop } from "@/lib/zshop/store";
import type { Order } from "@/lib/zshop/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const STATUS_INDEX: Record<Order["status"], number> = {
  Processing: 0,
  Shipped: 1,
  "Out for delivery": 2,
  Delivered: 3,
};

const TIMELINE_STEPS = [
  { label: "Processing", icon: ClipboardList, hint: "Order confirmed" },
  { label: "Shipped", icon: Truck, hint: "On the way" },
  { label: "Out for delivery", icon: Navigation, hint: "Almost there" },
  { label: "Delivered", icon: PackageCheck, hint: "Enjoy!" },
] as const;

function TrackingTimeline({ status }: { status: Order["status"] }) {
  const current = STATUS_INDEX[status];
  const progress = (current / (TIMELINE_STEPS.length - 1)) * 100;

  return (
    <div>
      <ol className="relative flex" aria-label="Delivery progress">
        {/* base line */}
        <div aria-hidden className="absolute left-[12.5%] right-[12.5%] top-[17px] h-0.5 rounded bg-border" />
        {/* filled line */}
        <div
          aria-hidden
          className={cn(
            "absolute left-[12.5%] top-[17px] h-0.5 rounded transition-all duration-700",
            status === "Delivered" ? "bg-emerald-500" : "bg-brand-500"
          )}
          style={{ width: `calc((100% - 25%) * ${progress / 100})` }}
        />
        {TIMELINE_STEPS.map((step, i) => {
          const done = i < current;
          const active = i === current;
          const Icon = step.icon;
          return (
            <li
              key={step.label}
              aria-current={active ? "step" : undefined}
              className="relative z-10 flex flex-1 flex-col items-center gap-1.5 text-center"
            >
              <span
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full border-2 shadow-sm transition-colors",
                  done && "border-emerald-500 bg-emerald-500 text-white",
                  active &&
                    (status === "Delivered"
                      ? "border-emerald-500 bg-emerald-500 text-white ring-4 ring-emerald-500/20"
                      : "border-brand-500 bg-brand-500 text-white ring-4 ring-brand-500/25"),
                  !done && !active && "border-border bg-background text-muted-foreground/60"
                )}
              >
                <Icon className="h-4 w-4" aria-hidden />
              </span>
              <span
                className={cn(
                  "text-[10px] font-semibold uppercase tracking-wide sm:text-[11px]",
                  done && "text-emerald-600 dark:text-emerald-400",
                  active && (status === "Delivered" ? "text-emerald-600 dark:text-emerald-400" : "text-brand-600 dark:text-brand-400"),
                  !done && !active && "text-muted-foreground/60"
                )}
              >
                {step.label}
              </span>
              <span className="hidden text-[10px] text-muted-foreground/70 sm:block">{step.hint}</span>
            </li>
          );
        })}
      </ol>
      {/* courier line */}
      <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
        <Truck className="h-3 w-3" aria-hidden />
        Z Express Logistics · Tracking ID
        <span className="font-mono font-semibold text-foreground">
          ZS-{status.slice(0, 2).toUpperCase()}-{current + 1}0{TIMELINE_STEPS.length}
        </span>
      </p>
    </div>
  );
}

export function OrdersView() {
  const orders = useZShop((s) => s.orders);
  const navigate = useZShop((s) => s.navigate);
  const addToCart = useZShop((s) => s.addToCart);
  const price = usePrice();

  return (
    <div className="mx-auto max-w-4xl px-3 py-4 sm:px-6" data-testid="orders-view">
      <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1.5 text-sm text-muted-foreground">
        <button
          className="flex items-center gap-1 hover:text-brand-600 dark:hover:text-brand-400"
          onClick={() => navigate({ name: "home" })}
        >
          <Home className="h-3.5 w-3.5" /> Home
        </button>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground">Your Orders</span>
      </nav>

      <h1 className="text-2xl font-black sm:text-3xl">Your Orders</h1>
      <p className="mb-6 mt-0.5 text-sm text-muted-foreground">
        {orders.length} order{orders.length === 1 ? "" : "s"} — track, reorder or get help
      </p>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed py-16 text-center">
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-100 dark:bg-brand-400/10">
            <Package className="h-9 w-9 text-brand-500" />
          </span>
          <h3 className="text-lg font-bold">No orders yet</h3>
          <p className="max-w-sm text-sm text-muted-foreground">
            When you place an order it will show up here with live tracking.
          </p>
          <Button
            className="bg-brand-500 font-bold text-white hover:bg-brand-600"
            onClick={() => navigate({ name: "shop", category: "all" })}
          >
            Start shopping
          </Button>
        </div>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => (
            <div key={order.id} className="overflow-hidden rounded-2xl border bg-card shadow-sm">
              {/* header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b bg-muted/40 px-4 py-3 text-sm">
                <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
                  <div>
                    <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                      Order placed
                    </p>
                    <p className="font-semibold">
                      {new Date(order.placedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Total</p>
                    <p className="font-semibold">{price(order.total)}</p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Order #</p>
                    <p className="font-mono font-semibold">{order.id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                      Arriving
                    </p>
                    <p className="font-semibold text-emerald-600 dark:text-emerald-400">{order.eta}</p>
                  </div>
                  <Badge
                    className={
                      order.status === "Delivered"
                        ? "border-0 bg-emerald-600 text-white"
                        : "border-0 bg-brand-500 text-white"
                    }
                  >
                    {order.status}
                  </Badge>
                </div>
              </div>

              {/* tracking timeline */}
              <div className="border-b px-4 py-4">
                <TrackingTimeline status={order.status} />
              </div>

              {/* items */}
              <ul className="divide-y">
                {order.lines.map((l) => (
                  <li key={l.id} className="flex items-center gap-4 px-4 py-3">
                    <button
                      className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-muted"
                      onClick={() => useZShop.getState().openProduct(l.id)}
                      aria-label={`View ${l.title}`}
                    >
                      <Image src={l.image} alt="" fill sizes="56px" className="object-cover" />
                    </button>
                    <div className="min-w-0 flex-1">
                      <button
                        className="block truncate text-sm font-semibold hover:text-brand-600 dark:hover:text-brand-400"
                        onClick={() => useZShop.getState().openProduct(l.id)}
                      >
                        {l.title}
                      </button>
                      <p className="text-xs text-muted-foreground">
                        Qty {l.qty} · {price(l.price)} each
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1.5"
                      onClick={() => addToCart(l.id, l.qty)}
                    >
                      <ShoppingCart className="h-3.5 w-3.5" /> Buy again
                    </Button>
                  </li>
                ))}
              </ul>

              {/* address */}
              <div className="bg-muted/30 px-4 py-3 text-xs text-muted-foreground">
                Shipping to:{" "}
                <span className="font-semibold text-foreground">
                  {order.address.name}, {order.address.street}, {order.address.city},{" "}
                  {order.address.state} {order.address.zip}, {order.address.country}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
