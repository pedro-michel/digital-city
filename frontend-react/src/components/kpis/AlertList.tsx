import { useNavigate } from "react-router-dom";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Bin } from "@/data/mockBins";

interface AlertListProps {
  bins: Bin[];
}

export function AlertList({ bins }: AlertListProps) {
  const navigate = useNavigate();
  const criticalBins = bins
    .filter((b) => b.fill_level >= 90)
    .sort((a, b) => b.fill_level - a.fill_level);

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMin = Math.round(diffMs / 60000);
    if (diffMin < 60) return `${diffMin}min`;
    return `${Math.round(diffMin / 60)}h`;
  };

  return (
    <Card
      className="h-full animate-fade-in"
      style={{ animationDelay: "0.5s" }}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-400">
          <div className="relative">
            <AlertTriangle className="h-4 w-4" />
            <div className="absolute inset-0 animate-ping">
              <AlertTriangle className="h-4 w-4 opacity-50" />
            </div>
          </div>
          Alertas Críticos
          <span className="ml-auto px-2 py-0.5 rounded text-xs font-mono bg-red-500/20 text-red-400 border border-red-500/30">
            {criticalBins.length}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {criticalBins.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <span className="text-2xl">✓</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Nenhuma lixeira crítica
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {criticalBins.slice(0, 5).map((bin, index) => (
              <div
                key={bin.id}
                className="group flex items-center gap-3 p-2.5 rounded-lg bg-red-500/5 border border-red-500/20 hover:bg-red-500/10 hover:border-red-500/40 transition-all duration-300 cursor-pointer animate-slide-in"
                style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                onClick={() => navigate("/?filter=critical")}
              >
                {/* Pulsing indicator */}
                <div className="relative">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500 status-pulse-critical" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate group-hover:text-red-400 transition-colors">
                    {bin.name}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs font-mono font-bold text-red-400">
                      {bin.fill_level}%
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      • {formatTime(bin.last_updated)} atrás
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="hidden sm:block w-16">
                  <div className="h-1.5 rounded-full bg-red-500/20 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-red-500"
                      style={{
                        width: `${bin.fill_level}%`,
                        boxShadow: "0 0 8px hsl(0 90% 55%)",
                      }}
                    />
                  </div>
                </div>

                {/* Arrow */}
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-red-400 group-hover:translate-x-1 transition-all" />
              </div>
            ))}

            <Button
              variant="outline"
              size="sm"
              className="w-full mt-3 border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50"
              onClick={() => navigate("/?filter=critical")}
            >
              Ver todas no mapa
              <ArrowRight className="ml-2 h-3 w-3" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
