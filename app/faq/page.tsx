import type { Metadata } from "next";
import { faqs } from "@/data/faqs";
import { Accordion } from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Answers about booking bridal makeup, package inquiries and salon services at Hamna's Beauty Salon & Bridal Studio.",
  openGraph: { title: "FAQ | Hamna's Bridal Studio", description: "Booking and package questions answered." },
};

export default function FaqPage() {
  return (
    <>
      <PageHero eyebrow="FAQ" title="Frequently Asked Questions." intro="Where details depend on the salon, we point you to contact them directly." image="/images/mehndi-alt.jpg" imageAlt="Sample photo of hands decorated with henna" position="50% 40%" />
      <Container className="max-w-3xl py-16 sm:py-24"><Accordion items={faqs} /></Container>
      <CtaBand title="Still have questions?" text="Contact the salon directly, or prepare an appointment inquiry." />
    </>
  );
}
