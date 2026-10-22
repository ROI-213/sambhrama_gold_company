import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, AlertCircle, Loader2, ArrowRight, ShieldCheck, ChevronDown } from "lucide-react";
import { submitCustomerEnquiry } from "../services/api";

const indianMobileRegex = /^[6-9]\d{9}$|^\+91[\s-]?[6-9]\d{9}$/;

const heroValuationSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name")
    .max(100, "Name cannot exceed 100 characters"),
  mobile: z
    .string()
    .trim()
    .refine((val) => indianMobileRegex.test(val.replace(/[\s-]/g, "")), {
      message: "Enter a valid 10-digit Indian mobile number",
    }),
  approxWeightGrams: z
    .string()
    .trim()
    .optional()
    .or(z.literal(""))
    .refine(
      (val) => {
        if (!val) return true;
        const n = Number(val);
        return Number.isFinite(n) && n > 0 && n <= 100000;
      },
      { message: "Weight must be a positive number in grams" }
    ),
  goldType: z.string().trim().min(2, "Please select a gold type"),
  city: z.string().trim().min(2, "Please enter your city"),
  area: z.string().trim().max(100).optional().or(z.literal("")),
  preferredTime: z.string().trim().optional().or(z.literal("")),
  websiteUrl: z.string().max(0).optional().or(z.literal("")),
});

type HeroValuationValues = z.infer<typeof heroValuationSchema>;

