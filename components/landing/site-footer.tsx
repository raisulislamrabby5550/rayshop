"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";
import { Logo } from "./logo";

const COLUMNS = [
  { title: "Shop", links: [["New season", "#rail"], ["Tees & polos", "#featured"], ["Knitwear", "#featured"], ["Shirts", "#featured"], ["Hoodies", "#featured"]] },
  { title: "Help", links: [["Shipping", "#footer"], ["Returns & exchanges", "#footer"], ["Size guide", "#footer"], ["Care guide", "#journal"], ["Contact us", "#footer"]] },
  { title: "Company", links: [["Our story", "#story"], ["Materials", "#story"], ["Stockists", "#footer"], ["Careers", "#footer"], ["Press", "#footer"]] },
];

const SOCIAL = ["Instagram", "TikTok", "Pinterest"];

export function SiteFooter() {
  const [email, setEmail] = React.useState("");
  const [joined, setJoined] = React.useState(false);

  return (
    <footer id="footer" className="scroll-mt-16 border-t border-border/60 bg-[color-mix(in_oklab,var(--color-foreground)_3%,var(--color-background))]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,2fr)]">
          <div className="flex flex-col gap-5">
            <Logo />
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Considered basics, hung with care. RayShop makes everyday clothing in small runs from organic and recycled fibres.
            </p>
            <form
              className="mt-1 max-w-sm"
              onSubmit={(event) => { event.preventDefault(); if (email.trim()) setJoined(true); }}
            >
              <label htmlFor="newsletter" className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Join the list</label>
              {joined ? (
                <p role="status" className="mt-3 rounded-full border border-border px-4 py-2.5 text-sm">Thanks — you&apos;re on the list.</p>
              ) : (
                <div className="mt-3 flex items-center gap-2 rounded-full border border-border bg-background p-1 pl-4 focus-within:ring-2 focus-within:ring-ring">
                  <input
                    id="newsletter"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/70"
                  />
                  <button type="submit" aria-label="Subscribe" className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-foreground text-background outline-none transition-transform hover:translate-x-0.5">
                    <ArrowRight className="size-4" />
                  </button>
                </div>
              )}
              <p className="mt-2 text-xs text-muted-foreground">Early access to drops. No spam, unsubscribe anytime.</p>
            </form>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {COLUMNS.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">{col.title}</h2>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {col.links.map(([label, href]) => (
                    <li key={label}>
                      <a href={href} className="text-sm text-foreground/80 outline-none transition-colors hover:text-foreground focus-visible:underline">{label}</a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} RayShop. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {SOCIAL.map((s) => (
              <li key={s}><a href="#footer" className="outline-none hover:text-foreground focus-visible:underline">{s}</a></li>
            ))}
            <li><a href="#footer" className="outline-none hover:text-foreground focus-visible:underline">Privacy</a></li>
            <li><a href="#footer" className="outline-none hover:text-foreground focus-visible:underline">Terms</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
