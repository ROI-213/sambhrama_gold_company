import React from "react";
import { Link } from "react-router-dom";
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
  Crown,
  TrendingUp,
  Clock,
  Users,
} from "lucide-react";
import { usePageMeta } from "../hooks/usePageMeta";
import { PrimaryButton } from "../components/PrimaryButton";
import { SectionHeading } from "../components/SectionHeading";
import { GoldRateCard } from "../components/GoldRateDisplay";
import { ServiceCard, VentureCard } from "../components/ServiceAndVentureCards";
import { TestimonialMarquee } from "../components/FAQAndTestimonial";
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
  Users,
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
      <div className="bg-gradient-to-r from-[#FFB800] via-[#FACC15] to-[#FFB800] border-b border-[#7F1D1D]/20 text-[#5C060A] text-[10px] sm:text-xs font-bold">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-1.5 sm:py-2 flex flex-wrap items-center justify-center sm:justify-around gap-x-3 sm:gap-x-6 gap-y-1 text-center">
          <span>Transparent Gold Evaluation</span>
          <span className="text-[#8B0000]/40">|</span>
          <span>Scientific Non-Destructive Testing</span>
          <span className="hidden sm:inline text-[#8B0000]/40">|</span>
          <span className="hidden sm:inline">Customer Purchase Bill Required</span>
          <span className="hidden lg:inline text-[#8B0000]/40">|</span>
          <span className="hidden lg:inline">Compliant &amp; Secure Settlement</span>
          <span className="hidden xl:inline text-[#8B0000]/40">|</span>
          <span className="hidden xl:inline">Zero Obligation Valuation</span>
        </div>
      </div>

      {/* 1. Hero Section: Luxury Crimson & Gold Bullion Showcase with Interactive Buttons & Instant Valuation Card */}
      <section className="relative overflow-hidden bg-[#4A0509] border-b-4 border-[#FFB800] py-8 sm:py-16 lg:py-20">
        {/* Background Artwork */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-gold-banner-bg.jpg"
            alt="Fine gold bullion bars, gold coins, and traditional Indian gold jewellery on royal crimson velvet"
            className="h-full w-full object-cover object-center"
          />
          {/* Responsive overlay: stronger dark crimson tint on mobile so all white/gold text is crystal clear, left-weighted gradient on desktop */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-[#3A0306]/90 via-[#4A0509]/85 to-[#3A0306]/95 lg:bg-gradient-to-r lg:from-[#3A0306]/95 lg:via-[#4A0509]/70 lg:to-[#3A0306]/35"
            aria-hidden="true"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
            {/* Left Column: Badge, Headline, Subtitle, 4 Circular Feature Icons & 3 Interactive Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 text-center sm:text-left"
            >
              {/* Top Pill Badge */}
              <div className="inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-full border border-[#F59E0B]/75 bg-[#3B0609]/85 px-3 sm:px-4 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-[0.08em] sm:tracking-[0.18em] text-[#FBBF24] mb-5 sm:mb-6 shadow-md max-w-full">
                <Crown className="h-3.5 w-3.5 text-[#FBBF24] fill-[#FBBF24] shrink-0" aria-hidden="true" />
                <span className="truncate sm:whitespace-normal">Sambhrama Gold Company • Ethical Gold Buyer</span>
              </div>

              {/* Two-Line Display Headline */}
              <h1 className="font-serif-luxury text-3xl sm:text-5xl lg:text-[3.65rem] font-bold leading-[1.14] tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]">
                <span className="block">Turn Your Gold Into</span>
                <span className="relative inline-block mt-1 bg-gradient-to-r from-[#FDE047] via-[#FBBF24] to-[#D97706] bg-clip-text text-transparent">
                  Real Opportunities.
                  <span
                    className="block mt-1.5 h-[2px] w-full bg-gradient-to-r from-transparent via-[#FBBF24] to-transparent opacity-85"
                    aria-hidden="true"
                  />
                </span>
              </h1>

              {/* Subtitle */}
              <p className="mt-4 sm:mt-5 text-sm sm:text-lg leading-relaxed text-white/95 max-w-xl mx-auto sm:mx-0 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
                Get the true value of your gold with complete transparency,
                expert verification, and the best market rates.
              </p>

              {/* 4 Circular Gold Icon Highlights with Vertical Dividers */}
              <div className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-4 gap-y-4 gap-x-2 sm:gap-y-0 sm:divide-x sm:divide-white/20 max-w-xl mx-auto sm:mx-0">
                <div className="flex flex-col items-center text-center px-2 sm:first:pl-0">
                  <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-full border border-[#F59E0B] bg-[#3B0609]/80 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.25)] mb-2">
                    <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-[#FBBF24]" aria-hidden="true" />
                  </div>
                  <span className="text-xs font-bold leading-snug text-white">
                    Best Market
                    <br />
                    Price
                  </span>
                </div>

                <div className="flex flex-col items-center text-center px-2">
                  <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-full border border-[#F59E0B] bg-[#3B0609]/80 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.25)] mb-2">
                    <IndianRupee className="h-4 w-4 sm:h-5 sm:w-5 text-[#FBBF24]" aria-hidden="true" />
                  </div>
                  <span className="text-xs font-bold leading-snug text-white">
                    No Hidden
                    <br />
                    Charges
                  </span>
                </div>

                <div className="flex flex-col items-center text-center px-2">
                  <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-full border border-[#F59E0B] bg-[#3B0609]/80 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.25)] mb-2">
                    <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-[#FBBF24]" aria-hidden="true" />
                  </div>
                  <span className="text-xs font-bold leading-snug text-white">
                    Fast &amp; Hassle-Free
                    <br />
                    Process
                  </span>
                </div>

                <div className="flex flex-col items-center text-center px-2 sm:last:pr-0">
                  <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-full border border-[#F59E0B] bg-[#3B0609]/80 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.25)] mb-2">
                    <Users className="h-4 w-4 sm:h-5 sm:w-5 text-[#FBBF24]" aria-hidden="true" />
                  </div>
                  <span className="text-xs font-bold leading-snug text-white">
                    Trusted by
                    <br />
                    Lakhs of Customers
                  </span>
                </div>
              </div>

              {/* 3 Real Interactive Action Buttons */}
              <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-3.5">
                <Link
                  to="/sell-your-gold"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-b from-[#FBBF24] via-[#F59E0B] to-[#D97706] border border-[#FDE047] px-6 py-3.5 text-sm font-bold text-[#2A0507] shadow-[0_8px_22px_rgba(245,158,11,0.4)] hover:brightness-110 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFD700] w-full sm:w-auto"
                >
                  <span>Sell Your Gold</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>

                <Link
                  to="/ventures/loans"
                  className="inline-flex items-center justify-center rounded-lg border-2 border-[#FDE68A] bg-white px-6 py-3.5 text-sm font-bold text-[#7F1D1D] shadow-[0_8px_22px_rgba(0,0,0,0.3)] hover:bg-[#FFFBEB] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white w-full sm:w-auto"
                >
                  <span>Get Gold Loan Value</span>
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-lg border border-[#F59E0B]/80 bg-[#5C060A]/90 backdrop-blur-xs px-6 py-3.5 text-sm font-bold text-[#FDE68A] shadow-[0_8px_22px_rgba(0,0,0,0.3)] hover:bg-[#7F1D1D] hover:text-white hover:border-[#FFD700] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFD700] w-full sm:w-auto"
                >
                  <span>Contact Us</span>
                </Link>
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
      <section className="py-12 sm:py-20 bg-[#FFFBEB] border-b border-[#F59E0B]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GoldRateCard />
        </div>
      </section>

      {/* 3. About the Company Section: Pure White Background */}
      <section className="py-14 sm:py-28 bg-white text-[#1F1212] border-b border-[#F59E0B]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden border-4 border-[#FFB800] shadow-xl">
                <img
                  src="/images/venture-gold.jpg"
                  alt="Crafted Indian gold bangles, ornaments, and precision weighing scale"
                  loading="lazy"
                  className="w-full h-[260px] sm:h-[440px] object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#7F1D1D] via-[#7F1D1D]/85 to-transparent p-4 sm:p-6 text-white">
                  <p className="font-serif-luxury text-base sm:text-lg italic text-[#FFD700]">
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

      {/* 4. Why Choose Sambhrama: Warm Ivory Section with Split Image-and-Text Pillar Cards */}
      <section className="py-14 sm:py-28 bg-[#FDF8EE] border-b border-[#F59E0B]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Custom Section Heading matching reference typography */}
          <div className="max-w-3xl text-center mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs font-bold uppercase tracking-[0.16em] sm:tracking-[0.22em] text-[#991B1B] mb-3">
              <span className="h-[1.5px] w-5 sm:w-7 bg-[#D97706]" aria-hidden="true" />
              <span>Why Choose Sambhrama</span>
              <span className="h-[1.5px] w-5 sm:w-7 bg-[#D97706]" aria-hidden="true" />
            </div>
            <h2 className="font-serif-luxury text-2xl sm:text-4xl lg:text-[2.7rem] font-bold leading-tight">
              <span className="text-[#1F1212]">Six Pillars </span>
              <span className="text-[#B45309]">of </span>
              <span className="text-[#8B0000]">Our Service Commitment</span>
            </h2>
            <p className="mt-3 sm:mt-3.5 text-sm sm:text-base leading-relaxed text-[#3B1818] max-w-2xl mx-auto">
              Every interaction at Sambhrama Gold Company is guided by precision, clarity, and respect
              for your time and assets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-7 sm:gap-y-9">
            {whyChooseFeatures.map((feature) => {
              const IconComponent = iconMap[feature.iconName] || ShieldCheck;
              return (
                <div
                  key={feature.id}
                  className="group relative rounded-2xl border border-[#F59E0B]/35 bg-white shadow-[0_10px_28px_rgba(127,29,29,0.08)] hover:shadow-[0_14px_34px_rgba(127,29,29,0.14)] hover:border-[#F59E0B]/70 transition-all duration-300 overflow-visible"
                >
                  {/* Top-left subtle white circular tab behind the icon badge */}
                  <div
                    className="pointer-events-none absolute -top-3.5 left-3.5 h-16 w-16 rounded-full bg-white shadow-[0_-3px_10px_rgba(127,29,29,0.04)]"
                    aria-hidden="true"
                  />

                  {/* Inner clipped container for right-side image & content */}
                  <div className="relative overflow-hidden rounded-2xl min-h-[210px] sm:min-h-[220px] flex">
                    {/* Right-side illustration with smooth left-edge white gradient fade */}
                    <div className="absolute inset-y-0 right-0 w-[44%] sm:w-[48%] z-0 overflow-hidden">
                      <img
                        src={feature.imageUrl}
                        alt={feature.imageAlt}
                        loading="lazy"
                        className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-white via-white/80 sm:via-white/55 to-transparent"
                        aria-hidden="true"
                      />
                    </div>

                    {/* Left-side icon, title, and description */}
                    <div className="relative z-10 w-[68%] sm:w-[64%] p-5 sm:p-6 pr-2 sm:pr-3 flex flex-col justify-start">
                      <div className="h-11 w-11 sm:h-12 sm:w-12 rounded-full bg-gradient-to-b from-[#8B0000] to-[#4A0407] border-2 border-[#F59E0B] flex items-center justify-center shadow-md mb-3.5 sm:mb-4 shrink-0">
                        <IconComponent
                          className="h-5 w-5 text-[#FFD700]"
                          aria-hidden="true"
                        />
                      </div>
                      <h3 className="font-serif-luxury text-base sm:text-[1.15rem] font-bold text-[#8B0000] leading-snug">
                        {feature.title}
                      </h3>
                      <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-[#3B1818]">
                        {feature.description}
                      </p>
                    </div>
                  </div>
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
            <div className="mb-10">
              <TestimonialMarquee items={visibleTestimonials} />
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
