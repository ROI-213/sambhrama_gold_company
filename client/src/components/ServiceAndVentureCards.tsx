import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight } from "lucide-react";
import type { ServiceItem, VentureOverviewItem } from "../data/siteContent";

export const ServiceCard: React.FC<{ service: ServiceItem }> = ({ service }) => {
  return (
    <div className="group rounded-xl border-2 border-[#F59E0B]/50 bg-white p-7 flex flex-col justify-between transition-all duration-300 hover:border-[#8B0000] hover:-translate-y-1 shadow-md">
      <div>
        <div className="h-1 w-12 bg-gradient-to-r from-[#8B0000] to-[#FFB800] rounded-full mb-5" aria-hidden="true" />
        <h3 className="font-serif-luxury text-2xl font-bold text-[#7F1D1D] group-hover:text-[#991B1B] transition-colors">
          {service.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-[#4A2525]">
          {service.description}
        </p>

        <ul className="mt-5 space-y-2 border-t border-[#F59E0B]/30 pt-4">
          {service.highlights.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 text-xs font-semibold text-[#7F1D1D]"
            >
              <CheckCircle2 className="h-4 w-4 text-[#B91C1C] shrink-0" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 pt-4">
        <Link
          to={service.ctaLink}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#991B1B] group-hover:text-[#D97706] transition-colors"
        >
          <span>{service.ctaText}</span>
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </div>
    </div>
  );
};

export const VentureCard: React.FC<{ venture: VentureOverviewItem }> = ({ venture }) => {
  return (
    <article className="group overflow-hidden rounded-xl border-2 border-[#F59E0B]/55 bg-white flex flex-col justify-between transition-all duration-300 hover:border-[#8B0000] shadow-xl">
      <div>
        <div className="relative h-56 overflow-hidden bg-[#7F1D1D]">
          <img
            src={venture.imageUrl}
            alt={venture.imageAlt}
            loading="lazy"
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#6E080D]/90 via-[#6E080D]/25 to-transparent"
            aria-hidden="true"
          />
          <span className="absolute bottom-3 left-4 right-4 rounded-lg border border-[#FFD700] bg-[#7F1D1D]/95 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#FFD700] shadow-md">
            {venture.subtitle}
          </span>
        </div>

        <div className="p-6 sm:p-7">
          <h3 className="font-serif-luxury text-2xl font-bold text-[#7F1D1D] group-hover:text-[#991B1B] transition-colors">
            {venture.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-[#4A2525]">
            {venture.description}
          </p>

          <ul className="mt-5 space-y-2">
            {venture.highlights.map((hl) => (
              <li
                key={hl}
                className="flex items-center gap-2 text-xs font-semibold text-[#7F1D1D]"
              >
                <CheckCircle2 className="h-4 w-4 text-[#B91C1C] shrink-0" aria-hidden="true" />
                <span>{hl}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="px-6 pb-6 sm:px-7">
        <Link
          to={venture.path}
          className="inline-flex w-full items-center justify-between rounded-md border-2 border-[#FFB800] bg-[#FFFBEB] px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#7F1D1D] group-hover:border-[#8B0000] group-hover:bg-[#8B0000] group-hover:text-[#FFD700] transition-all"
        >
          <span>Explore {venture.title}</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
};
