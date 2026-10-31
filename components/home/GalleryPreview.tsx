import { homeGallery } from "@/data/gallery";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { ButtonLink } from "@/components/ui/Button";
import { Container, SectionHeading } from "@/components/ui/Section";

export function GalleryPreview() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="Gallery" title="Bridal Beauty, Beautifully Captured." intro="Sample imagery shown for layout. Real portfolio photographs will appear here once added." />
        <div className="mt-12">
          <GalleryGrid images={homeGallery} />
        </div>
        <div className="mt-12 text-center">
          <ButtonLink href="/gallery" variant="outline">View Full Gallery</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
