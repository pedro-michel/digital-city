import { Polyline, CircleMarker, Tooltip } from "react-leaflet";
import type { Bin } from "@/data/mockBins";
import { getStatusColor, getBinStatus } from "@/data/mockBins";

interface RoutePolylineProps {
  bins: Bin[];
}

export function RoutePolyline({ bins }: RoutePolylineProps) {
  if (bins.length < 2) return null;

  const positions = bins.map((bin) => [bin.latitude, bin.longitude] as [number, number]);

  return (
    <>
      <Polyline
        positions={positions}
        pathOptions={{
          color: "#3b82f6",
          weight: 3,
          dashArray: "10, 10",
          opacity: 0.8,
        }}
      />
      {bins.map((bin, index) => (
        <CircleMarker
          key={bin.id}
          center={[bin.latitude, bin.longitude]}
          radius={14}
          pathOptions={{
            fillColor: getStatusColor(getBinStatus(bin.fill_level)),
            fillOpacity: 1,
            color: "#fff",
            weight: 2,
          }}
        >
          <Tooltip permanent direction="center" className="route-number-tooltip">
            <span className="font-bold text-white">{index + 1}</span>
          </Tooltip>
        </CircleMarker>
      ))}
    </>
  );
}
