import { bridalPackages } from "@/data/bridal-packages";
import { PackageCard } from "@/components/bridal/PackageCard";
import { ButtonLink } from "@/components/ui/Button";
import { Container, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function PackagesPreview() {
  const featured = bridalPackages.filter((p) => p.featured);
  return (
    <section className="bg-blush/35 py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="Bridal packages" title="Find Your Perfect Bridal Package." intro="Package categories for each wedding event. Contents and pricing are shared by the salon on request." />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.08}>
              <PackageCard pkg={p} />
            </Reveal>
          ))}
        </div>
        <div className="mt-14 text-center">
          <ButtonLink href="/bridal-packages" className="px-10 py-4">View All Bridal Packages</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
