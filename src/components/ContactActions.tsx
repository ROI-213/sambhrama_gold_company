import React from "react";
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
    <div className={`flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto ${className}`}>
      {showSellGold && (
        <PrimaryButton to="/sell-your-gold" variant="gold" className="w-full sm:w-auto">
          <span>Sell Your Gold</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </PrimaryButton>
      )}

      {telHref ? (
        <PrimaryButton href={telHref} variant="outline" className="w-full sm:w-auto">
          <PhoneCall className="h-4 w-4 text-[#B91C1C]" aria-hidden="true" />
          <span>Call Now ({companyConfig.phone})</span>
        </PrimaryButton>
      ) : (
        <PrimaryButton to="/contact" variant="outline" className="w-full sm:w-auto">
          <PhoneCall className="h-4 w-4 text-[#B91C1C]" aria-hidden="true" />
          <span>Request a Call</span>
        </PrimaryButton>
      )}

      {whatsappHref ? (
        <PrimaryButton href={whatsappHref} external variant="dark" className="w-full sm:w-auto">
          <MessageCircle className="h-4 w-4 text-[#25D366]" aria-hidden="true" />
          <span>WhatsApp Us</span>
        </PrimaryButton>
      ) : (
        <PrimaryButton to="/contact#contact-form" variant="dark" className="w-full sm:w-auto">
          <MessageCircle className="h-4 w-4 text-[#FFD700]" aria-hidden="true" />
          <span>Send Message</span>
        </PrimaryButton>
      )}
    </div>
  );
};

/**
 * FloatingWhatsAppButton — Renders floating icon-only Call and WhatsApp buttons in the bottom-right corner.
 * Call button sits directly above the WhatsApp button, both using +91 77602 34395.
 */
export const FloatingWhatsAppButton: React.FC = () => {
  const telHref = getTelHref(companyConfig.phone) || "tel:+917760234395";
  const whatsappHref =
    getWhatsAppHref(
      companyConfig.whatsapp,
      "Hello Sambhrama Gold Company, I would like to enquire about selling gold / your services."
    ) ||
    "https://wa.me/917760234395?text=Hello%20Sambhrama%20Gold%20Company%2C%20I%20would%20like%20to%20enquire%20about%20selling%20gold%20%2F%20your%20services.";

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-center gap-3">
      <a
        href={telHref}
        aria-label="Call Sambhrama Gold Company at +91 77602 34395"
        title="Call +91 77602 34395"
        className="inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-gradient-to-b from-[#FFB800] to-[#D97706] text-[#3D070A] shadow-xl hover:brightness-105 transition-transform hover:scale-105"
      >
        <PhoneCall className="h-5 w-5" aria-hidden="true" />
      </a>

      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Sambhrama Gold Company on WhatsApp (+91 77602 34395)"
        title="WhatsApp +91 77602 34395"
        className="inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-[#25D366] text-white shadow-xl hover:brightness-105 transition-transform hover:scale-105"
      >
        <MessageCircle className="h-6 w-6 fill-white text-[#25D366]" aria-hidden="true" />
      </a>
    </div>
  );
};
