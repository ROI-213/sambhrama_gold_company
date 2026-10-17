import React from "react";
import { motion } from "framer-motion";
import {
  Eye,
  Microscope,
  IndianRupee,
  ClipboardCheck,
  ShieldCheck,
  HeartHandshake,
  ArrowRight,
  Sparkles,
  MessageSquareQuote,
} from "lucide-react";
import { usePageMeta } from "../hooks/usePageMeta";
import { PrimaryButton } from "../components/PrimaryButton";
import { SectionHeading } from "../components/SectionHeading";
import { GoldRateCard } from "../components/GoldRateDisplay";
import { ServiceCard, VentureCard } from "../components/ServiceAndVentureCards";
import { TestimonialCard } from "../components/FAQAndTestimonial";
import { EnquiryForm } from "../components/EnquiryForm";
import { HeroValuationCard } from "../components/HeroValuationCard";
import { ContactActions } from "../components/ContactActions";
import {
  whyChooseFeatures,
  homeSellingSteps,
  homeServices,
  venturesData,
  approvedTestimonials,
} from "../data/siteContent";

const iconMap = {
  Eye,
  Microscope,
  IndianRupee,
  ClipboardCheck,
  ShieldCheck,
  HeartHandshake,
  Scale: Eye,
  Award: ShieldCheck,
  Sparkles,
};

