"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { buttonClass } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Home" },
  { href: "/bridal-packages", label: "Bridal Packages" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [prevPath, setPrevPath] = useState(pathname);

  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const transparent = pathname === "/" && !scrolled && !open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        transparent ? "bg-transparent text-ivory" : "bg-ivory/95 text-espresso shadow-[0_1px_0_rgba(71,38,62,0.1)] backdrop-blur",
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" className="flex flex-col leading-none" aria-label={`${siteConfig.name} home`}>
          <span className={cn("font-serif text-2xl font-semibold", transparent ? "text-ivory" : "text-plum")}>Hamna&apos;s</span>
          <span className={cn("mt-1 text-[9px] uppercase tracking-[0.22em]", transparent ? "text-ivory/80" : "text-gold-deep")}>
            Beauty Salon &amp; Bridal Studio
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={isActive(n.href) ? "page" : undefined}
              className={cn(
                "border-b py-1 text-sm transition-colors",
                isActive(n.href) ? "border-gold" : "border-transparent hover:border-gold/60",
              )}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/booking"
            className={cn(buttonClass(transparent ? "light" : "primary"), "px-4 py-2.5 text-xs sm:px-6 sm:text-sm")}
          >
            <span className="hidden sm:inline">Book an Appointment</span>
            <span className="sm:hidden">Book</span>
          </Link>
          <button
            type="button"
            className="p-2 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-20 h-[calc(100dvh-5rem)] overflow-y-auto bg-ivory px-5 pb-10 pt-6 text-espresso lg:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col">
              {nav.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  aria-current={isActive(n.href) ? "page" : undefined}
                  className={cn(
                    "border-b border-plum/10 py-4 font-serif text-2xl",
                    isActive(n.href) ? "text-gold-deep" : "text-plum",
                  )}
                >
                  {n.label}
                </Link>
              ))}
            </nav>
            <Link href="/booking" className={cn(buttonClass("primary"), "mt-8 w-full")}>
              Book an Appointment
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
