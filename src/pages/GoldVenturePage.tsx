import React from "react";
import { Microscope, Scale, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";
import { usePageMeta } from "../hooks/usePageMeta";
import { HeroBanner } from "../components/HeroBanner";
import { SectionHeading } from "../components/SectionHeading";
import { GoldRateCard } from "../components/GoldRateDisplay";
import { PrimaryButton } from "../components/PrimaryButton";
import { ContactActions } from "../components/ContactActions";
import { whyChooseFeatures, sellGoldPageSteps } from "../data/siteContent";

export const GoldVenturePage: React.FC = () => {
  usePageMeta({
    title: "Gold Division — Buying, Purity Testing & Valuation",
    description:
      "Sambhrama Gold Division — Ethical gold buying, non-destructive purity testing, transparent valuation process, and current administrator-published 22K and 24K gold rates.",
  });

  return (
    <div>
      <HeroBanner
        eyebrow="Our Ventures • Flagship Gold Division"
        title="Sambhrama Gold Division"
        description="Dedicated to ethical gold buying, scientific non-destructive purity testing, and transparent valuation aligned with our published reference rates."
      >
        <PrimaryButton to="/sell-your-gold" variant="gold">
          <span>Sell Your Gold</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </PrimaryButton>
        <PrimaryButton to="/contact" variant="outline">
          Contact Gold Desk
        </PrimaryButton>
      </HeroBanner>

      {/* Current Administrator-Published Gold Rates */}
      <section className="py-16 sm:py-24 bg-[#FFFBEB] border-b border-[#F59E0B]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GoldRateCard />
        </div>
      </section>

      {/* Buying Services, Purity Testing & Valuation Process */}
      <section className="py-20 sm:py-28 bg-[#FFFDF7] text-[#3D070A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Core Capabilities"
            title="Comprehensive Gold Buying & Testing Services"
            subtitle="Every stage of our gold evaluation is engineered for accuracy, transparency, and customer confidence."
            lightMode
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-xl border border-[#F59E0B]/40 bg-white p-8 shadow-md">
              <Scale className="h-8 w-8 text-[#B91C1C] mb-4" aria-hidden="true" />
              <h3 className="font-serif-luxury text-2xl font-semibold text-[#3D070A]">
                Direct Gold Buying
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#730D14]/80">
                We purchase old gold ornaments, used jewellery, gold coins, and broken gold
                items directly from verified owners with transparent documentation.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-[#730D14]/85">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#B91C1C]" />
                  <span>22K &amp; 24K Gold Evaluated</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#B91C1C]" />
                  <span>Dignified In-Office Experience</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-[#F59E0B]/40 bg-white p-8 shadow-md">
              <Microscope className="h-8 w-8 text-[#B91C1C] mb-4" aria-hidden="true" />
              <h3 className="font-serif-luxury text-2xl font-semibold text-[#3D070A]">
                Scientific Purity Testing
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#730D14]/80">
                Using modern non-destructive purity testing methods, we verify the exact
                karat composition of your gold without damaging or melting your ornaments
                during assessment.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-[#730D14]/85">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#B91C1C]" />
                  <span>Performed Openly in Your Presence</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#B91C1C]" />
                  <span>Item-by-Item Karat Reading</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-[#F59E0B]/40 bg-white p-8 shadow-md">
              <ShieldCheck className="h-8 w-8 text-[#B91C1C] mb-4" aria-hidden="true" />
              <h3 className="font-serif-luxury text-2xl font-semibold text-[#3D070A]">
                Transparent Valuation
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#730D14]/80">
                Your valuation offer is calculated clearly from net gold weight, verified
                purity, and our published reference rate—with zero pressure until you confirm.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-[#730D14]/85">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#B91C1C]" />
                  <span>Clear Net Weight Calculation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#B91C1C]" />
                  <span>Compliant KYC Settlement</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Valuation Workflow & Advantages */}
      <section className="py-20 sm:py-28 bg-[#FFFDF7] border-b border-[#F59E0B]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Valuation Process"
            title="How Our Gold Valuation Works"
            subtitle="Five transparent stages from initial enquiry to settlement."
          />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-20">
            {sellGoldPageSteps.map((step) => (
              <div
                key={step.stepNumber}
                className="rounded-xl border border-[#F59E0B]/45 bg-white shadow-sm p-6"
              >
                <span className="font-serif-luxury text-3xl font-bold text-gold-gradient">
                  {step.stepNumber}
                </span>
                <h3 className="mt-2 font-serif-luxury text-lg font-semibold text-[#7F1D1D]">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#4A2525]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <SectionHeading
            eyebrow="The Sambhrama Advantage"
            title="Why Sellers Choose Our Gold Division"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseFeatures.map((adv) => (
              <div
                key={adv.id}
                className="rounded-xl border border-[#F59E0B]/40 bg-[#FFFBEB] p-6"
              >
                <h4 className="font-serif-luxury text-lg font-semibold text-[#991B1B]">
                  {adv.title}
                </h4>
                <p className="mt-2 text-sm text-[#4A2525] leading-relaxed">
                  {adv.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sell Your Gold CTA */}
      <section className="py-20 bg-gradient-to-br from-[#8B0000] via-[#7F1D1D] to-[#5C060A] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white">
            Ready to Evaluate or Sell Your Gold?
          </h2>
          <p className="mt-3 text-base text-white/90 max-w-xl mx-auto mb-8">
            Submit an online gold valuation enquiry or visit our office for an in-person
            purity assessment.
          </p>
          <div className="flex justify-center">
            <ContactActions showSellGold />
          </div>
        </div>
      </section>
    </div>
  );
};
