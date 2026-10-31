import type { Metadata } from "next";
import { Suspense } from "react";
import { BookingForm } from "@/components/booking/BookingForm";
import { Container } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description: "Prepare your appointment inquiry for bridal makeup or salon services at Hamna's Beauty Salon & Bridal Studio in Lahore.",
  openGraph: { title: "Book an Appointment | Hamna's Bridal Studio", description: "Prepare an appointment inquiry." },
};

export default function BookingPage() {
  return (
    <>
      <PageHero
        eyebrow="Appointments"
        image="/images/nikkah.jpg"
        imageAlt="Sample photo of a bride lifting a peach veil"
        position="50% 30%"
        title="Book Your Beauty Appointment."
        intro="Tell us which service or bridal package you're interested in and share your preferred date. You can use this form to prepare your appointment request."
      />
      <Container className="max-w-3xl py-14 sm:py-20">
        <Suspense fallback={<p className="text-espresso/60">Loading form…</p>}>
          <BookingForm />
        </Suspense>
      </Container>
    </>
  );
}
