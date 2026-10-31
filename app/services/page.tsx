import type { Metadata } from "next";
import { ServicesDirectory } from "@/components/services/ServicesDirectory";
import { Container } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";

export const metadata: Metadata = {
  title: "Salon Services Directory",
  description: "Browse bridal makeup, party makeup, hair and skin & beauty services at Hamna's Beauty Salon & Bridal Studio in Lahore.",
  openGraph: { title: "Salon Services | Hamna's Bridal Studio", description: "Makeup, hair, skincare and beauty services in Lahore." },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Services" title="Our Services." intro="An organized directory of makeup, hair, skin and beauty services. Pricing is shared by the salon on request." image="/images/hair.jpg" imageAlt="Sample photo of a bride with a styled updo and red roses in her hair" position="50% 25%" />
      <Container className="py-16 sm:py-24"><ServicesDirectory /></Container>
      <CtaBand title="Ready to book a service?" />
    </>
  );
}
