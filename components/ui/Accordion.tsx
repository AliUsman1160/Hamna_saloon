"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const base = useId();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-plum/15 border-y border-plum/15">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <h3 className="!font-sans">
              <button
                type="button"
                id={`${base}-b${i}`}
                aria-expanded={isOpen}
                aria-controls={`${base}-p${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left font-serif text-xl text-plum sm:text-2xl"
              >
                {item.q}
                <Plus size={20} className={cn("shrink-0 text-gold-deep transition-transform", isOpen && "rotate-45")} aria-hidden />
              </button>
            </h3>
            <div id={`${base}-p${i}`} role="region" aria-labelledby={`${base}-b${i}`} hidden={!isOpen} className="pb-6 pr-10 leading-relaxed text-espresso/80">
              {item.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
