import { CircleMarker, Popup } from "react-leaflet";
import type { Bin } from "@/data/mockBins";
import { getBinStatus, getStatusColor } from "@/data/mockBins";

interface BinMarkerProps {
  bin: Bin;
  onClick?: (bin: Bin) => void;
}

export function BinMarker({ bin, onClick }: BinMarkerProps) {
  const status = getBinStatus(bin.fill_level);
  const color = getStatusColor(status);

  return (
    <CircleMarker
      center={[bin.latitude, bin.longitude]}
      radius={10}
      pathOptions={{
        fillColor: color,
        fillOpacity: 0.9,
        color: "#fff",
        weight: 2,
      }}
      eventHandlers={{
        click: () => onClick?.(bin),
      }}
    >
      <Popup>
        <div className="text-sm">
          <p className="font-semibold">{bin.name}</p>
          <p>{bin.location}</p>
          <p className="font-medium" style={{ color }}>
            {bin.fill_level}%
          </p>
        </div>
      </Popup>
    </CircleMarker>
  );
}
