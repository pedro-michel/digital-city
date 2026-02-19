import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface StatusChartProps {
  critical: number;
  warning: number;
  normal: number;
  total: number;
}

export function StatusChart({ critical, warning, normal, total }: StatusChartProps) {
  const getPercent = (value: number) => Math.round((value / total) * 100);

  const bars = [
    {
      label: "Normal",
      value: normal,
      percent: getPercent(normal),
      color: "hsl(160 100% 45%)",
      bgColor: "hsl(160 100% 45% / 0.15)",
    },
    {
      label: "Atenção",
      value: warning,
      percent: getPercent(warning),
      color: "hsl(45 100% 50%)",
      bgColor: "hsl(45 100% 50% / 0.15)",
    },
    {
      label: "Crítico",
      value: critical,
      percent: getPercent(critical),
      color: "hsl(0 90% 55%)",
      bgColor: "hsl(0 90% 55% / 0.15)",
    },
  ];

  return (
    <Card className="h-full animate-fade-in" style={{ animationDelay: "0.4s" }}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          Distribuição por Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {bars.map((bar, index) => (
          <div
            key={bar.label}
            className="space-y-2 animate-slide-in"
            style={{ animationDelay: `${0.5 + index * 0.1}s` }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-sm"
                  style={{ backgroundColor: bar.color }}
                />
                <span className="text-sm font-medium">{bar.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold font-mono" style={{ color: bar.color }}>
                  {bar.value}
                </span>
                <span className="text-xs font-mono text-muted-foreground">
                  ({bar.percent}%)
                </span>
              </div>
            </div>
            <div
              className="h-2.5 rounded-sm overflow-hidden"
              style={{ backgroundColor: bar.bgColor }}
            >
              <div
                className="h-full rounded-sm transition-all duration-1000 ease-out"
                style={{
                  width: `${bar.percent}%`,
                  backgroundColor: bar.color,
                  boxShadow: `0 0 10px ${bar.color}, 0 0 20px ${bar.color}40`,
                }}
              />
            </div>
          </div>
        ))}

        {/* Total indicator */}
        <div className="pt-3 mt-3 border-t border-border/50">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              Total de Sensores
            </span>
            <span className="text-2xl font-bold font-mono gradient-text">
              {total}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
