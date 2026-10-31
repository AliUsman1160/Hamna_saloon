"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  imageAlt,
  position = "50% 25%",
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  image: string;
  imageAlt: string;
  /** CSS object-position for the background photo */
  position?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "15%"]);

  return (
    <section ref={ref} className="relative isolate flex min-h-[26rem] items-end overflow-hidden bg-espresso text-white sm:min-h-[32rem]">
      <motion.div style={{ y }} className="absolute inset-0 -z-20 scale-110">
        <Image src={image} alt={imageAlt} fill priority sizes="100vw" className="object-cover" style={{ objectPosition: position }} />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-espresso via-espresso/50 to-espresso/30 md:bg-gradient-to-r md:from-espresso/90 md:via-espresso/55 md:to-espresso/10" />
      <div className="absolute inset-x-0 top-0 -z-10 h-36 bg-gradient-to-b from-espresso/60 to-transparent" />
      <div className="pointer-events-none absolute inset-4 -z-10 border border-gold/30 sm:inset-8" aria-hidden />

      <div className="mx-auto w-full max-w-7xl px-6 pb-14 pt-36 sm:px-12 sm:pb-20">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="eyebrow mb-5 flex items-center gap-4 !text-blush"
        >
          <span className="h-px w-10 shrink-0 bg-gold" aria-hidden />
          {eyebrow}
        </motion.p>
        <h1 className="max-w-3xl text-4xl font-medium leading-[1.05] !text-white sm:text-6xl">
          <span className="block overflow-hidden pb-[0.12em]">
            <motion.span
              className="block"
              initial={{ y: reduce ? 0 : "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease }}
            >
              {title}
            </motion.span>
          </span>
        </h1>
        {intro && (
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg"
          >
            {intro}
          </motion.p>
        )}
        <span className="mt-8 block h-px w-24 bg-gold/70" aria-hidden />
      </div>
    </section>
  );
}
