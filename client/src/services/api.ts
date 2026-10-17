export interface PublicGoldRateData {
  id: string;
  rate22k: number;
  rate24k: number;
  rate22kFormatted: string;
  rate24kFormatted: string;
  currency: string;
  note: string | null;
  updatedAt: string;
  updatedAtIST: string;
  updatedByName: string | null;
}

export interface GoldRateApiResponse {
  success: boolean;
  configured: boolean;
  data: PublicGoldRateData | null;
  message?: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
}

export interface AdminSessionResponse {
  success: boolean;
  authenticated: boolean;
  admin?: AdminUser;
  csrfToken?: string;
  expiresAt?: string;
  currentGoldRate?: PublicGoldRateData | null;
  error?: string;
}

export interface EnquiryPayload {
  enquiryType: "QUICK" | "SELL_GOLD" | "REAL_ESTATE" | "LOANS" | "CONTACT";
  fullName: string;
  mobile: string;
  email?: string;
  city?: string;
  serviceRequired?: string;
  goldType?: string;
  approxWeightGrams?: number | string | null;
  propertyRequirement?: string;
  preferredLocation?: string;
  loanType?: string;
  loanRequirement?: string;
  subject?: string;
  message: string;
  websiteUrl?: string; // Honeypot field
}

export interface EnquirySubmissionResponse {
  success: boolean;
  message?: string;
  error?: string;
  data?: {
    id: string;
    enquiryType: string;
    createdAt: string;
  };
}

export interface AdminEnquiryItem {
  id: string;
  enquiryType: string;
  fullName: string;
  mobile: string;
  email: string | null;
  city: string | null;
  serviceRequired: string | null;
  goldType: string | null;
  approxWeightGrams: string | null;
  propertyRequirement: string | null;
  preferredLocation: string | null;
  loanType: string | null;
  loanRequirement: string | null;
  subject: string | null;
  message: string;
  createdAt: string;
}

const API_BASE = (import.meta.env?.VITE_API_BASE_URL as string)?.trim() || "/api";

export async function fetchPublicGoldRates(): Promise<GoldRateApiResponse> {
  const res = await fetch(`${API_BASE}/gold-rates`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Unable to fetch current gold rates.");
  }

  return res.json();
}

export async function submitCustomerEnquiry(
  payload: EnquiryPayload
): Promise<EnquirySubmissionResponse> {
  const res = await fetch(`${API_BASE}/enquiries`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const body = await res.json();
  if (!res.ok || !body.success) {
    throw new Error(body.error || "Failed to submit your enquiry. Please try again.");
  }

  return body;
}

export async function loginAdminRequest(credentials: {
  email: string;
  password: string;
}): Promise<{
  success: boolean;
  admin: AdminUser;
  csrfToken: string;
  expiresAt: string;
}> {
  const res = await fetch(`${API_BASE}/admin/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const body = await res.json();
  if (!res.ok || !body.success) {
    throw new Error(body.error || "Invalid administrator credentials.");
  }

  return body;
}

export async function fetchAdminSession(): Promise<AdminSessionResponse> {
  const res = await fetch(`${API_BASE}/admin/session`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (res.status === 401) {
    return { success: false, authenticated: false };
  }

  const body = await res.json();
  if (!res.ok || !body.success) {
    return { success: false, authenticated: false, error: body.error };
  }

  return body;
}

export async function logoutAdminRequest(csrfToken: string): Promise<void> {
  await fetch(`${API_BASE}/admin/logout`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": csrfToken,
    },
  });
}

export async function updateAdminGoldRates(
  payload: {
    rate22k: number;
    rate24k: number;
    note?: string | null;
  },
  csrfToken: string
): Promise<{
  success: boolean;
  message: string;
  data: PublicGoldRateData;
}> {
  const res = await fetch(`${API_BASE}/admin/gold-rates`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-CSRF-Token": csrfToken,
    },
    body: JSON.stringify(payload),
  });

  const body = await res.json();
  if (!res.ok || !body.success) {
    throw new Error(body.error || "Failed to update gold rates.");
  }

  return body;
}

export async function fetchAdminGoldRateHistory(): Promise<PublicGoldRateData[]> {
  const res = await fetch(`${API_BASE}/admin/gold-rates/history`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to load gold rate history.");
  }

  const body = await res.json();
  return body.data || [];
}

export async function fetchAdminEnquiries(): Promise<AdminEnquiryItem[]> {
  const res = await fetch(`${API_BASE}/admin/enquiries`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to load enquiries.");
  }

  const body = await res.json();
  return body.data || [];
}

export function formatInrPerGram(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
