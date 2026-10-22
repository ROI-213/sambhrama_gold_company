import React from "react";
import { Link } from "react-router-dom";
import { Compass, ArrowLeft } from "lucide-react";
import { usePageMeta } from "../hooks/usePageMeta";
import { PrimaryButton } from "../components/PrimaryButton";
import { companyConfig } from "../config/companyConfig";

export const PrivacyPolicyPage: React.FC = () => {
  usePageMeta({
    title: "Privacy Policy",
    description: `Privacy Policy for ${companyConfig.companyName} — How we collect, use, and safeguard customer enquiry and transaction information.`,
  });

  return (
    <div className="py-16 sm:py-24 bg-[#FFFDF7]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B91C1C]">
          Legal &amp; Compliance
        </span>
        <h1 className="mt-2 font-serif-luxury text-3xl sm:text-4xl font-bold text-[#7F1D1D]">
          Privacy Policy
        </h1>
        <p className="mt-2 text-xs text-[#6E4242]">
          Effective for {companyConfig.companyName}
        </p>

        <div className="mt-8 space-y-6 rounded-xl border border-[#F59E0B]/45 bg-white shadow-sm p-6 sm:p-10 text-sm leading-relaxed text-[#422020]">
          <section>
            <h2 className="font-serif-luxury text-xl font-semibold text-[#991B1B] mb-2">
              1. Information We Collect
            </h2>
            <p>
              When you submit an enquiry on the {companyConfig.companyName} website (across
              our Quick Enquiry, Sell Your Gold, Real Estate, Loans, or Contact Us forms),
              we collect the personal information you voluntarily provide—such as your full
              name, mobile number, email address, city/location, service requirement, and
              message content.
            </p>
          </section>

          <section>
            <h2 className="font-serif-luxury text-xl font-semibold text-[#991B1B] mb-2">
              2. How We Use Your Information
            </h2>
            <p>
              We use the information collected solely to respond to your enquiries, provide
              gold valuation or venture consultation, verify identity and ownership in
              accordance with statutory KYC norms during in-office transactions, and
              maintain internal compliance records.
            </p>
          </section>

          <section>
            <h2 className="font-serif-luxury text-xl font-semibold text-[#991B1B] mb-2">
              3. Data Security &amp; Confidentiality
            </h2>
            <p>
              We implement technical and organizational security measures, including input
              validation, rate limiting, and access controls, to protect your personal
              information from unauthorized access, alteration, or disclosure. We do not
              sell or rent customer contact details to third-party marketers.
            </p>
          </section>

          <section>
            <h2 className="font-serif-luxury text-xl font-semibold text-[#991B1B] mb-2">
              4. Cookies &amp; Session Management
            </h2>
            <p>
              Our public website does not require user tracking cookies to browse. Secure
              HttpOnly cookies are used strictly for authenticated administrator sessions.
            </p>
          </section>

          <section>
            <h2 className="font-serif-luxury text-xl font-semibold text-[#991B1B] mb-2">
              5. Contact Regarding Privacy
            </h2>
            <p>
              If you have questions regarding this Privacy Policy or wish to update or
              remove an enquiry record, please reach out to us via our{" "}
              <Link to="/contact" className="text-[#B91C1C] underline">
                Contact Us
              </Link>{" "}
              page.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export const TermsAndConditionsPage: React.FC = () => {
  usePageMeta({
    title: "Terms & Conditions",
    description: `Terms and Conditions governing the use of the ${companyConfig.companyName} website, reference gold rates, and in-office valuation policies.`,
  });

  return (
    <div className="py-16 sm:py-24 bg-[#FFFDF7]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B91C1C]">
          Legal &amp; Compliance
        </span>
        <h1 className="mt-2 font-serif-luxury text-3xl sm:text-4xl font-bold text-[#7F1D1D]">
          Terms &amp; Conditions
        </h1>
        <p className="mt-2 text-xs text-[#6E4242]">
          Governing use of the {companyConfig.companyName} website and services
        </p>

        <div className="mt-8 space-y-6 rounded-xl border border-[#F59E0B]/45 bg-white shadow-sm p-6 sm:p-10 text-sm leading-relaxed text-[#422020]">
          <section>
            <h2 className="font-serif-luxury text-xl font-semibold text-[#991B1B] mb-2">
              1. Reference Gold Rates Disclaimer
            </h2>
            <p>
              The 22K and 24K gold rates per gram displayed on this website are manually
              published reference indicators in Indian Rupees (INR). Final buying offers
              depend on physical in-office verification of gold purity, net weight after
              deducting non-gold attachments (stones, wax, beads, or alloys), and prevailing
              company policy at the time of inspection.
            </p>
          </section>

          <section>
            <h2 className="font-serif-luxury text-xl font-semibold text-[#991B1B] mb-2">
              2. Ownership, Mandatory Customer Purchase Bill &amp; KYC Verification
            </h2>
            <p>
              Any customer wishing to sell gold at {companyConfig.companyName} must be the
              lawful owner of the ornaments or coins presented.{" "}
              <strong>By the customer, the purchase bill (original purchase invoice/receipt) is required</strong>{" "}
              along with valid, original government-issued photo identification and address
              proof in compliance with statutory KYC norms. The company reserves the right to
              decline any transaction where the purchase bill, ownership, or KYC
              documentation cannot be satisfactorily verified.
            </p>
          </section>

          <section>
            <h2 className="font-serif-luxury text-xl font-semibold text-[#991B1B] mb-2">
              3. Real Estate &amp; Loans Enquiries
            </h2>
            <p>
              Information presented under our Real Estate and Loans sections is for general
              informational and preliminary enquiry purposes only. Submitting an online
              enquiry does not constitute a binding contract, property reservation, or loan
              sanction.
            </p>
          </section>

          <section>
            <h2 className="font-serif-luxury text-xl font-semibold text-[#991B1B] mb-2">
              4. Intellectual Property
            </h2>
            <p>
              All text, branding, logos, and layout designs on this website are the property
              of {companyConfig.companyName} and may not be reproduced without prior written
              consent.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export const NotFoundPage: React.FC = () => {
  usePageMeta({
    title: "404 — Page Not Found",
    description: "The requested page could not be found on Sambhrama Gold Company.",
  });

  return (
    <div className="py-24 sm:py-32 bg-[#FFFDF7] text-center px-4">
      <div className="max-w-xl mx-auto rounded-2xl border border-[#F59E0B]/50 bg-white shadow-sm p-8 sm:p-12 shadow-gold-glow">
        <Compass className="h-14 w-14 text-[#B91C1C] mx-auto mb-4" aria-hidden="true" />
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#B91C1C]">
          Error 404
        </span>
        <h1 className="mt-2 font-serif-luxury text-3xl sm:text-4xl font-bold text-[#7F1D1D]">
          Page Not Found
        </h1>
        <p className="mt-3 text-sm sm:text-base text-[#4A2525] leading-relaxed">
          The page you are looking for may have been moved or does not exist. Return to our
          homepage or explore our gold valuation services below.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <PrimaryButton to="/" variant="gold">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Back to Home</span>
          </PrimaryButton>
          <PrimaryButton to="/sell-your-gold" variant="outline">
            Sell Your Gold
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};
