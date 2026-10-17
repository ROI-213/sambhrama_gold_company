/**
 * Central Verified Business Configuration for Sambhrama Gold Company.
 *
 * Verified Email & Office Timings supplied by the business:
 * - Email: sowmyats209@gmail.com
 * - Working Hours: Morning 9:00 AM to 7:00 PM (Monday – Saturday) | Sunday is Holiday
 */

export interface CompanyConfig {
  companyName: string;
  tagline: string;
  heroHeading: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  workingHours: string;
  mapsUrl: string;
  mapsEmbedUrl: string;
  googleBusinessReviewUrl: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    youtube: string;
    linkedin: string;
  };
}

const env = import.meta.env || {};

export const companyConfig: CompanyConfig = {
  companyName: (env.VITE_COMPANY_NAME as string)?.trim() || "Sambhrama Gold Company",
  tagline:
    (env.VITE_COMPANY_TAGLINE as string)?.trim() ||
    "Your Gold. Its True Value. Our Commitment.",
  heroHeading: "Your Gold. Its True Value. Our Commitment.",
  phone: (env.VITE_COMPANY_PHONE as string)?.trim() || "",
  whatsapp: (env.VITE_COMPANY_WHATSAPP as string)?.trim() || "",
  email: (env.VITE_COMPANY_EMAIL as string)?.trim() || "sowmyats209@gmail.com",
  address: (env.VITE_COMPANY_ADDRESS as string)?.trim() || "",
  workingHours:
    (env.VITE_COMPANY_HOURS as string)?.trim() ||
    "Morning 9:00 AM to 7:00 PM (Monday – Saturday) | Sunday is Holiday",
  mapsUrl: (env.VITE_COMPANY_MAPS_URL as string)?.trim() || "",
  mapsEmbedUrl: (env.VITE_COMPANY_MAPS_EMBED_URL as string)?.trim() || "",
  googleBusinessReviewUrl:
    (env.VITE_GOOGLE_BUSINESS_REVIEW_URL as string)?.trim() || "",
  socialLinks: {
    facebook: (env.VITE_SOCIAL_FACEBOOK as string)?.trim() || "",
    instagram: (env.VITE_SOCIAL_INSTAGRAM as string)?.trim() || "",
    youtube: (env.VITE_SOCIAL_YOUTUBE as string)?.trim() || "",
    linkedin: (env.VITE_SOCIAL_LINKEDIN as string)?.trim() || "",
  },
};

export function getTelHref(phone: string): string | null {
  const cleaned = phone.replace(/[^\d+]/g, "");
  return cleaned ? `tel:${cleaned}` : null;
}

export function getWhatsAppHref(
  whatsappNumber: string,
  defaultMessage = "Hello Sambhrama Gold Company, I would like to enquire about your services."
): string | null {
  const cleaned = whatsappNumber.replace(/[^\d]/g, "");
  if (!cleaned) return null;
  return `https://wa.me/${cleaned}?text=${encodeURIComponent(defaultMessage)}`;
}

export function getMailtoHref(email: string): string | null {
  const cleaned = email.trim();
  return cleaned ? `mailto:${cleaned}` : null;
}
