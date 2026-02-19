import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color?: string;
  delay?: number;
}

export function StatCard({ title, value, icon: Icon, color, delay = 0 }: StatCardProps) {
  const glowClass = color === "#dc2626" ? "text-glow-critical" :
                    color === "#eab308" ? "text-glow-warning" :
                    color === "#16a34a" ? "text-glow-normal" : "";

  return (
    <Card
      className="animate-fade-in group"
      style={{ animationDelay: `${delay}s` }}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          {/* Icon container with glow */}
          <div className="relative">
            <div
              className="absolute inset-0 blur-xl rounded-full opacity-40 group-hover:opacity-60 transition-opacity duration-500"
              style={{ backgroundColor: color || "hsl(var(--primary))" }}
            />
            <div
              className={cn(
                "relative rounded-lg p-2.5 border transition-all duration-300",
                "group-hover:scale-110"
              )}
              style={{
                backgroundColor: `${color || "hsl(var(--primary))"}15`,
                borderColor: `${color || "hsl(var(--primary))"}40`
              }}
            >
              <Icon
                className="h-5 w-5"
                style={{ color: color || "hsl(var(--primary))" }}
              />
            </div>
          </div>

          {/* Value */}
          <div className="text-right">
            <p
              className={cn(
                "text-4xl font-bold font-mono tabular-nums tracking-tight",
                glowClass
              )}
              style={{ color: color || "hsl(var(--foreground))" }}
            >
              {value}
            </p>
          </div>
        </div>

        {/* Title */}
        <p className="mt-3 text-xs font-mono uppercase tracking-widest text-muted-foreground">
          {title}
        </p>

        {/* Bottom accent line */}
        <div
          className="mt-3 h-0.5 rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-300"
          style={{ backgroundColor: color || "hsl(var(--primary))" }}
        />
      </CardContent>
    </Card>
  );
}
