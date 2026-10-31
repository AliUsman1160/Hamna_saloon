import type { Metadata } from "next";
import { gallery } from "@/data/gallery";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { Container } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";

export const metadata: Metadata = {
  title: "Bridal & Salon Gallery",
  description: "Browse bridal, barat, walima, nikkah, mehndi, party and hair & beauty looks from Hamna's Beauty Salon & Bridal Studio.",
  openGraph: { title: "Gallery | Hamna's Bridal Studio", description: "A portfolio of bridal and beauty looks." },
};

export default function GalleryPage() {
  return (
    <>
      <PageHero eyebrow="Gallery" title="Bridal Beauty, Beautifully Captured." intro="Filter by occasion and open any image to view it larger. Images currently shown are sample illustrations, not salon work." image="/images/bridal-gold.jpg" imageAlt="Sample photo of a bride in gold and maroon bridal wear holding string lights" position="50% 30%" />
      <Container className="py-16 sm:py-24"><GalleryGrid images={gallery} showFilters /></Container>
      <CtaBand />
    </>
  );
}
