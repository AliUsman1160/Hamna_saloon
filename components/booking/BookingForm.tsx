"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, MessageCircle, Phone } from "lucide-react";
import { bridalPackages, packageBySlug } from "@/data/bridal-packages";
import { serviceBySlug, serviceCategories, services, type ServiceCategory } from "@/data/services";
import { siteConfig } from "@/data/site-config";
import { buttonClass } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const eventTypes = ["Barat", "Walima", "Nikkah", "Mehndi", "Engagement", "Party / Formal event", "Wedding guest", "Everyday / No event", "Other"];
const times = ["Morning", "Afternoon", "Evening", "Flexible"];

interface Values {
  name: string;
  phone: string;
  email: string;
  category: ServiceCategory | "";
  service: string;
  pkg: string;
  eventType: string;
  date: string;
  time: string;
  notes: string;
}
type Errors = Partial<Record<keyof Values, string>>;

const todayISO = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};

export function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Please enter your full name.";
  const digits = v.phone.replace(/[\s\-()]/g, "");
  if (!v.phone.trim()) e.phone = "Please enter a phone number.";
  else if (!/^(\+92|0092|92|0)\d{9,10}$/.test(digits)) e.phone = "Enter a valid Pakistani number, e.g. 0300 1234567 or +92 42 35170702.";
  if (v.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = "Please enter a valid email address.";
  if (!v.category) e.category = "Please choose a service category.";
  if (!v.service && !v.pkg) e.service = "Please choose a service or a bridal package.";
  if (!v.eventType) e.eventType = "Please choose an event type.";
  if (v.date && v.date < todayISO()) e.date = "Please choose today or a future date.";
  return e;
}

const field = "w-full border bg-white px-4 py-3 text-base text-espresso placeholder:text-espresso/40 focus:border-plum focus:outline-none";

function Field({ id, label, error, hint, required, children }: { id: string; label: string; error?: string; hint?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-plum">
        {label} {required ? <span aria-hidden className="text-gold-deep">*</span> : <span className="font-normal text-espresso/55">(optional)</span>}
      </label>
      {children}
      {hint && !error && <p id={`${id}-hint`} className="mt-1 text-xs text-espresso/60">{hint}</p>}
      {error && <p id={`${id}-err`} role="alert" className="mt-1 text-sm text-red-700">{error}</p>}
    </div>
  );
}

