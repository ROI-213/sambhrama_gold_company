import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, AlertCircle, Send, Loader2 } from "lucide-react";
import { submitCustomerEnquiry, type EnquiryPayload } from "../services/api";

const indianMobileRegex = /^[6-9]\d{9}$|^\+91[\s-]?[6-9]\d{9}$/;

export type EnquiryFormVariant =
  | "QUICK"
  | "SELL_GOLD"
  | "REAL_ESTATE"
  | "LOANS"
  | "CONTACT";

const enquiryFormSchema = z
  .object({
    enquiryType: z.enum([
      "QUICK",
      "SELL_GOLD",
      "REAL_ESTATE",
      "LOANS",
      "CONTACT",
    ]),
    fullName: z
      .string()
      .trim()
      .min(2, "Please enter your full name (at least 2 characters)")
      .max(100, "Name cannot exceed 100 characters"),
    mobile: z
      .string()
      .trim()
      .refine((val) => indianMobileRegex.test(val.replace(/[\s-]/g, "")), {
        message: "Please enter a valid 10-digit Indian mobile number",
      }),
    email: z
      .string()
      .trim()
      .email("Please enter a valid email address")
      .optional()
      .or(z.literal("")),
    city: z.string().trim().max(100).optional().or(z.literal("")),
    serviceRequired: z.string().trim().max(120).optional().or(z.literal("")),
    goldType: z.string().trim().max(120).optional().or(z.literal("")),
    approxWeightGrams: z.string().trim().optional().or(z.literal("")),
    propertyRequirement: z.string().trim().max(150).optional().or(z.literal("")),
    preferredLocation: z.string().trim().max(150).optional().or(z.literal("")),
    loanType: z.string().trim().max(150).optional().or(z.literal("")),
    loanRequirement: z.string().trim().max(200).optional().or(z.literal("")),
    subject: z.string().trim().max(150).optional().or(z.literal("")),
    message: z
      .string()
      .trim()
      .min(5, "Please enter a brief message (at least 5 characters)")
      .max(2000, "Message cannot exceed 2000 characters"),
    websiteUrl: z.string().max(0).optional().or(z.literal("")),
  })
  .superRefine((data, ctx) => {
    if (data.enquiryType === "QUICK") {
      if (!data.city || data.city.trim().length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["city"],
          message: "Please enter your city",
        });
      }
      if (!data.serviceRequired || data.serviceRequired.trim().length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["serviceRequired"],
          message: "Please select the service required",
        });
      }
    }
    if (data.enquiryType === "SELL_GOLD") {
      if (!data.city || data.city.trim().length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["city"],
          message: "Please enter your city or location",
        });
      }
      if (!data.goldType || data.goldType.trim().length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["goldType"],
          message: "Please select a gold type",
        });
      }
      if (data.approxWeightGrams && data.approxWeightGrams.trim() !== "") {
        const num = Number(data.approxWeightGrams);
        if (!Number.isFinite(num) || num <= 0 || num > 100000) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["approxWeightGrams"],
            message: "Approximate weight must be a positive number in grams",
          });
        }
      }
    }
    if (data.enquiryType === "REAL_ESTATE") {
      if (!data.propertyRequirement || data.propertyRequirement.trim().length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["propertyRequirement"],
          message: "Please specify your property requirement",
        });
      }
      if (!data.preferredLocation || data.preferredLocation.trim().length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["preferredLocation"],
          message: "Please enter your preferred location",
        });
      }
    }
    if (data.enquiryType === "LOANS") {
      if (!data.loanType || data.loanType.trim().length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["loanType"],
          message: "Please specify the loan enquiry type",
        });
      }
      if (!data.loanRequirement || data.loanRequirement.trim().length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["loanRequirement"],
          message: "Please describe your loan requirement",
        });
      }
    }
    if (data.enquiryType === "CONTACT") {
      if (!data.email || data.email.trim().length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["email"],
          message: "Email address is required",
        });
      }
      if (!data.subject || data.subject.trim().length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["subject"],
          message: "Please enter a subject",
        });
      }
    }
  });

