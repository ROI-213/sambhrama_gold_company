import React from "react";
import { CheckCircle2, ShieldCheck, Sparkles, Scale } from "lucide-react";
import { usePageMeta } from "../hooks/usePageMeta";
import { HeroBanner } from "../components/HeroBanner";
import { SectionHeading } from "../components/SectionHeading";
import { GoldRateCard } from "../components/GoldRateDisplay";
import { EnquiryForm } from "../components/EnquiryForm";
import { HeroValuationCard } from "../components/HeroValuationCard";
import { FAQAccordion } from "../components/FAQAndTestimonial";
import { ContactActions } from "../components/ContactActions";
import { PrimaryButton } from "../components/PrimaryButton";
import {
  acceptedGoldCategories,
  sellGoldPageSteps,
  sellGoldFAQs,
  whyChooseFeatures,
} from "../data/siteContent";

export const SellYourGoldPage: React.FC = () => {
  usePageMeta({
    title: "Sell Your Gold",
    description:
      "Sell your old gold, used gold jewellery, gold coins, or broken gold jewellery at Sambhrama Gold Company with transparent purity testing and honest valuation.",
  });

  return (
    <div>
      {/* 1. Hero Banner */}
      <HeroBanner
        eyebrow="Transparent Gold Buying"
        title="Sell Your Gold With Confidence & Complete Clarity"
        description="Get an honest, scientific evaluation of your gold ornaments and coins in your presence, backed by administrator-published reference rates."
        rightContent={<HeroValuationCard />}
      >
        <PrimaryButton href="#sell-gold-enquiry" variant="gold">
          Full Valuation Form
        </PrimaryButton>
        <PrimaryButton
          href="https://www.google.com/maps?q=12.992435455322266,77.57848358154297&z=17&hl=en"
          external
          variant="outline"
        >
          Visit Our Office
        </PrimaryButton>
      </HeroBanner>

      {/* 2. Introduction & Gold Rate Snapshot */}
      <section className="py-10 sm:py-14 bg-[#FFFBEB] border-b border-[#F59E0B]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B91C1C]">
              Dignified &amp; Transparent Evaluation
            </span>
            <h2 className="mt-2 font-serif-luxury text-3xl sm:text-4xl font-semibold text-[#7F1D1D]">
              Fair Value for Every Gram of Your Gold
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#422020]">
              Selling personal or family gold is an important financial decision. At
              Sambhrama Gold Company, every evaluation is performed openly in front of you
              using non-destructive testing equipment, calibrated weighing scales, and clear
              rate calculations.
            </p>
          </div>

          <GoldRateCard />
        </div>
      </section>

      {/* 3. Gold Types Accepted */}
      <section className="py-10 sm:py-14 bg-[#FFFDF7] border-b border-[#F59E0B]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Eligible Items"
            title="Gold Categories We Accept"
            subtitle="We evaluate a wide range of genuine gold items owned by the seller, subject to standard purity verification and KYC documentation."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {acceptedGoldCategories.map((category) => (
              <div
                key={category.title}
                className="rounded-xl border border-[#F59E0B]/45 bg-white shadow-sm p-7 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2.5 text-[#B91C1C] mb-3">
                    <Sparkles className="h-5 w-5" aria-hidden="true" />
                    <span className="text-xs font-semibold uppercase tracking-wider">
                      Accepted Category
                    </span>
                  </div>
                  <h3 className="font-serif-luxury text-2xl font-semibold text-[#7F1D1D]">
                    {category.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#4A2525]">
                    {category.description}
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-[#F59E0B]/45 flex items-center gap-2 text-xs text-[#991B1B]">
                  <CheckCircle2 className="h-4 w-4 text-[#B91C1C]" aria-hidden="true" />
                  <span>Evaluated by net weight &amp; verified karat purity</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Selling Process */}
      <section className="py-10 sm:py-14 bg-[#FFFBEB] border-b border-[#F59E0B]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Step-by-Step Workflow"
            title="Our Five-Stage Gold Selling Process"
            subtitle="Designed to give you complete visibility and peace of mind at every step."
          />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {sellGoldPageSteps.map((step) => (
              <div
                key={step.stepNumber}
                className="rounded-xl border border-[#F59E0B]/45 bg-[#FFFDF7] p-6"
              >
                <span className="font-serif-luxury text-3xl font-bold text-gold-gradient">
                  {step.stepNumber}
                </span>
                <h3 className="mt-3 font-serif-luxury text-xl font-semibold text-[#7F1D1D]">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-[#4A2525]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Benefits */}
      <section className="py-10 sm:py-14 bg-[#FFFDF7] text-[#3D070A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Key Advantages"
            title="Benefits of Selling Your Gold With Sambhrama"
            subtitle="Why discerning customers trust our evaluation desk."
            lightMode
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {whyChooseFeatures.map((benefit) => (
              <div
                key={benefit.id}
                className="rounded-xl border border-[#F59E0B]/40 bg-white p-7 shadow-md"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Scale className="h-5 w-5 text-[#B91C1C]" aria-hidden="true" />
                  <h3 className="font-serif-luxury text-xl font-semibold text-[#3D070A]">
                    {benefit.title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-[#730D14]/80">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Sell Your Gold Enquiry Form */}
      <section
        id="sell-gold-enquiry"
        className="py-10 sm:py-14 bg-[#FFFBEB] border-b border-[#F59E0B]/50"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Valuation Request"
            title="Sell Your Gold — Online Enquiry Form"
            subtitle="Submit your details below. Our gold valuation team will contact you to assist with your enquiry and schedule your office evaluation."
          />

          <EnquiryForm
            variant="SELL_GOLD"
            title="Gold Selling & Valuation Enquiry"
            subtitle="Fields marked with * are required. Approximate weight and email are optional."
            submitLabel="Request Gold Valuation"
          />
        </div>
      </section>

      {/* 7. Frequently Asked Questions */}
      <section className="py-10 sm:py-14 bg-[#FFFDF7] border-b border-[#F59E0B]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Frequently Asked Questions"
            title="Important Information Before Selling Your Gold"
            subtitle="Clear answers regarding gold evaluation, eligible items, KYC documentation, processing times, and settlement policies."
          />

          <FAQAccordion items={sellGoldFAQs} />
        </div>
      </section>

      {/* 8. Final CTA */}
      <section className="py-10 sm:py-14 bg-gradient-to-br from-[#8B0000] via-[#7F1D1D] to-[#5C060A] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ShieldCheck
            className="h-10 w-10 text-[#FFD700] mx-auto mb-3"
            aria-hidden="true"
          />
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white">
            Experience Transparent Gold Valuation Today
          </h2>
          <p className="mt-3 text-base text-white/90 max-w-xl mx-auto mb-8">
            Reach out to our team to confirm required documents or schedule your in-office
            purity assessment.
          </p>
          <div className="flex justify-center">
            <ContactActions showSellGold={false} />
          </div>
        </div>
      </section>
    </div>
  );
};
