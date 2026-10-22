import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  fetchAdminSession,
  logoutAdminRequest,
  type AdminUser,
  type PublicGoldRateData,
} from "../services/api";

interface AdminAuthContextValue {
  authenticated: boolean;
  loading: boolean;
  admin: AdminUser | null;
  csrfToken: string;
  currentGoldRate: PublicGoldRateData | null;
  refreshSession: () => Promise<void>;
  setLoggedInSession: (data: {
    admin: AdminUser;
    csrfToken: string;
    currentGoldRate?: PublicGoldRateData | null;
  }) => void;
  logout: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextValue>({
  authenticated: false,
  loading: true,
  admin: null,
  csrfToken: "",
  currentGoldRate: null,
  refreshSession: async () => {},
  setLoggedInSession: () => {},
  logout: async () => {},
});

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [csrfToken, setCsrfToken] = useState<string>("");
  const [currentGoldRate, setCurrentGoldRate] = useState<PublicGoldRateData | null>(
    null
  );

  const refreshSession = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetchAdminSession();
      if (res.authenticated && res.admin && res.csrfToken) {
        setAuthenticated(true);
        setAdmin(res.admin);
        setCsrfToken(res.csrfToken);
        setCurrentGoldRate(res.currentGoldRate ?? null);
      } else {
        setAuthenticated(false);
        setAdmin(null);
        setCsrfToken("");
        setCurrentGoldRate(null);
      }
    } catch {
      setAuthenticated(false);
      setAdmin(null);
      setCsrfToken("");
      setCurrentGoldRate(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshSession();
  }, [refreshSession]);

  const setLoggedInSession = useCallback(
    (data: {
      admin: AdminUser;
      csrfToken: string;
      currentGoldRate?: PublicGoldRateData | null;
    }) => {
      setAuthenticated(true);
      setAdmin(data.admin);
      setCsrfToken(data.csrfToken);
      if (data.currentGoldRate !== undefined) {
        setCurrentGoldRate(data.currentGoldRate);
      }
      setLoading(false);
    },
    []
  );

  const logout = useCallback(async () => {
    try {
      await logoutAdminRequest(csrfToken);
    } finally {
      setAuthenticated(false);
      setAdmin(null);
      setCsrfToken("");
      setCurrentGoldRate(null);
    }
  }, [csrfToken]);

  return (
    <AdminAuthContext.Provider
      value={{
        authenticated,
        loading,
        admin,
        csrfToken,
        currentGoldRate,
        refreshSession,
        setLoggedInSession,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export function useAdminAuth(): AdminAuthContextValue {
  return useContext(AdminAuthContext);
}
