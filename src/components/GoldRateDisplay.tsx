import React from "react";
import { Link } from "react-router-dom";
import { Clock, Sparkles, Info } from "lucide-react";
import { useGoldRates } from "../hooks/useGoldRates";

/**
 * Top bar displayed inside the global sticky header showing only today's 24K and 22K gold prices.
 * Styled in Royal Crimson Red (#8B0000) with Bright Golden Yellow (#FFB800) and Crisp White (#FFFFFF) text.
 */
export const GoldRateBar: React.FC = () => {
  const { rateData, configured, loading } = useGoldRates();

  return (
    <div className="bg-[#8B0000] border-b border-[#FFB800]/40 text-[11px] sm:text-xs text-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-1.5 sm:py-2 flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-5 gap-y-1 text-center">
        <span className="inline-flex items-center gap-1.5 font-semibold tracking-wider uppercase text-[#FFD700]">
          <Sparkles className="h-3.5 w-3.5 text-[#FFD700] shrink-0" aria-hidden="true" />
          <span>Today&apos;s Gold Price (Per Gram)</span>
        </span>

        {loading ? (
          <span className="text-white/85" data-testid="header-rate-loading">
            Loading today&apos;s gold rate details...
          </span>
        ) : configured && rateData ? (
          <div
            className="flex flex-wrap items-center justify-center gap-x-2.5 sm:gap-x-4 gap-y-1"
            data-testid="header-rate-display"
          >
            <span className="inline-flex items-center gap-1.5 bg-[#FFB800] text-[#7F1D1D] rounded px-2.5 sm:px-3 py-0.5 shadow-xs">
              <strong className="text-[#7F1D1D]">24 Carat (24K)</strong>
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white text-[#7F1D1D] border border-[#FFB800] rounded px-2.5 sm:px-3 py-0.5 shadow-xs">
              <strong className="text-[#991B1B]">22 Carat (22K)</strong>
            </span>
          </div>
        ) : (
          <span
            className="inline-flex items-center gap-1.5 text-[#FEF08A] font-medium"
            data-testid="header-rate-unconfigured"
          >
            <Info className="h-3.5 w-3.5 text-[#FFD700] shrink-0" aria-hidden="true" />
            <span>Rate not updated — Contact us for today&apos;s rate</span>
          </span>
        )}
      </div>
    </div>
  );
};

/**
 * Full GoldRateCard section component used on Home, Sell Your Gold, and Gold Venture pages.
 * Uses a balanced White, Golden Yellow, and Royal Red card layout.
 */
export const GoldRateCard: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { rateData, configured, loading } = useGoldRates();

  return (
    <div
      className="rounded-2xl border-2 border-[#F59E0B] bg-white p-4 sm:p-8 shadow-xl"
      data-testid="gold-rate-card"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4 border-b border-[#F59E0B]/35 pb-4 sm:pb-5">
        <div>
          <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs uppercase tracking-[0.14em] sm:tracking-[0.2em] text-[#991B1B] font-bold">
            <Sparkles className="h-4 w-4 text-[#D97706] shrink-0" aria-hidden="true" />
            Administrator-Published Reference Rates
          </span>
          <h3 className="font-serif-luxury text-xl sm:text-3xl font-bold text-[#7F1D1D] mt-1">
            Indicative Gold Rates (INR / Gram)
          </h3>
        </div>
        {configured && rateData && (
          <div className="inline-flex items-center gap-2 self-start md:self-auto rounded-md bg-[#FFFBEB] border border-[#F59E0B] px-3 sm:px-3.5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold text-[#7F1D1D]">
            <Clock className="h-4 w-4 text-[#B91C1C] shrink-0" aria-hidden="true" />
            <span>Last Updated: {rateData.updatedAtIST}</span>
          </div>
        )}
      </div>

      {loading ? (
        <div className="py-10 text-center text-sm text-[#7F1D1D]">
          Loading published gold rates...
        </div>
      ) : configured && rateData ? (
        <div className="mt-5 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* 22K Card: Warm Golden Yellow & White */}
          <div
            className="rounded-xl border-2 border-[#F59E0B] bg-gradient-to-br from-[#FFFBEB] to-white p-4 sm:p-6 flex flex-col justify-between shadow-sm"
            data-testid="card-rate-22k"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wider sm:tracking-widest text-[#991B1B]">
                22 Karat Gold (916 Purity)
              </span>
              <span className="rounded-full bg-[#FFB800] px-3 py-0.5 text-xs font-bold text-[#7F1D1D] shrink-0">
                22K Standard
              </span>
            </div>
            <p className="mt-3 sm:mt-4 text-xs text-[#4A2525] leading-relaxed">
              Applicable reference rate for 22K gold ornaments and hallmarked jewellery.
            </p>
          </div>

          {/* 24K Card: Royal Crimson Red with Golden Yellow & White */}
          <div
            className="rounded-xl border-2 border-[#FFB800] bg-gradient-to-br from-[#8B0000] to-[#5C060A] p-4 sm:p-6 flex flex-col justify-between text-white shadow-md"
            data-testid="card-rate-24k"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wider sm:tracking-widest text-[#FFD700]">
                24 Karat Fine Gold (999 Purity)
              </span>
              <span className="rounded-full bg-white px-3 py-0.5 text-xs font-bold text-[#8B0000] shrink-0">
                24K Fine
              </span>
            </div>
            <p className="mt-3 sm:mt-4 text-xs text-white/85 leading-relaxed">
              Applicable reference rate for 24K coins, bullion, and fine gold articles.
            </p>
          </div>
        </div>
      ) : (
        <div
          className="mt-6 rounded-xl border border-[#F59E0B] bg-[#FFFBEB] p-6 sm:p-8 text-center"
          data-testid="card-rate-empty"
        >
          <p className="font-serif-luxury text-xl text-[#8B0000] font-bold">
            Rate not updated — Contact us for today&apos;s rate
          </p>
          <p className="mt-2 text-sm text-[#4A2525] max-w-xl mx-auto">
            Our administrator-published reference rates for today are currently being updated.
            Please submit an enquiry or contact our office directly for an immediate gold valuation quote.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link
              to="/sell-your-gold#sell-gold-enquiry"
              className="inline-flex items-center rounded-md bg-[#8B0000] px-5 py-2.5 text-xs font-bold text-[#FFD700] hover:bg-[#7F1D1D]"
            >
              Request Today&apos;s Valuation
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center rounded-md border-2 border-[#8B0000] bg-white px-5 py-2.5 text-xs font-bold text-[#8B0000] hover:bg-[#FEF3C7]"
            >
              Contact Office
            </Link>
          </div>
        </div>
      )}

      {!compact && (
        <div className="mt-5 flex items-start gap-2.5 rounded-lg bg-[#FFFBEB] border border-[#F59E0B]/50 p-3.5 text-xs text-[#4A2525]">
          <Info className="h-4 w-4 text-[#991B1B] shrink-0 mt-0.5" aria-hidden="true" />
          <p>
            <strong className="text-[#7F1D1D]">Important Valuation &amp; Policy Note:</strong>{" "}
            Published rates are reference indicators per gram in Indian Rupees (INR). The
            final buying offer depends on verified gold purity, net weight after non-gold
            deductions, and company policy.{" "}
            <strong className="text-[#991B1B]">
              By the customer, the original purchase bill is required
            </strong>{" "}
            along with valid government KYC ID proof.
            {rateData?.note ? ` (${rateData.note})` : ""}
          </p>
        </div>
      )}
    </div>
  );
};
