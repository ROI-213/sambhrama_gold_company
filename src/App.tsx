import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { FloatingWhatsAppButton } from "./components/ContactActions";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { SellYourGoldPage } from "./pages/SellYourGoldPage";
import { CertificatesPage } from "./pages/CertificatesPage";
import { TestimonialsPage } from "./pages/TestimonialsPage";
import { VenturesOverviewPage } from "./pages/VenturesOverviewPage";
import { RealEstateVenturePage } from "./pages/RealEstateVenturePage";
import { LoansVenturePage } from "./pages/LoansVenturePage";
import { GoldVenturePage } from "./pages/GoldVenturePage";
import { ContactPage } from "./pages/ContactPage";
import {
  PrivacyPolicyPage,
  TermsAndConditionsPage,
  NotFoundPage,
} from "./pages/LegalAndNotFoundPages";
import { AdminLoginPage } from "./admin/AdminLoginPage";
import { AdminDashboardPage } from "./admin/AdminDashboardPage";
import { AdminGoldRatesPage } from "./admin/AdminGoldRatesPage";
import { ProtectedAdminRoute } from "./admin/AdminLayout";
import { GoldRateProvider } from "./hooks/useGoldRates";
import { AdminAuthProvider } from "./admin/AdminAuthContext";

const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF7] text-[#7F1D1D] overflow-x-hidden">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-[#FFB800] focus:px-4 focus:py-2 focus:text-xs focus:font-bold focus:text-[#3D070A]"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsAppButton />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <GoldRateProvider>
      <AdminAuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/sell-your-gold" element={<SellYourGoldPage />} />
            <Route path="/certificates" element={<CertificatesPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/ventures" element={<VenturesOverviewPage />} />
            <Route path="/ventures/real-estate" element={<RealEstateVenturePage />} />
            <Route path="/ventures/loans" element={<LoansVenturePage />} />
            <Route path="/ventures/gold" element={<GoldVenturePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          {/* Administrator Routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <AdminDashboardPage />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/gold-rates"
            element={
              <ProtectedAdminRoute>
                <AdminGoldRatesPage />
              </ProtectedAdminRoute>
            }
          />
        </Routes>
      </AdminAuthProvider>
    </GoldRateProvider>
  );
};

export default App;
