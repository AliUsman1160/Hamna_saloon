import { ButtonLink } from "./Button";
import { Container, SectionHeading } from "./Section";

export function CtaBand({
  title = "Let's Plan Your Perfect Look.",
  text = "Tell us about your special occasion, the services you need, and your preferred appointment date.",
  bookHref = "/booking",
}: {
  title?: string;
  text?: string;
  bookHref?: string;
}) {
  return (
    <section className="bg-plum py-20 sm:py-28">
      <Container className="text-center">
        <SectionHeading align="center" light title={title} intro={text} />
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href="/bridal-packages" variant="ghost">Browse Bridal Packages</ButtonLink>
          <ButtonLink href={bookHref} variant="light">Book an Appointment</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
