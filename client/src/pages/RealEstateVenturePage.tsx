import React from "react";
import { Building2, Home, MapPin, FileCheck2, Compass } from "lucide-react";
import { usePageMeta } from "../hooks/usePageMeta";
import { HeroBanner } from "../components/HeroBanner";
import { SectionHeading } from "../components/SectionHeading";
import { EnquiryForm } from "../components/EnquiryForm";
import { PrimaryButton } from "../components/PrimaryButton";
import { verifiedRealEstateProjects } from "../data/siteContent";

export const RealEstateVenturePage: React.FC = () => {
  usePageMeta({
    title: "Real Estate Division — Our Ventures",
    description:
      "Sambhrama Real Estate Division — Residential and commercial property consultation, project portfolio, and personalized property requirement enquiries.",
  });

  const activeProjects = verifiedRealEstateProjects.filter((p) => p.verified);

  return (
    <div>
      <HeroBanner
        eyebrow="Our Ventures • Real Estate"
        title="Sambhrama Real Estate Division"
        description="Thoughtful property consultation connecting individuals, families, and businesses with residential and commercial real estate opportunities."
        backgroundImage="/images/venture-real-estate.jpg"
        compact
      >
        <PrimaryButton href="#real-estate-enquiry" variant="gold">
          Submit Property Enquiry
        </PrimaryButton>
        <PrimaryButton to="/ventures" variant="outline">
          All Ventures
        </PrimaryButton>
      </HeroBanner>

      {/* Introduction & Property Service Overview */}
      <section className="py-20 sm:py-28 bg-[#FFFDF7] text-[#3D070A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Property Advisory"
            title="Structured Real Estate Guidance"
            subtitle="Whether you are exploring residential living spaces, commercial premises, or land opportunities, our Real Estate division prioritizes clarity and due diligence."
            lightMode
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-xl border border-[#F59E0B]/40 bg-white p-7 shadow-md">
              <Home className="h-8 w-8 text-[#B91C1C] mb-4" aria-hidden="true" />
              <h3 className="font-serif-luxury text-2xl font-semibold text-[#3D070A]">
                Residential Properties
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#730D14]/80">
                Assistance with residential plots, family homes, and apartment enquiries
                tailored to your preferred locality and budget considerations.
              </p>
            </div>

            <div className="rounded-xl border border-[#F59E0B]/40 bg-white p-7 shadow-md">
              <Building2 className="h-8 w-8 text-[#B91C1C] mb-4" aria-hidden="true" />
              <h3 className="font-serif-luxury text-2xl font-semibold text-[#3D070A]">
                Commercial Spaces
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#730D14]/80">
                Requirement-based consultation for retail, office, and commercial property
                enquiries in key business corridors.
              </p>
            </div>

            <div className="rounded-xl border border-[#F59E0B]/40 bg-white p-7 shadow-md">
              <FileCheck2 className="h-8 w-8 text-[#B91C1C] mb-4" aria-hidden="true" />
              <h3 className="font-serif-luxury text-2xl font-semibold text-[#3D070A]">
                Transparent Coordination
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#730D14]/80">
                Clear communication, site visit coordination, and preliminary documentation
                guidance throughout your property evaluation process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Editable Project Portfolio */}
      <section className="py-20 sm:py-28 bg-[#FFFDF7] border-b border-[#F59E0B]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Portfolio"
            title="Verified Property & Project Portfolio"
            subtitle="We list only verified real estate projects and active opportunities."
          />

          {activeProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {activeProjects.map((project) => (
                <article
                  key={project.id}
                  className="rounded-xl border border-[#F59E0B]/45 bg-white shadow-sm p-6"
                >
                  <span className="inline-block rounded-full bg-[#FFB800]/15 px-3 py-1 text-xs font-semibold text-[#B91C1C]">
                    {project.category}
                  </span>
                  <h3 className="mt-3 font-serif-luxury text-xl font-semibold text-[#7F1D1D]">
                    {project.title}
                  </h3>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-[#991B1B]">
                    <MapPin className="h-3.5 w-3.5 text-[#B91C1C]" aria-hidden="true" />
                    <span>{project.location}</span>
                  </p>
                  <p className="mt-3 text-sm text-[#4A2525]">{project.summary}</p>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-[#F59E0B]/45 bg-white shadow-sm p-8 sm:p-10 text-center max-w-3xl mx-auto">
              <Compass
                className="h-10 w-10 text-[#B91C1C] mx-auto mb-3"
                aria-hidden="true"
              />
              <h3 className="font-serif-luxury text-2xl font-semibold text-[#7F1D1D]">
                Personalized Property Availability Upon Enquiry
              </h3>
              <p className="mt-2 text-sm text-[#4A2525] leading-relaxed">
                To ensure accuracy and current availability, we share verified residential
                and commercial property options directly based on your specific location and
                requirement criteria. Submit the form below to receive tailored details from
                our Real Estate desk.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Real Estate Enquiry Form */}
      <section id="real-estate-enquiry" className="py-20 sm:py-28 bg-[#FEF3C7]/45">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Property Consultation"
            title="Real Estate Enquiry Form"
            subtitle="Share your property requirement and preferred location below, and our Real Estate team will get in touch with you."
          />

          <EnquiryForm
            variant="REAL_ESTATE"
            title="Discuss Your Property Requirement"
            subtitle="All fields marked with * are required."
            submitLabel="Submit Real Estate Enquiry"
          />
        </div>
      </section>
    </div>
  );
};
