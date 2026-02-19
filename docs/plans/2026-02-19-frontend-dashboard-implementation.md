# Smart Waste Dashboard - Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a multi-page dashboard with map visualization, KPIs, and route planning for smart waste management at PUC Campinas campus.

**Architecture:** React SPA with React Router for navigation, Leaflet for maps, shadcn/ui + Tailwind for styling. Mock data with 18 bins distributed across campus. Dark theme.

**Tech Stack:** React 18, TypeScript, Vite, React Router 6, Leaflet, React-Leaflet, Tailwind CSS, shadcn/ui, Lucide Icons

---

## Task 1: Install Dependencies

**Files:**
- Modify: `frontend-react/package.json`

**Step 1: Install Tailwind CSS and PostCSS**

Run:
```bash
cd /Users/pedromichel/Dev/DigitalCity/frontend-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Expected: Creates `tailwind.config.js` and `postcss.config.js`

**Step 2: Install React Router, Leaflet, and UI dependencies**

Run:
```bash
npm install react-router-dom leaflet react-leaflet lucide-react clsx tailwind-merge class-variance-authority
npm install -D @types/leaflet
```

Expected: Packages added to package.json

---

## Task 2: Configure Tailwind CSS

**Files:**
- Modify: `frontend-react/tailwind.config.js`
- Modify: `frontend-react/src/index.css`

**Step 1: Update tailwind.config.js**

Replace content of `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        border: "hsl(var(--border))",
        ring: "hsl(var(--ring))",
        status: {
          critical: "#dc2626",
          warning: "#eab308",
          normal: "#16a34a",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
}
```

**Step 2: Update index.css with Tailwind directives and CSS variables**

Replace content of `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 222 47% 6%;
    --foreground: 210 40% 96%;
    --card: 222 47% 9%;
    --card-foreground: 210 40% 96%;
    --primary: 217 91% 60%;
    --primary-foreground: 210 40% 98%;
    --muted: 217 33% 17%;
    --muted-foreground: 215 20% 65%;
    --border: 217 33% 17%;
    --ring: 217 91% 60%;
    --radius: 0.5rem;
  }

  * {
    border-color: hsl(var(--border));
  }

  body {
    background-color: hsl(var(--background));
    color: hsl(var(--foreground));
    font-family: system-ui, -apple-system, sans-serif;
  }
}
```

**Step 3: Verify Tailwind is working**

Run:
```bash
npm run dev
```

Expected: App runs, dark background visible

---

## Task 3: Create Utility Functions

**Files:**
- Create: `frontend-react/src/lib/utils.ts`
- Create: `frontend-react/src/lib/geo.ts`

**Step 1: Create utils.ts (shadcn utility)**

Create `src/lib/utils.ts`:

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**Step 2: Create geo.ts (Haversine distance)**

Create `src/lib/geo.ts`:

```typescript
export function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}

export function formatDistance(km: number): string {
  if (km < 1) {
    return `${Math.round(km * 1000)}m`;
  }
  return `${km.toFixed(2)}km`;
}
```

---

## Task 4: Expand Mock Data

**Files:**
- Modify: `frontend-react/src/data/mockBins.ts`

**Step 1: Replace mockBins.ts with 18 bins**

Replace content of `src/data/mockBins.ts`:

```typescript
export interface Bin {
  id: number;
  name: string;
  location: string;
  latitude: number;
  longitude: number;
  fill_level: number;
  last_updated: string;
}

