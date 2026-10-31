import Link from "next/link";
import { Check } from "lucide-react";
import type { BridalPackage } from "@/data/bridal-packages";
import { Photo, SampleTag } from "@/components/ui/Section";
import { buttonClass } from "@/components/ui/Button";
import { bookingHref } from "@/lib/utils";

export function PackageCard({ pkg, detailed = false }: { pkg: BridalPackage; detailed?: boolean }) {
  return (
    <article id={pkg.slug} className="group flex scroll-mt-28 flex-col border border-plum/15 bg-white">
      <div className="relative">
        <Photo src={pkg.image} alt={pkg.imageAlt} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="aspect-[4/5] [&_img]:transition-transform [&_img]:duration-700 group-hover:[&_img]:scale-105" />
        <SampleTag className="absolute left-3 top-3" />
        {pkg.badge && (
          <span className="absolute right-3 top-3 bg-gold px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-espresso">
            {pkg.badge}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="eyebrow">{pkg.occasion}</p>
        <h3 className="mt-2 text-2xl leading-tight">{pkg.name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-espresso/75">{pkg.description}</p>

        {pkg.included && pkg.included.length > 0 && (
          <ul className="mt-4 space-y-1.5 text-sm">
            {pkg.included.map((i) => (
              <li key={i} className="flex gap-2">
                <Check size={16} className="mt-0.5 shrink-0 text-gold-deep" aria-hidden />
                {i}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-6">
          <p className="font-serif text-xl text-plum">{pkg.price ?? (detailed ? "Request Package Details" : "Contact for Package Details")}</p>
          {!pkg.confirmed && <p className="mt-1 text-xs text-espresso/55">Sample category. Contents and pricing to be confirmed by the salon.</p>}
          {pkg.availability && <p className="mt-1 text-xs text-espresso/65">{pkg.availability}</p>}
          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            {!detailed && (
              <Link href={`/bridal-packages#${pkg.slug}`} className={buttonClass("outline", "flex-1")}>
                View Package
              </Link>
            )}
            <Link href={bookingHref({ package: pkg.slug })} className={buttonClass("primary", "flex-1")}>
              Book This Package
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