export const HeroValuationCard: React.FC = () => {
  const [serverSuccess, setServerSuccess] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<HeroValuationValues>({
    resolver: zodResolver(heroValuationSchema),
    defaultValues: {
      fullName: "",
      mobile: "",
      approxWeightGrams: "",
      goldType: "",
      city: "",
      area: "",
      preferredTime: "",
      websiteUrl: "",
    },
  });

  const onSubmit = async (values: HeroValuationValues) => {
    setServerError(null);
    setServerSuccess(null);

    try {
      const locationCombined = values.area
        ? `${values.city} (${values.area})`
        : values.city;

      const composedMessage = [
        `Instant Hero Valuation Request`,
        values.approxWeightGrams ? `Approx. Weight: ${values.approxWeightGrams} gm` : null,
        values.area ? `Area: ${values.area}` : null,
        values.preferredTime
          ? `Preferred Time to Call: ${values.preferredTime}`
          : "Preferred Time: Anytime during working hours",
      ]
        .filter(Boolean)
        .join(" | ");

      const res = await submitCustomerEnquiry({
        enquiryType: "SELL_GOLD",
        fullName: values.fullName,
        mobile: values.mobile,
        city: locationCombined,
        goldType: values.goldType,
        approxWeightGrams: values.approxWeightGrams
          ? Number(values.approxWeightGrams)
          : null,
        message: composedMessage,
        websiteUrl: values.websiteUrl || "",
      });

      setServerSuccess(
        res.message ||
          "Thank you! Your valuation request has been received. Our team will call you shortly."
      );
      reset();
    } catch (err) {
      setServerError(
        err instanceof Error
          ? err.message
          : "Unable to submit your valuation request. Please try again."
      );
    }
  };

  const inputBase =
    "w-full rounded-md border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-[#1F1212] placeholder-gray-400 focus:border-[#8B0000] focus:ring-1 focus:ring-[#8B0000] focus:outline-none transition-colors";
  const errorText = "mt-1 text-[11px] font-medium text-red-600";

  return (
    <div
      className="w-full max-w-[430px] mx-auto lg:ml-auto rounded-2xl bg-white p-4 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.45)] border border-[#F59E0B]/50"
      data-testid="hero-valuation-card"
    >
      <div className="text-center mb-4">
        <h2 className="font-serif-luxury text-xl sm:text-[1.75rem] font-bold text-[#111827]">
          Get Instant Valuation
        </h2>
        <p className="mt-1 text-xs font-medium text-gray-600">
          Know the exact value of your gold in seconds.
        </p>
        <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-full border border-[#F59E0B] bg-[#FFFBEB] px-3 sm:px-3.5 py-1 text-[10px] sm:text-[11px] font-bold text-[#8B0000]">
          <ShieldCheck className="h-3.5 w-3.5 text-[#D97706] shrink-0" aria-hidden="true" />
          <span>Safe. Secure. Trusted by Thousands</span>
        </div>
      </div>

      {serverSuccess && (
        <div
          role="status"
          aria-live="polite"
          className="mb-4 flex items-start gap-2.5 rounded-lg border border-emerald-500/50 bg-emerald-50 p-3 text-xs text-emerald-900"
        >
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
          <span>{serverSuccess}</span>
        </div>
      )}

      {serverError && (
        <div
          role="alert"
          className="mb-4 flex items-start gap-2.5 rounded-lg border border-red-500/50 bg-red-50 p-3 text-xs text-red-900"
        >
          <AlertCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
          <span>{serverError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-3">
        {/* Honeypot */}
        <div className="hidden" aria-hidden="true">
          <input type="text" tabIndex={-1} autoComplete="off" {...register("websiteUrl")} />
        </div>

        {/* Full Name */}
        <div>
          <label htmlFor="hero-fullName" className="sr-only">
            Full Name
          </label>
          <input
            id="hero-fullName"
            type="text"
            placeholder="Full Name *"
            className={inputBase}
            {...register("fullName")}
          />
          {errors.fullName && <p className={errorText}>{errors.fullName.message}</p>}
        </div>

        {/* +91 Phone Input */}
        <div>
          <label htmlFor="hero-mobile" className="sr-only">
            10-digit phone number
          </label>
          <div className="flex rounded-md border border-gray-300 bg-white overflow-hidden focus-within:border-[#8B0000] focus-within:ring-1 focus-within:ring-[#8B0000]">
            <span className="inline-flex items-center gap-1.5 px-3 bg-gray-50 border-r border-gray-300 text-xs font-semibold text-gray-800 select-none shrink-0">
              <span className="inline-flex flex-col w-4 h-3 rounded-[2px] overflow-hidden border border-gray-300/80 shrink-0" aria-hidden="true">
                <span className="h-1 bg-[#FF9933] w-full" />
                <span className="h-1 bg-white w-full" />
                <span className="h-1 bg-[#138808] w-full" />
              </span>
              <span>+91</span>
              <ChevronDown className="h-3 w-3 text-gray-500" aria-hidden="true" />
            </span>
            <input
              id="hero-mobile"
              type="tel"
              placeholder="10-digit phone number *"
              className="w-full px-3.5 py-2.5 text-sm text-[#1F1212] placeholder-gray-400 focus:outline-none"
              {...register("mobile")}
            />
          </div>
          {errors.mobile && <p className={errorText}>{errors.mobile.message}</p>}
        </div>

        {/* Approximate Gold Weight with gm suffix */}
        <div>
          <label
            htmlFor="hero-weight"
            className="block text-xs font-bold text-gray-800 mb-1"
          >
            Approximate gold weight (Optional)
          </label>
          <div className="flex rounded-md border border-gray-300 bg-white overflow-hidden focus-within:border-[#8B0000] focus-within:ring-1 focus-within:ring-[#8B0000]">
            <input
              id="hero-weight"
              type="number"
              step="0.01"
              min="0.1"
              placeholder="e.g. 10.6"
              className="w-full px-3.5 py-2.5 text-sm text-[#1F1212] placeholder-gray-400 focus:outline-none"
              {...register("approxWeightGrams")}
            />
            <span className="inline-flex items-center justify-center px-3.5 bg-gray-100 border-l border-gray-300 text-xs font-medium text-gray-600 select-none">
              gm
            </span>
          </div>
          {errors.approxWeightGrams && (
            <p className={errorText}>{errors.approxWeightGrams.message}</p>
          )}
        </div>

        {/* Select Gold Type */}
        <div>
          <label htmlFor="hero-goldType" className="sr-only">
            Select Gold Type
          </label>
          <select id="hero-goldType" className={inputBase} {...register("goldType")}>
            <option value="">Select Gold Type *</option>
            <option value="Old Gold">Old Gold</option>
            <option value="Used Gold Jewellery">Used Gold Jewellery</option>
            <option value="Gold Coins">Gold Coins</option>
            <option value="Broken Gold Jewellery">Broken Gold Jewellery</option>
            <option value="Other Eligible Gold Items">Other Eligible Gold Items</option>
          </select>
          {errors.goldType && <p className={errorText}>{errors.goldType.message}</p>}
        </div>

        {/* City & Area */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label htmlFor="hero-city" className="sr-only">
              City
            </label>
            <input
              id="hero-city"
              type="text"
              placeholder="City *"
              className={inputBase}
              {...register("city")}
            />
            {errors.city && <p className={errorText}>{errors.city.message}</p>}
          </div>

          <div>
            <label htmlFor="hero-area" className="sr-only">
              Area / Locality
            </label>
            <input
              id="hero-area"
              type="text"
              placeholder="Area / Locality"
              className={inputBase}
              {...register("area")}
            />
          </div>
        </div>

        {/* Preferred Time to Call */}
        <div>
          <label htmlFor="hero-preferredTime" className="sr-only">
            Preferred Time to Call
          </label>
          <select
            id="hero-preferredTime"
            className={inputBase}
            {...register("preferredTime")}
          >
            <option value="">Preferred Time to Call (9 AM – 7 PM, Mon–Sat)</option>
            <option value="Immediate / Within 30 Mins">Immediate / Within 30 Mins</option>
            <option value="Morning (9:00 AM - 12:00 PM)">
              Morning (9:00 AM – 12:00 PM)
            </option>
            <option value="Afternoon (12:00 PM - 4:00 PM)">
              Afternoon (12:00 PM – 4:00 PM)
            </option>
            <option value="Evening (4:00 PM - 7:00 PM)">
              Evening (4:00 PM – 7:00 PM)
            </option>
          </select>
          <p className="mt-1.5 text-[11px] text-gray-600 text-center">
            Office Hours: Morning 9:00 AM to 7:00 PM • <strong className="text-gray-900">Sunday is Holiday</strong>
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 w-full inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-[#7F090E] via-[#8B0000] to-[#5C060A] border border-[#FFB800]/60 px-5 py-3.5 text-sm font-bold text-[#FFD700] shadow-lg hover:brightness-110 active:scale-[0.99] disabled:opacity-50 cursor-pointer transition-all"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              <span>Submitting Request...</span>
            </>
          ) : (
            <>
              <span>Get Free Gold Valuation</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};
