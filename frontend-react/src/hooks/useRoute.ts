import { useMemo } from "react";
import type { Bin } from "@/data/mockBins";
import { haversineDistance } from "@/lib/geo";

export interface RouteData {
  bins: Bin[];
  distances: number[];
  totalDistance: number;
  estimatedTime: number;
}

export function useRoute(allBins: Bin[], threshold = 70): RouteData {
  return useMemo(() => {
    const eligibleBins = allBins
      .filter((bin) => bin.fill_level >= threshold)
      .sort((a, b) => b.fill_level - a.fill_level);

    const distances: number[] = [];
    let totalDistance = 0;

    for (let i = 1; i < eligibleBins.length; i++) {
      const prev = eligibleBins[i - 1];
      const curr = eligibleBins[i];
      const dist = haversineDistance(
        prev.latitude,
        prev.longitude,
        curr.latitude,
        curr.longitude
      );
      distances.push(dist);
      totalDistance += dist;
    }

    if (eligibleBins.length > 0) {
      distances.unshift(0);
    }

    const timePerBin = 3;
    const speedKmH = 15;
    const travelTime = (totalDistance / speedKmH) * 60;
    const estimatedTime = Math.round(eligibleBins.length * timePerBin + travelTime);

    return {
      bins: eligibleBins,
      distances,
      totalDistance,
      estimatedTime,
    };
  }, [allBins, threshold]);
}
