import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "light" | "ghost";

const variants: Record<Variant, string> = {
  primary: "bg-plum text-ivory hover:bg-espresso border border-plum",
  outline: "border border-plum text-plum hover:bg-plum hover:text-ivory",
  light: "bg-ivory text-plum border border-ivory hover:bg-blush hover:border-blush",
  ghost: "border border-ivory/70 text-ivory hover:bg-ivory hover:text-plum",
};

export const buttonClass = (variant: Variant = "primary", className?: string) =>
  cn(
    "inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-200",
    variants[variant],
    className,
  );

export function ButtonLink({
  href,
  variant = "primary",
  className,
  children,
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={buttonClass(variant, className)}>
      {children}
    </Link>
  );
}
