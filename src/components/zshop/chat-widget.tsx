"use client";

import { useEffect, useRef, useState } from "react";
import {
  Bot,
  ChevronDown,
  MessageCircle,
  Package,
  RotateCcw,
  Search,
  Send,
  Sparkles,
  Trash2,
  Truck,
  X,
} from "lucide-react";
import { PRODUCT_MAP, searchProducts } from "@/lib/zshop/data";
import { formatPrice, useZShop } from "@/lib/zshop/store";
import { cn } from "@/lib/utils";

interface ChatMessage {
  role: "user" | "bot";
  text: string;
  productIds?: string[];
  ts: number;
}

const QUICK_QUESTIONS = [
  { icon: Package, label: "Track my order", msg: "Track my order" },
  { icon: Truck, label: "Shipping info", msg: "What are your shipping options?" },
  { icon: RotateCcw, label: "Return policy", msg: "What is your return policy?" },
  { icon: Sparkles, label: "Recommend a product", msg: "Recommend a product" },
];

const WELCOME: ChatMessage = {
  role: "bot",
  text: "Hi there! 👋 I'm Zoe, your Z Shop assistant. How can I help you today? You can ask me about products, orders, shipping, returns, or anything else!",
  ts: 0,
};

function botReply(userText: string): ChatMessage {
  const q = userText.toLowerCase();
  const state = useZShop.getState();
  const currency = state.currency;

  // order tracking
  if (/(track|order status|my order|where.*(package|delivery))/.test(q)) {
    const orders = state.orders;
    if (orders.length === 0) {
      return {
        role: "bot",
        text: "You don't have any orders yet. Once you place one, I can track it for you here. Want to browse today's deals instead?",
        ts: Date.now(),
      };
    }
    const latest = orders[0];
    return {
      role: "bot",
      text: `Your latest order ${latest.id} (${formatPrice(latest.total, currency)}) is currently ${latest.status} and is estimated to arrive on ${latest.eta}. You can see all orders in “Your Orders”.`,
      ts: Date.now(),
    };
  }

  // shipping
  if (/(shipping|delivery|deliver|arrive|ship)/.test(q)) {
    return {
      role: "bot",
      text: "We offer FREE standard shipping on orders over $99 (otherwise $9.99), arriving in 3–5 business days. Z Prime members get free same-day delivery in select cities. 🚚",
      ts: Date.now(),
    };
  }

  // returns
  if (/(return|refund|exchange)/.test(q)) {
    return {
      role: "bot",
      text: "We have a 30-day, no-questions-asked return policy. Items in original condition get a full refund within 2 business days of us receiving the return. ♻️",
      ts: Date.now(),
    };
  }

  // promo
  if (/(promo|coupon|code|discount|deal|sale|offer)/.test(q)) {
    return {
      role: "bot",
      text: 'Psst — use code WELCOME15 for 15% off your order, or ZPRIME5 for an extra 5%. Check the "Today\'s Deals" page for up to 44% off selected products! 🏷️',
      ts: Date.now(),
    };
  }

  // payment
  if (/(payment|pay|card|wallet|cod|cash)/.test(q)) {
    return {
      role: "bot",
      text: "We accept credit/debit cards, Z Wallet, and cash on delivery. All payments are processed with 256-bit SSL encryption. 💳",
      ts: Date.now(),
    };
  }

  // greeting / help
  if (/(hi|hello|hey|help|support|agent|human)/.test(q)) {
    return {
      role: "bot",
      text: "Hello! 😊 I can help you find products, track orders, explain shipping & returns, or share the best deals. What would you like to do?",
      ts: Date.now(),
    };
  }

  // product search by keywords in the message itself
  const cleaned = userText
    .replace(/^(find|search|show|recommend|suggest|looking for|do you have|i want|i need)\b/gi, "")
    .replace(/[?!.]+$/g, "")
    .trim();
  const found = (cleaned ? searchProducts(cleaned) : []).slice(0, 3);
  if (found.length > 0) {
    return {
      role: "bot",
      text: "I found these matches for you — tap any product to view it:",
      productIds: found.map((p) => p.id),
      ts: Date.now(),
    };
  }

  // recommend fallback
  if (/(recommend|suggest|popular|best|top|gift)/.test(q)) {
    const top = Object.values(PRODUCT_MAP)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);
    return {
      role: "bot",
      text: "Here are our top-rated products right now:",
      productIds: top.map((p) => p.id),
      ts: Date.now(),
    };
  }

  return {
    role: "bot",
    text: "I'm not sure about that one — but I can help with products, orders, shipping, returns and deals. Try asking “recommend a product” or search for something like “headphones”. 🙌",
    ts: Date.now(),
  };
}

