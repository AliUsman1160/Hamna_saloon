"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useRef } from "react";
import { ButtonLink } from "@/components/ui/Button";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);

  const line = (children: React.ReactNode, delay: number, italic = false) => (
    <span className="block overflow-hidden pb-[0.12em]">
      <motion.span
        className={italic ? "block italic" : "block"}
        initial={{ y: reduce ? 0 : "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.1, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  );

  return (
    <section ref={ref} className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-espresso text-white">
      <motion.div style={{ y }} className="absolute inset-0 -z-20 scale-110">
        <Image
          src="/images/hero-coral-bride.jpg"
          alt="Sample editorial portrait of a bride in a coral and gold bridal outfit with a pink veil and gold jewellery"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[60%_15%] md:object-[50%_20%]"
        />
      </motion.div>
      {/* readability overlays */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-espresso via-espresso/40 to-espresso/30 md:bg-gradient-to-r md:from-espresso/90 md:via-espresso/40 md:to-transparent" />
      <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-espresso/60 to-transparent" />

      {/* decorative gold frame */}
      <div className="pointer-events-none absolute inset-4 -z-10 border border-gold/30 sm:inset-8" aria-hidden />

      <div className="mx-auto w-full max-w-7xl px-6 pb-28 pt-40 sm:px-12 md:pb-32">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="eyebrow mb-6 flex max-w-md items-center gap-4 !text-blush"
        >
          <span className="h-px w-10 shrink-0 bg-gold" aria-hidden />
          Bridal Makeup · Hair · Beauty
        </motion.p>

        <h1 className="max-w-3xl text-[2.9rem] font-medium leading-[1.02] !text-white sm:text-6xl lg:text-[5.6rem]">
          {line("Your Dream", 0.35)}
          {line("Bridal Look", 0.5)}
          {line(<span className="gold-text !bg-gradient-to-r from-[#e8cf9a] via-[#fff1cf] to-[#d8bf8a]">Starts Here.</span>, 0.65, true)}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1 }}
          className="mt-7 max-w-md text-base leading-relaxed text-white/85 sm:text-lg"
        >
          Discover bridal makeup, wedding packages, and personalized beauty services for your most memorable occasions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.15 }}
          className="mt-9 flex flex-col gap-3 sm:flex-row"
        >
          <ButtonLink href="/bridal-packages" variant="light">Explore Bridal Packages</ButtonLink>
          <ButtonLink href="/booking" variant="ghost">Book an Appointment</ButtonLink>
        </motion.div>
      </div>

      {/* rotating seal */}
      <div className="absolute bottom-24 right-10 hidden h-32 w-32 place-items-center md:grid lg:right-20" aria-hidden>
        <svg viewBox="0 0 120 120" className="animate-spin-slow absolute inset-0 text-blush">
          <defs>
            <path id="seal" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
          </defs>
          <text fontSize="9.5" letterSpacing="4.2" fill="currentColor" className="uppercase">
            <textPath href="#seal">Bridal · Makeup · Hair · Lahore ·</textPath>
          </text>
        </svg>
        <span className="font-serif text-4xl text-gold">H</span>
      </div>

      <a
        href="#intro"
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[0.62rem] uppercase tracking-[0.35em] text-white/70 transition hover:text-white"
      >
        Scroll
        <span className="relative h-10 w-px overflow-hidden bg-white/30">
          <motion.span
            className="absolute inset-x-0 top-0 h-4 bg-gold"
            animate={{ y: [-16, 40] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
        <ArrowDown size={12} aria-hidden />
      </a>
    </section>
  );
}
