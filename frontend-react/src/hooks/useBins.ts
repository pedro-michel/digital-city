import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { MOCK_BINS, type Bin } from "@/data/mockBins";

interface UseBinsResult {
  bins: Bin[];
  loading: boolean;
  error: Error | null;
  isMock: boolean;
}

export function useBins(): UseBinsResult {
  const [bins, setBins] = useState<Bin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isMock, setIsMock] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchBins() {
      try {
        const response = await api.get<Bin[]>("/bins");
        if (!cancelled) {
          setBins(response.data || []);
          setError(null);
          setIsMock(false);
        }
      } catch (err) {
        if (!cancelled) {
          console.warn("API unavailable, using mock data:", err);
          setBins(MOCK_BINS);
          setError(null);
          setIsMock(true);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchBins();

    return () => {
      cancelled = true;
    };
  }, []);

  return { bins, loading, error, isMock };
}

export type { Bin };
