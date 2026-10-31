import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categoryOf, serviceBySlug, services } from "@/data/services";
import { packageBySlug } from "@/data/bridal-packages";
import { faqs } from "@/data/faqs";
import { ServiceCard } from "@/components/services/ServiceCard";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";
import { bookingHref } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => services.map((s) => ({ slug: s.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) return {};
  return {
    title: s.name,
    description: `${s.description} Inquire about ${s.name.toLowerCase()} at Hamna's Beauty Salon & Bridal Studio, Lahore.`,
    openGraph: { title: `${s.name} | Hamna's Bridal Studio`, description: s.description, images: [{ url: s.image, alt: s.imageAlt }] },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) notFound();

  const cat = categoryOf(s.category);
  const related = s.related.map(serviceBySlug).filter((x): x is NonNullable<typeof x> => !!x);
  const pkgs = (s.relatedPackages ?? []).map(packageBySlug).filter((x): x is NonNullable<typeof x> => !!x);

  return (
    <>
      <PageHero eyebrow={cat.name} title={s.name} intro={s.description} image={s.image} imageAlt={s.imageAlt} position="50% 25%" />
      <div className="border-b border-plum/10 bg-white">
        <Container className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
          <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-widest text-gold-deep">
            <Link href="/services" className="hover:text-plum">Services</Link> / {cat.name}
          </nav>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <p className="font-serif text-2xl text-plum">{s.price ?? "Contact for Pricing"}</p>
            <ButtonLink href={bookingHref({ service: s.slug })}>Book This Service</ButtonLink>
          </div>
        </Container>
      </div>

      <Container className="grid gap-12 py-16 sm:py-24 lg:grid-cols-[2fr_1fr]">
        <div>
          <h2 className="text-3xl sm:text-4xl">About {s.name}</h2>
          <p className="mt-5 max-w-2xl leading-relaxed text-espresso/80">{s.details}</p>
          <p className="mt-4 max-w-2xl text-sm text-espresso/60">Images on this site are sample stock photos, not salon work. Service availability, duration and pricing should be confirmed with the salon.</p>
        </div>
        {pkgs.length > 0 && (
          <aside className="h-fit border border-plum/15 bg-white p-6">
            <h2 className="text-2xl">Related bridal packages</h2>
            <ul className="mt-4 space-y-2">
              {pkgs.map((p) => (
                <li key={p.slug}>
                  <Link href={`/bridal-packages#${p.slug}`} className="text-plum underline decoration-gold underline-offset-4 hover:text-gold-deep">{p.name}</Link>
                </li>
              ))}
            </ul>
            <ButtonLink href="/bridal-packages" variant="outline" className="mt-6 w-full">Compare all packages</ButtonLink>
          </aside>
        )}
      </Container>

      {related.length > 0 && (
        <section className="bg-blush/30 py-16 sm:py-24">
          <Container>
            <h2 className="text-3xl sm:text-4xl">Related services</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => <ServiceCard key={r.slug} service={r} />)}
            </div>
          </Container>
        </section>
      )}

      <Container className="max-w-3xl py-16 sm:py-24">
        <h2 className="mb-8 text-3xl sm:text-4xl">Frequently asked questions</h2>
        <Accordion items={[faqs[0], faqs[2], faqs[5]]} />
      </Container>

      <CtaBand title={`Interested in ${s.name}?`} bookHref={bookingHref({ service: s.slug })} />
    </>
  );
}