type EnquiryFormValues = z.infer<typeof enquiryFormSchema>;

interface EnquiryFormProps {
  variant: EnquiryFormVariant;
  title?: string;
  subtitle?: string;
  submitLabel?: string;
}

export const EnquiryForm: React.FC<EnquiryFormProps> = ({
  variant,
  title,
  subtitle,
  submitLabel = "Submit Enquiry",
}) => {
  const [serverSuccess, setServerSuccess] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquiryFormSchema),
    defaultValues: {
      enquiryType: variant,
      fullName: "",
      mobile: "",
      email: "",
      city: "",
      serviceRequired: "",
      goldType: "",
      approxWeightGrams: "",
      propertyRequirement: "",
      preferredLocation: "",
      loanType: "",
      loanRequirement: "",
      subject: "",
      message: "",
      websiteUrl: "",
    },
  });

  const onSubmit = async (values: EnquiryFormValues) => {
    setServerError(null);
    setServerSuccess(null);

    try {
      const payload: EnquiryPayload = {
        enquiryType: variant,
        fullName: values.fullName,
        mobile: values.mobile,
        email: values.email || undefined,
        city: values.city || undefined,
        serviceRequired: values.serviceRequired || undefined,
        goldType: values.goldType || undefined,
        approxWeightGrams: values.approxWeightGrams ? Number(values.approxWeightGrams) : null,
        propertyRequirement: values.propertyRequirement || undefined,
        preferredLocation: values.preferredLocation || undefined,
        loanType: values.loanType || undefined,
        loanRequirement: values.loanRequirement || undefined,
        subject: values.subject || undefined,
        message: values.message,
        websiteUrl: values.websiteUrl || "",
      };

      const res = await submitCustomerEnquiry(payload);
      setServerSuccess(
        res.message ||
          "Thank you! Your enquiry has been recorded and our team will contact you shortly."
      );
      reset({
        enquiryType: variant,
        fullName: "",
        mobile: "",
        email: "",
        city: "",
        serviceRequired: "",
        goldType: "",
        approxWeightGrams: "",
        propertyRequirement: "",
        preferredLocation: "",
        loanType: "",
        loanRequirement: "",
        subject: "",
        message: "",
        websiteUrl: "",
      });
    } catch (err) {
      setServerError(
        err instanceof Error
          ? err.message
          : "Unable to submit your enquiry at the moment. Please try again."
      );
    }
  };

  const inputClass =
    "mt-1.5 w-full rounded-md border border-[#F59E0B]/50 bg-[#FFFDF7] px-4 py-3 text-sm text-[#7F1D1D] placeholder-[#8A6262] focus:border-[#FFB800] focus:outline-none";
  const labelClass = "block text-xs font-semibold uppercase tracking-wider text-[#991B1B]";
  const errorClass = "mt-1.5 text-xs font-medium text-red-600";

  return (
    <div
      className="rounded-xl border border-[#F59E0B]/50 bg-white shadow-sm p-6 sm:p-8 lg:p-10 shadow-xl"
      data-testid={`enquiry-form-${variant.toLowerCase()}`}
    >
      {(title || subtitle) && (
        <div className="mb-7 border-b border-[#F59E0B]/50 pb-5">
          {title && (
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-[#7F1D1D]">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="mt-2 text-sm text-[#4A2525] leading-relaxed">{subtitle}</p>
          )}
        </div>
      )}

      {serverSuccess && (
        <div
          role="status"
          aria-live="polite"
          data-testid="enquiry-success-alert"
          className="mb-6 flex items-start gap-3 rounded-lg border border-emerald-500/60 bg-emerald-50 p-4 text-sm text-emerald-900"
        >
          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-emerald-800">Enquiry Submitted Successfully</p>
            <p className="mt-0.5 text-xs leading-relaxed">{serverSuccess}</p>
          </div>
        </div>
      )}

      {serverError && (
        <div
          role="alert"
          data-testid="enquiry-error-alert"
          className="mb-6 flex items-start gap-3 rounded-lg border border-red-500/60 bg-red-50 p-4 text-sm text-red-900"
        >
          <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-red-800">Submission Error</p>
            <p className="mt-0.5 text-xs leading-relaxed">{serverError}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        <input type="hidden" {...register("enquiryType")} value={variant} />

        {/* Honeypot anti-spam field */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor={`websiteUrl-${variant}`}>Website</label>
          <input
            id={`websiteUrl-${variant}`}
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("websiteUrl")}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Name / Full Name */}
          <div>
            <label htmlFor={`fullName-${variant}`} className={labelClass}>
              {variant === "SELL_GOLD" || variant === "CONTACT" ? "Full Name *" : "Name *"}
            </label>
            <input
              id={`fullName-${variant}`}
              type="text"
              placeholder="Enter your full name"
              className={inputClass}
              {...register("fullName")}
            />
            {errors.fullName && (
              <p role="alert" className={errorClass}>
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Mobile Number */}
          <div>
            <label htmlFor={`mobile-${variant}`} className={labelClass}>
              Mobile Number *
            </label>
            <input
              id={`mobile-${variant}`}
              type="tel"
              placeholder="10-digit mobile number"
              className={inputClass}
              {...register("mobile")}
            />
            {errors.mobile && (
              <p role="alert" className={errorClass}>
                {errors.mobile.message}
              </p>
            )}
          </div>
        </div>

        {/* Variant-specific fields */}
        {variant === "QUICK" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="city-quick" className={labelClass}>
                City *
              </label>
              <input
                id="city-quick"
                type="text"
                placeholder="Your city or town"
                className={inputClass}
                {...register("city")}
              />
              {errors.city && (
                <p role="alert" className={errorClass}>
                  {errors.city.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="serviceRequired-quick" className={labelClass}>
                Service Required *
              </label>
              <select
                id="serviceRequired-quick"
                className={inputClass}
                {...register("serviceRequired")}
              >
                <option value="">Select a service</option>
                <option value="Gold Buying">Gold Buying</option>
                <option value="Gold Valuation">Gold Valuation</option>
                <option value="Gold Purity Testing">Gold Purity Testing</option>
                <option value="Real Estate Enquiry">Real Estate Enquiry</option>
                <option value="Loans Enquiry">Loans Enquiry</option>
                <option value="General Consultation">General Consultation</option>
              </select>
              {errors.serviceRequired && (
                <p role="alert" className={errorClass}>
                  {errors.serviceRequired.message}
                </p>
              )}
            </div>
          </div>
        )}

        {variant === "SELL_GOLD" && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="email-sell" className={labelClass}>
                  Email Address (Optional)
                </label>
                <input
                  id="email-sell"
                  type="email"
                  placeholder="you@example.com"
                  className={inputClass}
                  {...register("email")}
                />
                {errors.email && (
                  <p role="alert" className={errorClass}>
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="city-sell" className={labelClass}>
                  City / Location *
                </label>
                <input
                  id="city-sell"
                  type="text"
                  placeholder="Enter your city or locality"
                  className={inputClass}
                  {...register("city")}
                />
                {errors.city && (
                  <p role="alert" className={errorClass}>
                    {errors.city.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="goldType-sell" className={labelClass}>
                  Gold Type *
                </label>
                <select
                  id="goldType-sell"
                  className={inputClass}
                  {...register("goldType")}
                >
                  <option value="">Select gold category</option>
                  <option value="Old Gold">Old Gold</option>
                  <option value="Used Gold Jewellery">Used Gold Jewellery</option>
                  <option value="Gold Coins">Gold Coins</option>
                  <option value="Broken Gold Jewellery">Broken Gold Jewellery</option>
                  <option value="Other Eligible Gold Items">
                    Other Eligible Gold Items
                  </option>
                </select>
                {errors.goldType && (
                  <p role="alert" className={errorClass}>
                    {errors.goldType.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="approxWeightGrams-sell" className={labelClass}>
                  Approximate Weight in Grams (Optional)
                </label>
                <input
                  id="approxWeightGrams-sell"
                  type="number"
                  step="0.01"
                  min="0.1"
                  placeholder="e.g., 25.5"
                  className={inputClass}
                  {...register("approxWeightGrams")}
                />
                {errors.approxWeightGrams && (
                  <p role="alert" className={errorClass}>
                    {errors.approxWeightGrams.message}
                  </p>
                )}
              </div>
            </div>
          </>
        )}

        {variant === "REAL_ESTATE" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="propertyRequirement-re" className={labelClass}>
                Property Requirement *
              </label>
              <select
                id="propertyRequirement-re"
                className={inputClass}
                {...register("propertyRequirement")}
              >
                <option value="">Select requirement</option>
                <option value="Residential Property Consultation">
                  Residential Property Consultation
                </option>
                <option value="Commercial Property Consultation">
                  Commercial Property Consultation
                </option>
                <option value="Plot / Land Enquiry">Plot / Land Enquiry</option>
                <option value="Property Advisory & Documentation">
                  Property Advisory &amp; Documentation
                </option>
              </select>
              {errors.propertyRequirement && (
                <p role="alert" className={errorClass}>
                  {errors.propertyRequirement.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="preferredLocation-re" className={labelClass}>
                Preferred Location *
              </label>
              <input
                id="preferredLocation-re"
                type="text"
                placeholder="Preferred city or locality"
                className={inputClass}
                {...register("preferredLocation")}
              />
              {errors.preferredLocation && (
                <p role="alert" className={errorClass}>
                  {errors.preferredLocation.message}
                </p>
              )}
            </div>
          </div>
        )}

        {variant === "LOANS" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="loanType-loans" className={labelClass}>
                Loan Type *
              </label>
              <select
                id="loanType-loans"
                className={inputClass}
                {...register("loanType")}
              >
                <option value="">Select loan enquiry category</option>
                <option value="Gold-Backed Financing Consultation">
                  Gold-Backed Financing Consultation
                </option>
                <option value="Property / Mortgage Consultation">
                  Property / Mortgage Consultation
                </option>
                <option value="Business Financing Guidance">
                  Business Financing Guidance
                </option>
                <option value="General Loan Requirement">
                  General Loan Requirement
                </option>
              </select>
              {errors.loanType && (
                <p role="alert" className={errorClass}>
                  {errors.loanType.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="loanRequirement-loans" className={labelClass}>
                Loan Requirement *
              </label>
              <input
                id="loanRequirement-loans"
                type="text"
                placeholder="Approximate requirement or purpose"
                className={inputClass}
                {...register("loanRequirement")}
              />
              {errors.loanRequirement && (
                <p role="alert" className={errorClass}>
                  {errors.loanRequirement.message}
                </p>
              )}
            </div>
          </div>
        )}

        {variant === "CONTACT" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="email-contact" className={labelClass}>
                Email Address *
              </label>
              <input
                id="email-contact"
                type="email"
                placeholder="you@example.com"
                className={inputClass}
                {...register("email")}
              />
              {errors.email && (
                <p role="alert" className={errorClass}>
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="subject-contact" className={labelClass}>
                Subject *
              </label>
              <input
                id="subject-contact"
                type="text"
                placeholder="How can we help you?"
                className={inputClass}
                {...register("subject")}
              />
              {errors.subject && (
                <p role="alert" className={errorClass}>
                  {errors.subject.message}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Message */}
        <div>
          <label htmlFor={`message-${variant}`} className={labelClass}>
            Message *
          </label>
          <textarea
            id={`message-${variant}`}
            rows={4}
            placeholder="Share any additional details or preferred time for our team to reach you..."
            className={inputClass}
            {...register("message")}
          />
          {errors.message && (
            <p role="alert" className={errorClass}>
              {errors.message.message}
            </p>
          )}
        </div>

        <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-xs text-[#6E4242]">
            Your details are kept strictly confidential and used solely to respond to your
            enquiry.
          </p>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-gold-gradient px-7 py-3.5 text-sm font-semibold text-[#3D070A] shadow-gold-glow hover:brightness-105 disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <Send className="h-4 w-4" aria-hidden="true" />
                <span>{submitLabel}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
