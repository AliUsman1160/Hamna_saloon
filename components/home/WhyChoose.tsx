import { CalendarCheck, Crown, Scissors, Sparkles } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const items = [
  { icon: Sparkles, title: "Personalized Beauty Services", text: "Share your preferences and requirements when you inquire so the salon can discuss them with you." },
  { icon: Crown, title: "Bridal and Occasion Styling", text: "Looks for wedding events and other occasions, from nikkah to mehndi." },
  { icon: Scissors, title: "A Range of Salon Services", text: "Makeup, hair, skincare and beauty services in one place." },
  { icon: CalendarCheck, title: "Easy Appointment Inquiries", text: "Prepare your request online, then contact the salon to confirm." },
];

export function WhyChoose() {
  return (
    <section className="bg-plum py-20 text-ivory sm:py-28">
      <Container>
        <SectionHeading light eyebrow="Why Hamna's" title="Your Occasion Deserves Every Detail." />
        <ul className="mt-14 grid gap-px bg-ivory/15 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <li key={it.title} className="bg-plum p-8">
              <Reveal delay={i * 0.07}>
                <it.icon className="text-gold" size={30} strokeWidth={1.4} aria-hidden />
                <h3 className="mt-6 text-2xl !text-ivory">{it.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ivory/75">{it.text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
