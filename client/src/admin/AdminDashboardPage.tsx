import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Coins, Clock, ArrowRight, Inbox, ShieldCheck } from "lucide-react";
import { usePageMeta } from "../hooks/usePageMeta";
import { useAdminAuth } from "./AdminAuthContext";
import { AdminLayout } from "./AdminLayout";
import {
  fetchAdminEnquiries,
  formatInrPerGram,
  type AdminEnquiryItem,
} from "../services/api";

export const AdminDashboardPage: React.FC = () => {
  usePageMeta({
    title: "Administrator Dashboard",
    description: "Sambhrama Gold Company Administrator Dashboard.",
  });

  const { admin, currentGoldRate } = useAdminAuth();
  const [enquiries, setEnquiries] = useState<AdminEnquiryItem[]>([]);
  const [loadingEnquiries, setLoadingEnquiries] = useState<boolean>(true);

  useEffect(() => {
    fetchAdminEnquiries()
      .then((list) => setEnquiries(list))
      .catch(() => setEnquiries([]))
      .finally(() => setLoadingEnquiries(false));
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Welcome Banner */}
        <div className="rounded-xl border border-[#F59E0B]/50 bg-white shadow-sm p-6 sm:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B91C1C]">
              Authenticated Session
            </span>
            <h1 className="mt-1 font-serif-luxury text-2xl sm:text-3xl font-bold text-[#7F1D1D]">
              Welcome, {admin?.name || "Administrator"}
            </h1>
            <p className="mt-1 text-sm text-[#4A2525]">
              Monitor published 22K and 24K gold rates and review customer enquiries from
              across the website.
            </p>
          </div>
          <Link
            to="/admin/gold-rates"
            className="inline-flex items-center gap-2 rounded-md bg-gold-gradient px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#3D070A]"
          >
            <Coins className="h-4 w-4" aria-hidden="true" />
            <span>Update Gold Rates</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Current Gold Rates Summary */}
        <div className="rounded-xl border border-[#F59E0B]/50 bg-white shadow-sm p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-[#F59E0B]/50 pb-4">
            <h2 className="font-serif-luxury text-xl font-semibold text-[#7F1D1D]">
              Currently Published Public Gold Rates
            </h2>
            {currentGoldRate && (
              <span className="inline-flex items-center gap-1.5 text-xs text-[#991B1B]">
                <Clock className="h-3.5 w-3.5 text-[#B91C1C]" />
                <span>Last Updated: {currentGoldRate.updatedAtIST}</span>
              </span>
            )}
          </div>

          {currentGoldRate ? (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="rounded-lg border border-[#F59E0B]/45 bg-[#FFFDF7] p-5">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#991B1B]">
                  22K Gold Rate (Per Gram)
                </span>
                <p
                  className="mt-2 font-serif-luxury text-3xl font-bold text-[#7F1D1D]"
                  data-testid="admin-dashboard-22k"
                >
                  {formatInrPerGram(currentGoldRate.rate22k)} / g
                </p>
              </div>
              <div className="rounded-lg border border-[#FFB800]/40 bg-[#FFFDF7] p-5">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#B91C1C]">
                  24K Gold Rate (Per Gram)
                </span>
                <p
                  className="mt-2 font-serif-luxury text-3xl font-bold text-gold-gradient"
                  data-testid="admin-dashboard-24k"
                >
                  {formatInrPerGram(currentGoldRate.rate24k)} / g
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-6 rounded-lg border border-[#F59E0B]/40 bg-[#FFFDF7] p-6 text-center">
              <p className="text-sm text-[#991B1B]">
                No gold rates have been published yet. Public pages currently display the
                honest &ldquo;Rate not updated&rdquo; notice.
              </p>
              <Link
                to="/admin/gold-rates"
                className="mt-4 inline-flex items-center gap-2 rounded-md bg-gold-gradient px-4 py-2 text-xs font-semibold text-[#3D070A]"
              >
                Publish Initial Gold Rates
              </Link>
            </div>
          )}
        </div>

        {/* Recent Customer Enquiries */}
        <div className="rounded-xl border border-[#F59E0B]/50 bg-white shadow-sm p-6 sm:p-8">
          <div className="flex items-center justify-between border-b border-[#F59E0B]/50 pb-4 mb-6">
            <div className="flex items-center gap-2.5">
              <Inbox className="h-5 w-5 text-[#B91C1C]" aria-hidden="true" />
              <h2 className="font-serif-luxury text-xl font-semibold text-[#7F1D1D]">
                Recent Website Enquiries ({enquiries.length})
              </h2>
            </div>
            <span className="inline-flex items-center gap-1 text-xs text-[#F59E0B]">
              <ShieldCheck className="h-4 w-4" />
              <span>Persisted in Database</span>
            </span>
          </div>

          {loadingEnquiries ? (
            <p className="text-sm text-[#573030] py-6 text-center">
              Loading customer enquiries...
            </p>
          ) : enquiries.length === 0 ? (
            <p className="text-sm text-[#573030] py-6 text-center">
              No customer enquiries have been submitted yet.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-[#F59E0B]/40 text-[#991B1B] uppercase text-xs">
                    <th className="py-3 pr-4">Type</th>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Mobile</th>
                    <th className="py-3 px-4">Details</th>
                    <th className="py-3 pl-4">Message</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F59E0B]/15 text-[#3B1818]">
                  {enquiries.slice(0, 15).map((enq) => (
                    <tr key={enq.id}>
                      <td className="py-3 pr-4 font-semibold text-[#B91C1C]">
                        {enq.enquiryType}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-medium">{enq.fullName}</div>
                        {enq.city && (
                          <div className="text-xs text-[#6E4242]">{enq.city}</div>
                        )}
                      </td>
                      <td className="py-3 px-4">{enq.mobile}</td>
                      <td className="py-3 px-4 text-xs">
                        {enq.serviceRequired && <div>Service: {enq.serviceRequired}</div>}
                        {enq.goldType && <div>Gold: {enq.goldType}</div>}
                        {enq.approxWeightGrams && (
                          <div>Weight: {enq.approxWeightGrams}g</div>
                        )}
                        {enq.propertyRequirement && (
                          <div>Property: {enq.propertyRequirement}</div>
                        )}
                        {enq.loanType && <div>Loan: {enq.loanType}</div>}
                        {enq.subject && <div>Subject: {enq.subject}</div>}
                      </td>
                      <td className="py-3 pl-4 max-w-xs truncate" title={enq.message}>
                        {enq.message}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};
