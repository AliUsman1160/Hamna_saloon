import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { PackagesPreview } from "@/components/home/PackagesPreview";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { WhyChoose } from "@/components/home/WhyChoose";
import { CtaBand } from "@/components/ui/CtaBand";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: { absolute: "Hamna's Beauty Salon & Bridal Studio | Bridal Makeup Lahore" },
  description: siteConfig.description,
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <PackagesPreview />
      <ServicesOverview />
      <GalleryPreview />
      <WhyChoose />
      <CtaBand />
    </>
  );
}
