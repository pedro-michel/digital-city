import { NavLink } from "react-router-dom";
import { Map, BarChart3, Route } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { to: "/", label: "Mapa", icon: Map, shortcut: "1" },
  { to: "/kpis", label: "KPIs", icon: BarChart3, shortcut: "2" },
  { to: "/rotas", label: "Rotas", icon: Route, shortcut: "3" },
];

export function TabNav() {
  return (
    <nav className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="flex gap-1 px-6">
        {tabs.map((tab, index) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            className={({ isActive }) =>
              cn(
                "relative flex items-center gap-2 px-5 py-3.5 text-sm font-medium transition-all duration-300 group",
                "animate-fade-in",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )
            }
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {({ isActive }) => (
              <>
                {/* Active indicator - glow bar */}
                <div
                  className={cn(
                    "absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-300",
                    isActive
                      ? "bg-primary shadow-[0_0_10px_hsl(var(--primary)),0_0_20px_hsl(var(--primary)/0.5)]"
                      : "bg-transparent group-hover:bg-muted-foreground/30"
                  )}
                />

                {/* Icon with glow effect when active */}
                <div className={cn(
                  "relative transition-transform duration-300 group-hover:scale-110",
                  isActive && "text-glow"
                )}>
                  <tab.icon className="h-4 w-4" />
                </div>

                {/* Label */}
                <span className="font-mono text-xs uppercase tracking-wider">
                  {tab.label}
                </span>

                {/* Keyboard shortcut hint */}
                <kbd className={cn(
                  "hidden lg:inline-flex h-5 min-w-5 items-center justify-center rounded px-1.5",
                  "text-[10px] font-mono border transition-colors duration-300",
                  isActive
                    ? "border-primary/30 bg-primary/10 text-primary"
                    : "border-border bg-muted/50 text-muted-foreground group-hover:border-muted-foreground/50"
                )}>
                  {tab.shortcut}
                </kbd>
              </>
            )}
          </NavLink>
        ))}

        {/* Decorative line */}
        <div className="ml-auto hidden lg:flex items-center gap-3 pr-2">
          <div className="h-4 w-px bg-border" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/50">
            PUC Campinas
          </span>
        </div>
      </div>
    </nav>
  );
}
