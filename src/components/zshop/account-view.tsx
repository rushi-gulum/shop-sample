"use client";

import { CircleUserRound, Heart, Home, ChevronRight, LogOut, MapPin, Package, Scale, ShieldCheck, User2 } from "lucide-react";
import { useZShop } from "@/lib/zshop/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function AccountView() {
  const user = useZShop((s) => s.user);
  const orders = useZShop((s) => s.orders);
  const wishlist = useZShop((s) => s.wishlist);
  const navigate = useZShop((s) => s.navigate);
  const signOut = useZShop((s) => s.signOut);

  if (!user) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 px-3 py-20 text-center sm:px-6">
        <span className="flex h-24 w-24 items-center justify-center rounded-full bg-muted">
          <CircleUserRound className="h-11 w-11 text-muted-foreground/40" aria-hidden />
        </span>
        <h1 className="text-2xl font-black">You&apos;re not signed in</h1>
        <p className="text-sm text-muted-foreground">
          Sign in to view your profile, orders and wishlist.
        </p>
        <Button
          className="mt-2 bg-brand-400 font-bold text-neutral-950 hover:bg-brand-500"
          onClick={() => useZShop.getState().requestSignIn("account")}
        >
          Sign in
        </Button>
      </div>
    );
  }

  const initials = user.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="mx-auto max-w-4xl px-3 py-4 sm:px-6" data-testid="account-view">
      <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1.5 text-sm text-muted-foreground">
        <button
          className="flex items-center gap-1 hover:text-brand-600 dark:hover:text-brand-400"
          onClick={() => navigate({ name: "home" })}
        >
          <Home className="h-3.5 w-3.5" /> Home
        </button>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground">Your Account</span>
      </nav>

      <h1 className="text-2xl font-black sm:text-3xl">Your Account</h1>

      <Card className="mt-6">
        <CardContent className="flex flex-wrap items-center gap-4 p-6">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="bg-brand-400 text-xl font-black text-neutral-950">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="flex items-center gap-2 text-lg font-bold">
              {user.name}
              <Badge className="border-0 bg-brand-400 text-black">Z Prime</Badge>
            </p>
            <p className="truncate text-sm text-muted-foreground">{user.email}</p>
            <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> Member since 2025 ·
              Demo account
            </p>
          </div>
          <Button variant="outline" onClick={signOut} className="gap-2">
            <LogOut className="h-4 w-4" /> Sign out
          </Button>
        </CardContent>
      </Card>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <button
          className="group rounded-2xl border bg-card p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          onClick={() => navigate({ name: "orders" })}
        >
          <Package className="h-6 w-6 text-brand-500" />
          <p className="mt-2 font-bold">Your Orders</p>
          <p className="text-sm text-muted-foreground">{orders.length} placed</p>
        </button>
        <button
          className="group rounded-2xl border bg-card p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          onClick={() => navigate({ name: "wishlist" })}
        >
          <Heart className="h-6 w-6 fill-brand-600 text-brand-600" />
          <p className="mt-2 font-bold">Your Wishlist</p>
          <p className="text-sm text-muted-foreground">{wishlist.length} saved</p>
        </button>
        <button
          className="group rounded-2xl border bg-card p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          onClick={() => navigate({ name: "compare" })}
        >
          <Scale className="h-6 w-6 text-brand-500" />
          <p className="mt-2 font-bold">Compare</p>
          <p className="text-sm text-muted-foreground">Side-by-side specs</p>
        </button>
      </div>

      <Card className="mt-5">
        <CardContent className="p-6">
          <h2 className="flex items-center gap-2 text-lg font-bold">
            <MapPin className="h-4.5 w-4.5 text-brand-600" /> Default address
          </h2>
          <Separator className="my-4" />
          <p className="text-sm">
            <span className="font-semibold">{user.name}</span>
            <br />
            123 Main Street, Apt 4B
            <br />
            San Francisco, CA 94105
            <br />
            United States
          </p>
          <Button variant="outline" size="sm" className="mt-4">
            Edit address
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
