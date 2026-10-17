import nodemailer from "nodemailer";
import { env } from "../config/env.js";
import type { EnquiryRecord } from "./db.js";

export async function sendEnquiryNotificationEmail(enquiry: EnquiryRecord): Promise<boolean> {
  if (!env.smtp.host || !env.smtp.notificationTo) {
    // Email notification is optional and only sent when SMTP credentials are configured
    return false;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: env.smtp.host,
      port: env.smtp.port,
      secure: env.smtp.secure,
      auth:
        env.smtp.user && env.smtp.pass
          ? {
              user: env.smtp.user,
              pass: env.smtp.pass,
            }
          : undefined,
    });

    const formattedTime = new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium",
      timeStyle: "medium",
      timeZone: "Asia/Kolkata",
    }).format(enquiry.createdAt);

    await transporter.sendMail({
      from: env.smtp.from,
      to: env.smtp.notificationTo,
      subject: `[Sambhrama Enquiry - ${enquiry.enquiryType}] From ${enquiry.fullName}`,
      text: [
        `New Website Enquiry Received (${enquiry.enquiryType})`,
        `----------------------------------------`,
        `Name: ${enquiry.fullName}`,
        `Mobile: ${enquiry.mobile}`,
        enquiry.email ? `Email: ${enquiry.email}` : null,
        enquiry.city ? `City/Location: ${enquiry.city}` : null,
        enquiry.serviceRequired ? `Service Required: ${enquiry.serviceRequired}` : null,
        enquiry.goldType ? `Gold Type: ${enquiry.goldType}` : null,
        enquiry.approxWeightGrams ? `Approx. Weight (g): ${enquiry.approxWeightGrams}` : null,
        enquiry.propertyRequirement ? `Property Requirement: ${enquiry.propertyRequirement}` : null,
        enquiry.preferredLocation ? `Preferred Location: ${enquiry.preferredLocation}` : null,
        enquiry.loanType ? `Loan Type: ${enquiry.loanType}` : null,
        enquiry.loanRequirement ? `Loan Requirement: ${enquiry.loanRequirement}` : null,
        enquiry.subject ? `Subject: ${enquiry.subject}` : null,
        `Message: ${enquiry.message}`,
        `Submitted At (IST): ${formattedTime}`,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    return true;
  } catch (error) {
    console.error("[EmailService] Failed to send enquiry notification email:", error);
    return false;
  }
}
