"use client";

import * as React from "react";
import { Leaf, RotateCcw, Scissors, Truck } from "lucide-react";
import ClothingRailHero from "@/components/ui/product-rail-gallery";
import { RAIL_DEMO_ITEMS } from "@/components/ui/product-rail-gallery-demo";
import { SiteNav } from "./site-nav";
import { FeaturedProducts } from "./featured-products";
import { SiteFooter } from "./site-footer";

const PERKS = [
  { icon: Truck, title: "Free shipping", text: "On every order, no minimum." },
  { icon: RotateCcw, title: "30-day returns", text: "Changed your mind? Send it back." },
  { icon: Leaf, title: "Organic fibres", text: "GOTS cotton and recycled wool." },
  { icon: Scissors, title: "Small runs", text: "Cut in batches, never overstocked." },
];

const CARE = [
  { step: "01", title: "Wash cold, inside out", text: "Thirty degrees keeps colour deep and prints crisp. Turn pieces inside out to protect the face of the fabric." },
  { step: "02", title: "Dry flat or on a hanger", text: "Skip the tumble dryer. Knits dry flat; tees and shirts go straight back on the rail, where creases fall out on their own." },
  { step: "03", title: "Rest between wears", text: "A day on the hanger lets fibres recover their shape, so a piece looks new for years, not months." },
];

const linkButton = "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium outline-none transition-[transform,box-shadow,background-color] hover:-translate-y-px focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none";

export function ShopLanding() {
  const [bag, setBag] = React.useState<Set<string>>(() => new Set());
  const [announcement, setAnnouncement] = React.useState("");

  const toggle = React.useCallback((id: string) => {
    const item = RAIL_DEMO_ITEMS.find((i) => i.id === id);
    setBag((old) => {
      const next = new Set(old);
      if (next.has(id)) { next.delete(id); setAnnouncement(`${item?.name} removed from bag.`); }
      else { next.add(id); setAnnouncement(`${item?.name} added to bag.`); }
      return next;
    });
  }, []);

  return (
    <div id="top" className="min-h-svh bg-background text-foreground">
      <a href="#featured" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:text-background">
        Skip to products
      </a>
      <SiteNav bagCount={bag.size} />

      <main>
        <div id="rail" className="scroll-mt-16">
          <ClothingRailHero
            items={RAIL_DEMO_ITEMS}
            hanger="none"
            autoplay
            eyebrow="RayShop · New season · Ten pieces on the rail"
            heading="A clothing rail you can handle, right on the page."
            caption="Brush along the rail, slide a hanger, lift a piece to see the back."
            action={
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a href="#featured" className={`${linkButton} bg-foreground text-background shadow-sm hover:shadow-md`}>Shop the edit</a>
                <a href="#story" className={`${linkButton} border border-border text-foreground hover:bg-muted`}>Our story</a>
              </div>
            }
          />
        </div>

        <section aria-label="Why RayShop" className="border-t border-border/60">
          <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 gap-y-8 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
            {PERKS.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex flex-col items-start gap-3 sm:flex-row">
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-border">
                  <Icon className="size-[18px]" strokeWidth={1.6} />
                </span>
                <div>
                  <p className="text-sm font-medium">{title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <FeaturedProducts items={RAIL_DEMO_ITEMS} bag={bag} onToggle={toggle} />

        <section id="story" aria-labelledby="story-title" className="scroll-mt-16 border-t border-border/60 py-16 sm:py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div className="relative order-last grid grid-cols-2 gap-4 lg:order-first">
              {[RAIL_DEMO_ITEMS[3], RAIL_DEMO_ITEMS[8]].map((item, i) => item && (
                <div key={item.id} className={`relative aspect-[4/5] overflow-hidden rounded-2xl bg-[color-mix(in_oklab,var(--color-foreground)_4%,var(--color-background))] ${i === 1 ? "translate-y-8" : ""}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt={item.name} loading="lazy" className="absolute inset-0 size-full object-contain p-5" />
                </div>
              ))}
            </div>
            <div className="max-w-xl">
              <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-muted-foreground">Our story</p>
              <h2 id="story-title" className="mt-2 text-balance text-2xl font-medium tracking-tight sm:text-3xl">Fewer pieces, made properly.</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                RayShop started with one rail and a simple rule: only make what we would wear every week. Each season we hang ten pieces, test them in daily life, and keep the ones that earn their place.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                We work with two family-run mills, pay for every sample, and publish what each garment costs to make.
              </p>
              <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-border/60 pt-6">
                {[["10", "Pieces a season"], ["2", "Partner mills"], ["100%", "Traceable fibre"]].map(([value, label]) => (
                  <div key={label}>
                    <dt className="sr-only">{label}</dt>
                    <dd className="text-2xl font-medium tracking-tight">{value}</dd>
                    <dd className="mt-1 text-xs text-muted-foreground">{label}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section id="journal" aria-labelledby="care-title" className="scroll-mt-16 border-t border-border/60 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-muted-foreground">Care guide</p>
            <h2 id="care-title" className="mt-2 max-w-xl text-balance text-2xl font-medium tracking-tight sm:text-3xl">Keep it on the rail for years.</h2>
            <ol className="mt-10 grid gap-4 md:grid-cols-3">
              {CARE.map((c) => (
                <li key={c.step} className="rounded-2xl border border-border/70 p-6 transition-colors hover:border-foreground/30">
                  <span className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground">{c.step}</span>
                  <h3 className="mt-3 text-base font-medium">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>

      <SiteFooter />
      <p role="status" aria-live="polite" className="sr-only">{announcement}</p>
    </div>
  );
}
