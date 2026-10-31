export interface Faq {
  q: string;
  a: string;
}

/** Answers avoid unverified policies. Update only with salon-confirmed information. */
export const faqs: Faq[] = [
  { q: "How can I book a bridal makeup appointment?", a: "Use the booking page to prepare your appointment request, then contact the salon directly to confirm. The form on this website is a demo and does not send your information." },
  { q: "What bridal packages are available?", a: "The Bridal Packages page lists the package categories shown on this site. Package availability and contents should be confirmed with the salon." },
  { q: "How can I inquire about package prices?", a: "Prices are shown only when confirmed. Otherwise, please contact the salon to ask about package details and pricing." },
  { q: "Can I request a customized bridal package?", a: "You can describe your requirements in the booking form's additional requirements field and discuss options with the salon directly. Whether a custom package is possible is for the salon to confirm." },
  { q: "What information should I provide when booking?", a: "Your name, phone number, the service or package you're interested in, your event type and date, and any special requirements." },
  { q: "How can I ask about available appointment dates?", a: "Please contact the salon directly with your preferred date. Availability can only be confirmed by the salon." },
  { q: "What other salon services are available?", a: "Browse the Services page for hair, skincare and beauty services. Please confirm the current service list with the salon." },
];
