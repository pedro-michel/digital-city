import { MapPin, Gauge, Clock, ExternalLink, Wifi } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Bin } from "@/data/mockBins";
import { getBinStatus, getStatusColor } from "@/data/mockBins";
import { cn } from "@/lib/utils";

interface BinDetailPanelProps {
  bin: Bin | null;
}

export function BinDetailPanel({ bin }: BinDetailPanelProps) {
  if (!bin) {
    return (
      <Card className="h-full">
        <CardContent className="flex h-full min-h-[300px] flex-col items-center justify-center p-6 text-center">
          <div className="relative mb-4">
            <div className="h-16 w-16 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
              <MapPin className="h-6 w-6 text-muted-foreground/50" />
            </div>
          </div>
          <p className="text-sm font-medium text-muted-foreground mb-1">
            Nenhum sensor selecionado
          </p>
          <p className="text-xs text-muted-foreground/60">
            Clique em um marcador no mapa
          </p>
        </CardContent>
      </Card>
    );
  }

  const status = getBinStatus(bin.fill_level);
  const color = getStatusColor(status);
  const statusLabel = status === "critical" ? "CRÍTICO" : status === "warning" ? "ATENÇÃO" : "NORMAL";
  const glowClass = status === "critical" ? "text-glow-critical" :
                    status === "warning" ? "text-glow-warning" : "text-glow-normal";

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMin = Math.round(diffMs / 60000);
    if (diffMin < 60) return `${diffMin} min atrás`;
    return `${Math.round(diffMin / 60)}h atrás`;
  };

  const googleMapsUrl = `https://www.google.com/maps?q=${bin.latitude},${bin.longitude}`;

  return (
    <Card className="h-full animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {/* Pulsing status indicator */}
            <div className="relative">
              <div
                className={cn(
                  "h-3 w-3 rounded-full",
                  status === "critical" && "status-pulse-critical",
                  status === "warning" && "status-pulse-warning",
                  status === "normal" && "status-pulse-normal"
                )}
                style={{ backgroundColor: color }}
              />
            </div>
            <div>
              <CardTitle className="text-sm">{bin.name}</CardTitle>
              <span
                className="text-[10px] font-mono font-bold tracking-widest"
                style={{ color }}
              >
                {statusLabel}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-primary">
            <Wifi className="h-3 w-3" />
            <span className="text-[10px] font-mono">ONLINE</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Fill Level Gauge */}
        <div className="p-4 rounded-lg bg-background/50 border border-border/50">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              Nível de Preenchimento
            </span>
            <span
              className={cn("text-2xl font-bold font-mono", glowClass)}
              style={{ color }}
            >
              {bin.fill_level}%
            </span>
          </div>
          <div className="h-3 rounded-full bg-muted/50 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${bin.fill_level}%`,
                backgroundColor: color,
                boxShadow: `0 0 15px ${color}, 0 0 30px ${color}50`,
              }}
            />
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-background/50 border border-border/50">
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="h-3 w-3 text-primary" />
              <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                Localização
              </span>
            </div>
            <p className="text-sm font-medium truncate">{bin.location}</p>
          </div>

          <div className="p-3 rounded-lg bg-background/50 border border-border/50">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="h-3 w-3 text-primary" />
              <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                Atualização
              </span>
            </div>
            <p className="text-sm font-medium">{formatTime(bin.last_updated)}</p>
          </div>
        </div>

        {/* Coordinates */}
        <div className="p-3 rounded-lg bg-background/50 border border-border/50">
          <div className="flex items-center gap-2 mb-2">
            <Gauge className="h-3 w-3 text-primary" />
            <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
              Coordenadas GPS
            </span>
          </div>
          <p className="text-xs font-mono text-muted-foreground">
            {bin.latitude.toFixed(6)}, {bin.longitude.toFixed(6)}
          </p>
        </div>

        {/* Google Maps Button */}
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => window.open(googleMapsUrl, "_blank")}
        >
          <ExternalLink className="mr-2 h-3 w-3" />
          Abrir no Google Maps
        </Button>
      </CardContent>
    </Card>
  );
}
