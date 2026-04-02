"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "./auth-context";

interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useApi<T>(
  fetcher: ((token: string) => Promise<T>) | null,
  deps: unknown[] = []
): UseApiResult<T> {
  const { getToken, user } = useAuth();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!fetcher) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const token = await getToken();
      if (!token) {
        setError("Not authenticated");
        setLoading(false);
        return;
      }
      const result = await fetcher(token);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch data");
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getToken, user?.token, fetcher, ...deps]);

  useEffect(() => {
    if (user) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [fetchData, user]);

  return { data, loading, error, refetch: fetchData };
}
