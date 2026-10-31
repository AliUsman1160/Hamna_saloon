import type { Metadata } from "next";
import { Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { socialLinks } from "@/lib/utils";
import { ButtonLink, buttonClass } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Contact & Directions",
  description: "Contact Hamna's Beauty Salon & Bridal Studio in Johar Town, Lahore. Phone, address and directions.",
  openGraph: { title: "Contact | Hamna's Bridal Studio", description: "Phone, address and directions." },
};

export default function ContactPage() {
  const q = encodeURIComponent(siteConfig.address.mapQuery);
  const socials = socialLinks();
  const row = "flex gap-4 border-b border-plum/10 py-5";
  return (
    <>
      <PageHero eyebrow="Contact" title="Visit or Call the Salon." intro="Please contact the salon directly to confirm appointments, availability and pricing." image="/images/engagement.jpg" imageAlt="Sample photo of a bride in a red gown" position="50% 55%" />
      <Container className="grid gap-12 py-16 sm:py-24 lg:grid-cols-2">
        <div>
          <address className="not-italic">
            <div className={row}>
              <MapPin className="shrink-0 text-gold-deep" aria-hidden />
              <div><h2 className="text-2xl">Address</h2><p className="mt-1">{siteConfig.address.lines.join(", ")}</p></div>
            </div>
            <div className={row}>
              <Phone className="shrink-0 text-gold-deep" aria-hidden />
              <div><h2 className="text-2xl">Phone</h2><a className="mt-1 block hover:text-gold-deep" href={`tel:${siteConfig.phone.tel}`}>{siteConfig.phone.display}</a></div>
            </div>
            {siteConfig.email && (
              <div className={row}>
                <Mail className="shrink-0 text-gold-deep" aria-hidden />
                <div><h2 className="text-2xl">Email</h2><a className="mt-1 block hover:text-gold-deep" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></div>
              </div>
            )}
          </address>
          <div className={row}>
            <Clock className="shrink-0 text-gold-deep" aria-hidden />
            <div>
              <h2 className="text-2xl">Opening hours</h2>
              {siteConfig.openingHours.length ? (
                <ul className="mt-1">{siteConfig.openingHours.map((h) => <li key={h.days}>{h.days}: {h.hours}</li>)}</ul>
              ) : (
                <p className="mt-1 text-espresso/75">Please call the salon to confirm opening hours.</p>
              )}
            </div>
          </div>
          {socials.length > 0 && (
            <div className="py-5">
              <h2 className="text-2xl">Follow</h2>
              <ul className="mt-2 flex gap-5">
                {socials.map(([n, u]) => <li key={n}><a href={u} target="_blank" rel="noopener noreferrer" className="capitalize underline decoration-gold underline-offset-4">{n}</a></li>)}
              </ul>
            </div>
          )}
          <p className="mt-2 text-xs text-espresso/55">Contact details are based on public listings and should be verified with the salon.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={`tel:${siteConfig.phone.tel}`} className={buttonClass("primary")}><Phone size={16} /> Call the salon</a>
            <ButtonLink href="/booking" variant="outline">Prepare an inquiry</ButtonLink>
          </div>
        </div>
        <div>
          <div className="aspect-[4/3] w-full overflow-hidden border border-plum/15 bg-blush">
            <iframe title="Map showing the salon area in Johar Town, Lahore" src={`https://www.google.com/maps?q=${q}&output=embed`} className="h-full w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
          <a href={`https://www.google.com/maps/dir/?api=1&destination=${q}`} target="_blank" rel="noopener noreferrer" className={buttonClass("outline", "mt-4 w-full")}>
            <Navigation size={16} /> Get directions
          </a>
        </div>
      </Container>
    </>
  );
}
