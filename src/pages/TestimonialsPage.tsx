import React from "react";
import { MessageSquareQuote, ExternalLink, ShieldCheck } from "lucide-react";
import { usePageMeta } from "../hooks/usePageMeta";
import { HeroBanner } from "../components/HeroBanner";
import { SectionHeading } from "../components/SectionHeading";
import { TestimonialCard } from "../components/FAQAndTestimonial";
import { PrimaryButton } from "../components/PrimaryButton";
import { approvedTestimonials } from "../data/siteContent";
import { companyConfig } from "../config/companyConfig";

export const TestimonialsPage: React.FC = () => {
  usePageMeta({
    title: "Customer Testimonials",
    description:
      "Read genuine, verified customer testimonials and reviews for Sambhrama Gold Company. We never publish fabricated reviews or ratings.",
  });

  const approvedList = approvedTestimonials.filter((t) => t.approved);

  return (
    <div>
      <HeroBanner
        eyebrow="Verified Customer Voices"
        title="Customer Testimonials & Reviews"
        description="Our reputation is built on honest gold valuation and respectful service. Every review published on this page comes from a verified customer."
        compact
      >
        <PrimaryButton to="/sell-your-gold" variant="gold">
          Sell Your Gold
        </PrimaryButton>
        <PrimaryButton to="/contact" variant="outline">
          Contact Us
        </PrimaryButton>
      </HeroBanner>

      <section className="py-20 sm:py-28 bg-[#FFFDF7] border-b border-[#F59E0B]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Genuine Feedback Only"
            title="What Our Customers Say"
            subtitle="We uphold a strict policy against fictional reviews, invented ratings, or unverified Google review counts."
          />

          {approvedList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {approvedList.map((item) => (
                <TestimonialCard key={item.id} testimonial={item} />
              ))}
            </div>
          ) : (
            <div
              className="rounded-xl border border-[#F59E0B]/50 bg-white shadow-sm p-8 sm:p-12 text-center max-w-3xl mx-auto"
              data-testid="testimonials-empty-state"
            >
              <MessageSquareQuote
                className="h-12 w-12 text-[#B91C1C] mx-auto mb-4"
                aria-hidden="true"
              />
              <h3 className="font-serif-luxury text-2xl font-semibold text-[#7F1D1D]">
                No Fabricated Reviews — Verified Testimonials Only
              </h3>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#4A2525]">
                At Sambhrama Gold Company, we never display fictional customer names,
                placeholder reviews, or unverified star ratings. Genuine written and video
                testimonials from our clients are published here only after verification and
                explicit customer consent.
              </p>

              {companyConfig.googleBusinessReviewUrl && (
                <div className="mt-6">
                  <a
                    href={companyConfig.googleBusinessReviewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md border border-[#FFB800] bg-[#FFFDF7] px-5 py-2.5 text-xs font-semibold text-[#991B1B] hover:bg-[#FFB800]/15"
                  >
                    <span>View Our Google Business Profile</span>
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              )}
            </div>
          )}

          {companyConfig.googleBusinessReviewUrl && approvedList.length > 0 && (
            <div className="mt-10 text-center">
              <a
                href={companyConfig.googleBusinessReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-[#FFB800]/60 bg-white shadow-sm px-6 py-3 text-xs font-semibold text-[#991B1B] hover:border-[#FFB800]"
              >
                <span>Read or Leave a Review on Google Business Profile</span>
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Conversion CTA */}
      <section className="py-20 bg-[#FFFBEB]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ShieldCheck
            className="h-10 w-10 text-[#B91C1C] mx-auto mb-3"
            aria-hidden="true"
          />
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#7F1D1D]">
            Experience Our Service Firsthand
          </h2>
          <p className="mt-3 text-base text-[#4A2525] max-w-xl mx-auto mb-8">
            Visit Sambhrama Gold Company for transparent gold purity testing and valuation,
            or reach out to our team with your questions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <PrimaryButton to="/sell-your-gold" variant="gold">
              Sell Your Gold
            </PrimaryButton>
            <PrimaryButton to="/contact" variant="outline">
              Contact Us
            </PrimaryButton>
          </div>
        </div>
      </section>
    </div>
  );
};
