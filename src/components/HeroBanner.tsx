import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface HeroBannerProps {
  eyebrow?: string;
  title: string;
  description: string;
  backgroundImage?: string;
  children?: React.ReactNode;
  rightContent?: React.ReactNode;
  compact?: boolean;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  eyebrow = "Sambhrama Gold Company",
  title,
  description,
  backgroundImage = "/images/hero-indian-gold.jpg",
  children,
  rightContent,
  compact = false,
}) => {
  return (
    <section
      className={`relative overflow-hidden bg-[#7F1D1D] border-b-4 border-[#FFB800] ${
        compact ? "py-16 sm:py-24" : "py-16 sm:py-24 lg:py-28"
      }`}
    >
      {/* Background Image with Royal Crimson Red & Warm Golden Yellow Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImage}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center opacity-25 scale-105"
          loading="eager"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#5C060A] via-[#7F1D1D]/95 to-[#6E080D]/90"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(#FFB800_1px,transparent_1px)] [background-size:24px_24px] opacity-15"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {rightContent ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="lg:col-span-7"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-[#FFD700] bg-white/10 backdrop-blur-xs px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#FFD700] mb-6">
                <Sparkles className="h-3.5 w-3.5 text-[#FFD700]" aria-hidden="true" />
                <span>{eyebrow}</span>
              </div>

              <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.12] tracking-tight text-white">
                {title}
              </h1>

              <p className="mt-6 text-base sm:text-lg lg:text-xl leading-relaxed text-[#FFFDF7]/90 max-w-2xl">
                {description}
              </p>

              {children && <div className="mt-9 flex flex-wrap gap-4">{children}</div>}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-5"
            >
              {rightContent}
            </motion.div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[#FFD700] bg-white/10 backdrop-blur-xs px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#FFD700] mb-6">
              <Sparkles className="h-3.5 w-3.5 text-[#FFD700]" aria-hidden="true" />
              <span>{eyebrow}</span>
            </div>

            <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.12] tracking-tight text-white">
              {title}
            </h1>

            <p className="mt-6 text-base sm:text-lg lg:text-xl leading-relaxed text-[#FFFDF7]/90 max-w-2xl">
              {description}
            </p>

            {children && <div className="mt-9 flex flex-wrap gap-4">{children}</div>}
          </motion.div>
        )}
      </div>
    </section>
  );
};
