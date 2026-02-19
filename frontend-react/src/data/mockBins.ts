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
