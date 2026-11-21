"use client";

import * as React from "react";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { Logo } from "./logo";

export const NAV_LINKS = [
  { href: "#rail", label: "New season" },
  { href: "#featured", label: "Shop" },
  { href: "#story", label: "Our story" },
  { href: "#journal", label: "Care guide" },
  { href: "#footer", label: "Help" },
];

export function SiteNav({ bagCount }: { bagCount: number }) {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false); };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => { document.removeEventListener("keydown", onKey); window.removeEventListener("resize", onResize); };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b transition-[background-color,border-color,box-shadow] duration-300 ${
        scrolled || open
          ? "border-border/70 bg-background/80 shadow-[0_1px_12px_color-mix(in_oklab,var(--color-foreground)_6%,transparent)] backdrop-blur-xl"
          : "border-transparent bg-background"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#top" className="rounded-md text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="RayShop home">
          <Logo />
        </a>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="group relative py-1 text-sm text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:text-foreground">
                  {link.label}
                  <span aria-hidden="true" className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-foreground transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <a href="#featured" aria-label="Search products" className="inline-flex size-9 items-center justify-center rounded-full text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring">
            <Search className="size-[18px]" strokeWidth={1.6} />
          </a>
          <a href="#featured" aria-label={`Bag, ${bagCount} ${bagCount === 1 ? "item" : "items"}`} className="relative inline-flex size-9 items-center justify-center rounded-full text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring">
            <ShoppingBag className="size-[18px]" strokeWidth={1.6} />
            {bagCount > 0 && (
              <span key={bagCount} className="absolute -right-0.5 -top-0.5 inline-flex min-w-4 animate-in zoom-in-50 items-center justify-center rounded-full bg-foreground px-1 text-[10px] font-semibold leading-4 text-background duration-200">
                {bagCount}
              </span>
            )}
          </a>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-9 items-center justify-center rounded-full text-foreground outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring md:hidden"
          >
            {open ? <X className="size-5" strokeWidth={1.6} /> : <Menu className="size-5" strokeWidth={1.6} />}
          </button>
        </div>
      </div>

      <div id="mobile-nav" hidden={!open} className="border-t border-border/70 md:hidden">
        <nav aria-label="Mobile" className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
          <ul className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setOpen(false)} className="flex items-center justify-between rounded-lg px-2 py-3 text-base text-foreground outline-none hover:bg-muted focus-visible:bg-muted">
                  {link.label}
                  <span aria-hidden="true" className="text-muted-foreground">→</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
