import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import {
  companyConfig,
  getTelHref,
  getMailtoHref,
  getWhatsAppHref,
} from "../config/companyConfig";

export const Footer: React.FC = () => {
  const telHref = getTelHref(companyConfig.phone);
  const mailHref = getMailtoHref(companyConfig.email);
  const whatsappHref = getWhatsAppHref(companyConfig.whatsapp);

  const activeSocials = Object.entries(companyConfig.socialLinks).filter(
    ([, url]) => Boolean(url)
  );

  return (
    <footer className="bg-[#6E080D] border-t-4 border-[#FFB800] text-white/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/images/logo.jpg"
                alt={`${companyConfig.companyName} Logo`}
                className="h-12 w-12 rounded-lg object-contain bg-white border-2 border-[#FFB800] p-0.5 shadow-sm"
              />
              <span className="font-serif-luxury text-lg font-bold text-white">
                {companyConfig.companyName}
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/80">
              {companyConfig.tagline} We are committed to transparent gold evaluation,
              scientific purity testing, and ethical service across our Gold, Real Estate,
              and Loans divisions.
            </p>
            {activeSocials.length > 0 && (
              <div className="mt-5 flex items-center gap-3">
                {activeSocials.map(([network, url]) => (
                  <a
                    key={network}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md border border-[#FFB800] bg-white/10 px-3 py-1.5 text-xs capitalize text-[#FFD700] hover:bg-[#FFB800] hover:text-[#6E080D]"
                  >
                    {network}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-serif-luxury text-base font-semibold text-[#FFD700] tracking-wide mb-4">
              Quick Navigation
            </h3>
            <ul className="space-y-2.5 text-sm text-white/90">
              <li>
                <Link to="/" className="hover:text-[#FFD700] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#FFD700] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/sell-your-gold" className="hover:text-[#FFD700] transition-colors">
                  Sell Your Gold
                </Link>
              </li>
              <li>
                <Link to="/certificates" className="hover:text-[#FFD700] transition-colors">
                  Certificates &amp; Compliance
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="hover:text-[#FFD700] transition-colors">
                  Customer Testimonials
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#FFD700] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Our Ventures */}
          <div>
            <h3 className="font-serif-luxury text-base font-semibold text-[#FFD700] tracking-wide mb-4">
              Our Ventures
            </h3>
            <ul className="space-y-2.5 text-sm text-white/90">
              <li>
                <Link to="/ventures" className="hover:text-[#FFD700] transition-colors">
                  Ventures Overview
                </Link>
              </li>
              <li>
                <Link to="/ventures/gold" className="hover:text-[#FFD700] transition-colors">
                  Gold Division (Buying &amp; Valuation)
                </Link>
              </li>
              <li>
                <Link
                  to="/ventures/real-estate"
                  className="hover:text-[#FFD700] transition-colors"
                >
                  Real Estate Division
                </Link>
              </li>
              <li>
                <Link to="/ventures/loans" className="hover:text-[#FFD700] transition-colors">
                  Loans &amp; Financing Enquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Verified Contact Details */}
          <div>
            <h3 className="font-serif-luxury text-base font-semibold text-[#FFD700] tracking-wide mb-4">
              Office &amp; Enquiries
            </h3>
            <ul className="space-y-3 text-sm text-white/90">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-[#FFD700] shrink-0 mt-1" aria-hidden="true" />
                {companyConfig.mapsUrl ? (
                  <a
                    href={companyConfig.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#FFD700] underline-offset-2 hover:underline transition-colors"
                  >
                    {companyConfig.address || "View Our Office Location on Google Maps"}
                  </a>
                ) : (
                  <span>
                    {companyConfig.address ||
                      "Contact our team via the online enquiry form for office visit directions."}
                  </span>
                )}
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-[#FFD700] shrink-0" aria-hidden="true" />
                {telHref ? (
                  <a href={telHref} className="hover:text-[#FFD700] transition-colors">
                    {companyConfig.phone}
                  </a>
                ) : (
                  <Link to="/contact" className="text-[#FFD700] hover:underline">
                    Request Callback via Contact Page
                  </Link>
                )}
              </li>
              {mailHref && (
                <li className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 text-[#FFD700] shrink-0" aria-hidden="true" />
                  <a href={mailHref} className="hover:text-[#FFD700] transition-colors">
                    {companyConfig.email}
                  </a>
                </li>
              )}
              {companyConfig.workingHours && (
                <li className="flex items-start gap-2.5">
                  <Clock className="h-4 w-4 text-[#FFD700] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{companyConfig.workingHours}</span>
                </li>
              )}
            </ul>
            {whatsappHref && (
              <div className="mt-4">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-white px-3.5 py-2 text-xs font-bold text-[#6E080D] hover:bg-[#FEF08A]"
                >
                  <span className="h-2 w-2 rounded-full bg-[#16A34A]" aria-hidden="true" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="mt-12 pt-8 border-t border-[#FFB800]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/80">
          <p>
            &copy; {new Date().getFullYear()} {companyConfig.companyName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-[#FFD700] transition-colors">
              Privacy Policy
            </Link>
            <Link
              to="/terms-and-conditions"
              className="hover:text-[#FFD700] transition-colors"
            >
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
