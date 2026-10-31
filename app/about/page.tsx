import type { Metadata } from "next";
import { homeGallery } from "@/data/gallery";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Photo, SectionHeading } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";
import { serviceCategories } from "@/data/services";

export const metadata: Metadata = {
  title: "About the Salon",
  description: "Learn about Hamna's Beauty Salon & Bridal Studio in Lahore: bridal makeup, hair and beauty services.",
  openGraph: { title: "About | Hamna's Bridal Studio", description: "Bridal makeup, hair and beauty services in Lahore." },
};

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About" title="About Hamna's Beauty Salon & Bridal Studio." intro="A beauty salon and bridal makeup studio in Lahore, Pakistan." image="/images/bridal-red.jpg" imageAlt="Sample photo of a bride in a red and gold bridal look" position="50% 55%" />
      <Container className="grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-2">
        <Photo src="/images/mehndi.jpg" alt="Sample photo of a bride wearing detailed bridal jewellery and henna" className="aspect-[4/5]" />
        <div className="space-y-10">
          <div>
            <h2 className="text-3xl sm:text-4xl">Our beauty philosophy</h2>
            <p className="mt-4 leading-relaxed text-espresso/80">Beauty should suit the person and the occasion. We bring together makeup, hair and skin services so your look feels considered from start to finish.</p>
          </div>
          <div>
            <h2 className="text-3xl sm:text-4xl">Our bridal approach</h2>
            <p className="mt-4 leading-relaxed text-espresso/80">Every wedding event has its own mood, from the richness of a barat to the softness of a nikkah. Share your plans and preferences, and discuss the best options directly with the salon.</p>
          </div>
          <p className="text-xs text-espresso/55">This page uses general descriptions only. The salon&apos;s story, team and credentials can be added here once provided.</p>
        </div>
      </Container>

      <section className="bg-blush/35 py-16 sm:py-24">
        <Container>
          <SectionHeading title="What we offer" />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {serviceCategories.map((c) => (
              <li key={c.id} className="border border-plum/15 bg-white p-6">
                <h3 className="text-2xl">{c.name}</h3>
                <p className="mt-2 text-sm text-espresso/75">{c.blurb}</p>
              </li>
            ))}
          </ul>
          <ButtonLink href="/services" variant="outline" className="mt-10">View all services</ButtonLink>
        </Container>
      </section>

      <Container className="py-16 sm:py-24">
        <SectionHeading title="From the gallery" />
        <div className="mt-10"><GalleryGrid images={homeGallery} /></div>
        <ButtonLink href="/gallery" variant="outline" className="mt-10">Open the gallery</ButtonLink>
      </Container>
      <CtaBand />
    </>
  );
}
