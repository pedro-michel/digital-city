## Frontend Dashboard (React)

This project hosts the web dashboard for operators to monitor bin status, view trucks on a map, and inspect optimized routes.

### Suggested tech stack

- Node.js (LTS) + npm or pnpm
- React with TypeScript
- Vite or Create React App as the build tool
- Map library (e.g. Leaflet, Mapbox GL, or Google Maps)
- UI library (e.g. MUI, Chakra UI, or Tailwind CSS)

### Suggested internal structure

- `src/`
  - `components/` – reusable UI components (map, bin list, KPI cards, LED status).
  - `pages/` – top-level pages (Dashboard, Reports, Settings).
  - `hooks/` – data fetching and WebSocket hooks.
  - `services/` – API client for the Python backend.
  - `state/` – global state management (e.g. Zustand, Redux, or React context).
  - `styles/` – global styles and theme configuration.

Initialize this folder later with your preferred React starter (e.g. `npm create vite@latest frontend-react`).

