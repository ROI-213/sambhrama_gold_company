import React from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  lightMode?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  align = "center",
  lightMode = false,
}) => {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-3xl ${alignment} mb-8`}>
      {eyebrow && (
        <div
          className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] mb-3 ${
            lightMode ? "text-[#B91C1C]" : "text-[#B91C1C]"
          }`}
        >
          <span className="h-[1px] w-6 bg-[#FFB800]" aria-hidden="true" />
          <span>{eyebrow}</span>
          {align === "center" && (
            <span className="h-[1px] w-6 bg-[#FFB800]" aria-hidden="true" />
          )}
        </div>
      )}
      <h2
        className={`font-serif-luxury text-3xl sm:text-4xl lg:text-[2.6rem] font-semibold leading-tight ${
          lightMode ? "text-[#3D070A]" : "text-[#7F1D1D]"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-base sm:text-lg leading-relaxed ${
            lightMode ? "text-[#730D14]/80" : "text-[#4A2525]"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
