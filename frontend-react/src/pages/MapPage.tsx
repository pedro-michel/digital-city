import { useState, useMemo } from "react";
import { MapPin, Radio } from "lucide-react";
import { MapView } from "@/components/map/MapView";
import { BinMarker } from "@/components/map/BinMarker";
import { BinFilterBar } from "@/components/bins/BinFilterBar";
import { BinDetailPanel } from "@/components/bins/BinDetailPanel";
import { MOCK_BINS, getBinStatus, type Bin } from "@/data/mockBins";

export function MapPage() {
  const [selectedBin, setSelectedBin] = useState<Bin | null>(null);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    critical: true,
    warning: true,
    normal: true,
  });

  const filteredBins = useMemo(() => {
    return MOCK_BINS.filter((bin) => {
      const status = getBinStatus(bin.fill_level);
      if (!filters[status]) return false;
      if (search && !bin.name.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      return true;
    });
  }, [search, filters]);

  const toggleFilter = (filter: "critical" | "warning" | "normal") => {
    setFilters((prev) => ({ ...prev, [filter]: !prev[filter] }));
  };

  return (
    <div className="h-full flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold tracking-tight gradient-text">
              Mapa de Sensores
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/30 border border-border/50">
          <Radio className="h-3 w-3 text-primary animate-pulse" />
          <span className="text-xs font-mono text-muted-foreground">
            {filteredBins.length} de {MOCK_BINS.length} sensores
          </span>
        </div>
      </div>

      {/* Filters */}
      <BinFilterBar
        search={search}
        onSearchChange={setSearch}
        filters={filters}
        onFilterChange={toggleFilter}
      />

      {/* Map and Panel Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-4 min-h-0">
        <div
          className="lg:col-span-3 min-h-[400px] rounded-lg overflow-hidden border border-border/50 animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          <MapView>
            {filteredBins.map((bin) => (
              <BinMarker
                key={bin.id}
                bin={bin}
                onClick={setSelectedBin}
              />
            ))}
          </MapView>
        </div>
        <div
          className="lg:col-span-1 animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          <BinDetailPanel bin={selectedBin} />
        </div>
      </div>
    </div>
  );
}
