"use client";

import { useState } from "react";
import { serviceCategories, servicesByCategory, type ServiceCategory } from "@/data/services";
import { ServiceCard } from "./ServiceCard";
import { cn } from "@/lib/utils";

export function ServicesDirectory() {
  const [filter, setFilter] = useState<"all" | ServiceCategory>("all");
  const cats = serviceCategories.filter((c) => filter === "all" || c.id === filter);

  return (
    <div>
      <div role="group" aria-label="Filter services by category" className="-mx-5 mb-12 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
        {[{ id: "all" as const, name: "All services" }, ...serviceCategories].map((c) => (
          <button
            key={c.id}
            type="button"
            aria-pressed={filter === c.id}
            onClick={() => setFilter(c.id)}
            className={cn(
              "shrink-0 border px-4 py-2 text-sm transition-colors",
              filter === c.id ? "border-plum bg-plum text-ivory" : "border-plum/25 text-plum hover:border-plum",
            )}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="space-y-20">
        {cats.map((c) => (
          <section key={c.id} aria-labelledby={`cat-${c.id}`}>
            <h2 id={`cat-${c.id}`} className="text-3xl sm:text-4xl">{c.name}</h2>
            <p className="mt-2 text-espresso/70">{c.blurb}</p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {servicesByCategory(c.id).map((s) => <ServiceCard key={s.slug} service={s} />)}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
