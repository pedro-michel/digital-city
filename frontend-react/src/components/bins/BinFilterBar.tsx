import { Search, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

interface BinFilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  filters: { critical: boolean; warning: boolean; normal: boolean };
  onFilterChange: (filter: "critical" | "warning" | "normal") => void;
}

export function BinFilterBar({
  search,
  onSearchChange,
  filters,
  onFilterChange,
}: BinFilterBarProps) {
  const filterButtons = [
    {
      key: "critical" as const,
      label: "Críticas",
      color: "hsl(0 90% 55%)",
      activeClass: "border-red-500/50 bg-red-500/10 text-red-400",
    },
    {
      key: "warning" as const,
      label: "Atenção",
      color: "hsl(45 100% 50%)",
      activeClass: "border-yellow-500/50 bg-yellow-500/10 text-yellow-400",
    },
    {
      key: "normal" as const,
      label: "Normais",
      color: "hsl(160 100% 45%)",
      activeClass: "border-primary/50 bg-primary/10 text-primary",
    },
  ];

  const activeCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="flex flex-wrap items-center gap-3 mb-4 p-3 rounded-lg bg-card/50 border border-border/50 animate-fade-in">
      {/* Filter label */}
      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground">
        <Filter className="h-3 w-3" />
        <span>Filtros</span>
        <span className="px-1.5 py-0.5 rounded bg-muted text-[10px]">
          {activeCount}/3
        </span>
      </div>

      {/* Divider */}
      <div className="h-4 w-px bg-border" />

      {/* Filter buttons */}
      <div className="flex items-center gap-2">
        {filterButtons.map((btn) => (
          <button
            key={btn.key}
            onClick={() => onFilterChange(btn.key)}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-mono uppercase tracking-wide",
              "border transition-all duration-300",
              filters[btn.key]
                ? btn.activeClass
                : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
          >
            <span
              className={cn(
                "h-2 w-2 rounded-full transition-all duration-300",
                filters[btn.key] ? "scale-100" : "scale-75 opacity-50"
              )}
              style={{ backgroundColor: btn.color }}
            />
            {btn.label}
          </button>
        ))}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Search input */}
      <div className="relative w-full sm:w-auto sm:min-w-[220px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar sensor..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className={cn(
            "w-full pl-9 pr-4 py-2 text-sm font-mono",
            "bg-background/50 border border-border rounded-md",
            "placeholder:text-muted-foreground/50",
            "focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20",
            "transition-all duration-300"
          )}
        />
      </div>
    </div>
  );
}
