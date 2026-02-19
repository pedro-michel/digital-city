import { Trash2, Bell, User, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-cyber">
      <div className="flex h-16 items-center px-6">
        {/* Logo */}
        <div className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full group-hover:bg-primary/30 transition-all duration-500" />
            <div className="relative p-2 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30">
              <Trash2 className="h-5 w-5 text-primary" />
            </div>
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight gradient-text">
              SMART WASTE
            </h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-mono">
              Control System
            </p>
          </div>
        </div>

        {/* Center status indicator */}
        <div className="hidden md:flex items-center gap-2 mx-auto px-4 py-1.5 rounded-full bg-muted/30 border border-border/50">
          <Activity className="h-3 w-3 text-primary animate-pulse" />
          <span className="text-xs font-mono text-muted-foreground">
            SYSTEM ONLINE
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-primary status-pulse-normal" />
        </div>

        {/* Right actions */}
        <div className="ml-auto flex items-center gap-1">
          <Button variant="ghost" size="icon" className="relative group">
            <Bell className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-red-500 status-pulse-critical" />
          </Button>
          <Button variant="ghost" size="icon" className="group">
            <User className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </Button>
        </div>
      </div>
    </header>
  );
}
