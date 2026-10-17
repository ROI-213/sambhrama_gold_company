import React, { useState, useEffect } from "react";
import { ShieldCheck, FileText, Eye, X, ExternalLink, Award } from "lucide-react";
import type { CertificateCategory, CertificateItem } from "../data/siteContent";
import { Link } from "react-router-dom";

const CATEGORIES: CertificateCategory[] = [
  "Company Registrations",
  "Applicable Business Licenses",
  "Professional Certifications",
  "Awards/Recognitions",
];

export const CertificateGallery: React.FC<{
  certificates: CertificateItem[];
}> = ({ certificates }) => {
  const verifiedOnly = certificates.filter((c) => c.verified);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [activeCertificate, setActiveCertificate] = useState<CertificateItem | null>(
    null
  );

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setActiveCertificate(null);
      }
    }
    if (activeCertificate) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeCertificate]);

  const filtered =
    selectedCategory === "ALL"
      ? verifiedOnly
      : verifiedOnly.filter((c) => c.category === selectedCategory);

  return (
    <div>
      {/* Category Filter Pills */}
      <div
        role="tablist"
        aria-label="Certificate Categories"
        className="flex flex-wrap items-center justify-center gap-2.5 mb-10"
      >
        <button
          type="button"
          role="tab"
          aria-selected={selectedCategory === "ALL"}
          onClick={() => setSelectedCategory("ALL")}
          className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
            selectedCategory === "ALL"
              ? "bg-gold-gradient text-[#3D070A]"
              : "border border-[#F59E0B]/45 bg-white shadow-sm text-[#991B1B] hover:border-[#FFB800]"
          }`}
        >
          All Categories
        </button>
        {CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
            className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
              selectedCategory === category
                ? "bg-gold-gradient text-[#3D070A]"
                : "border border-[#F59E0B]/45 bg-white shadow-sm text-[#991B1B] hover:border-[#FFB800]"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Category Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {CATEGORIES.map((category) => {
          const count = verifiedOnly.filter((c) => c.category === category).length;
          return (
            <div
              key={category}
              className="rounded-xl border border-[#F59E0B]/40 bg-[#FFFBEB] p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <Award className="h-5 w-5 text-[#B91C1C]" aria-hidden="true" />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#F59E0B]">
                  {count > 0 ? `${count} Verified` : "Verification Queue"}
                </span>
              </div>
              <h3 className="font-serif-luxury text-lg font-semibold text-[#7F1D1D]">
                {category}
              </h3>
              <p className="mt-1.5 text-xs text-[#573030] leading-relaxed">
                Official documents in this category are published only after verification.
              </p>
            </div>
          );
        })}
      </div>

      {/* Certificates Grid or Honest Empty State */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((cert) => (
            <article
              key={cert.id}
              className="rounded-xl border border-[#F59E0B]/45 bg-white shadow-sm p-6 flex flex-col justify-between"
            >
              <div>
                <span className="inline-block rounded-full bg-[#FFB800]/15 px-3 py-1 text-[11px] font-semibold text-[#B91C1C]">
                  {cert.category}
                </span>
                <h4 className="mt-3 font-serif-luxury text-xl font-semibold text-[#7F1D1D]">
                  {cert.title}
                </h4>
                <p className="mt-1 text-xs text-[#991B1B]">Issued by: {cert.issuer}</p>
                {cert.referenceNote && (
                  <p className="mt-2 text-xs text-[#633838]">{cert.referenceNote}</p>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-[#F59E0B]/45 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveCertificate(cert)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B91C1C] hover:text-[#991B1B]"
                >
                  <Eye className="h-4 w-4" aria-hidden="true" />
                  <span>
                    {cert.fileType === "pdf" ? "View PDF Document" : "Enlarge Certificate"}
                  </span>
                </button>
                <a
                  href={cert.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-[#573030] hover:text-[#B91C1C]"
                >
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Open</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div
          className="rounded-xl border border-[#F59E0B]/45 bg-[#FFFBEB] p-8 sm:p-12 text-center max-w-3xl mx-auto"
          data-testid="certificates-empty-state"
        >
          <ShieldCheck className="h-12 w-12 text-[#B91C1C] mx-auto mb-4" aria-hidden="true" />
          <h3 className="font-serif-luxury text-2xl font-semibold text-[#7F1D1D]">
            Verified Digital Certificates Repository
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-[#4A2525]">
            In strict adherence to our transparency and authenticity policy, Sambhrama Gold
            Company displays only verified company registrations, business licenses,
            professional certifications, and recognitions that have been formally uploaded
            for public digital viewing.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[#991B1B]">
            No digital certificate scans have been published in this category yet. Customers
            are welcome to inspect our physical registration and statutory compliance
            documents directly at our office or request details from our team.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-gold-gradient px-5 py-2.5 text-xs font-semibold text-[#3D070A]"
            >
              <FileText className="h-4 w-4" aria-hidden="true" />
              <span>Request Compliance Information</span>
            </Link>
          </div>
        </div>
      )}

      {/* Accessible Modal for Enlarged Image or PDF Viewing */}
      {activeCertificate && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="certificate-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onClick={() => setActiveCertificate(null)}
        >
          <div
            className="relative w-full max-w-4xl rounded-xl border border-[#FFB800]/50 bg-white shadow-sm p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#F59E0B]/40 pb-4 mb-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#B91C1C]">
                  {activeCertificate.category}
                </span>
                <h3
                  id="certificate-modal-title"
                  className="font-serif-luxury text-xl font-semibold text-[#7F1D1D]"
                >
                  {activeCertificate.title}
                </h3>
              </div>
              <button
                type="button"
                aria-label="Close certificate preview modal"
                onClick={() => setActiveCertificate(null)}
                className="rounded-md p-2 text-[#7F1D1D] hover:bg-[#FEF3C7]/60 hover:text-[#B91C1C]"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="max-h-[75vh] overflow-auto rounded-lg bg-[#FFFDF7] p-2">
              {activeCertificate.fileType === "pdf" ? (
                <iframe
                  src={activeCertificate.fileUrl}
                  title={activeCertificate.title}
                  className="w-full h-[65vh] rounded"
                />
              ) : (
                <img
                  src={activeCertificate.fileUrl}
                  alt={activeCertificate.title}
                  className="max-h-[65vh] w-auto mx-auto object-contain"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