export const HomePage: React.FC = () => {
  usePageMeta({
    title: "Your Gold. Its True Value. Our Commitment.",
    description:
      "Sambhrama Gold Company — Sell your gold with transparent evaluation, scientific purity testing, and competitive pricing. Explore our Gold, Real Estate, and Loans ventures.",
  });

  const visibleTestimonials = approvedTestimonials.filter((t) => t.approved);

  return (
    <div>
      {/* Golden Yellow Top Highlight Strip */}
      <div className="bg-gradient-to-r from-[#FFB800] via-[#FACC15] to-[#FFB800] border-b border-[#7F1D1D]/20 text-[#5C060A] text-[11px] sm:text-xs font-bold">
        <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-around gap-x-6 gap-y-1 text-center">
          <span>Transparent Gold Evaluation</span>
          <span className="hidden sm:inline text-[#8B0000]/40">|</span>
          <span>Scientific Non-Destructive Testing</span>
          <span className="hidden md:inline text-[#8B0000]/40">|</span>
          <span>Customer Purchase Bill Required</span>
          <span className="hidden lg:inline text-[#8B0000]/40">|</span>
          <span>Compliant &amp; Secure Settlement</span>
          <span className="hidden xl:inline text-[#8B0000]/40">|</span>
          <span>Zero Obligation Valuation</span>
        </div>
      </div>

      {/* 1. Hero Section: Two-Column Royal Red & Golden Yellow Showcase with Instant Valuation Form */}
      <section className="relative overflow-hidden bg-[#7F1D1D] border-b-4 border-[#FFB800] py-14 sm:py-20 lg:py-24">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-indian-gold.jpg"
            alt="Traditional Indian gold jewellery and bullion"
            className="h-full w-full object-cover object-center opacity-25"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#5C060A] via-[#7F1D1D]/95 to-[#6E080D]/90"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-[radial-gradient(#FFB800_1px,transparent_1px)] [background-size:24px_24px] opacity-15"
            aria-hidden="true"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Headline, Description, Trust Badges & CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-[#FFD700]/80 bg-[#5C060A]/80 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#FFD700] mb-6">
                <Sparkles className="h-3.5 w-3.5 text-[#FFD700]" aria-hidden="true" />
                Sambhrama Gold Company • Ethical Gold Buyer
              </span>

              <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.12] text-white">
                Your Gold.{" "}
                <span className="text-[#FFD700]">Its True Value.</span>{" "}
                Our Commitment.
              </h1>

              <div className="mt-5 h-1 w-20 bg-[#FFD700] rounded-full" aria-hidden="true" />

              <p className="mt-5 text-base sm:text-lg leading-relaxed text-white/90 max-w-2xl">
                Experience a refined, dignified, and completely transparent way to evaluate
                and sell your gold. Every ornament is tested in your presence with scientific
                precision and honest valuation.{" "}
                <strong className="text-[#FFD700]">
                  (By the customer, purchase bill is required.)
                </strong>
              </p>

              {/* 4 Verified Pillar Badges matching the reference layout */}
              <div className="mt-7 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl">
                <div className="rounded-lg border border-[#FFD700]/35 bg-[#5C060A]/75 px-3.5 py-3 flex items-center gap-2.5">
                  <Eye className="h-5 w-5 text-[#FFD700] shrink-0" aria-hidden="true" />
                  <div className="text-xs leading-tight text-white">
                    <strong className="block font-bold">100% Open</strong>
                    <span className="text-white/80 text-[11px]">Evaluation</span>
                  </div>
                </div>
                <div className="rounded-lg border border-[#FFD700]/35 bg-[#5C060A]/75 px-3.5 py-3 flex items-center gap-2.5">
                  <Microscope className="h-5 w-5 text-[#FFD700] shrink-0" aria-hidden="true" />
                  <div className="text-xs leading-tight text-white">
                    <strong className="block font-bold">Scientific</strong>
                    <span className="text-white/80 text-[11px]">Purity Test</span>
                  </div>
                </div>
                <div className="rounded-lg border border-[#FFD700]/35 bg-[#5C060A]/75 px-3.5 py-3 flex items-center gap-2.5">
                  <ClipboardCheck className="h-5 w-5 text-[#FFD700] shrink-0" aria-hidden="true" />
                  <div className="text-xs leading-tight text-white">
                    <strong className="block font-bold">Purchase Bill</strong>
                    <span className="text-white/80 text-[11px]">Required</span>
                  </div>
                </div>
                <div className="rounded-lg border border-[#FFD700]/35 bg-[#5C060A]/75 px-3.5 py-3 flex items-center gap-2.5">
                  <ShieldCheck className="h-5 w-5 text-[#FFD700] shrink-0" aria-hidden="true" />
                  <div className="text-xs leading-tight text-white">
                    <strong className="block font-bold">KYC Safe</strong>
                    <span className="text-white/80 text-[11px]">Settlement</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <PrimaryButton to="/sell-your-gold" variant="gold">
                  <span>Sell Your Gold</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </PrimaryButton>
                <PrimaryButton to="/sell-your-gold#sell-gold-enquiry" variant="outline">
                  Get Best Gold Value
                </PrimaryButton>
                <PrimaryButton to="/contact" variant="dark">
                  Contact Us
                </PrimaryButton>
              </div>
            </motion.div>

            {/* Right Column: Get Instant Valuation Card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="lg:col-span-5"
            >
              <HeroValuationCard />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Gold Rates Section: Soft Golden Yellow Background with Crisp White Card */}
      <section className="py-16 sm:py-20 bg-[#FFFBEB] border-b border-[#F59E0B]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GoldRateCard />
        </div>
      </section>

      {/* 3. About the Company Section: Pure White Background */}
      <section className="py-20 sm:py-28 bg-white text-[#1F1212] border-b border-[#F59E0B]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden border-4 border-[#FFB800] shadow-xl">
                <img
                  src="/images/venture-gold.jpg"
                  alt="Crafted Indian gold bangles, ornaments, and precision weighing scale"
                  loading="lazy"
                  className="w-full h-[380px] sm:h-[440px] object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#7F1D1D] via-[#7F1D1D]/85 to-transparent p-6 text-white">
                  <p className="font-serif-luxury text-lg italic text-[#FFD700]">
                    &ldquo;Built on transparency, respect, and accurate valuation.&rdquo;
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <SectionHeading
                eyebrow="About Sambhrama Gold Company"
                title="A Trusted Destination for Ethical Gold Evaluation"
                align="left"
              />
              <p className="text-base sm:text-lg leading-relaxed text-[#3B1818] mb-4">
                At Sambhrama Gold Company, we understand that gold in Indian households
                carries both financial value and personal significance. When you choose to
                sell or evaluate your gold, you deserve an environment that is courteous,
                transparent, and thoroughly professional.
              </p>
              <p className="text-base leading-relaxed text-[#4A2525] mb-8">
                Our evaluation process eliminates guesswork: we test purity using
                non-destructive methods right before your eyes, weigh accurately, and
                explain every detail clearly. Beyond our core Gold services, we also serve
                clients across our Real Estate and Loans divisions.
              </p>
              <PrimaryButton to="/about" variant="gold">
                <span>Read More About Us</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </PrimaryButton>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Why Choose Sambhrama: Warm Yellow Section with Crisp White Cards */}
      <section className="py-20 sm:py-28 bg-[#FFFBEB] border-b border-[#F59E0B]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Why Choose Sambhrama"
            title="Six Pillars of Our Service Commitment"
            subtitle="Every interaction at Sambhrama Gold Company is guided by precision, clarity, and respect for your time and assets."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {whyChooseFeatures.map((feature) => {
              const IconComponent = iconMap[feature.iconName] || ShieldCheck;
              return (
                <div
                  key={feature.id}
                  className="rounded-xl border-2 border-[#F59E0B]/50 bg-white p-7 hover:border-[#8B0000] transition-all shadow-md"
                >
                  <div className="h-12 w-12 rounded-lg bg-[#8B0000] border border-[#FFB800] flex items-center justify-center mb-5">
                    <IconComponent
                      className="h-6 w-6 text-[#FFD700]"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="font-serif-luxury text-xl font-bold text-[#7F1D1D]">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#4A2525]">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. How to Sell Gold: Crisp White Section with Golden Yellow & Red Timeline Cards */}
      <section className="py-20 sm:py-28 bg-white border-b border-[#F59E0B]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="How to Sell Gold"
            title="A Clear Five-Step Gold Selling Process"
            subtitle="From your first enquiry to transaction completion, our structured process keeps you informed and comfortable at every stage."
          />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {homeSellingSteps.map((step) => (
              <div
                key={step.stepNumber}
                className="relative rounded-xl border-2 border-[#F59E0B]/60 bg-[#FFFBEB] p-6 flex flex-col justify-between shadow-xs"
              >
                <div>
                  <span className="inline-block rounded-md bg-[#8B0000] px-3 py-1 font-serif-luxury text-xl font-bold text-[#FFD700] mb-3">
                    {step.stepNumber}
                  </span>
                  <h3 className="font-serif-luxury text-xl font-bold text-[#7F1D1D]">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-[#4A2525]">
                    {step.description}
                  </p>
                </div>
                <div className="mt-5 h-1 w-full bg-gradient-to-r from-[#8B0000] via-[#FFB800] to-transparent rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Services Section: Soft Golden Cream Background */}
      <section className="py-20 sm:py-28 bg-[#FFFDF7] border-b border-[#F59E0B]/35">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Core Gold Services"
            title="Specialized Gold Evaluation & Buying Services"
            subtitle="Comprehensive services tailored for individuals and families seeking accurate, honest gold assessment."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {homeServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. Our Ventures Section: Warm Yellow Highlight Background */}
      <section className="py-20 sm:py-28 bg-[#FEF3C7]/55 border-b border-[#F59E0B]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Diversified Business Divisions"
            title="Our Ventures"
            subtitle="Explore Sambhrama's dedicated business verticals across Gold, Real Estate, and Loans."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {venturesData.map((venture) => (
              <VentureCard key={venture.id} venture={venture} />
            ))}
          </div>
        </div>
      </section>

      {/* 8. Testimonials Section: Crisp White Background */}
      <section className="py-20 sm:py-28 bg-white border-b border-[#F59E0B]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Customer Feedback"
            title="Verified Customer Testimonials"
            subtitle="We publish only genuine, verified client reviews. We never display fabricated testimonials or artificial ratings."
          />

          {visibleTestimonials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {visibleTestimonials.slice(0, 3).map((item) => (
                <TestimonialCard key={item.id} testimonial={item} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border-2 border-[#F59E0B]/50 bg-[#FFFBEB] p-8 sm:p-10 text-center max-w-2xl mx-auto mb-10 shadow-sm">
              <MessageSquareQuote
                className="h-10 w-10 text-[#8B0000] mx-auto mb-3"
                aria-hidden="true"
              />
              <h3 className="font-serif-luxury text-xl font-bold text-[#7F1D1D]">
                Authentic Client Reviews Policy
              </h3>
              <p className="mt-2 text-sm text-[#4A2525] leading-relaxed">
                Sambhrama Gold Company publishes only verified, customer-consented
                testimonials. Approved reviews will appear here as they are verified for
                publication.
              </p>
            </div>
          )}

          <div className="text-center">
            <PrimaryButton to="/testimonials" variant="outline">
              <span>View All Testimonials</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </PrimaryButton>
          </div>
        </div>
      </section>

      {/* 9. Quick Enquiry Section: Soft Yellow Background with White Card Form */}
      <section
        id="quick-enquiry"
        className="py-20 sm:py-28 bg-[#FFFBEB] border-b border-[#F59E0B]/40"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Get in Touch"
            title="Quick Enquiry"
            subtitle="Have a question about selling gold, today's reference rates, or our ventures? Fill in the form below and our team will reach out promptly."
          />

          <EnquiryForm
            variant="QUICK"
            title="Send Us a Quick Enquiry"
            subtitle="Provide your contact information and preferred service requirement."
            submitLabel="Submit Quick Enquiry"
          />
        </div>
      </section>

      {/* 10. Final CTA Section: Royal Red & Golden Yellow Showcase */}
      <section className="py-20 sm:py-24 bg-gradient-to-br from-[#8B0000] via-[#7F1D1D] to-[#5C060A] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.22em] text-[#FFD700] mb-3">
            Transparent • Respectful • Professional
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Ready to Discover the True Value of Your Gold?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/90 max-w-2xl mx-auto">
            Visit Sambhrama Gold Company for an obligation-free purity test and transparent
            valuation, or speak with our specialists today.
          </p>
          <div className="mt-8 flex justify-center">
            <ContactActions showSellGold />
          </div>
        </div>
      </section>
    </div>
  );
};