export const MOCK_BINS: Bin[] = [
  // Critical (4)
  { id: 1, name: "Refeitório Central", location: "Bloco H", latitude: -22.8301, longitude: -47.0525, fill_level: 95, last_updated: "2026-02-19T10:30:00" },
  { id: 2, name: "Biblioteca Entrada", location: "Bloco A", latitude: -22.8295, longitude: -47.0540, fill_level: 92, last_updated: "2026-02-19T10:25:00" },
  { id: 3, name: "Cantina", location: "Bloco C", latitude: -22.8310, longitude: -47.0530, fill_level: 91, last_updated: "2026-02-19T10:28:00" },
  { id: 4, name: "Auditório Principal", location: "Bloco B", latitude: -22.8288, longitude: -47.0518, fill_level: 90, last_updated: "2026-02-19T10:20:00" },
  // Warning (6)
  { id: 5, name: "Praça Central", location: "Área Externa", latitude: -22.8298, longitude: -47.0532, fill_level: 78, last_updated: "2026-02-19T10:15:00" },
  { id: 6, name: "Lab Informática", location: "Bloco D", latitude: -22.8305, longitude: -47.0545, fill_level: 72, last_updated: "2026-02-19T10:10:00" },
  { id: 7, name: "Secretaria", location: "Bloco A", latitude: -22.8292, longitude: -47.0535, fill_level: 65, last_updated: "2026-02-19T10:05:00" },
  { id: 8, name: "Ginásio", location: "Área Esportiva", latitude: -22.8320, longitude: -47.0510, fill_level: 58, last_updated: "2026-02-19T10:00:00" },
  { id: 9, name: "Lab Química", location: "Bloco E", latitude: -22.8312, longitude: -47.0550, fill_level: 55, last_updated: "2026-02-19T09:55:00" },
  { id: 10, name: "Coordenação", location: "Bloco F", latitude: -22.8285, longitude: -47.0528, fill_level: 52, last_updated: "2026-02-19T09:50:00" },
  // Normal (8)
  { id: 11, name: "Estacionamento Norte", location: "Área Externa", latitude: -22.8275, longitude: -47.0520, fill_level: 45, last_updated: "2026-02-19T09:45:00" },
  { id: 12, name: "Quadra Esportes", location: "Área Esportiva", latitude: -22.8325, longitude: -47.0515, fill_level: 38, last_updated: "2026-02-19T09:40:00" },
  { id: 13, name: "Jardim Entrada", location: "Entrada Principal", latitude: -22.8280, longitude: -47.0555, fill_level: 32, last_updated: "2026-02-19T09:35:00" },
  { id: 14, name: "Corredor Bloco G", location: "Bloco G", latitude: -22.8308, longitude: -47.0538, fill_level: 28, last_updated: "2026-02-19T09:30:00" },
  { id: 15, name: "Estacionamento Sul", location: "Área Externa", latitude: -22.8330, longitude: -47.0540, fill_level: 22, last_updated: "2026-02-19T09:25:00" },
  { id: 16, name: "Portaria", location: "Entrada Principal", latitude: -22.8278, longitude: -47.0560, fill_level: 15, last_updated: "2026-02-19T09:20:00" },
  { id: 17, name: "Área de Convivência", location: "Bloco H", latitude: -22.8303, longitude: -47.0522, fill_level: 12, last_updated: "2026-02-19T09:15:00" },
  { id: 18, name: "Depósito", location: "Área de Serviço", latitude: -22.8335, longitude: -47.0535, fill_level: 8, last_updated: "2026-02-19T09:10:00" },
];

export function getBinStatus(fillLevel: number): "critical" | "warning" | "normal" {
  if (fillLevel >= 90) return "critical";
  if (fillLevel >= 50) return "warning";
  return "normal";
}

export function getStatusColor(status: "critical" | "warning" | "normal"): string {
  const colors = {
    critical: "#dc2626",
    warning: "#eab308",
    normal: "#16a34a",
  };
  return colors[status];
}
```

---

## Task 5: Create shadcn/ui Base Components

**Files:**
- Create: `frontend-react/src/components/ui/card.tsx`
- Create: `frontend-react/src/components/ui/button.tsx`

**Step 1: Create card.tsx**

Create `src/components/ui/card.tsx`:

```tsx
import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
  )
);
CardTitle.displayName = "CardTitle";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

export { Card, CardHeader, CardTitle, CardContent };
```

**Step 2: Create button.tsx**

Create `src/components/ui/button.tsx`:

```tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline: "border border-border bg-transparent hover:bg-muted",
        ghost: "hover:bg-muted hover:text-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
```

**Step 3: Configure path alias for @/**

Modify `frontend-react/tsconfig.json` to add path alias:

Add under `compilerOptions`:
```json
"baseUrl": ".",
"paths": {
  "@/*": ["./src/*"]
}
```

Modify `frontend-react/vite.config.ts` to add resolve alias:

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path
      }
    }
  }
});
```

---

## Task 6: Create Layout Components

**Files:**
- Create: `frontend-react/src/components/layout/Header.tsx`
- Create: `frontend-react/src/components/layout/TabNav.tsx`
- Create: `frontend-react/src/components/layout/PageContainer.tsx`

**Step 1: Create Header.tsx**

Create `src/components/layout/Header.tsx`:

