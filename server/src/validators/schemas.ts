import { z } from "zod";

export const adminLoginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid administrator email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password cannot exceed 128 characters"),
});

export const goldRateUpdateSchema = z.object({
  rate22k: z
    .union([z.number(), z.string()])
    .transform((val) => Number(val))
    .refine((val) => Number.isFinite(val) && val > 0, {
      message: "22K gold rate per gram must be a positive number",
    })
    .refine((val) => val <= 1000000, {
      message: "22K gold rate exceeds maximum allowed threshold",
    }),
  rate24k: z
    .union([z.number(), z.string()])
    .transform((val) => Number(val))
    .refine((val) => Number.isFinite(val) && val > 0, {
      message: "24K gold rate per gram must be a positive number",
    })
    .refine((val) => val <= 1000000, {
      message: "24K gold rate exceeds maximum allowed threshold",
    }),
  note: z
    .string()
    .trim()
    .max(300, "Note must be 300 characters or fewer")
    .optional()
    .nullable(),
});

const indianMobileRegex = /^[6-9]\d{9}$|^\+91[\s-]?[6-9]\d{9}$/;

export const enquirySubmissionSchema = z
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
      .min(2, "Full name must be at least 2 characters")
      .max(100, "Full name cannot exceed 100 characters"),
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
    approxWeightGrams: z
      .union([z.number(), z.string()])
      .optional()
      .nullable()
      .transform((val) => {
        if (val === undefined || val === null || val === "") return null;
        const num = Number(val);
        return Number.isFinite(num) ? num : NaN;
      })
      .refine((val) => val === null || (val > 0 && val <= 100000), {
        message: "Approximate weight must be a positive number in grams",
      }),
    propertyRequirement: z.string().trim().max(150).optional().or(z.literal("")),
    preferredLocation: z.string().trim().max(150).optional().or(z.literal("")),
    loanType: z.string().trim().max(150).optional().or(z.literal("")),
    loanRequirement: z.string().trim().max(200).optional().or(z.literal("")),
    subject: z.string().trim().max(150).optional().or(z.literal("")),
    message: z
      .string()
      .trim()
      .min(5, "Please provide a brief message (at least 5 characters)")
      .max(2000, "Message cannot exceed 2000 characters"),
    // Honeypot field for anti-spam (must be empty)
    websiteUrl: z.string().max(0, "Spam detected").optional().or(z.literal("")),
  })
  .superRefine((data, ctx) => {
    if (data.enquiryType === "QUICK") {
      if (!data.city || data.city.trim().length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["city"],
          message: "City is required",
        });
      }
      if (!data.serviceRequired || data.serviceRequired.trim().length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["serviceRequired"],
          message: "Please select a service required",
        });
      }
    }
    if (data.enquiryType === "SELL_GOLD") {
      if (!data.city || data.city.trim().length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["city"],
          message: "City / Location is required",
        });
      }
      if (!data.goldType || data.goldType.trim().length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["goldType"],
          message: "Please select the gold category",
        });
      }
    }
    if (data.enquiryType === "REAL_ESTATE") {
      if (!data.propertyRequirement || data.propertyRequirement.trim().length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["propertyRequirement"],
          message: "Property requirement is required",
        });
      }
      if (!data.preferredLocation || data.preferredLocation.trim().length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["preferredLocation"],
          message: "Preferred location is required",
        });
      }
    }
    if (data.enquiryType === "LOANS") {
      if (!data.loanType || data.loanType.trim().length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["loanType"],
          message: "Loan type is required",
        });
      }
      if (!data.loanRequirement || data.loanRequirement.trim().length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["loanRequirement"],
          message: "Loan requirement details are required",
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
          message: "Subject is required",
        });
      }
    }
  });
