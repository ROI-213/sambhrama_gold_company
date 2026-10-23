import React from "react";
import { ShieldCheck, Eye, Compass, Target, CheckCircle2 } from "lucide-react";
import { usePageMeta } from "../hooks/usePageMeta";
import { HeroBanner } from "../components/HeroBanner";
import { SectionHeading } from "../components/SectionHeading";
import { VentureCard } from "../components/ServiceAndVentureCards";
import { ContactActions } from "../components/ContactActions";
import {
  coreValues,
  companyHistoryEditorial,
  whyChooseFeatures,
  venturesData,
} from "../data/siteContent";

export const AboutPage: React.FC = () => {
  usePageMeta({
    title: "About Us",
    description:
      "Learn about Sambhrama Gold Company's mission, vision, core values of Transparency, Trust, Integrity, Customer Satisfaction, and Professional Service, and our three business divisions.",
  });

  return (
    <div>
      {/* Hero */}
      <HeroBanner
        eyebrow="About Sambhrama Gold Company"
        title="Guided by Integrity. Defined by Transparency."
        description="We are dedicated to offering an honest, transparent, and respectful experience for gold sellers and clients across our Gold, Real Estate, and Loans divisions."
        compact
      />

      {/* Company Introduction & Editable History / Background */}
      <section className="py-10 sm:py-14 bg-[#FFFDF7] text-[#3D070A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="Company Introduction"
                title={companyHistoryEditorial.heading}
                align="left"
                lightMode
              />
              <div className="space-y-4 text-base sm:text-lg leading-relaxed text-[#730D14]/85">
                {companyHistoryEditorial.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl border-2 border-[#F59E0B]/40 bg-[#FFFDF7] p-8 text-[#7F1D1D] shadow-2xl">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B91C1C]">
                  Our Pledge to Every Client
                </span>
                <h3 className="mt-2 font-serif-luxury text-2xl font-semibold text-[#7F1D1D]">
                  What You Can Always Expect
                </h3>
                <ul className="mt-6 space-y-4 text-sm text-[#3B1818]">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#B91C1C] shrink-0 mt-0.5" />
                    <span>
                      In-person, non-destructive gold testing performed openly in your sight.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#B91C1C] shrink-0 mt-0.5" />
                    <span>
                      Clear explanation of net weight, purity readings, and administrator-published reference rates.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#B91C1C] shrink-0 mt-0.5" />
                    <span>
                      Zero obligation to sell until you are completely satisfied with the valuation offer.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#B91C1C] shrink-0 mt-0.5" />
                    <span>
                      Strict adherence to KYC documentation and ethical business practices.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-10 sm:py-14 bg-[#FFFBEB] border-y border-[#F59E0B]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-xl border border-[#F59E0B]/50 bg-[#FFFDF7] p-8 sm:p-10">
              <div className="h-12 w-12 rounded-lg bg-[#FFB800]/15 border border-[#FFB800]/40 flex items-center justify-center mb-5">
                <Target className="h-6 w-6 text-[#B91C1C]" aria-hidden="true" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B91C1C]">
                Our Mission
              </span>
              <h2 className="mt-2 font-serif-luxury text-2xl sm:text-3xl font-semibold text-[#7F1D1D]">
                Empowering Customers with Honest Value
              </h2>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#422020]">
                To provide individuals and families with a trustworthy, scientific, and
                transparent platform for selling gold and exploring real estate and
                financing solutions—ensuring every transaction is clear, compliant, and
                dignified.
              </p>
            </div>

            <div className="rounded-xl border border-[#F59E0B]/50 bg-[#FFFDF7] p-8 sm:p-10">
              <div className="h-12 w-12 rounded-lg bg-[#FFB800]/15 border border-[#FFB800]/40 flex items-center justify-center mb-5">
                <Compass className="h-6 w-6 text-[#B91C1C]" aria-hidden="true" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B91C1C]">
                Our Vision
              </span>
              <h2 className="mt-2 font-serif-luxury text-2xl sm:text-3xl font-semibold text-[#7F1D1D]">
                Setting the Benchmark for Ethical Service
              </h2>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#422020]">
                To be recognized for unwavering integrity, transparent gold valuation, and
                dependable client advisory across our Gold, Real Estate, and Loans business
                divisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-10 sm:py-14 bg-[#FFFDF7] border-b border-[#F59E0B]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Core Values"
            title="The Principles That Guide Us"
            subtitle="Our five core values shape how we evaluate gold, communicate with customers, and conduct every transaction."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {coreValues.map((value, idx) => (
              <div
                key={value.title}
                className="rounded-xl border border-[#F59E0B]/45 bg-white shadow-sm p-6 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#B91C1C]">
                    0{idx + 1}
                  </span>
                  <h3 className="mt-2 font-serif-luxury text-xl font-semibold text-[#7F1D1D]">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[#4A2525]">
                    {value.description}
                  </p>
                </div>
                <div className="mt-5 h-0.5 w-10 bg-[#FFB800]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reasons to Choose Sambhrama */}
      <section className="py-10 sm:py-14 bg-[#FFFBEB] border-b border-[#F59E0B]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Why Sambhrama"
            title="Reasons to Choose Sambhrama Gold Company"
            subtitle="Designed around transparency, accuracy, and customer comfort."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseFeatures.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-[#F59E0B]/40 bg-[#FFFDF7] p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <ShieldCheck className="h-5 w-5 text-[#B91C1C]" aria-hidden="true" />
                  <h3 className="font-serif-luxury text-lg font-semibold text-[#7F1D1D]">
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm text-[#4A2525] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Three Business Divisions */}
      <section className="py-10 sm:py-14 bg-[#FFFDF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Business Verticals"
            title="Three Focused Business Divisions"
            subtitle="Explore our core Gold services alongside our Real Estate and Loans advisory divisions."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-14">
            {venturesData.map((venture) => (
              <VentureCard key={venture.id} venture={venture} />
            ))}
          </div>

          <div className="rounded-xl border border-[#F59E0B]/50 bg-white shadow-sm p-8 text-center">
            <Eye className="h-8 w-8 text-[#B91C1C] mx-auto mb-3" aria-hidden="true" />
            <h3 className="font-serif-luxury text-2xl font-semibold text-[#7F1D1D]">
              Speak With Our Team Today
            </h3>
            <p className="mt-2 text-sm text-[#4A2525] max-w-xl mx-auto mb-6">
              Whether you wish to evaluate your gold or enquire about our ventures, our
              specialists are ready to assist you.
            </p>
            <div className="flex justify-center">
              <ContactActions showSellGold />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
