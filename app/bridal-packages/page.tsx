import type { Metadata } from "next";
import { bridalPackages } from "@/data/bridal-packages";
import { PackageCard } from "@/components/bridal/PackageCard";
import { PackageComparison } from "@/components/bridal/PackageComparison";
import { Container, SectionHeading } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Bridal Packages & Wedding Deals",
  description: "Compare bridal makeup packages for barat, walima, nikkah, mehndi and engagement at Hamna's Beauty Salon & Bridal Studio, Lahore.",
  openGraph: { title: "Bridal Packages & Wedding Deals | Hamna's Bridal Studio", description: "Explore bridal makeup options for your wedding celebrations." },
};

export default function BridalPackagesPage() {
  const individual = bridalPackages.filter((p) => p.group === "individual");
  const multi = bridalPackages.filter((p) => p.group === "multi");
  const hasComparison = bridalPackages.filter((p) => p.included?.length).length >= 2;

  return (
    <>
      <PageHero
        eyebrow="Bridal"
        image="/images/complete.jpg"
        imageAlt="Sample photo of a bride in a red velvet bridal outfit with a gold-bordered veil"
        position="50% 20%"
        title="Bridal Packages & Wedding Deals."
        intro="Explore bridal makeup options for your wedding celebrations and find a package that suits your occasion and preferences."
      />
      <Container className="py-16 sm:py-24">
        <p className="mb-14 border-l-2 border-gold bg-blush/40 p-4 text-sm leading-relaxed">
          Package categories below are suggested layouts. Prices, inclusions and offers are shown only once the salon confirms them; until then, please request package details.
        </p>

        <section>
          <SectionHeading as="h2" title="Individual Event Packages" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {individual.map((p) => (
              <Reveal key={p.slug}><PackageCard pkg={p} detailed /></Reveal>
            ))}
          </div>
        </section>

        <section className="mt-24">
          <SectionHeading title="Multi-Event Packages" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {multi.map((p) => (
              <Reveal key={p.slug}><PackageCard pkg={p} detailed /></Reveal>
            ))}
          </div>
        </section>

        {hasComparison && (
          <section className="mt-24">
            <SectionHeading title="Compare Packages" intro="Only inclusions confirmed by the salon are listed." />
            <div className="mt-10"><PackageComparison packages={bridalPackages} /></div>
          </section>
        )}
      </Container>
      <CtaBand title="Not sure which package fits?" text="Tell us about your events and we'll help you prepare an inquiry for the salon." />
    </>
  );
}
