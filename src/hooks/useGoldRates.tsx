import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { fetchPublicGoldRates, type PublicGoldRateData } from "../services/api";

interface GoldRateContextValue {
  rateData: PublicGoldRateData | null;
  configured: boolean;
  loading: boolean;
  error: string | null;
  refreshRates: () => Promise<void>;
}

const GoldRateContext = createContext<GoldRateContextValue>({
  rateData: null,
  configured: false,
  loading: true,
  error: null,
  refreshRates: async () => {},
});

export const GoldRateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [rateData, setRateData] = useState<PublicGoldRateData | null>(null);
  const [configured, setConfigured] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const refreshRates = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetchPublicGoldRates();
      setConfigured(Boolean(res.configured && res.data));
      setRateData(res.data ?? null);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load published gold rates at the moment."
      );
      setConfigured(false);
      setRateData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshRates();
  }, [refreshRates]);

  return (
    <GoldRateContext.Provider
      value={{
        rateData,
        configured,
        loading,
        error,
        refreshRates,
      }}
    >
      {children}
    </GoldRateContext.Provider>
  );
};

export function useGoldRates(): GoldRateContextValue {
  return useContext(GoldRateContext);
}
