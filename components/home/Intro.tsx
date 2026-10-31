import { ButtonLink } from "@/components/ui/Button";
import { Container, Photo, SampleTag, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function Intro() {
  return (
    <section id="intro" className="scroll-mt-20 py-20 sm:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-2">
        <Reveal className="relative">
          <Photo src="/images/bridal-red.jpg" alt="Sample photo of a bride in a red and gold bridal look" className="aspect-[4/5] w-[78%]" sizes="(min-width: 1024px) 35vw, 80vw" />
          <Photo src="/images/mehndi.jpg" alt="Sample photo of a bride wearing detailed bridal jewellery and henna" className="absolute -bottom-8 right-0 aspect-square w-[48%] border-8 border-ivory" sizes="(min-width: 1024px) 20vw, 45vw" />
          <SampleTag className="absolute left-3 top-3" />
        </Reveal>
        <div>
          <SectionHeading eyebrow="About the studio" title="Beauty for Your Most Special Moments." />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-lg leading-relaxed text-espresso/80">
              Hamna&apos;s Beauty Salon &amp; Bridal Studio in Lahore offers bridal makeup and a range of hair, skin and beauty services. From wedding events to everyday care, the aim is a look that feels like you.
            </p>
            <p className="mt-4 max-w-lg leading-relaxed text-espresso/80">
              Browse the services below, compare bridal packages and prepare your appointment inquiry online.
            </p>
            <ButtonLink href="/services" variant="outline" className="mt-8">Explore our services</ButtonLink>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
