import React from "react";
import { Link } from "react-router-dom";

interface PrimaryButtonProps {
  children: React.ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "gold" | "outline" | "dark";
  className?: string;
  disabled?: boolean;
  external?: boolean;
  ariaLabel?: string;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  to,
  href,
  onClick,
  type = "button",
  variant = "gold",
  className = "",
  disabled = false,
  external = false,
  ariaLabel,
}) => {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-md px-6 py-3.5 text-sm font-bold tracking-wide transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB800] disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    gold: "bg-gold-gradient text-[#7F1D1D] border border-[#F59E0B] shadow-md hover:brightness-105 active:scale-[0.99]",
    outline:
      "border-2 border-[#FFB800] bg-white text-[#8B0000] hover:bg-[#FEF3C7] hover:border-[#D97706]",
    dark: "border border-[#FFB800] bg-[#8B0000] text-white hover:bg-[#6E080D]",
  };

  const combined = `${baseStyles} ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combined} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={combined}
        aria-label={ariaLabel}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combined}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};
