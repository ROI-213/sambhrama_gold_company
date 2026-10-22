import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  CheckCircle2,
  AlertCircle,
  Save,
  Clock,
  Loader2,
  History,
} from "lucide-react";
import { usePageMeta } from "../hooks/usePageMeta";
import { useAdminAuth } from "./AdminAuthContext";
import { AdminLayout } from "./AdminLayout";
import { useGoldRates } from "../hooks/useGoldRates";
import {
  updateAdminGoldRates,
  fetchAdminGoldRateHistory,
  formatInrPerGram,
  type PublicGoldRateData,
} from "../services/api";

const rateManagementSchema = z.object({
  rate22k: z
    .string()
    .trim()
    .min(1, "22K gold rate is required")
    .refine((val) => {
      const n = Number(val);
      return Number.isFinite(n) && n > 0 && n <= 1000000;
    }, "22K rate must be a positive INR amount per gram"),
  rate24k: z
    .string()
    .trim()
    .min(1, "24K gold rate is required")
    .refine((val) => {
      const n = Number(val);
      return Number.isFinite(n) && n > 0 && n <= 1000000;
    }, "24K rate must be a positive INR amount per gram"),
  note: z.string().trim().max(300, "Note must be 300 characters or fewer").optional(),
});

type RateManagementValues = z.infer<typeof rateManagementSchema>;

