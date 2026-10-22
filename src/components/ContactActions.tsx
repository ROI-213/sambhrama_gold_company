import React from "react";
import { Link } from "react-router-dom";
import { PhoneCall, MessageCircle, ArrowRight } from "lucide-react";
import {
  companyConfig,
  getTelHref,
  getWhatsAppHref,
} from "../config/companyConfig";
import { PrimaryButton } from "./PrimaryButton";

/**
 * ContactActions — Renders verified Call, WhatsApp, and Sell Your Gold CTA buttons.
 * Uses only verified configuration values; falls back gracefully to the Contact page when phone/WhatsApp are not yet configured.
 */
export const ContactActions: React.FC<{
  showSellGold?: boolean;
  className?: string;
}> = ({ showSellGold = true, className = "" }) => {
  const telHref = getTelHref(companyConfig.phone);
  const whatsappHref = getWhatsAppHref(companyConfig.whatsapp);

  return (
    <div className={`flex flex-wrap items-center gap-4 ${className}`}>
      {showSellGold && (
        <PrimaryButton to="/sell-your-gold" variant="gold">
          <span>Sell Your Gold</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </PrimaryButton>
      )}

      {telHref ? (
        <PrimaryButton href={telHref} variant="outline">
          <PhoneCall className="h-4 w-4 text-[#B91C1C]" aria-hidden="true" />
          <span>Call Now ({companyConfig.phone})</span>
        </PrimaryButton>
      ) : (
        <PrimaryButton to="/contact" variant="outline">
          <PhoneCall className="h-4 w-4 text-[#B91C1C]" aria-hidden="true" />
          <span>Request a Call</span>
        </PrimaryButton>
      )}

      {whatsappHref ? (
        <PrimaryButton href={whatsappHref} external variant="dark">
          <MessageCircle className="h-4 w-4 text-[#25D366]" aria-hidden="true" />
          <span>WhatsApp Us</span>
        </PrimaryButton>
      ) : (
        <PrimaryButton to="/contact#contact-form" variant="dark">
          <MessageCircle className="h-4 w-4 text-[#FFD700]" aria-hidden="true" />
          <span>Send Message</span>
        </PrimaryButton>
      )}
    </div>
  );
};

/**
 * FloatingWhatsAppButton — Renders a floating quick-action button in the bottom-right corner.
 * Uses verified WhatsApp number when configured, or links to the Contact / Enquiry section if unconfigured.
 */
export const FloatingWhatsAppButton: React.FC = () => {
  const whatsappHref = getWhatsAppHref(
    companyConfig.whatsapp,
    "Hello Sambhrama Gold Company, I would like to enquire about selling gold / your services."
  );

  if (whatsappHref) {
    return (
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Sambhrama Gold Company on WhatsApp"
        className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-xs font-semibold text-[#3D070A] shadow-xl hover:brightness-105 transition-transform hover:scale-105"
      >
        <MessageCircle className="h-5 w-5 fill-[#3D070A]" aria-hidden="true" />
        <span className="hidden sm:inline">WhatsApp Us</span>
      </a>
    );
  }

  return (
    <Link
      to="/contact"
      aria-label="Contact Sambhrama Gold Company"
      className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full border border-[#FFB800] bg-[#FFFBEB] px-4 py-3 text-xs font-semibold text-[#991B1B] shadow-gold-glow hover:bg-[#FEF3C7]/60 transition-transform hover:scale-105"
    >
      <MessageCircle className="h-5 w-5 text-[#B91C1C]" aria-hidden="true" />
      <span className="hidden sm:inline">Quick Enquiry</span>
    </Link>
  );
};
