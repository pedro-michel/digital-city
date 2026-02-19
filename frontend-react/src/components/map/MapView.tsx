import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface MapViewProps {
  children?: React.ReactNode;
  center?: [number, number];
  zoom?: number;
}

const PUC_CENTER: [number, number] = [-22.8300, -47.0535];

export function MapView({ children, center = PUC_CENTER, zoom = 17 }: MapViewProps) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className="h-full w-full rounded-lg"
      style={{ minHeight: "400px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
    </MapContainer>
  );
}
