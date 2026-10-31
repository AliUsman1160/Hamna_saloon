import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import { Container, Photo, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function ServicesOverview() {
  const cards = services.filter((s) => s.homeGroup);
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="Services" title="Everything You Need to Feel Beautiful." />
        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((s, i) => (
            <li key={s.slug}>
              <Reveal delay={(i % 3) * 0.08}>
                <Link href={`/services/${s.slug}`} className="group block">
                  <Photo src={s.image} alt={s.imageAlt} className="aspect-[4/3] [&_img]:transition-transform [&_img]:duration-700 group-hover:[&_img]:scale-105" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
                  <div className="flex items-start justify-between gap-4 border-b border-plum/15 py-5">
                    <div>
                      <h3 className="text-2xl">{s.homeGroup}</h3>
                      <p className="mt-1 text-sm text-espresso/70">{s.description}</p>
                    </div>
                    <ArrowUpRight className="mt-1 shrink-0 text-gold-deep transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
