import React from "react";
import { usePageMeta } from "../hooks/usePageMeta";
import { HeroBanner } from "../components/HeroBanner";
import { SectionHeading } from "../components/SectionHeading";
import { VentureCard } from "../components/ServiceAndVentureCards";
import { ContactActions } from "../components/ContactActions";
import { venturesData } from "../data/siteContent";

export const VenturesOverviewPage: React.FC = () => {
  usePageMeta({
    title: "Our Ventures — Gold, Real Estate & Loans",
    description:
      "Explore Sambhrama Gold Company's business ventures across Gold Buying & Valuation, Real Estate Advisory, and Loans Consultation.",
  });

  return (
    <div>
      <HeroBanner
        eyebrow="Sambhrama Business Group"
        title="Our Ventures"
        description="Grounded in transparency, ethical practice, and personalized client service across Gold, Real Estate, and Loans."
        compact
      />

      <section className="py-20 sm:py-28 bg-[#FFFDF7] border-b border-[#F59E0B]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Three Dedicated Divisions"
            title="Focused Expertise Across Essential Sectors"
            subtitle="Select any of our business divisions below to learn more about our services or submit a direct enquiry."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {venturesData.map((venture) => (
              <VentureCard key={venture.id} venture={venture} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#FFFBEB]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif-luxury text-3xl font-bold text-[#7F1D1D]">
            Connect With Any of Our Business Divisions
          </h2>
          <p className="mt-3 text-base text-[#4A2525] mb-8">
            Our specialists are ready to assist you with Gold valuation, Real Estate
            consultation, or Loan requirement enquiries.
          </p>
          <div className="flex justify-center">
            <ContactActions showSellGold />
          </div>
        </div>
      </section>
    </div>
  );
};
