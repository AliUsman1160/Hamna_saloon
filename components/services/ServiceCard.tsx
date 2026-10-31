import Link from "next/link";
import type { Service } from "@/data/services";
import { Photo } from "@/components/ui/Section";
import { buttonClass } from "@/components/ui/Button";
import { bookingHref } from "@/lib/utils";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="group flex flex-col border border-plum/15 bg-white">
      <Photo
        src={service.image}
        alt={service.imageAlt}
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        className="aspect-[4/3] [&_img]:transition-transform [&_img]:duration-700 group-hover:[&_img]:scale-105"
      />
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-xl leading-tight">{service.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-espresso/75">{service.description}</p>
        <p className="mt-3 text-sm font-medium text-plum">{service.price ?? "Contact for Pricing"}</p>
        <div className="mt-auto flex flex-col gap-2 pt-5 sm:flex-row">
          <Link href={`/services/${service.slug}`} className={buttonClass("outline", "flex-1 px-4 py-2.5")}>
            Learn More
          </Link>
          <Link href={bookingHref({ service: service.slug })} className={buttonClass("primary", "flex-1 px-4 py-2.5")}>
            Book This Service
          </Link>
        </div>
      </div>
    </article>
  );
}
