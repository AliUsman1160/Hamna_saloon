import { clsx, type ClassValue } from "clsx";
import { siteConfig } from "@/data/site-config";

export const cn = (...inputs: ClassValue[]) => clsx(inputs);

export const bookingHref = (params: { package?: string; service?: string }) => {
  const q = new URLSearchParams();
  if (params.package) q.set("package", params.package);
  if (params.service) q.set("service", params.service);
  const s = q.toString();
  return s ? `/booking?${s}` : "/booking";
};

export const socialLinks = () =>
  Object.entries(siteConfig.social).filter(([, url]) => url);
