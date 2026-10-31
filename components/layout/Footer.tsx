import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { socialLinks } from "@/lib/utils";

const col = "mb-4 font-sans text-xs font-medium uppercase tracking-[0.2em] text-gold";
const link = "block py-1 text-sm text-ivory/75 transition-colors hover:text-ivory";

export function Footer() {
  const socials = socialLinks();
  return (
    <footer className="bg-plum text-ivory">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <p className="font-serif text-3xl text-ivory">Hamna&apos;s</p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-gold">Beauty Salon &amp; Bridal Studio</p>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-ivory/75">
            Bridal makeup, hair and beauty services in Lahore. Browse packages and services, then prepare your appointment inquiry.
          </p>
          {socials.length > 0 && (
            <ul className="mt-5 flex gap-4 text-sm">
              {socials.map(([name, url]) => (
                <li key={name}>
                  <a href={url} target="_blank" rel="noopener noreferrer" className="capitalize text-ivory/75 hover:text-ivory">
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <nav aria-label="Explore">
          <h2 className={col}>Explore</h2>
          <Link className={link} href="/bridal-packages">Bridal Packages</Link>
          <Link className={link} href="/services">Services</Link>
          <Link className={link} href="/gallery">Gallery</Link>
          <Link className={link} href="/booking">Book an Appointment</Link>
          <Link className={link} href="/faq">FAQ</Link>
        </nav>
        <nav aria-label="Company">
          <h2 className={col}>The Salon</h2>
          <Link className={link} href="/about">About</Link>
          <Link className={link} href="/contact">Contact</Link>
        </nav>
        <div>
          <h2 className={col}>Contact</h2>
          <address className="space-y-3 text-sm not-italic text-ivory/75">
            <p className="flex gap-2"><MapPin size={16} className="mt-0.5 shrink-0 text-gold" />{siteConfig.address.lines.join(", ")}</p>
            <p className="flex gap-2"><Phone size={16} className="mt-0.5 shrink-0 text-gold" /><a href={`tel:${siteConfig.phone.tel}`} className="hover:text-ivory">{siteConfig.phone.display}</a></p>
            {siteConfig.email && (
              <p className="flex gap-2"><Mail size={16} className="mt-0.5 shrink-0 text-gold" /><a href={`mailto:${siteConfig.email}`} className="hover:text-ivory">{siteConfig.email}</a></p>
            )}
          </address>
        </div>
      </div>
      <div className="border-t border-ivory/15 py-5 text-center text-xs text-ivory/60">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}