```tsx
import { Trash2, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="flex h-14 items-center px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Trash2 className="h-6 w-6 text-primary" />
          <span className="text-lg font-semibold">Smart Waste</span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
```

**Step 2: Create TabNav.tsx**

Create `src/components/layout/TabNav.tsx`:

```tsx
import { NavLink } from "react-router-dom";
import { Map, BarChart3, Route } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { to: "/", label: "Mapa", icon: Map },
  { to: "/kpis", label: "KPIs", icon: BarChart3 },
  { to: "/rotas", label: "Rotas", icon: Route },
];

export function TabNav() {
  return (
    <nav className="border-b bg-background">
      <div className="flex gap-1 px-4 md:px-6">
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors",
                isActive
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )
            }
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
```

**Step 3: Create PageContainer.tsx**

Create `src/components/layout/PageContainer.tsx`:

```tsx
import { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
}

export function PageContainer({ children }: PageContainerProps) {
  return (
    <main className="flex-1 overflow-auto p-4 md:p-6">
      {children}
    </main>
  );
}
```

---

## Task 7: Create KPI Components

**Files:**
- Create: `frontend-react/src/components/kpis/StatCard.tsx`
- Create: `frontend-react/src/components/kpis/StatusChart.tsx`
- Create: `frontend-react/src/components/kpis/AlertList.tsx`
- Create: `frontend-react/src/hooks/useBinStats.ts`

**Step 1: Create StatCard.tsx**

Create `src/components/kpis/StatCard.tsx`:

```tsx
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color?: string;
}

export function StatCard({ title, value, icon: Icon, color }: StatCardProps) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-6">
        <div
          className={cn("rounded-lg p-3", color ? "" : "bg-muted")}
          style={color ? { backgroundColor: `${color}20` } : undefined}
        >
          <Icon className="h-6 w-6" style={color ? { color } : undefined} />
        </div>
        <div>
          <p className="text-3xl font-bold tabular-nums">{value}</p>
          <p className="text-sm text-muted-foreground">{title}</p>
        </div>
      </CardContent>
    </Card>
  );
}
```

**Step 2: Create StatusChart.tsx**

Create `src/components/kpis/StatusChart.tsx`:

```tsx
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
    { label: "Normal", value: normal, percent: getPercent(normal), color: "#16a34a" },
    { label: "Atenção", value: warning, percent: getPercent(warning), color: "#eab308" },
    { label: "Crítico", value: critical, percent: getPercent(critical), color: "#dc2626" },
  ];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-base">Distribuição por Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {bars.map((bar) => (
          <div key={bar.label} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{bar.label}</span>
              <span className="text-muted-foreground">{bar.value} ({bar.percent}%)</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${bar.percent}%`, backgroundColor: bar.color }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
