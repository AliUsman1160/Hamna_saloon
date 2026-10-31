"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { galleryCategories, type GalleryCategory, type GalleryImage } from "@/data/gallery";
import { cn } from "@/lib/utils";
import { SampleTag } from "@/components/ui/Section";

type Filter = "All" | GalleryCategory;

export function GalleryGrid({ images, showFilters = false }: { images: GalleryImage[]; showFilters?: boolean }) {
  const [filter, setFilter] = useState<Filter>("All");
  const [active, setActive] = useState<number | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);

  const visible = filter === "All" ? images : images.filter((i) => i.category === filter);

  const close = useCallback(() => {
    setActive(null);
    triggerRef.current?.focus();
  }, []);
  const step = useCallback(
    (d: number) => setActive((a) => (a === null ? a : (a + d + visible.length) % visible.length)),
    [visible.length],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "Tab") {
        // keep focus inside the dialog
        const els = document.querySelectorAll<HTMLElement>("[data-lightbox] button");
        const first = els[0];
        const last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active === null, close, step]); // eslint-disable-line react-hooks/exhaustive-deps

  const current = active !== null ? visible[active] : null;

  return (
    <div>
      {showFilters && (
        <div role="group" aria-label="Filter gallery" className="-mx-5 mb-10 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
          {galleryCategories.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={filter === c}
              onClick={() => setFilter(c)}
              className={cn(
                "shrink-0 border px-4 py-2 text-sm transition-colors",
                filter === c ? "border-plum bg-plum text-ivory" : "border-plum/25 text-plum hover:border-plum",
              )}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      {visible.length === 0 ? (
        <p className="py-16 text-center text-espresso/70">No images in this category yet.</p>
      ) : (
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {visible.map((img, i) => (
            <li key={img.id} className={cn(i % 5 === 0 && "lg:row-span-2")}>
              <button
                type="button"
                onClick={(e) => {
                  triggerRef.current = e.currentTarget;
                  setActive(i);
                }}
                className="group relative block h-full w-full overflow-hidden bg-blush"
                aria-label={`Open image: ${img.caption}`}
              >
                <div className={cn("relative w-full", i % 5 === 0 ? "aspect-[4/5] lg:aspect-auto lg:h-full lg:min-h-[32rem]" : "aspect-[4/5]")}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-espresso/70 to-transparent p-3 text-left text-sm text-ivory">
                  {img.caption}
                </span>
                {img.sample && <SampleTag className="absolute left-2 top-2" />}
              </button>
            </li>
          ))}
        </ul>
      )}

      {current && (
        <div
          data-lightbox
          role="dialog"
          aria-modal="true"
          aria-label={`${current.caption}, image ${active! + 1} of ${visible.length}`}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-espresso/95 p-4"
          onClick={(e) => e.target === e.currentTarget && close()}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <button ref={closeRef} type="button" onClick={close} aria-label="Close" className="absolute right-4 top-4 p-3 text-ivory">
            <X size={28} />
          </button>
          <button type="button" onClick={() => step(-1)} aria-label="Previous image" className="absolute left-2 top-1/2 -translate-y-1/2 p-3 text-ivory sm:left-6">
            <ChevronLeft size={36} />
          </button>
          <button type="button" onClick={() => step(1)} aria-label="Next image" className="absolute right-2 top-1/2 -translate-y-1/2 p-3 text-ivory sm:right-6">
            <ChevronRight size={36} />
          </button>
          <figure className="flex max-h-full flex-col items-center">
            <div className="relative h-[75dvh] w-[min(90vw,60dvh)]">
              <Image src={current.src} alt={current.alt} fill sizes="90vw" className="object-contain" priority />
            </div>
            <figcaption className="mt-4 text-center text-sm text-ivory/85">
              {current.caption}
              {current.sample && <span className="block text-xs text-ivory/55">Sample image, not salon work</span>}
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}
