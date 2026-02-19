import { MapPin, Clock, Truck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatDistance } from "@/lib/geo";
import { cn } from "@/lib/utils";

interface RouteSummaryProps {
  totalDistance: number;
  estimatedTime: number;
  binCount: number;
}

export function RouteSummary({ totalDistance, estimatedTime, binCount }: RouteSummaryProps) {
  const stats = [
    {
      icon: MapPin,
      label: "Distância Total",
      value: formatDistance(totalDistance),
      color: "hsl(var(--primary))",
    },
    {
      icon: Clock,
      label: "Tempo Estimado",
      value: `~${estimatedTime} min`,
      color: "hsl(200 100% 50%)",
    },
    {
      icon: Truck,
      label: "Pontos de Coleta",
      value: binCount.toString(),
      color: "hsl(45 100% 50%)",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <Card
          key={stat.label}
          className="animate-fade-in group"
          style={{ animationDelay: `${0.1 + index * 0.1}s` }}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              {/* Icon with glow */}
              <div className="relative">
                <div
                  className="absolute inset-0 blur-lg rounded-full opacity-30 group-hover:opacity-50 transition-opacity"
                  style={{ backgroundColor: stat.color }}
                />
                <div
                  className={cn(
                    "relative rounded-lg p-2 border transition-all duration-300",
                    "group-hover:scale-110"
                  )}
                  style={{
                    backgroundColor: `${stat.color}15`,
                    borderColor: `${stat.color}30`,
                  }}
                >
                  <stat.icon
                    className="h-4 w-4"
                    style={{ color: stat.color }}
                  />
                </div>
              </div>

              {/* Text content */}
              <div className="flex-1 min-w-0">
                <p
                  className="text-xl font-bold font-mono tracking-tight"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </p>
                <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground truncate">
                  {stat.label}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