export function BookingForm() {
  const params = useSearchParams();
  const [initial] = useState<Values>(() => {
    const pkgSlug = params.get("package") ?? "";
    const svcSlug = params.get("service") ?? "";
    const pkg = packageBySlug(pkgSlug);
    const svc = serviceBySlug(svcSlug);
    return {
      name: "", phone: "", email: "",
      category: svc ? svc.category : pkg ? "bridal" : "",
      service: svc?.slug ?? "",
      pkg: pkg?.slug ?? "",
      eventType: pkg && pkg.group === "individual" ? pkg.occasion : "",
      date: "", time: "", notes: "",
    };
  });
  const [v, setV] = useState<Values>(initial);
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [done, setDone] = useState(false);

  const errors = validate(v);
  const shown = (k: keyof Values) => ((touched[k] || submitted) ? errors[k] : undefined);
  const set = <K extends keyof Values>(k: K, val: Values[K]) => setV((p) => ({ ...p, [k]: val }));
  const blur = (k: keyof Values) => () => setTouched((t) => ({ ...t, [k]: true }));
  const aria = (k: keyof Values) => ({
    "aria-invalid": !!shown(k),
    "aria-describedby": shown(k) ? `${String(k)}-err` : undefined,
  });
  const cls = (k: keyof Values) => cn(field, shown(k) ? "border-red-700" : "border-plum/25");

  const categoryServices = services.filter((s) => s.category === v.category);
  const svc = serviceBySlug(v.service);
  const pkg = packageBySlug(v.pkg);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (Object.keys(errors).length === 0) {
      setDone(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const first = Object.keys(errors)[0];
      document.getElementById(first === "category" ? "category" : first)?.focus();
    }
  };

  const message = [
    `Hello, I'd like to inquire about an appointment at ${siteConfig.name}.`,
    `Name: ${v.name.trim()}`,
    svc && `Service: ${svc.name}`,
    pkg && `Bridal package: ${pkg.name}`,
    v.eventType && `Event: ${v.eventType}`,
    v.date && `Preferred date: ${v.date}`,
    v.time && `Preferred time: ${v.time}`,
    v.notes.trim() && `Notes: ${v.notes.trim()}`,
  ].filter(Boolean).join("\n");
  const whatsappHref = siteConfig.whatsapp ? `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}` : "";

  if (done) {
    const rows: [string, string][] = [
      ["Name", v.name.trim()],
      ["Phone", v.phone.trim()],
      ...(v.email.trim() ? [["Email", v.email.trim()] as [string, string]] : []),
      ["Service", svc?.name ?? "—"],
      ["Bridal package", pkg?.name ?? "—"],
      ["Event", v.eventType],
      ["Preferred date", v.date || "—"],
      ["Preferred time", v.time || "—"],
      ...(v.notes.trim() ? [["Notes", v.notes.trim()] as [string, string]] : []),
    ];
    return (
      <div role="status" className="border border-plum/15 bg-white p-6 sm:p-10">
        <CheckCircle2 className="text-gold-deep" size={36} aria-hidden />
        <h2 className="mt-4 text-3xl">Your inquiry is prepared (demo).</h2>
        <p className="mt-3 max-w-xl leading-relaxed text-espresso/80">
          Nothing has been sent. This demo form does not send your information to the salon, and no appointment has been booked or confirmed. Please contact the salon directly to confirm your appointment.
        </p>
        <dl className="mt-8 grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
          {rows.map(([k, val]) => (
            <div key={k} className="border-b border-plum/10 pb-2">
              <dt className="text-espresso/55">{k}</dt>
              <dd className="font-medium">{val}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={() => setDone(false)} className={buttonClass("outline")}>Edit my details</button>
          <a href={`tel:${siteConfig.phone.tel}`} className={buttonClass("primary")}><Phone size={16} /> Call {siteConfig.phone.display}</a>
          {whatsappHref && (
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={buttonClass("outline")}>
              <MessageCircle size={16} /> Continue on WhatsApp
            </a>
          )}
        </div>
        {whatsappHref && <p className="mt-3 text-xs text-espresso/60">WhatsApp opens with a prepared message that you can review and send yourself.</p>}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-10">
      <p className="border-l-2 border-gold bg-blush/40 p-4 text-sm leading-relaxed">
        <strong>Demo form.</strong> It prepares your inquiry on this page only and does not transmit appointment requests.
      </p>

      <fieldset className="space-y-5">
        <legend className="mb-5 font-serif text-2xl text-plum">Personal details</legend>
        <Field id="name" label="Full name" required error={shown("name")}>
          <input id="name" autoComplete="name" value={v.name} onChange={(e) => set("name", e.target.value)} onBlur={blur("name")} className={cls("name")} {...aria("name")} />
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="phone" label="Phone number" required error={shown("phone")}>
            <input id="phone" type="tel" autoComplete="tel" placeholder="0300 1234567" value={v.phone} onChange={(e) => set("phone", e.target.value)} onBlur={blur("phone")} className={cls("phone")} {...aria("phone")} />
          </Field>
          <Field id="email" label="Email address" error={shown("email")}>
            <input id="email" type="email" autoComplete="email" value={v.email} onChange={(e) => set("email", e.target.value)} onBlur={blur("email")} className={cls("email")} {...aria("email")} />
          </Field>
        </div>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="mb-5 font-serif text-2xl text-plum">Appointment details</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="category" label="Service category" required error={shown("category")}>
            <select
              id="category"
              value={v.category}
              onChange={(e) => {
                const c = e.target.value as ServiceCategory | "";
                setV((p) => ({ ...p, category: c, service: serviceBySlug(p.service)?.category === c ? p.service : "" }));
              }}
              onBlur={blur("category")}
              className={cls("category")}
              {...aria("category")}
            >
              <option value="">Select a category</option>
              {serviceCategories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </Field>
          <Field id="service" label="Specific service" error={shown("service")} hint="Choose a service, a bridal package, or both.">
            <select id="service" value={v.service} onChange={(e) => set("service", e.target.value)} onBlur={blur("service")} disabled={!v.category} className={cn(cls("service"), "disabled:bg-ivory disabled:text-espresso/50")} {...aria("service")}>
              <option value="">{v.category ? "Select a service" : "Choose a category first"}</option>
              {categoryServices.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
            </select>
          </Field>
        </div>
        <Field id="pkg" label="Bridal package">
          <select id="pkg" value={v.pkg} onChange={(e) => set("pkg", e.target.value)} className={cls("pkg")}>
            <option value="">No package</option>
            {bridalPackages.map((p) => <option key={p.slug} value={p.slug}>{p.name}</option>)}
          </select>
        </Field>
        <div className="grid gap-5 sm:grid-cols-3">
          <Field id="eventType" label="Event type" required error={shown("eventType")}>
            <select id="eventType" value={v.eventType} onChange={(e) => set("eventType", e.target.value)} onBlur={blur("eventType")} className={cls("eventType")} {...aria("eventType")}>
              <option value="">Select</option>
              {eventTypes.map((t) => <option key={t}>{t}</option>)}
            </select>
          </Field>
          <Field id="date" label="Event date" error={shown("date")}>
            <input id="date" type="date" min={todayISO()} value={v.date} onChange={(e) => set("date", e.target.value)} onBlur={blur("date")} className={cls("date")} {...aria("date")} />
          </Field>
          <Field id="time" label="Preferred time">
            <select id="time" value={v.time} onChange={(e) => set("time", e.target.value)} className={cls("time")}>
              <option value="">No preference</option>
              {times.map((t) => <option key={t}>{t}</option>)}
            </select>
          </Field>
        </div>
        <Field id="notes" label="Additional requirements">
          <textarea id="notes" rows={4} value={v.notes} onChange={(e) => set("notes", e.target.value)} className={cls("notes")} />
        </Field>
      </fieldset>

      <div>
        <button type="submit" className={buttonClass("primary", "w-full sm:w-auto")}>Prepare my inquiry</button>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-espresso/75">
          This demo form does not send your information to the salon. Please contact the salon directly to confirm your appointment.
        </p>
      </div>
    </form>
  );
}
