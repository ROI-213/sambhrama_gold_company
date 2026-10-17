import React, { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Lock, Gem, AlertCircle, Loader2, ArrowLeft } from "lucide-react";
import { usePageMeta } from "../hooks/usePageMeta";
import { loginAdminRequest } from "../services/api";
import { useAdminAuth } from "./AdminAuthContext";
import { companyConfig } from "../config/companyConfig";

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Administrator email is required")
    .email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const AdminLoginPage: React.FC = () => {
  usePageMeta({
    title: "Administrator Login",
    description: "Secure administrator login for Sambhrama Gold Company.",
  });

  const { authenticated, loading, setLoggedInSession, refreshSession } = useAdminAuth();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  if (!loading && authenticated) {
    return <Navigate to="/admin" replace />;
  }

  const onSubmit = async (values: LoginFormValues) => {
    setLoginError(null);
    try {
      const res = await loginAdminRequest(values);
      setLoggedInSession({
        admin: res.admin,
        csrfToken: res.csrfToken,
      });
      await refreshSession();
      navigate("/admin", { replace: true });
    } catch (err) {
      setLoginError(
        err instanceof Error ? err.message : "Unable to authenticate administrator."
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF7] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="mx-auto h-14 w-14 rounded-xl bg-white shadow-sm border border-[#FFB800]/60 flex items-center justify-center shadow-gold-glow">
          <Gem className="h-7 w-7 text-[#B91C1C]" aria-hidden="true" />
        </div>
        <h1 className="mt-5 font-serif-luxury text-3xl font-bold text-[#7F1D1D]">
          Administrator Sign In
        </h1>
        <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[#B91C1C]">
          {companyConfig.companyName}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="rounded-xl border border-[#F59E0B]/50 bg-white shadow-sm py-8 px-6 shadow-2xl sm:px-10">
          {loginError && (
            <div
              role="alert"
              data-testid="admin-login-error"
              className="mb-6 flex items-start gap-2.5 rounded-lg border border-red-500/40 bg-red-950/30 p-3.5 text-xs text-red-200"
            >
              <AlertCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
            <div>
              <label
                htmlFor="admin-email"
                className="block text-xs font-semibold uppercase tracking-wider text-[#991B1B]"
              >
                Administrator Email
              </label>
              <input
                id="admin-email"
                type="email"
                autoComplete="email"
                placeholder="admin@sambhramagold.com"
                className="mt-1.5 w-full rounded-md border border-[#F59E0B]/50 bg-[#FFFDF7] px-4 py-3 text-sm text-[#7F1D1D] focus:border-[#FFB800] focus:outline-none"
                {...register("email")}
              />
              {errors.email && (
                <p role="alert" className="mt-1 text-xs text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="block text-xs font-semibold uppercase tracking-wider text-[#991B1B]"
              >
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter your administrator password"
                className="mt-1.5 w-full rounded-md border border-[#F59E0B]/50 bg-[#FFFDF7] px-4 py-3 text-sm text-[#7F1D1D] focus:border-[#FFB800] focus:outline-none"
                {...register("password")}
              />
              {errors.password && (
                <p role="alert" className="mt-1 text-xs text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-gold-gradient px-5 py-3.5 text-sm font-semibold text-[#3D070A] shadow-gold-glow hover:brightness-105 disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4" aria-hidden="true" />
                  <span>Sign In to Dashboard</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-[#F59E0B]/50 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs text-[#991B1B] hover:text-[#B91C1C]"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Return to Public Website</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
