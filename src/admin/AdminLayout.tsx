import React from "react";
import { Navigate, Link, NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Coins, LogOut, ExternalLink } from "lucide-react";
import { useAdminAuth } from "./AdminAuthContext";
import { LoadingState } from "../components/StatusStates";
import { companyConfig } from "../config/companyConfig";

export const ProtectedAdminRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { authenticated, loading } = useAdminAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFDF7] flex items-center justify-center">
        <LoadingState label="Verifying administrator session..." />
      </div>
    );
  }

  if (!authenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login", { replace: true });
  };

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `inline-flex items-center gap-2 rounded-md px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
      isActive
        ? "bg-gold-gradient text-[#3D070A]"
        : "text-[#422020] hover:bg-[#FEF3C7]/60 hover:text-[#B91C1C]"
    }`;

  return (
    <div className="min-h-screen bg-[#FFFDF7] text-[#7F1D1D] flex flex-col">
      <header className="border-b border-[#F59E0B]/45 bg-[#FFFBEB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Link to="/admin" className="flex items-center gap-2.5">
              <img
                src="/images/logo.jpg"
                alt={`${companyConfig.companyName} Logo`}
                className="h-10 w-10 rounded-lg object-contain bg-white border border-[#FFB800] p-0.5 shadow-sm"
              />
              <div>
                <span className="block font-serif-luxury text-base font-bold text-[#7F1D1D]">
                  {companyConfig.companyName}
                </span>
                <span className="block text-[10px] uppercase tracking-widest text-[#B91C1C]">
                  Administrator Portal
                </span>
              </div>
            </Link>

            <nav aria-label="Admin Navigation" className="hidden sm:flex items-center gap-2">
              <NavLink to="/admin" end className={navClass}>
                <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
                <span>Dashboard</span>
              </NavLink>
              <NavLink to="/admin/gold-rates" className={navClass}>
                <Coins className="h-4 w-4" aria-hidden="true" />
                <span>Gold Rate Management</span>
              </NavLink>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 rounded-md border border-[#F59E0B]/45 px-3 py-1.5 text-xs text-[#991B1B] hover:border-[#FFB800]"
            >
              <span>Public Site</span>
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            {admin && (
              <span className="hidden md:inline text-xs text-[#573030]">
                {admin.email}
              </span>
            )}
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-md border border-[#8B0000]/40 bg-[#8B0000] px-3.5 py-1.5 text-xs font-medium text-white hover:bg-[#6E080D] cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Mobile Admin Sub-nav */}
        <div className="sm:hidden border-t border-[#F59E0B]/50 px-4 py-2 flex items-center gap-2">
          <NavLink to="/admin" end className={navClass}>
            <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/admin/gold-rates" className={navClass}>
            <Coins className="h-4 w-4" aria-hidden="true" />
            <span>Gold Rates</span>
          </NavLink>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {children}
      </main>
    </div>
  );
};