export const AdminGoldRatesPage: React.FC = () => {
  usePageMeta({
    title: "Gold Rate Management — Admin",
    description:
      "Manual 22K and 24K gold rate management for Sambhrama Gold Company.",
  });

  const { csrfToken, currentGoldRate, refreshSession } = useAdminAuth();
  const { refreshRates } = useGoldRates();
  const [history, setHistory] = useState<PublicGoldRateData[]>([]);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RateManagementValues>({
    resolver: zodResolver(rateManagementSchema),
    defaultValues: {
      rate22k: currentGoldRate ? String(currentGoldRate.rate22k) : "",
      rate24k: currentGoldRate ? String(currentGoldRate.rate24k) : "",
      note: currentGoldRate?.note || "",
    },
  });

  useEffect(() => {
    if (currentGoldRate) {
      reset({
        rate22k: String(currentGoldRate.rate22k),
        rate24k: String(currentGoldRate.rate24k),
        note: currentGoldRate.note || "",
      });
    }
  }, [currentGoldRate, reset]);

  const loadHistory = async () => {
    try {
      const list = await fetchAdminGoldRateHistory();
      setHistory(list);
    } catch {
      // Ignore history load errors
    }
  };

  useEffect(() => {
    void loadHistory();
  }, []);

  const onSubmit = async (values: RateManagementValues) => {
    setSaveSuccess(null);
    setSaveError(null);

    try {
      const res = await updateAdminGoldRates(
        {
          rate22k: Number(values.rate22k),
          rate24k: Number(values.rate24k),
          note: values.note || null,
        },
        csrfToken
      );

      setSaveSuccess(
        `${res.message} Published at ${res.data.updatedAtIST} (22K: ${formatInrPerGram(
          res.data.rate22k
        )}/g, 24K: ${formatInrPerGram(res.data.rate24k)}/g).`
      );

      // Revalidate both admin session state and global public gold rate context immediately
      await Promise.all([refreshSession(), refreshRates(), loadHistory()]);
    } catch (err) {
      setSaveError(
        err instanceof Error ? err.message : "Failed to save gold rates."
      );
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B91C1C]">
            Manual Rate Publishing
          </span>
          <h1 className="mt-1 font-serif-luxury text-3xl font-bold text-[#7F1D1D]">
            Gold Rate Management (INR / Gram)
          </h1>
          <p className="mt-2 text-sm text-[#4A2525]">
            Enter positive INR-per-gram rates for 22K and 24K gold. Saved rates are
            persisted in the database and immediately reflected on the public header, Home
            page, Sell Your Gold page, and Gold Venture page.
          </p>
        </div>

        {/* Current Live Rate Banner */}
        <div className="rounded-xl border border-[#F59E0B]/50 bg-white shadow-sm p-6">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#991B1B]">
              Currently Active Public Rates
            </h2>
            {currentGoldRate && (
              <span className="inline-flex items-center gap-1.5 text-xs text-[#B91C1C]">
                <Clock className="h-3.5 w-3.5" />
                <span>Updated: {currentGoldRate.updatedAtIST}</span>
              </span>
            )}
          </div>

          {currentGoldRate ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-lg border border-[#F59E0B]/40 bg-[#FFFDF7] p-4">
                <span className="text-xs text-[#573030]">Active 22K Rate:</span>
                <p
                  className="text-2xl font-serif-luxury font-bold text-[#7F1D1D]"
                  data-testid="active-rate-22k"
                >
                  {formatInrPerGram(currentGoldRate.rate22k)} / gram
                </p>
              </div>
              <div className="rounded-lg border border-[#FFB800]/35 bg-[#FFFDF7] p-4">
                <span className="text-xs text-[#573030]">Active 24K Rate:</span>
                <p
                  className="text-2xl font-serif-luxury font-bold text-[#B91C1C]"
                  data-testid="active-rate-24k"
                >
                  {formatInrPerGram(currentGoldRate.rate24k)} / gram
                </p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-[#991B1B]">
              No rates are currently configured. Enter new rates below to publish them.
            </p>
          )}
        </div>

        {/* Rate Update Form */}
        <div className="rounded-xl border border-[#F59E0B]/50 bg-white shadow-sm p-6 sm:p-8">
          <h2 className="font-serif-luxury text-2xl font-semibold text-[#7F1D1D] mb-6">
            Publish New Gold Rates
          </h2>

          {saveSuccess && (
            <div
              role="status"
              aria-live="polite"
              data-testid="gold-rate-save-success"
              className="mb-6 flex items-start gap-3 rounded-lg border border-emerald-500/60 bg-emerald-50 p-4 text-sm text-emerald-900"
            >
              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
              <span>{saveSuccess}</span>
            </div>
          )}

          {saveError && (
            <div
              role="alert"
              data-testid="gold-rate-save-error"
              className="mb-6 flex items-start gap-3 rounded-lg border border-red-500/60 bg-red-50 p-4 text-sm text-red-900"
            >
              <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
              <span>{saveError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="input-rate22k"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#991B1B]"
                >
                  22K Gold Rate (INR per gram) *
                </label>
                <input
                  id="input-rate22k"
                  type="number"
                  step="0.01"
                  min="1"
                  placeholder="e.g., 6850.00"
                  className="mt-1.5 w-full rounded-md border border-[#F59E0B]/50 bg-[#FFFDF7] px-4 py-3 text-base text-[#7F1D1D] focus:border-[#FFB800] focus:outline-none"
                  {...register("rate22k")}
                />
                {errors.rate22k && (
                  <p role="alert" className="mt-1.5 text-xs font-medium text-red-600">
                    {errors.rate22k.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="input-rate24k"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#B91C1C]"
                >
                  24K Gold Rate (INR per gram) *
                </label>
                <input
                  id="input-rate24k"
                  type="number"
                  step="0.01"
                  min="1"
                  placeholder="e.g., 7470.00"
                  className="mt-1.5 w-full rounded-md border border-[#F59E0B]/50 bg-[#FFFDF7] px-4 py-3 text-base text-[#7F1D1D] focus:border-[#FFB800] focus:outline-none"
                  {...register("rate24k")}
                />
                {errors.rate24k && (
                  <p role="alert" className="mt-1.5 text-xs font-medium text-red-600">
                    {errors.rate24k.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="input-rate-note"
                className="block text-xs font-semibold uppercase tracking-wider text-[#991B1B]"
              >
                Optional Rate Note / Policy Remark
              </label>
              <input
                id="input-rate-note"
                type="text"
                placeholder="Optional note displayed alongside rate disclaimer"
                className="mt-1.5 w-full rounded-md border border-[#F59E0B]/50 bg-[#FFFDF7] px-4 py-3 text-sm text-[#7F1D1D] focus:border-[#FFB800] focus:outline-none"
                {...register("note")}
              />
              {errors.note && (
                <p role="alert" className="mt-1.5 text-xs font-medium text-red-600">
                  {errors.note.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-gold-gradient px-7 py-3.5 text-sm font-semibold text-[#3D070A] shadow-gold-glow hover:brightness-105 disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  <span>Saving &amp; Publishing...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" aria-hidden="true" />
                  <span>Save &amp; Publish Gold Rates</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Audit History Table */}
        {history.length > 0 && (
          <div className="rounded-xl border border-[#F59E0B]/50 bg-white shadow-sm p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-4">
              <History className="h-5 w-5 text-[#B91C1C]" aria-hidden="true" />
              <h2 className="font-serif-luxury text-xl font-semibold text-[#7F1D1D]">
                Recent Rate Update History (Asia/Kolkata IST)
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-[#F59E0B]/40 text-[#991B1B] uppercase text-xs">
                    <th className="py-3 pr-4">Updated (IST)</th>
                    <th className="py-3 px-4">22K Rate (INR/g)</th>
                    <th className="py-3 px-4">24K Rate (INR/g)</th>
                    <th className="py-3 px-4">Updated By</th>
                    <th className="py-3 pl-4">Note</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F59E0B]/15 text-[#3B1818]">
                  {history.map((item) => (
                    <tr key={item.id}>
                      <td className="py-3 pr-4">{item.updatedAtIST}</td>
                      <td className="py-3 px-4 font-semibold">
                        {formatInrPerGram(item.rate22k)}
                      </td>
                      <td className="py-3 px-4 font-semibold text-[#B91C1C]">
                        {formatInrPerGram(item.rate24k)}
                      </td>
                      <td className="py-3 px-4">
                        {item.updatedByName || "Administrator"}
                      </td>
                      <td className="py-3 pl-4 text-xs text-[#633838]">
                        {item.note || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
