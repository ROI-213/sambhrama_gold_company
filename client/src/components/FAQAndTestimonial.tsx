import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FAQItem, TestimonialItem } from "../data/siteContent";
import { Star, Quote } from "lucide-react";

export const FAQAccordion: React.FC<{ items: FAQItem[] }> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {items.map((faq, idx) => {
        const isOpen = openIndex === idx;
        const panelId = `faq-panel-${idx}`;
        const buttonId = `faq-btn-${idx}`;

        return (
          <div
            key={faq.question}
            className="rounded-lg border border-[#F59E0B]/45 bg-white shadow-sm overflow-hidden"
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-serif-luxury text-lg font-medium text-[#7F1D1D] hover:text-[#991B1B] transition-colors"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-[#B91C1C] transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
            </h3>
            {isOpen && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="px-6 pb-5 pt-1 text-sm leading-relaxed text-[#422020] border-t border-[#F59E0B]/45"
              >
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export const TestimonialCard: React.FC<{ testimonial: TestimonialItem }> = ({
  testimonial,
}) => {
  return (
    <article className="rounded-xl border border-[#F59E0B]/45 bg-white shadow-sm p-6 sm:p-7 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <Quote className="h-7 w-7 text-[#B91C1C]/60" aria-hidden="true" />
          {typeof testimonial.rating === "number" && testimonial.rating > 0 && (
            <div
              className="flex items-center gap-1"
              aria-label={`Rated ${testimonial.rating} out of 5 stars`}
            >
              {Array.from({ length: testimonial.rating }).map((_, idx) => (
                <Star
                  key={idx}
                  className="h-4 w-4 fill-[#FFB800] text-[#B91C1C]"
                  aria-hidden="true"
                />
              ))}
            </div>
          )}
        </div>
        <p className="text-sm leading-relaxed text-[#3B1818] italic">
          &ldquo;{testimonial.reviewContent}&rdquo;
        </p>

        {testimonial.videoUrl && (
          <div className="mt-4">
            <video
              controls
              preload="metadata"
              className="w-full rounded-lg border border-[#F59E0B]/45"
            >
              <source src={testimonial.videoUrl} />
              Your browser does not support embedded video testimonials.
            </video>
          </div>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-[#F59E0B]/45 flex items-center gap-3">
        {testimonial.customerImageUrl ? (
          <img
            src={testimonial.customerImageUrl}
            alt={testimonial.customerName}
            loading="lazy"
            className="h-10 w-10 rounded-full object-cover border border-[#FFB800]"
          />
        ) : (
          <div
            className="h-10 w-10 rounded-full bg-[#FFB800]/20 border border-[#FFB800]/50 flex items-center justify-center font-serif-luxury font-bold text-[#991B1B]"
            aria-hidden="true"
          >
            {testimonial.customerName.charAt(0).toUpperCase()}
          </div>
        )}
        <div>
          <h4 className="text-sm font-semibold text-[#7F1D1D]">
            {testimonial.customerName}
          </h4>
          {testimonial.location && (
            <p className="text-xs text-[#F59E0B]">{testimonial.location}</p>
          )}
        </div>
      </div>
    </article>
  );
};
