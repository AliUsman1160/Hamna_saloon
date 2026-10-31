import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/data/site-config";

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-cormorant" });
const sans = Inter({ subsets: ["latin"], variable: "--font-inter" });

const homeTitle = "Hamna's Beauty Salon & Bridal Studio | Bridal Makeup Lahore";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: homeTitle, template: `%s | ${siteConfig.shortName} Bridal Studio` },
  description: siteConfig.description,
  openGraph: {
    title: homeTitle,
    description: siteConfig.description,
    siteName: siteConfig.name,
    locale: "en_PK",
    type: "website",
    images: [{ url: "/images/barat.jpg", alt: "Sample photo of a bride" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:bg-ivory focus:p-3">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