export function ChatWidget() {
  const open = useZShop((s) => s.chatOpen);
  const setOpen = useZShop((s) => s.setChatOpen);
  const currency = useZShop((s) => s.currency);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing, open]);

  function send(text?: string) {
    const msg = (text ?? input).trim();
    if (!msg) return;
    setMessages((m) => [...m, { role: "user", text: msg, ts: Date.now() }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const r = botReply(msg);
      setMessages((m) => [...m, r]);
      setTyping(false);
    }, 700 + Math.random() * 600);
  }

  return (
    <>
      {/* floating button */}
      {!open && (
        <button
          aria-label="Open chat support"
          className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 py-3 pl-4 pr-5 text-white shadow-xl transition hover:scale-105 hover:shadow-2xl"
          onClick={() => setOpen(true)}
          data-testid="chat-open"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="text-sm font-bold">Ask Zoe</span>
          <span className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-400" />
        </button>
      )}

      {/* chat panel */}
      <div
        className={cn(
          "fixed bottom-4 right-4 z-50 flex h-[540px] w-[min(calc(100vw-2rem),380px)] flex-col overflow-hidden rounded-2xl border bg-card shadow-2xl transition-all duration-200",
          open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        )}
        role="dialog"
        aria-label="Ask Zoe chat support"
      >
        {/* header */}
        <div className="flex items-center gap-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-3 text-white">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
            <Bot className="h-5 w-5" />
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-fuchsia-600 bg-emerald-400" />
          </span>
          <div className="min-w-0 flex-1 leading-tight">
            <p className="flex items-center gap-1 text-sm font-bold">
              Zoe
              <span className="rounded bg-white/20 px-1 py-0.5 text-[9px] font-semibold">AI</span>
            </p>
            <p className="text-[11px] text-white/80">Online · replies instantly</p>
          </div>
          <button
            aria-label="Clear chat"
            className="rounded-md p-1.5 hover:bg-white/15"
            onClick={() => setMessages([WELCOME])}
          >
            <Trash2 className="h-4 w-4" />
          </button>
          <button aria-label="Minimize chat" className="rounded-md p-1.5 hover:bg-white/15" onClick={() => setOpen(false)}>
            <ChevronDown className="h-4 w-4" />
          </button>
          <button aria-label="Close chat" className="rounded-md p-1.5 hover:bg-white/15" onClick={() => setOpen(false)}>
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* messages */}
        <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-muted/30 px-3.5 py-4">
          {messages.map((m, i) => (
            <div key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm",
                  m.role === "user"
                    ? "rounded-br-md bg-violet-600 text-white"
                    : "rounded-bl-md border bg-card"
                )}
              >
                {m.text}

                {m.productIds && m.productIds.length > 0 && (
                  <div className="mt-2 space-y-1.5">
                    {m.productIds.map((id) => {
                      const p = PRODUCT_MAP[id];
                      if (!p) return null;
                      return (
                        <button
                          key={id}
                          className="flex w-full items-center gap-2 rounded-xl border bg-background px-2.5 py-2 text-left transition hover:border-amber-400"
                          onClick={() => useZShop.getState().openProduct(id)}
                        >
                          { }
                          <img src={p.image} alt="" className="h-9 w-9 rounded-lg object-cover" />
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-xs font-semibold">{p.title}</span>
                            <span className="text-[11px] text-muted-foreground">
                              {formatPrice(p.price, currency)} · ★ {p.rating}
                            </span>
                          </span>
                          <Search className="h-3.5 w-3.5 text-muted-foreground" />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          ))}

          {typing && (
            <div className="flex justify-start">
              <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border bg-card px-3.5 py-3 shadow-sm">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-500"
                    style={{ animationDelay: `${i * 150}ms` }}
                  />
                ))}
              </div>
            </div>
          )}

          {messages.length <= 1 && !typing && (
            <div className="pt-1">
              <p className="mb-2 text-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Quick questions
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                {QUICK_QUESTIONS.map(({ icon: Icon, label, msg }) => (
                  <button
                    key={label}
                    className="flex items-center gap-1.5 rounded-lg border bg-card px-2.5 py-2 text-[11px] font-semibold text-violet-700 transition hover:border-violet-400 dark:text-violet-300"
                    onClick={() => send(msg)}
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0" />
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* input */}
        <form
          className="flex items-center gap-2 border-t p-3"
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            aria-label="Chat message"
            className="h-10 flex-1 rounded-xl border bg-background px-3.5 text-sm outline-none focus:border-violet-400"
            data-testid="chat-input"
          />
          <button
            type="submit"
            aria-label="Send message"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white transition hover:opacity-90 disabled:opacity-50"
            disabled={!input.trim()}
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
        <p className="pb-2 text-center text-[10px] text-muted-foreground">
          Powered by Z.AI · Responses are AI-generated (demo)
        </p>
      </div>
    </>
  );
}
