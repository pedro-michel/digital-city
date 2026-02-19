import { RefreshCw, Navigation, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MapView } from "@/components/map/MapView";
import { RoutePolyline } from "@/components/map/RoutePolyline";
import { BinMarker } from "@/components/map/BinMarker";
import { RouteList } from "@/components/routes/RouteList";
import { RouteSummary } from "@/components/routes/RouteSummary";
import { useRoute } from "@/hooks/useRoute";
import { MOCK_BINS } from "@/data/mockBins";

export function RoutesPage() {
  const route = useRoute(MOCK_BINS, 70);

  const today = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const binsNotInRoute = MOCK_BINS.filter(
    (bin) => !route.bins.some((rb) => rb.id === bin.id)
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Navigation className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold tracking-tight gradient-text">
              Rota Otimizada
            </h2>
          </div>
          <p className="text-sm text-muted-foreground font-mono capitalize">
            {today}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30">
            <Zap className="h-3 w-3 text-primary" />
            <span className="text-xs font-mono text-primary">OTIMIZADO</span>
          </div>
          <Button variant="outline" size="sm" className="group">
            <RefreshCw className="mr-2 h-3 w-3 group-hover:rotate-180 transition-transform duration-500" />
            Recalcular
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <RouteSummary
        totalDistance={route.totalDistance}
        estimatedTime={route.estimatedTime}
        binCount={route.bins.length}
      />

      {/* Map and List Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3 min-h-[450px] rounded-lg overflow-hidden border border-border/50 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <MapView>
            <RoutePolyline bins={route.bins} />
            {binsNotInRoute.map((bin) => (
              <BinMarker key={bin.id} bin={bin} />
            ))}
          </MapView>
        </div>
        <div className="lg:col-span-1 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <RouteList bins={route.bins} distances={route.distances} />
        </div>
      </div>
    </div>
  );
}
