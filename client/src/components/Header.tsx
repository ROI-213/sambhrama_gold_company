import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Gem } from "lucide-react";
import { GoldRateBar } from "./GoldRateDisplay";
import { PrimaryButton } from "./PrimaryButton";
import { companyConfig } from "../config/companyConfig";

const ventureSubLinks = [
  { label: "All Ventures Overview", to: "/ventures" },
  { label: "Real Estate", to: "/ventures/real-estate" },
  { label: "Loans", to: "/ventures/loans" },
  { label: "Gold Division", to: "/ventures/gold" },
];

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [venturesOpen, setVenturesOpen] = useState(false);
  const [mobileVenturesOpen, setMobileVenturesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
    setVenturesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setVenturesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isVenturesActive = location.pathname.startsWith("/ventures");

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-semibold transition-colors py-2 ${
      isActive
        ? "text-[#991B1B] border-b-2 border-[#FFB800]"
        : "text-[#3B1818] hover:text-[#991B1B]"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b-2 border-[#FFB800]/50 shadow-sm">
      <GoldRateBar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus-visible:outline-2 focus-visible:outline-[#991B1B]"
          >
            <div className="h-11 w-11 rounded-lg bg-gradient-to-br from-[#8B0000] to-[#5C060A] border-2 border-[#FFB800] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Gem className="h-6 w-6 text-[#FFB800]" aria-hidden="true" />
            </div>
            <div>
              <span className="block font-serif-luxury text-lg sm:text-xl font-bold tracking-wide text-[#7F1D1D] group-hover:text-[#991B1B] transition-colors">
                {companyConfig.companyName}
              </span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-[#D97706]">
                Gold • Real Estate • Loans
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-7"
          >
            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              About Us
            </NavLink>
            <NavLink to="/sell-your-gold" className={navLinkClass}>
              Sell Your Gold
            </NavLink>
            <NavLink to="/certificates" className={navLinkClass}>
              Certificates
            </NavLink>
            <NavLink to="/testimonials" className={navLinkClass}>
              Testimonials
            </NavLink>

            {/* Our Ventures Dropdown */}
            <div
              className="relative"
              ref={dropdownRef}
              onMouseEnter={() => setVenturesOpen(true)}
              onMouseLeave={() => setVenturesOpen(false)}
            >
              <button
                type="button"
                aria-expanded={venturesOpen}
                aria-haspopup="true"
                onClick={() => setVenturesOpen((prev) => !prev)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setVenturesOpen(false);
                }}
                className={`inline-flex items-center gap-1 text-sm font-semibold transition-colors py-2 ${
                  isVenturesActive
                    ? "text-[#991B1B] border-b-2 border-[#FFB800]"
                    : "text-[#3B1818] hover:text-[#991B1B]"
                }`}
              >
                <span>Our Ventures</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    venturesOpen ? "rotate-180 text-[#991B1B]" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>

              {venturesOpen && (
                <div
                  role="menu"
                  aria-label="Our Ventures Submenu"
                  className="absolute left-0 mt-1 w-60 rounded-lg border-2 border-[#FFB800]/60 bg-white py-2 shadow-xl z-50"
                >
                  {ventureSubLinks.map((sub) => (
                    <NavLink
                      key={sub.to}
                      to={sub.to}
                      end={sub.to === "/ventures"}
                      role="menuitem"
                      className={({ isActive }) =>
                        `block px-4 py-2.5 text-sm transition-colors ${
                          isActive
                            ? "bg-[#FEF3C7] text-[#991B1B] font-bold"
                            : "text-[#3B1818] hover:bg-[#FFFBEB] hover:text-[#991B1B]"
                        }`
                      }
                    >
                      {sub.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>

            <NavLink to="/contact" className={navLinkClass}>
              Contact Us
            </NavLink>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <PrimaryButton to="/sell-your-gold" variant="gold" className="px-5 py-2.5 text-xs">
              Sell Your Gold
            </PrimaryButton>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-menu"
              aria-label={mobileMenuOpen ? "Close main menu" : "Open main menu"}
              className="inline-flex items-center justify-center rounded-md p-2.5 text-[#7F1D1D] hover:bg-[#FEF3C7]"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          id="mobile-navigation-menu"
          aria-label="Mobile Navigation"
          className="lg:hidden border-t border-[#F59E0B]/40 bg-white px-4 pt-3 pb-6 space-y-1.5 shadow-lg"
        >
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `block rounded-md px-3 py-2.5 text-base font-medium ${
                isActive ? "bg-[#FEF3C7] text-[#991B1B] font-bold" : "text-[#3B1818] hover:bg-[#FFFBEB]"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `block rounded-md px-3 py-2.5 text-base font-medium ${
                isActive ? "bg-[#FEF3C7] text-[#991B1B] font-bold" : "text-[#3B1818] hover:bg-[#FFFBEB]"
              }`
            }
          >
            About Us
          </NavLink>
          <NavLink
            to="/sell-your-gold"
            className={({ isActive }) =>
              `block rounded-md px-3 py-2.5 text-base font-medium ${
                isActive ? "bg-[#FEF3C7] text-[#991B1B] font-bold" : "text-[#3B1818] hover:bg-[#FFFBEB]"
              }`
            }
          >
            Sell Your Gold
          </NavLink>
          <NavLink
            to="/certificates"
            className={({ isActive }) =>
              `block rounded-md px-3 py-2.5 text-base font-medium ${
                isActive ? "bg-[#FEF3C7] text-[#991B1B] font-bold" : "text-[#3B1818] hover:bg-[#FFFBEB]"
              }`
            }
          >
            Certificates
          </NavLink>
          <NavLink
            to="/testimonials"
            className={({ isActive }) =>
              `block rounded-md px-3 py-2.5 text-base font-medium ${
                isActive ? "bg-[#FEF3C7] text-[#991B1B] font-bold" : "text-[#3B1818] hover:bg-[#FFFBEB]"
              }`
            }
          >
            Testimonials
          </NavLink>

          {/* Mobile Ventures Accordion */}
          <div>
            <button
              type="button"
              onClick={() => setMobileVenturesOpen((prev) => !prev)}
              aria-expanded={mobileVenturesOpen}
              className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-base font-medium text-[#3B1818] hover:bg-[#FFFBEB]"
            >
              <span>Our Ventures</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  mobileVenturesOpen ? "rotate-180 text-[#991B1B]" : ""
                }`}
              />
            </button>
            {mobileVenturesOpen && (
              <div className="pl-4 mt-1 space-y-1 border-l-2 border-[#FFB800] ml-3">
                {ventureSubLinks.map((sub) => (
                  <NavLink
                    key={sub.to}
                    to={sub.to}
                    end={sub.to === "/ventures"}
                    className={({ isActive }) =>
                      `block rounded-md px-3 py-2 text-sm font-medium ${
                        isActive ? "text-[#991B1B] font-bold" : "text-[#4A2525] hover:text-[#991B1B]"
                      }`
                    }
                  >
                    {sub.label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `block rounded-md px-3 py-2.5 text-base font-medium ${
                isActive ? "bg-[#FEF3C7] text-[#991B1B] font-bold" : "text-[#3B1818] hover:bg-[#FFFBEB]"
              }`
            }
          >
            Contact Us
          </NavLink>

          <div className="pt-3">
            <PrimaryButton to="/sell-your-gold" variant="gold" className="w-full">
              Sell Your Gold Now
            </PrimaryButton>
          </div>
        </nav>
      )}
    </header>
  );
};
