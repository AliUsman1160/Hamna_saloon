import Image from "next/image";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8", className)}>{children}</div>;
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  as: Tag = "h2",
  light,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
  light?: boolean;
}) {
  return (
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && <p className={cn("eyebrow mb-4", light && "!text-gold")}>{eyebrow}</p>}
      <Tag className={cn("text-4xl leading-[1.1] sm:text-5xl", light && "!text-ivory")}>{title}</Tag>
      {intro && <p className={cn("mt-5 text-base leading-relaxed", light ? "text-ivory/80" : "text-espresso/75")}>{intro}</p>}
    </Reveal>
  );
}

export function SampleTag({ className }: { className?: string }) {
  return (
    <span className={cn("bg-espresso/70 px-2 py-1 text-[10px] uppercase tracking-widest text-ivory backdrop-blur", className)}>
      Sample image
    </span>
  );
}

export function Photo({
  src,
  alt,
  className,
  sizes = "(min-width: 1024px) 33vw, 100vw",
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-blush", className)}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
    </div>
  );
}
