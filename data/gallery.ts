/**
 * Gallery. Entries below are SAMPLE stock photos (Unsplash licence), not salon work.
 * Replace `src` with real portfolio photographs and set `sample: false`.
 */
export type GalleryCategory = "Bridal" | "Barat" | "Walima" | "Nikkah" | "Mehndi" | "Party Makeup" | "Hair & Beauty";

export const galleryCategories: ("All" | GalleryCategory)[] = ["All", "Bridal", "Barat", "Walima", "Nikkah", "Mehndi", "Party Makeup", "Hair & Beauty"];

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: GalleryCategory;
  sample: boolean;
}

const g = (id: string, src: string, caption: string, category: GalleryCategory): GalleryImage => ({
  id,
  src: `/images/${src}.jpg`,
  caption,
  category,
  sample: true,
  alt: `Sample photo: ${caption.toLowerCase()}`,
});

export const gallery: GalleryImage[] = [
  g("g1", "bridal-red", "Traditional red bridal look", "Bridal"),
  g("g2", "bridal-gold", "Gold bridal look", "Bridal"),
  g("g3", "barat", "Barat red and gold", "Barat"),
  g("g4", "nikkah", "Soft-glam nikkah makeup", "Nikkah"),
  g("g5", "walima", "Walima blush look", "Walima"),
  g("g6", "mehndi-alt", "Mehndi makeup", "Mehndi"),
  g("g7", "hair", "Bridal hairstyle", "Hair & Beauty"),
  g("g8", "party", "Evening party makeup", "Party Makeup"),
  g("g9", "engagement", "Engagement look", "Bridal"),
  g("g10", "skin", "Skincare and glow", "Hair & Beauty"),
  g("g11", "complete", "Complete bridal styling", "Bridal"),
  g("g12", "mehndi", "Henna and bridal jewellery", "Mehndi"),
];

export const homeGallery = ["g1", "g2", "g4", "g5", "g6", "g7"].map((id) => gallery.find((x) => x.id === id)!);
