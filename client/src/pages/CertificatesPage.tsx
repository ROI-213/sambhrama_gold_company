import React from "react";
import { usePageMeta } from "../hooks/usePageMeta";
import { HeroBanner } from "../components/HeroBanner";
import { SectionHeading } from "../components/SectionHeading";
import { CertificateGallery } from "../components/CertificateGallery";
import { ContactActions } from "../components/ContactActions";
import { verifiedCertificates } from "../data/siteContent";

export const CertificatesPage: React.FC = () => {
  usePageMeta({
    title: "Certificates & Compliance",
    description:
      "View Sambhrama Gold Company's verified company registrations, applicable business licenses, professional certifications, and recognitions.",
  });

  return (
    <div>
      <HeroBanner
        eyebrow="Registrations & Credentials"
        title="Certificates & Statutory Compliance"
        description="We believe in complete institutional transparency. Browse our verified registrations, applicable business licenses, professional certifications, and recognitions."
        compact
      />

      <section className="py-20 sm:py-28 bg-[#FFFDF7] border-b border-[#F59E0B]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Verified Credential Gallery"
            title="Official Documents & Recognitions"
            subtitle="Only verified, officially issued documents are displayed below. Click any published certificate to view an enlarged preview or PDF document."
          />

          <CertificateGallery certificates={verifiedCertificates} />
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-[#FFFBEB]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-[#7F1D1D]">
            Need Verification or Compliance Details?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#4A2525] mb-7">
            Contact our office directly for any institutional enquiries or in-person
            document inspection.
          </p>
          <div className="flex justify-center">
            <ContactActions showSellGold />
          </div>
        </div>
      </section>
    </div>
  );
};