```

**Step 3: Create AlertList.tsx**

Create `src/components/kpis/AlertList.tsx`:

```tsx
import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
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
    if (diffMin < 60) return `há ${diffMin} min`;
    return `há ${Math.round(diffMin / 60)}h`;
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <AlertTriangle className="h-4 w-4 text-status-critical" />
          Alertas Críticos
        </CardTitle>
      </CardHeader>
      <CardContent>
        {criticalBins.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nenhuma lixeira crítica</p>
        ) : (
          <div className="space-y-3">
            {criticalBins.slice(0, 5).map((bin) => (
              <div key={bin.id} className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-status-critical" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{bin.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {bin.fill_level}% • {formatTime(bin.last_updated)}
                  </p>
                </div>
              </div>
            ))}
            <Button
              variant="ghost"
              size="sm"
              className="w-full mt-2"
              onClick={() => navigate("/?filter=critical")}
            >
              Ver todas no mapa
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
```

**Step 4: Create useBinStats.ts hook**

Create `src/hooks/useBinStats.ts`:

```typescript
import { useMemo } from "react";
import type { Bin } from "@/data/mockBins";

export interface BinStats {
  total: number;
  critical: number;
  warning: number;
  normal: number;
}

export function useBinStats(bins: Bin[]): BinStats {
  return useMemo(() => {
    const stats = {
      total: bins.length,
      critical: 0,
      warning: 0,
      normal: 0,
    };

    for (const bin of bins) {
      if (bin.fill_level >= 90) {
        stats.critical++;
      } else if (bin.fill_level >= 50) {
        stats.warning++;
      } else {
        stats.normal++;
      }
    }

    return stats;
  }, [bins]);
}
```

---

## Task 8: Create Map Components

**Files:**
- Create: `frontend-react/src/components/map/MapView.tsx`
- Create: `frontend-react/src/components/map/BinMarker.tsx`
- Create: `frontend-react/src/components/bins/BinDetailPanel.tsx`
- Create: `frontend-react/src/components/bins/BinFilterBar.tsx`

**Step 1: Create MapView.tsx**

Create `src/components/map/MapView.tsx`:

```tsx
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface MapViewProps {
  children?: React.ReactNode;
  center?: [number, number];
  zoom?: number;
}

const PUC_CENTER: [number, number] = [-22.8300, -47.0535];

export function MapView({ children, center = PUC_CENTER, zoom = 17 }: MapViewProps) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className="h-full w-full rounded-lg"
      style={{ minHeight: "400px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
    </MapContainer>
  );
}
```

**Step 2: Create BinMarker.tsx**

Create `src/components/map/BinMarker.tsx`:

```tsx
import { CircleMarker, Popup } from "react-leaflet";
import type { Bin } from "@/data/mockBins";
import { getBinStatus, getStatusColor } from "@/data/mockBins";

interface BinMarkerProps {
  bin: Bin;
  onClick?: (bin: Bin) => void;
}

export function BinMarker({ bin, onClick }: BinMarkerProps) {
  const status = getBinStatus(bin.fill_level);
  const color = getStatusColor(status);

  return (
    <CircleMarker
      center={[bin.latitude, bin.longitude]}
      radius={10}
      pathOptions={{
        fillColor: color,
        fillOpacity: 0.9,
        color: "#fff",
        weight: 2,
      }}
      eventHandlers={{
        click: () => onClick?.(bin),
      }}
    >
      <Popup>
        <div className="text-sm">
          <p className="font-semibold">{bin.name}</p>
          <p>{bin.location}</p>
          <p className="font-medium" style={{ color }}>
            {bin.fill_level}%
          </p>
        </div>
      </Popup>
    </CircleMarker>
  );
}
```

**Step 3: Create BinDetailPanel.tsx**

Create `src/components/bins/BinDetailPanel.tsx`:

```tsx
import { MapPin, Percent, Clock, ExternalLink } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Bin } from "@/data/mockBins";
import { getBinStatus, getStatusColor } from "@/data/mockBins";

interface BinDetailPanelProps {
  bin: Bin | null;
}

