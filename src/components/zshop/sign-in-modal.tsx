"use client";

import { useState } from "react";
import { Check, KeyRound, Lock, Mail, ShieldCheck, Sparkles, User2 } from "lucide-react";
import { useZShop } from "@/lib/zshop/store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DEMO = { email: "demo@zshop.com", password: "demo1234", name: "Alex" };

const INTENT_COPY: Record<string, { title: string; desc: string }> = {
  checkout: {
    title: "Sign in to check out",
    desc: "Continue shopping your cart items.",
  },
  wishlist: {
    title: "Sign in to view your wishlist",
    desc: "Continue shopping your favorite products.",
  },
  account: {
    title: "Sign in to Z Shop",
    desc: "Access your orders, wishlist and more.",
  },
  prime: {
    title: "Sign in to start your Z Prime trial",
    desc: "Free same-day delivery, exclusive deals, and more.",
  },
  register: {
    title: "Create your Z Shop account",
    desc: "Join 50,000+ happy shoppers.",
  },
};

export function SignInModal() {
  const open = useZShop((s) => s.signInOpen);
  const setOpen = useZShop((s) => s.setSignInOpen);
  const intent = useZShop((s) => s.signInIntent);
  const signIn = useZShop((s) => s.signIn);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const copy = INTENT_COPY[intent ?? "account"] ?? INTENT_COPY.account;
  const isRegister = intent === "register";

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) {
      setError("");
      setPassword("");
    }
  }

  function submit() {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    const displayName =
      isRegister && name.trim()
        ? name.trim()
        : email === DEMO.email
          ? DEMO.name
          : email.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    signIn({ name: displayName, email });
  }

  function tryDemo() {
    setEmail(DEMO.email);
    setPassword(DEMO.password);
    setError("");
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md p-0 overflow-hidden" data-testid="signin-modal">
        <div className="bg-gradient-to-r from-brand-400 to-brand-500 px-6 pb-6 pt-7 text-white">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-950 text-lg font-black text-brand-400">
            Z
          </span>
          <DialogHeader className="mt-3 space-y-1">
            <DialogTitle className="text-left text-xl font-black text-white">
              {copy.title}
            </DialogTitle>
            <DialogDescription className="text-left text-sm text-white/85">
              {copy.desc}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6">
          <Tabs defaultValue={isRegister ? "register" : "signin"}>
            <TabsList className="mb-4 grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign in</TabsTrigger>
              <TabsTrigger value="register">Create account</TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="si-email">Email address</Label>
                <div className="relative">
                  <Mail className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="si-email"
                    type="email"
                    className="pl-8"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    data-testid="signin-email"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="si-pass">Password</Label>
                  <button
                    className="text-xs font-semibold text-brand-600 hover:underline dark:text-brand-400"
                    onClick={() => setError("Password reset is illustrative in this demo.")}
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="si-pass"
                    type="password"
                    className="pl-8"
                    placeholder="Your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    data-testid="signin-password"
                  />
                </div>
              </div>

              <Button
                className="w-full bg-brand-400 font-bold text-neutral-950 hover:bg-brand-500"
                onClick={submit}
                data-testid="signin-submit"
              >
                Sign in
              </Button>

              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="h-px flex-1 bg-border" />
                or
                <span className="h-px flex-1 bg-border" />
              </div>

              <Button variant="outline" className="w-full gap-2" onClick={tryDemo}>
                <Sparkles className="h-4 w-4 text-brand-500" /> Try with demo account
              </Button>

              <div className="rounded-lg bg-brand-50 p-3 text-xs dark:bg-brand-400/10">
                <p className="flex items-center gap-1.5 font-bold text-brand-700 dark:text-brand-400">
                  <Check className="h-3.5 w-3.5" aria-hidden />
                  Demo credentials
                </p>
                <p className="mt-0.5 font-mono text-muted-foreground">
                  {DEMO.email} / {DEMO.password}
                </p>
              </div>
            </TabsContent>

            <TabsContent value="register" className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="rg-name">Full name</Label>
                <div className="relative">
                  <User2 className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="rg-name"
                    className="pl-8"
                    placeholder="Alex Shopper"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setError("");
                    }}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="rg-email">Email address</Label>
                <div className="relative">
                  <Mail className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="rg-email"
                    type="email"
                    className="pl-8"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="rg-pass">Password</Label>
                <div className="relative">
                  <KeyRound className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="rg-pass"
                    type="password"
                    className="pl-8"
                    placeholder="At least 6 characters"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                  />
                </div>
              </div>

              <Button
                className="w-full bg-brand-400 font-bold text-neutral-950 hover:bg-brand-500"
                onClick={() => {
                  if (intent === "register") submit();
                  else submit();
                }}
              >
                Create account
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                By creating an account you agree to Z Shop&apos;s demo terms.
              </p>
            </TabsContent>
          </Tabs>

          {error && (
            <p className="mt-3 rounded-lg bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-600 dark:bg-rose-950/50 dark:text-rose-400">
              {error}
            </p>
          )}

          <p className="mt-4 flex items-center justify-center gap-1 text-[11px] text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            Secured with 256-bit encryption
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
