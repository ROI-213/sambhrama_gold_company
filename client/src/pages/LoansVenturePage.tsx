import React from "react";
import { FileText, ShieldCheck, ClipboardList, CheckCircle2, Info } from "lucide-react";
import { usePageMeta } from "../hooks/usePageMeta";
import { HeroBanner } from "../components/HeroBanner";
import { SectionHeading } from "../components/SectionHeading";
import { EnquiryForm } from "../components/EnquiryForm";
import { PrimaryButton } from "../components/PrimaryButton";

export const LoansVenturePage: React.FC = () => {
  usePageMeta({
    title: "Loans & Financing Enquiries — Our Ventures",
    description:
      "Sambhrama Loans Division — Informational guidance, eligibility and documentation overview, and confidential loan requirement enquiries.",
  });

  return (
    <div>
      <HeroBanner
        eyebrow="Our Ventures • Loans"
        title="Loans & Financing Consultation"
        description="Structured consultation and documentation guidance to help you navigate financing enquiries with clarity and confidence."
        backgroundImage="/images/venture-loans.jpg"
        compact
      >
        <PrimaryButton href="#loans-enquiry" variant="gold">
          Submit Loan Enquiry
        </PrimaryButton>
        <PrimaryButton to="/ventures" variant="outline">
          All Ventures
        </PrimaryButton>
      </HeroBanner>

      {/* Introduction & Verified Available Services */}
      <section className="py-20 sm:py-28 bg-[#FFFDF7] text-[#3D070A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Consultation & Guidance"
            title="Verified Financing & Loan Enquiry Services"
            subtitle="Our Loans desk provides structured requirement assessment and documentation support for clients exploring financing options."
            lightMode
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-xl border border-[#F59E0B]/40 bg-white p-7 shadow-md">
              <ClipboardList
                className="h-8 w-8 text-[#B91C1C] mb-4"
                aria-hidden="true"
              />
              <h3 className="font-serif-luxury text-xl font-semibold text-[#3D070A]">
                Requirement Assessment
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#730D14]/80">
                One-on-one consultation to understand your financing objective, timeline,
                and appropriate category of enquiry.
              </p>
            </div>

            <div className="rounded-xl border border-[#F59E0B]/40 bg-white p-7 shadow-md">
              <FileText className="h-8 w-8 text-[#B91C1C] mb-4" aria-hidden="true" />
              <h3 className="font-serif-luxury text-xl font-semibold text-[#3D070A]">
                Documentation Guidance
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#730D14]/80">
                Clear checklist preparation for standard identity, address, income, or
                asset-related documents required during evaluation.
              </p>
            </div>

            <div className="rounded-xl border border-[#F59E0B]/40 bg-white p-7 shadow-md">
              <ShieldCheck className="h-8 w-8 text-[#B91C1C] mb-4" aria-hidden="true" />
              <h3 className="font-serif-luxury text-xl font-semibold text-[#3D070A]">
                Confidential Handling
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#730D14]/80">
                Every enquiry is handled with strict privacy, honest communication, and
                transparent explanation of next steps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility & Documentation Informational Section */}
      <section className="py-20 sm:py-28 bg-[#FFFDF7] border-b border-[#F59E0B]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="rounded-xl border border-[#F59E0B]/45 bg-white shadow-sm p-8">
              <h3 className="font-serif-luxury text-2xl font-semibold text-[#7F1D1D]">
                General Documentation Checklist (Informational)
              </h3>
              <p className="mt-2 text-sm text-[#4A2525]">
                While exact documentation depends on the specific financing category and
                applicable policy, applicants generally require:
              </p>
              <ul className="mt-6 space-y-3 text-sm text-[#3B1818]">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#B91C1C] shrink-0 mt-1" />
                  <span>
                    Valid government-issued photo identity proof (PAN Card, Aadhaar Card,
                    Passport, or Voter ID).
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#B91C1C] shrink-0 mt-1" />
                  <span>
                    Current residential or business address proof and recent passport-sized
                    photographs.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#B91C1C] shrink-0 mt-1" />
                  <span>
                    Relevant asset or financial supporting documents depending on the nature
                    of the enquiry.
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-[#F59E0B]/45 bg-white shadow-sm p-8 flex flex-col justify-between">
              <div>
                <h3 className="font-serif-luxury text-2xl font-semibold text-[#7F1D1D]">
                  How Our Loan Enquiry Process Works
                </h3>
                <ol className="mt-6 space-y-4 text-sm text-[#3B1818]">
                  <li>
                    <strong className="text-[#B91C1C]">1. Submit Enquiry:</strong> Share your
                    contact details, loan category, and requirement using the form below.
                  </li>
                  <li>
                    <strong className="text-[#B91C1C]">2. Initial Discussion:</strong> Our
                    representative contacts you to understand your requirement and explain
                    available options.
                  </li>
                  <li>
                    <strong className="text-[#B91C1C]">3. Document Review:</strong> Visit our
                    office with the required KYC and supporting documents for verification.
                  </li>
                </ol>
              </div>

              <div className="mt-6 rounded-lg border border-[#F59E0B]/40 bg-[#FFFDF7] p-4 flex items-start gap-2.5 text-xs text-[#573030]">
                <Info className="h-4 w-4 text-[#B91C1C] shrink-0 mt-0.5" />
                <p>
                  <strong>Important Disclosure:</strong> Information on this page is for
                  preliminary enquiry purposes only and does not constitute a binding sanction
                  or interest rate guarantee. Terms, eligibility, and availability are
                  communicated directly during formal consultation in accordance with
                  applicable norms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Loans Enquiry Form */}
      <section id="loans-enquiry" className="py-20 sm:py-28 bg-[#FEF3C7]/45">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Confidential Consultation"
            title="Loans Enquiry Form"
            subtitle="Provide your contact details and loan requirement below, and our team will reach out to assist you."
          />

          <EnquiryForm
            variant="LOANS"
            title="Submit a Loan Requirement Enquiry"
            subtitle="All fields marked with * are required."
            submitLabel="Submit Loan Enquiry"
          />
        </div>
      </section>
    </div>
  );
};
