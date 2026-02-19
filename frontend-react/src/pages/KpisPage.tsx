import { Trash2, AlertTriangle, AlertCircle, CheckCircle, Activity } from "lucide-react";
import { StatCard } from "@/components/kpis/StatCard";
import { StatusChart } from "@/components/kpis/StatusChart";
import { AlertList } from "@/components/kpis/AlertList";
import { useBinStats } from "@/hooks/useBinStats";
import { MOCK_BINS } from "@/data/mockBins";

export function KpisPage() {
  const stats = useBinStats(MOCK_BINS);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-in">
        <div>
          <h2 className="text-xl font-semibold tracking-tight gradient-text">
            Painel de Controle
          </h2>
          <p className="text-sm text-muted-foreground font-mono">
            Monitoramento em tempo real
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30">
          <Activity className="h-3 w-3 text-primary animate-pulse" />
          <span className="text-xs font-mono text-primary">LIVE</span>
        </div>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Lixeiras"
          value={stats.total}
          icon={Trash2}
          delay={0.1}
        />
        <StatCard
          title="Críticas"
          value={stats.critical}
          icon={AlertTriangle}
          color="#dc2626"
          delay={0.2}
        />
        <StatCard
          title="Atenção"
          value={stats.warning}
          icon={AlertCircle}
          color="#eab308"
          delay={0.3}
        />
        <StatCard
          title="Normais"
          value={stats.normal}
          icon={CheckCircle}
          color="#16a34a"
          delay={0.4}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <StatusChart
          critical={stats.critical}
          warning={stats.warning}
          normal={stats.normal}
          total={stats.total}
        />
        <AlertList bins={MOCK_BINS} />
      </div>
    </div>
  );
}
