import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Navigation,
  Share2,
} from "lucide-react";
import { usePageMeta } from "../hooks/usePageMeta";
import { HeroBanner } from "../components/HeroBanner";
import { EnquiryForm } from "../components/EnquiryForm";
import {
  companyConfig,
  getTelHref,
  getMailtoHref,
  getWhatsAppHref,
} from "../config/companyConfig";

export const ContactPage: React.FC = () => {
  usePageMeta({
    title: "Contact Us",
    description:
      "Contact Sambhrama Gold Company — Office address, working hours, phone, email, WhatsApp contact, directions, and online enquiry form.",
  });

  const telHref = getTelHref(companyConfig.phone);
  const mailHref = getMailtoHref(companyConfig.email);
  const whatsappHref = getWhatsAppHref(companyConfig.whatsapp);
  const activeSocials = Object.entries(companyConfig.socialLinks).filter(
    ([, url]) => Boolean(url)
  );

  return (
    <div>
      <HeroBanner
        eyebrow="Get in Touch"
        title="Contact Sambhrama Gold Company"
        description="Whether you wish to check today's gold buying rates, schedule an in-office purity test, or enquire about Real Estate and Loans, our team is here to assist you."
        compact
      />

      <section className="py-10 sm:py-14 bg-[#FFFDF7] border-b border-[#F59E0B]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Verified Contact Information */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-xl border border-[#F59E0B]/50 bg-white shadow-sm p-7">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B91C1C]">
                  Official Contact Details
                </span>
                <h2 className="mt-2 font-serif-luxury text-2xl sm:text-3xl font-semibold text-[#7F1D1D]">
                  {companyConfig.companyName}
                </h2>
                <p className="mt-2 text-sm text-[#4A2525]">
                  All contact details displayed below are read from our verified company
                  configuration.
                </p>

                <ul className="mt-6 space-y-5 text-sm">
                  {/* Office Address */}
                  <li className="flex items-start gap-3.5">
                    <div className="h-9 w-9 rounded-lg bg-[#FFB800]/15 border border-[#FFB800]/40 flex items-center justify-center shrink-0">
                      <MapPin className="h-4 w-4 text-[#B91C1C]" aria-hidden="true" />
                    </div>
                    <div>
                      <strong className="block text-xs uppercase tracking-wider text-[#991B1B]">
                        Office Location
                      </strong>
                      {companyConfig.mapsUrl ? (
                        <a
                          href={companyConfig.mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#7F1D1D] hover:text-[#B91C1C] hover:underline font-medium mt-0.5 block"
                        >
                          {companyConfig.address ||
                            "Open Office Location on Google Maps"}
                        </a>
                      ) : (
                        <span className="text-[#3B1818] mt-0.5 block">
                          {companyConfig.address ||
                            "Submit an enquiry using the contact form to receive office visit directions and appointment confirmation."}
                        </span>
                      )}
                    </div>
                  </li>

                  {/* Phone */}
                  <li className="flex items-start gap-3.5">
                    <div className="h-9 w-9 rounded-lg bg-[#FFB800]/15 border border-[#FFB800]/40 flex items-center justify-center shrink-0">
                      <Phone className="h-4 w-4 text-[#B91C1C]" aria-hidden="true" />
                    </div>
                    <div>
                      <strong className="block text-xs uppercase tracking-wider text-[#991B1B]">
                        Phone Number
                      </strong>
                      {telHref ? (
                        <a
                          href={telHref}
                          className="text-[#7F1D1D] hover:text-[#B91C1C] font-medium mt-0.5 block"
                        >
                          {companyConfig.phone}
                        </a>
                      ) : (
                        <span className="text-[#4A2525] mt-0.5 block">
                          Request a callback using our online contact form
                        </span>
                      )}
                    </div>
                  </li>

                  {/* Email */}
                  <li className="flex items-start gap-3.5">
                    <div className="h-9 w-9 rounded-lg bg-[#FFB800]/15 border border-[#FFB800]/40 flex items-center justify-center shrink-0">
                      <Mail className="h-4 w-4 text-[#B91C1C]" aria-hidden="true" />
                    </div>
                    <div>
                      <strong className="block text-xs uppercase tracking-wider text-[#991B1B]">
                        Email Address
                      </strong>
                      {mailHref ? (
                        <a
                          href={mailHref}
                          className="text-[#7F1D1D] hover:text-[#B91C1C] font-medium mt-0.5 block"
                        >
                          {companyConfig.email}
                        </a>
                      ) : (
                        <span className="text-[#4A2525] mt-0.5 block">
                          Send us a direct message via the contact form on this page
                        </span>
                      )}
                    </div>
                  </li>

                  {/* Business Working Hours */}
                  <li className="flex items-start gap-3.5">
                    <div className="h-9 w-9 rounded-lg bg-[#FFB800]/15 border border-[#FFB800]/40 flex items-center justify-center shrink-0">
                      <Clock className="h-4 w-4 text-[#B91C1C]" aria-hidden="true" />
                    </div>
                    <div>
                      <strong className="block text-xs uppercase tracking-wider text-[#991B1B]">
                        Business Working Hours
                      </strong>
                      <span className="text-[#3B1818] mt-0.5 block">
                        {companyConfig.workingHours ||
                          "Contact us to confirm appointment timings for your visit."}
                      </span>
                    </div>
                  </li>

                  {/* WhatsApp */}
                  {whatsappHref && (
                    <li className="flex items-start gap-3.5">
                      <div className="h-9 w-9 rounded-lg bg-[#25D366]/15 border border-[#25D366]/40 flex items-center justify-center shrink-0">
                        <MessageCircle
                          className="h-4 w-4 text-[#25D366]"
                          aria-hidden="true"
                        />
                      </div>
                      <div>
                        <strong className="block text-xs uppercase tracking-wider text-[#991B1B]">
                          WhatsApp Desk
                        </strong>
                        <a
                          href={whatsappHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#15803D] hover:underline font-semibold mt-0.5 block"
                        >
                          Chat with us on WhatsApp ({companyConfig.whatsapp})
                        </a>
                      </div>
                    </li>
                  )}
                </ul>

                {/* Get Directions Button & Social Links */}
                <div className="mt-7 pt-6 border-t border-[#F59E0B]/50 space-y-4">
                  {companyConfig.mapsUrl ? (
                    <a
                      href={companyConfig.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-gold-gradient px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#3D070A]"
                    >
                      <Navigation className="h-4 w-4" aria-hidden="true" />
                      <span>Get Directions on Google Maps</span>
                    </a>
                  ) : (
                    <div className="rounded-md border border-[#F59E0B]/40 bg-[#FFFDF7] p-3.5 text-xs text-[#4A2525] flex items-center gap-2">
                      <Navigation className="h-4 w-4 text-[#B91C1C] shrink-0" />
                      <span>
                        Google Maps directions link will be active once the verified map URL
                        is configured.
                      </span>
                    </div>
                  )}

                  {activeSocials.length > 0 && (
                    <div>
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#991B1B] mb-2">
                        <Share2 className="h-3.5 w-3.5 text-[#B91C1C]" />
                        <span>Official Social Channels</span>
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {activeSocials.map(([network, url]) => (
                          <a
                            key={network}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded border border-[#F59E0B]/50 bg-[#FFFDF7] px-3 py-1.5 text-xs capitalize text-[#991B1B] hover:border-[#FFB800]"
                          >
                            {network}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Google Maps Embed Container */}
              {companyConfig.mapsEmbedUrl && (
                <div className="rounded-xl overflow-hidden border border-[#F59E0B]/50 bg-white shadow-sm h-64">
                  <iframe
                    src={companyConfig.mapsEmbedUrl}
                    title="Sambhrama Gold Company Office Location Map"
                    className="w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              )}
            </div>

            {/* Right Column: Contact Form */}
            <div id="contact-form" className="lg:col-span-7">
              <EnquiryForm
                variant="CONTACT"
                title="Send Us a Message"
                subtitle="Complete the form below with your Full Name, Mobile Number, Email, Subject, and Message. Our team will respond promptly."
                submitLabel="Submit Message"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
