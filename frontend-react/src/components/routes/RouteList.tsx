import { ListOrdered, ArrowDown } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { Bin } from "@/data/mockBins";
import { getBinStatus, getStatusColor } from "@/data/mockBins";
import { formatDistance } from "@/lib/geo";
import { cn } from "@/lib/utils";

interface RouteListProps {
  bins: Bin[];
  distances: number[];
}

export function RouteList({ bins, distances }: RouteListProps) {
  return (
    <Card className="h-full overflow-hidden flex flex-col">
      <CardHeader className="pb-3 flex-shrink-0">
        <CardTitle className="flex items-center gap-2">
          <ListOrdered className="h-4 w-4 text-primary" />
          Sequência de Coleta
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto">
        {bins.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="h-12 w-12 rounded-full bg-muted/50 flex items-center justify-center mb-3">
              <ListOrdered className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">
              Nenhuma coleta programada
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            {bins.map((bin, index) => {
              const status = getBinStatus(bin.fill_level);
              const color = getStatusColor(status);
              const distance = distances[index] || 0;
              const isLast = index === bins.length - 1;

              return (
                <div
                  key={bin.id}
                  className="animate-slide-in"
                  style={{ animationDelay: `${0.5 + index * 0.05}s` }}
                >
                  <div className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/30 transition-colors group cursor-pointer">
                    {/* Number badge */}
                    <div className="relative flex-shrink-0">
                      <div
                        className={cn(
                          "flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold font-mono text-white",
                          "transition-transform group-hover:scale-110"
                        )}
                        style={{
                          backgroundColor: color,
                          boxShadow: `0 0 10px ${color}40`,
                        }}
                      >
                        {index + 1}
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                        {bin.name}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span
                          className="text-xs font-mono font-bold"
                          style={{ color }}
                        >
                          {bin.fill_level}%
                        </span>
                        {distance > 0 && (
                          <>
                            <span className="text-muted-foreground/50">•</span>
                            <span className="text-[10px] text-muted-foreground font-mono">
                              +{formatDistance(distance)}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Mini progress */}
                    <div className="hidden sm:block w-10 flex-shrink-0">
                      <div className="h-1 rounded-full bg-muted/50 overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${bin.fill_level}%`,
                            backgroundColor: color,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Connector line */}
                  {!isLast && (
                    <div className="flex items-center gap-3 pl-2.5">
                      <div className="w-7 flex justify-center">
                        <ArrowDown className="h-3 w-3 text-muted-foreground/30" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
