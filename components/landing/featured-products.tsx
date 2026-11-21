"use client";

import * as React from "react";
import { Check, Plus } from "lucide-react";
import type { GarmentKind, RailGarment } from "@/components/ui/product-rail-gallery";

const FILTERS: { id: "all" | GarmentKind; label: string }[] = [
  { id: "all", label: "All" },
  { id: "tee", label: "Tees & polos" },
  { id: "knit", label: "Knitwear" },
  { id: "shirt", label: "Shirts" },
  { id: "hoodie", label: "Hoodies" },
];

export function FeaturedProducts({ items, bag, onToggle }: { items: RailGarment[]; bag: Set<string>; onToggle: (id: string) => void }) {
  const [filter, setFilter] = React.useState<"all" | GarmentKind>("all");
  const visible = filter === "all" ? items : items.filter((item) => item.kind === filter);

  return (
    <section id="featured" aria-labelledby="featured-title" className="scroll-mt-16 border-t border-border/60 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-muted-foreground">Featured products</p>
            <h2 id="featured-title" className="mt-2 text-balance text-2xl font-medium tracking-tight sm:text-3xl">Everyday pieces, cut to last.</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground"><span className="[@media(hover:none)]:hidden">Hover a piece to see the back. </span>Every item ships free and can be returned within 30 days.</p>
          </div>
          <div role="group" aria-label="Filter products" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                aria-pressed={filter === f.id}
                onClick={() => setFilter(f.id)}
                className={`shrink-0 rounded-full border px-4 py-1.5 text-xs font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring ${
                  filter === f.id ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4">
          {visible.map((item) => {
            const added = bag.has(item.id);
            return (
              <li key={item.id} className="group animate-in fade-in duration-500">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[color-mix(in_oklab,var(--color-foreground)_4%,var(--color-background))]">
                  <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(90%_60%_at_50%_0%,color-mix(in_oklab,white_70%,transparent),transparent)] dark:opacity-10" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt={item.name} loading="lazy" className="absolute inset-0 size-full object-contain p-5 transition-[opacity,transform] duration-500 group-hover:scale-[1.03] group-hover:opacity-0 motion-reduce:transition-none" />
                  {item.backImage && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.backImage} alt="" loading="lazy" className="absolute inset-0 size-full scale-[0.98] object-contain p-5 opacity-0 transition-[opacity,transform] duration-500 group-hover:scale-[1.03] group-hover:opacity-100 motion-reduce:transition-none" />
                  )}
                  {item.tag && (
                    <span className="absolute left-3 top-3 rounded-[4px] border border-foreground/10 bg-card px-2 py-1 text-[11px] font-semibold leading-none text-card-foreground shadow-sm">{item.tag}</span>
                  )}
                  <button
                    type="button"
                    onClick={() => onToggle(item.id)}
                    aria-pressed={added}
                    aria-label={added ? `Remove ${item.name} from bag` : `Add ${item.name} to bag`}
                    className={`absolute bottom-3 right-3 inline-flex size-9 items-center justify-center rounded-full shadow-sm outline-none transition-[background-color,color,transform] hover:-translate-y-px focus-visible:ring-2 focus-visible:ring-ring ${
                      added ? "bg-foreground text-background" : "bg-background/90 text-foreground backdrop-blur"
                    }`}
                  >
                    {added ? <Check className="size-4" /> : <Plus className="size-4" />}
                  </button>
                </div>
                <div className="mt-3 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-medium">{item.name}</h3>
                    <p className="mt-0.5 truncate text-xs text-muted-foreground">{item.details?.join(" · ")}</p>
                  </div>
                  <span aria-hidden="true" className="mt-1 size-3 shrink-0 rounded-full border border-foreground/15" style={{ background: item.color }} />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
