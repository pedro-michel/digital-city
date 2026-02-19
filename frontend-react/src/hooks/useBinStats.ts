import { useMemo } from "react";
import type { Bin } from "@/data/mockBins";

export interface BinStats {
  total: number;
  critical: number;
  warning: number;
  normal: number;
}

export function useBinStats(bins: Bin[]): BinStats {
  return useMemo(() => {
    const stats = {
      total: bins.length,
      critical: 0,
      warning: 0,
      normal: 0,
    };

    for (const bin of bins) {
      if (bin.fill_level >= 90) {
        stats.critical++;
      } else if (bin.fill_level >= 50) {
        stats.warning++;
      } else {
        stats.normal++;
      }
    }

    return stats;
  }, [bins]);
}
