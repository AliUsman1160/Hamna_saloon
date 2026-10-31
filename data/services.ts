/**
 * Service directory. These are suggested categories: set `confirmed: true`
 * only for services the salon has verified. Unpriced services show
 * "Contact for Pricing".
 */
export type ServiceCategory = "bridal" | "occasion" | "hair" | "skin";

export const serviceCategories: { id: ServiceCategory; name: string; blurb: string }[] = [
  { id: "bridal", name: "Bridal Makeup", blurb: "Looks for every wedding event." },
  { id: "occasion", name: "Occasion Makeup", blurb: "Makeup for parties and formal events." },
  { id: "hair", name: "Hair Services", blurb: "Cuts, styling and treatments." },
  { id: "skin", name: "Skin & Beauty", blurb: "Skincare and everyday beauty services." },
];

export interface Service {
  slug: string;
  name: string;
  category: ServiceCategory;
  description: string;
  details: string;
  image: string;
  imageAlt: string;
  price?: string;
  related: string[];
  /** Slugs from data/bridal-packages.ts */
  relatedPackages?: string[];
  confirmed: boolean;
  /** Label of the card this service represents in the homepage overview */
  homeGroup?: string;
}

type Seed = Omit<Service, "details" | "confirmed"> & { details?: string };

const S = (s: Seed): Service => ({
  confirmed: false,
  ...s,
  details:
    s.details ??
    `${s.description} Service details, duration and pricing are confirmed by the salon. Please get in touch to discuss what you need.`,
});

export const services: Service[] = [
  S({ slug: "barat-makeup", name: "Barat Makeup", category: "bridal", description: "Traditional bridal makeup for the main wedding day.", image: "/images/barat.jpg", imageAlt: "Sample photo: barat bridal makeup", related: ["walima-makeup", "complete-bridal-styling", "bridal-hairstyling"], relatedPackages: ["barat-bridal", "barat-walima"], homeGroup: "Bridal Makeup" }),
  S({ slug: "walima-makeup", name: "Walima Makeup", category: "bridal", description: "A softer, lighter bridal look for the walima.", image: "/images/walima.jpg", imageAlt: "Sample photo: walima makeup", related: ["barat-makeup", "nikkah-makeup"], relatedPackages: ["walima-bridal", "barat-walima"] }),
  S({ slug: "nikkah-makeup", name: "Nikkah Makeup", category: "bridal", description: "Understated soft-glam makeup for the nikkah.", image: "/images/nikkah.jpg", imageAlt: "Sample photo: nikkah makeup", related: ["engagement-makeup", "walima-makeup"], relatedPackages: ["nikkah-bridal", "nikkah-barat"], homeGroup: "Engagement & Nikkah Makeup" }),
  S({ slug: "mehndi-makeup", name: "Mehndi Makeup", category: "bridal", description: "Fresh, colourful makeup for the mehndi.", image: "/images/mehndi.jpg", imageAlt: "Sample photo: mehndi makeup", related: ["barat-makeup", "bridal-hairstyling"], relatedPackages: ["mehndi-bridal", "mehndi-barat"] }),
  S({ slug: "engagement-makeup", name: "Engagement Makeup", category: "bridal", description: "Polished makeup for your engagement.", image: "/images/engagement.jpg", imageAlt: "Sample photo: engagement makeup", related: ["nikkah-makeup", "party-makeup"], relatedPackages: ["engagement-makeup"] }),
  S({ slug: "complete-bridal-styling", name: "Complete Bridal Styling", category: "bridal", description: "Makeup and styling planned together for your look.", image: "/images/complete.jpg", imageAlt: "Sample photo: complete bridal styling", related: ["barat-makeup", "bridal-hairstyling"], relatedPackages: ["complete-wedding"] }),
  S({ slug: "party-makeup", name: "Party Makeup", category: "occasion", description: "Makeup for parties and celebrations.", image: "/images/party.jpg", imageAlt: "Sample photo: party makeup", related: ["formal-event-makeup", "wedding-guest-makeup", "hairstyling"], homeGroup: "Party Makeup" }),
  S({ slug: "formal-event-makeup", name: "Formal Event Makeup", category: "occasion", description: "Refined makeup for formal occasions.", image: "/images/party.jpg", imageAlt: "Sample photo: formal event makeup", related: ["party-makeup", "hairstyling"] }),
  S({ slug: "wedding-guest-makeup", name: "Wedding Guest Makeup", category: "occasion", description: "Makeup for attending a family or friend's wedding.", image: "/images/engagement.jpg", imageAlt: "Sample photo: wedding guest makeup", related: ["party-makeup", "hairstyling"] }),
  S({ slug: "haircuts", name: "Haircuts", category: "hair", description: "Haircuts tailored to you.", image: "/images/hair.jpg", imageAlt: "Sample photo: a haircut", related: ["hairstyling", "blow-dry-styling", "hair-treatments"], homeGroup: "Haircuts & Hairstyling" }),
  S({ slug: "hairstyling", name: "Hairstyling", category: "hair", description: "Styling for everyday and special occasions.", image: "/images/hair.jpg", imageAlt: "Sample photo: hairstyling", related: ["haircuts", "blow-dry-styling", "bridal-hairstyling"] }),
  S({ slug: "bridal-hairstyling", name: "Bridal Hairstyling", category: "hair", description: "Hairstyles to complement your bridal look.", image: "/images/bridal-gold.jpg", imageAlt: "Sample photo: a bridal hairstyle", related: ["hairstyling", "barat-makeup"], relatedPackages: ["complete-wedding"] }),
  S({ slug: "blow-dry-styling", name: "Blow-dry and Styling", category: "hair", description: "Blow-dry and finish for a polished look.", image: "/images/hair.jpg", imageAlt: "Sample photo: a blow-dry", related: ["haircuts", "hairstyling"] }),
  S({ slug: "hair-treatments", name: "Hair Treatments", category: "hair", description: "Treatments to care for your hair.", image: "/images/hair.jpg", imageAlt: "Sample photo: hair treatment", related: ["haircuts", "blow-dry-styling"], homeGroup: "Hair Care & Treatments" }),
  S({ slug: "skincare-treatments", name: "Skincare Treatments", category: "skin", description: "Skincare to prepare and refresh your skin.", image: "/images/skin.jpg", imageAlt: "Sample photo: a skincare treatment", related: ["facials", "threading"], homeGroup: "Skin Care & Beauty Services" }),
  S({ slug: "facials", name: "Facials", category: "skin", description: "Facial treatments for a fresh complexion.", image: "/images/skin.jpg", imageAlt: "Sample photo: a facial", related: ["skincare-treatments", "threading"] }),
  S({ slug: "threading", name: "Threading", category: "skin", description: "Threading for shaping and grooming.", image: "/images/skin.jpg", imageAlt: "Sample photo: threading", related: ["facials", "waxing"] }),
  S({ slug: "waxing", name: "Waxing", category: "skin", description: "Waxing services for smooth skin.", image: "/images/skin.jpg", imageAlt: "Sample photo: waxing", related: ["threading", "manicure-pedicure"] }),
  S({ slug: "manicure-pedicure", name: "Manicure and Pedicure", category: "skin", description: "Hand and foot care and nail finishing.", image: "/images/skin.jpg", imageAlt: "Sample photo: manicure and pedicure", related: ["waxing", "facials"] }),
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
export const servicesByCategory = (c: ServiceCategory) => services.filter((s) => s.category === c);
export const categoryOf = (id: ServiceCategory) => serviceCategories.find((c) => c.id === id)!;
