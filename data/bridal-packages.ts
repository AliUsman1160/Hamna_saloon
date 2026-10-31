/**
 * Bridal packages.
 * These are SUGGESTED categories for the interface, not confirmed salon deals.
 * Set `confirmed: true` only for packages the salon has verified; add `price`,
 * `included`, `badge` and `availability` only when verified. Unconfirmed
 * packages are labelled "Sample category" and show no price.
 */
export type PackageGroup = "individual" | "multi";

export interface BridalPackage {
  slug: string;
  name: string;
  occasion: string;
  group: PackageGroup;
  description: string;
  image: string;
  imageAlt: string;
  /** e.g. "PKR 85,000" — omit when unverified */
  price?: string;
  /** Verified inclusions only */
  included?: string[];
  /** Verified promotional badge only */
  badge?: string;
  availability?: string;
  /** Has the salon confirmed this package exists? */
  confirmed: boolean;
  /** Show on the homepage preview */
  featured?: boolean;
}

export const bridalPackages: BridalPackage[] = [
  {
    slug: "barat-bridal",
    name: "Barat Bridal Package",
    occasion: "Barat",
    group: "individual",
    description: "Classic bridal makeup and styling for the main wedding day, inspired by traditional red and gold looks.",
    image: "/images/barat.jpg",
    imageAlt: "Sample photo of a bride in a red and gold lehenga",
    confirmed: false,
    featured: true,
  },
  {
    slug: "walima-bridal",
    name: "Walima Bridal Package",
    occasion: "Walima",
    group: "individual",
    description: "A softer, pastel-toned bridal look for the walima celebration.",
    image: "/images/walima.jpg",
    imageAlt: "Sample photo of a bride in a coral bridal outfit with a pink veil",
    confirmed: false,
    featured: true,
  },
  {
    slug: "nikkah-bridal",
    name: "Nikkah Bridal Package",
    occasion: "Nikkah",
    group: "individual",
    description: "Elegant, understated soft-glam makeup for the nikkah ceremony.",
    image: "/images/nikkah.jpg",
    imageAlt: "Sample photo of a bride lifting a peach veil",
    confirmed: false,
    featured: true,
  },
  {
    slug: "mehndi-bridal",
    name: "Mehndi Bridal Package",
    occasion: "Mehndi",
    group: "individual",
    description: "Vibrant, fresh makeup and styling for the mehndi festivities.",
    image: "/images/mehndi.jpg",
    imageAlt: "Sample photo of a bride with henna and bridal jewellery",
    confirmed: false,
    featured: true,
  },
  {
    slug: "engagement-makeup",
    name: "Engagement Makeup Package",
    occasion: "Engagement",
    group: "individual",
    description: "Polished makeup and styling for your engagement celebration.",
    image: "/images/engagement.jpg",
    imageAlt: "Sample photo of a bride in a red gown",
    confirmed: false,
    featured: true,
  },
  {
    slug: "complete-wedding",
    name: "Complete Wedding Package",
    occasion: "Multiple events",
    group: "multi",
    description: "Coordinated looks across your wedding events. Ask the salon how events can be combined.",
    image: "/images/complete.jpg",
    imageAlt: "Sample photo of a bride in an embellished red bridal outfit",
    confirmed: false,
    featured: true,
  },
  {
    slug: "barat-walima",
    name: "Barat + Walima Package",
    occasion: "Barat & Walima",
    group: "multi",
    description: "Two looks for two events, planned together.",
    image: "/images/bridal-red.jpg",
    imageAlt: "Sample photo of a bride in a red velvet bridal outfit",
    confirmed: false,
  },
  {
    slug: "nikkah-barat",
    name: "Nikkah + Barat Package",
    occasion: "Nikkah & Barat",
    group: "multi",
    description: "Coordinated looks for your nikkah and barat.",
    image: "/images/bridal-gold.jpg",
    imageAlt: "Sample photo of a bride in gold and maroon bridal wear",
    confirmed: false,
  },
  {
    slug: "mehndi-barat",
    name: "Mehndi + Barat Package",
    occasion: "Mehndi & Barat",
    group: "multi",
    description: "Pair your mehndi and barat looks in one plan.",
    image: "/images/mehndi-alt.jpg",
    imageAlt: "Sample photo of mehndi henna on hands",
    confirmed: false,
  },
];

export const packageBySlug = (slug: string) => bridalPackages.find((p) => p.slug === slug);

/**
 * Comparison rows. A package shows a tick for an attribute only when that
 * label appears in its `included` array.
 */
export const comparisonAttributes = [
  "Makeup service",
  "Hairstyling",
  "Dupatta setting",
  "Lashes",
  "Pre-bridal services",
  "Additional event coverage",
];
