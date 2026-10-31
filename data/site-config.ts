/**
 * Central, editable business details.
 * Anything marked VERIFY comes from public listings and must be confirmed
 * with the salon before the site is published.
 */
export const siteConfig = {
  name: "Hamna's Beauty Salon & Bridal Studio",
  shortName: "Hamna's",
  tagline: "Bridal Makeup · Hair · Beauty",
  url: "https://example.com", // TODO: replace with the production domain
  description:
    "Explore bridal makeup packages, wedding deals, hairstyling, and beauty services at Hamna's Beauty Salon & Bridal Studio in Lahore. Browse packages and inquire about an appointment.",
  /** VERIFY: public listings associate the salon with Johar Town, Lahore. */
  address: {
    lines: ["Johar Town", "Lahore, Pakistan"],
    mapQuery: "Hamna's Beauty Salon & Bridal Studio, Johar Town, Lahore",
    verified: false,
  },
  /** VERIFY: number taken from public listings. */
  phone: { display: "+92 42 35170702", tel: "+924235170702", verified: false },
  /** Leave empty until the salon provides a WhatsApp number (digits only with country code, e.g. "923001234567"). */
  whatsapp: "",
  /** Leave empty until the salon provides an email address. */
  email: "",
  /** Leave empty until the salon confirms its hours, e.g. [{ days: "Mon – Sat", hours: "10:00 – 20:00" }]. */
  openingHours: [] as { days: string; hours: string }[],
  /** Add verified profile URLs. Empty entries are hidden. */
  social: {
    instagram: "",
    facebook: "",
    tiktok: "",
  } as Record<string, string>,
};

export type SiteConfig = typeof siteConfig;