export function BinDetailPanel({ bin }: BinDetailPanelProps) {
  if (!bin) {
    return (
      <Card className="h-full">
        <CardContent className="flex h-full items-center justify-center p-6">
          <p className="text-sm text-muted-foreground">
            Selecione uma lixeira no mapa
          </p>
        </CardContent>
      </Card>
    );
  }

  const status = getBinStatus(bin.fill_level);
  const color = getStatusColor(status);

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMin = Math.round(diffMs / 60000);
    if (diffMin < 60) return `há ${diffMin} min`;
    return `há ${Math.round(diffMin / 60)}h`;
  };

  const googleMapsUrl = `https://www.google.com/maps?q=${bin.latitude},${bin.longitude}`;

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: color }}
          />
          <CardTitle className="text-base">{bin.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span>{bin.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Percent className="h-4 w-4 text-muted-foreground" />
          <span>
            Nível:{" "}
            <strong style={{ color }}>{bin.fill_level}%</strong>
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span>Atualizado {formatTime(bin.last_updated)}</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => window.open(googleMapsUrl, "_blank")}
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          Ver no Google Maps
        </Button>
      </CardContent>
    </Card>
  );
}
```

**Step 4: Create BinFilterBar.tsx**

Create `src/components/bins/BinFilterBar.tsx`:

```tsx
import { Search } from "lucide-react";

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
    { key: "critical" as const, label: "Cheias", color: "#dc2626" },
    { key: "warning" as const, label: "Parciais", color: "#eab308" },
    { key: "normal" as const, label: "Vazias", color: "#16a34a" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-4 mb-4">
      <div className="flex items-center gap-2">
        {filterButtons.map((btn) => (
          <button
            key={btn.key}
            onClick={() => onFilterChange(btn.key)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm border transition-colors ${
              filters[btn.key]
                ? "bg-muted border-border"
                : "border-transparent opacity-50"
            }`}
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: btn.color }}
            />
            {btn.label}
          </button>
        ))}
      </div>
      <div className="relative flex-1 min-w-[200px] max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar lixeira..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-sm bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
    </div>
  );
}
```

---

## Task 9: Create Route Components

**Files:**
- Create: `frontend-react/src/components/map/RoutePolyline.tsx`
- Create: `frontend-react/src/components/routes/RouteList.tsx`
- Create: `frontend-react/src/components/routes/RouteSummary.tsx`
- Create: `frontend-react/src/hooks/useRoute.ts`

**Step 1: Create RoutePolyline.tsx**

Create `src/components/map/RoutePolyline.tsx`:

```tsx
import { Polyline, CircleMarker, Tooltip } from "react-leaflet";
import type { Bin } from "@/data/mockBins";
import { getStatusColor, getBinStatus } from "@/data/mockBins";

interface RoutePolylineProps {
  bins: Bin[];
}

export function RoutePolyline({ bins }: RoutePolylineProps) {
  if (bins.length < 2) return null;

  const positions = bins.map((bin) => [bin.latitude, bin.longitude] as [number, number]);

  return (
    <>
      <Polyline
        positions={positions}
        pathOptions={{
          color: "#3b82f6",
          weight: 3,
          dashArray: "10, 10",
          opacity: 0.8,
        }}
      />
      {bins.map((bin, index) => (
        <CircleMarker
          key={bin.id}
          center={[bin.latitude, bin.longitude]}
          radius={14}
          pathOptions={{
            fillColor: getStatusColor(getBinStatus(bin.fill_level)),
            fillOpacity: 1,
            color: "#fff",
            weight: 2,
          }}
        >
          <Tooltip permanent direction="center" className="route-number-tooltip">
            <span className="font-bold text-white">{index + 1}</span>
          </Tooltip>
        </CircleMarker>
      ))}
    </>
  );
}
```

**Step 2: Create RouteList.tsx**

Create `src/components/routes/RouteList.tsx`:

```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { Bin } from "@/data/mockBins";
import { getBinStatus, getStatusColor } from "@/data/mockBins";
import { formatDistance } from "@/lib/geo";

interface RouteListProps {
  bins: Bin[];
  distances: number[];
}

export function RouteList({ bins, distances }: RouteListProps) {
  return (
    <Card className="h-full overflow-auto">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Ordem de Coleta</CardTitle>
      </CardHeader>
      <CardContent>
        {bins.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Nenhuma lixeira para coletar
          </p>
        ) : (
          <div className="space-y-3">
            {bins.map((bin, index) => {
              const status = getBinStatus(bin.fill_level);
              const color = getStatusColor(status);
              const distance = distances[index] || 0;

              return (
                <div key={bin.id} className="flex items-center gap-3">
                  <div
                    className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: color }}
                  >
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{bin.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {bin.fill_level}% {distance > 0 && `• ${formatDistance(distance)}`}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
```

**Step 3: Create RouteSummary.tsx**

Create `src/components/routes/RouteSummary.tsx`:

```tsx
import { MapPin, Clock, Truck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatDistance } from "@/lib/geo";

interface RouteSummaryProps {
  totalDistance: number;
  estimatedTime: number;
  binCount: number;
}

export function RouteSummary({ totalDistance, estimatedTime, binCount }: RouteSummaryProps) {
  const stats = [
    { icon: MapPin, label: "Distância", value: formatDistance(totalDistance) },
    { icon: Clock, label: "Tempo est.", value: `~${estimatedTime} min` },
    { icon: Truck, label: "Lixeiras", value: binCount.toString() },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="flex flex-col items-center p-4">
            <stat.icon className="h-5 w-5 text-primary mb-2" />
            <p className="text-lg font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
```

**Step 4: Create useRoute.ts hook**

Create `src/hooks/useRoute.ts`:

```typescript
import { useMemo } from "react";
import type { Bin } from "@/data/mockBins";
import { haversineDistance } from "@/lib/geo";

export interface RouteData {
  bins: Bin[];
  distances: number[];
  totalDistance: number;
  estimatedTime: number;
}

export function useRoute(allBins: Bin[], threshold = 70): RouteData {
  return useMemo(() => {
    const eligibleBins = allBins
      .filter((bin) => bin.fill_level >= threshold)
      .sort((a, b) => b.fill_level - a.fill_level);

    const distances: number[] = [];
    let totalDistance = 0;

    for (let i = 1; i < eligibleBins.length; i++) {
      const prev = eligibleBins[i - 1];
      const curr = eligibleBins[i];
      const dist = haversineDistance(
        prev.latitude,
        prev.longitude,
        curr.latitude,
        curr.longitude
      );
      distances.push(dist);
      totalDistance += dist;
    }

    if (eligibleBins.length > 0) {
      distances.unshift(0);
    }

    const timePerBin = 3;
    const speedKmH = 15;
    const travelTime = (totalDistance / speedKmH) * 60;
    const estimatedTime = Math.round(eligibleBins.length * timePerBin + travelTime);

    return {
      bins: eligibleBins,
      distances,
      totalDistance,
      estimatedTime,
    };
  }, [allBins, threshold]);
}
```

---

## Task 10: Create Page Components

**Files:**
- Create: `frontend-react/src/pages/MapPage.tsx`
- Create: `frontend-react/src/pages/KpisPage.tsx`
- Create: `frontend-react/src/pages/RoutesPage.tsx`

**Step 1: Create MapPage.tsx**

Create `src/pages/MapPage.tsx`:

```tsx
import { useState, useMemo } from "react";
import { MapView } from "@/components/map/MapView";
import { BinMarker } from "@/components/map/BinMarker";
import { BinFilterBar } from "@/components/bins/BinFilterBar";
import { BinDetailPanel } from "@/components/bins/BinDetailPanel";
import { MOCK_BINS, getBinStatus, type Bin } from "@/data/mockBins";

export function MapPage() {
  const [selectedBin, setSelectedBin] = useState<Bin | null>(null);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    critical: true,
    warning: true,
    normal: true,
  });

  const filteredBins = useMemo(() => {
    return MOCK_BINS.filter((bin) => {
      const status = getBinStatus(bin.fill_level);
      if (!filters[status]) return false;
      if (search && !bin.name.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      return true;
    });
  }, [search, filters]);

  const toggleFilter = (filter: "critical" | "warning" | "normal") => {
    setFilters((prev) => ({ ...prev, [filter]: !prev[filter] }));
  };

  return (
    <div className="h-full flex flex-col">
      <BinFilterBar
        search={search}
        onSearchChange={setSearch}
        filters={filters}
        onFilterChange={toggleFilter}
      />
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3 min-h-[400px]">
          <MapView>
            {filteredBins.map((bin) => (
              <BinMarker
                key={bin.id}
                bin={bin}
                onClick={setSelectedBin}
              />
            ))}
          </MapView>
        </div>
        <div className="lg:col-span-1">
          <BinDetailPanel bin={selectedBin} />
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Create KpisPage.tsx**

Create `src/pages/KpisPage.tsx`:

```tsx
import { Trash2, AlertTriangle, AlertCircle, CheckCircle } from "lucide-react";
import { StatCard } from "@/components/kpis/StatCard";
import { StatusChart } from "@/components/kpis/StatusChart";
import { AlertList } from "@/components/kpis/AlertList";
import { useBinStats } from "@/hooks/useBinStats";
import { MOCK_BINS } from "@/data/mockBins";

export function KpisPage() {
  const stats = useBinStats(MOCK_BINS);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Total Lixeiras" value={stats.total} icon={Trash2} />
        <StatCard
          title="Críticas"
          value={stats.critical}
          icon={AlertTriangle}
          color="#dc2626"
        />
        <StatCard
          title="Atenção"
          value={stats.warning}
          icon={AlertCircle}
          color="#eab308"
        />
        <StatCard
          title="Normais"
          value={stats.normal}
          icon={CheckCircle}
          color="#16a34a"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
```

**Step 3: Create RoutesPage.tsx**

Create `src/pages/RoutesPage.tsx`:

```tsx
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MapView } from "@/components/map/MapView";
import { RoutePolyline } from "@/components/map/RoutePolyline";
import { BinMarker } from "@/components/map/BinMarker";
import { RouteList } from "@/components/routes/RouteList";
import { RouteSummary } from "@/components/routes/RouteSummary";
import { useRoute } from "@/hooks/useRoute";
import { MOCK_BINS, getBinStatus } from "@/data/mockBins";

export function RoutesPage() {
  const route = useRoute(MOCK_BINS, 70);

  const today = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const binsNotInRoute = MOCK_BINS.filter(
    (bin) => !route.bins.some((rb) => rb.id === bin.id)
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Rota do Dia: {today}</h2>
        <Button variant="outline" size="sm">
          <RefreshCw className="mr-2 h-4 w-4" />
          Recalcular Rota
        </Button>
      </div>
      <RouteSummary
        totalDistance={route.totalDistance}
        estimatedTime={route.estimatedTime}
        binCount={route.bins.length}
      />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3 min-h-[400px]">
          <MapView>
            <RoutePolyline bins={route.bins} />
            {binsNotInRoute.map((bin) => (
              <BinMarker key={bin.id} bin={bin} />
            ))}
          </MapView>
        </div>
        <div className="lg:col-span-1">
          <RouteList bins={route.bins} distances={route.distances} />
        </div>
      </div>
    </div>
  );
}
```

---

## Task 11: Update App.tsx with Router

**Files:**
- Modify: `frontend-react/src/App.tsx`

**Step 1: Replace App.tsx with Router setup**

Replace content of `src/App.tsx`:

```tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { TabNav } from "@/components/layout/TabNav";
import { PageContainer } from "@/components/layout/PageContainer";
import { MapPage } from "@/pages/MapPage";
import { KpisPage } from "@/pages/KpisPage";
import { RoutesPage } from "@/pages/RoutesPage";

function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen flex-col bg-background text-foreground">
        <Header />
        <TabNav />
        <PageContainer>
          <Routes>
            <Route path="/" element={<MapPage />} />
            <Route path="/kpis" element={<KpisPage />} />
            <Route path="/rotas" element={<RoutesPage />} />
          </Routes>
        </PageContainer>
      </div>
    </BrowserRouter>
  );
}

export default App;
```

---

## Task 12: Update useBins hook

**Files:**
- Modify: `frontend-react/src/hooks/useBins.ts`

**Step 1: Update useBins to use new Bin type**

Replace content of `src/hooks/useBins.ts`:

```typescript
import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { MOCK_BINS, type Bin } from "@/data/mockBins";

interface UseBinsResult {
  bins: Bin[];
  loading: boolean;
  error: Error | null;
  isMock: boolean;
}

export function useBins(): UseBinsResult {
  const [bins, setBins] = useState<Bin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isMock, setIsMock] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchBins() {
      try {
        const response = await api.get<Bin[]>("/bins");
        if (!cancelled) {
          setBins(response.data || []);
          setError(null);
          setIsMock(false);
        }
      } catch (err) {
        if (!cancelled) {
          console.warn("API unavailable, using mock data:", err);
          setBins(MOCK_BINS);
          setError(null);
          setIsMock(true);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchBins();

    return () => {
      cancelled = true;
    };
  }, []);

  return { bins, loading, error, isMock };
}

export type { Bin };
```

---

## Task 13: Add Leaflet CSS Fix

**Files:**
- Modify: `frontend-react/src/index.css`

**Step 1: Add Leaflet tooltip styles**

Add at the end of `src/index.css`:

```css
/* Leaflet customizations */
.leaflet-container {
  background-color: hsl(var(--background));
}

.route-number-tooltip {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  font-size: 11px;
}

.route-number-tooltip::before {
  display: none;
}
```

---

## Task 14: Final Verification

**Step 1: Run the development server**

Run:
```bash
cd /Users/pedromichel/Dev/DigitalCity/frontend-react
npm run dev
```

**Step 2: Verify all pages work**

Open browser to http://localhost:3000 and verify:
- [ ] Map page loads with markers
- [ ] Clicking markers shows detail panel
- [ ] Filters work correctly
- [ ] KPIs page shows correct stats
- [ ] Routes page shows route with polyline
- [ ] Tab navigation works
- [ ] Dark theme applied

---

## Summary

| Task | Description | Files |
|------|-------------|-------|
| 1 | Install dependencies | package.json |
| 2 | Configure Tailwind | tailwind.config.js, index.css |
| 3 | Create utilities | lib/utils.ts, lib/geo.ts |
| 4 | Expand mock data | data/mockBins.ts |
| 5 | Create UI components | components/ui/* |
| 6 | Create layout components | components/layout/* |
| 7 | Create KPI components | components/kpis/*, hooks/useBinStats.ts |
| 8 | Create map components | components/map/*, components/bins/* |
| 9 | Create route components | components/routes/*, hooks/useRoute.ts |
| 10 | Create pages | pages/* |
| 11 | Setup router | App.tsx |
| 12 | Update useBins | hooks/useBins.ts |
| 13 | Add Leaflet CSS | index.css |
| 14 | Final verification | - |
