import type { Request, Response, NextFunction } from "express";
import { getDataStore } from "../services/db.js";
import { enquirySubmissionSchema } from "../validators/schemas.js";
import { sendEnquiryNotificationEmail } from "../services/email.js";

export async function submitEnquiry(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // Check honeypot silently or reject
    if (req.body && typeof req.body.websiteUrl === "string" && req.body.websiteUrl.trim() !== "") {
      res.status(400).json({
        success: false,
        error: "Submission rejected due to spam detection.",
      });
      return;
    }

    const parsed = enquirySubmissionSchema.safeParse(req.body);
    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      res.status(400).json({
        success: false,
        error: firstIssue?.message || "Please check the form fields and try again.",
        issues: parsed.error.issues,
      });
      return;
    }

    const data = parsed.data;
    const store = await getDataStore();

    const saved = await store.createEnquiry({
      enquiryType: data.enquiryType,
      fullName: data.fullName,
      mobile: data.mobile,
      email: data.email || null,
      city: data.city || null,
      serviceRequired: data.serviceRequired || null,
      goldType: data.goldType || null,
      approxWeightGrams:
        data.approxWeightGrams !== null && data.approxWeightGrams !== undefined
          ? String(data.approxWeightGrams)
          : null,
      propertyRequirement: data.propertyRequirement || null,
      preferredLocation: data.preferredLocation || null,
      loanType: data.loanType || null,
      loanRequirement: data.loanRequirement || null,
      subject: data.subject || null,
      message: data.message,
      ipAddress: req.ip || null,
    });

    // Fire-and-forget optional email notification if SMTP is configured
    void sendEnquiryNotificationEmail(saved);

    res.status(201).json({
      success: true,
      message:
        "Thank you for contacting Sambhrama Gold Company. Your enquiry has been recorded and our team will reach out to you shortly.",
      data: {
        id: saved.id,
        enquiryType: saved.enquiryType,
        createdAt: saved.createdAt.toISOString(),
      },
    });
  } catch (error) {
    next(error);
  }
}
