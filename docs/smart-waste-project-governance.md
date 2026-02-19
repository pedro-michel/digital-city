# Smart Waste Management System — Project Governance

**Document version:** 1.0  
**Last updated:** February 2025  
**Pilot:** PUC University, Campinas, SP, Brazil  

This document describes the governance of architecture, security, and agents for the Smart Waste Management System. It serves as the single source of truth for project scope, technical decisions, and operational roles.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Architecture Governance](#2-architecture-governance)
3. [Security Governance](#3-security-governance)
4. [Agents and Roles](#4-agents-and-roles)
5. [Implementation Phases](#5-implementation-phases)
6. [Expected Benefits](#6-expected-benefits)
7. [References](#7-references)

---

## 1. Project Overview

### 1.1 Executive Summary

The Smart Waste Management System is designed to optimize garbage collection routes for trucks, reducing operational costs, fuel consumption, and environmental impact. It uses IoT sensors, real-time data analytics, and route optimization algorithms to provide a dynamic, efficient approach to waste collection. The PUC University campus in Campinas, SP, serves as the pilot environment, with real-time bin fullness monitoring and an intuitive dashboard with LED indicators.

### 1.2 Problem Statement

Traditional garbage collection methods rely on fixed schedules, leading to:

| Issue | Description |
|-------|-------------|
| **Unnecessary trips** | Trucks collect partially empty bins, wasting fuel, time, and labor. |
| **Overflowing bins** | Bins may overflow before scheduled collection, causing unsanitary conditions, odors, and pollution. |
| **Suboptimal routes** | Fixed routes ignore traffic, bin fullness, and vehicle availability, increasing travel time and cost. |
| **Lack of visibility** | No real-time data on bin status prevents proactive management. |

### 1.3 Project Goal

To implement an intelligent waste management system that **dynamically optimizes garbage collection routes** based on real-time bin fullness data, enhancing operational efficiency, reducing costs, and improving environmental sustainability.

### 1.4 Scope (PUC Campus Pilot)

- Installation of smart sensors in designated garbage boxes across the campus.
- Development of a central data platform and user-friendly dashboard for monitoring and route planning.
- Integration of route optimization algorithms for campus waste collection vehicles.
- Real-time bin fullness status via visual indicators (red/green LEDs) on the dashboard.
- Analysis and reporting on route efficiency, fuel consumption, and collection frequency.

---

## 2. Architecture Governance

### 2.1 Architecture Principles

- **Separation of concerns:** Backend (API + business logic), frontend (UI), and optional Node services (real-time gateway/workers) are separate deployable units.
- **API-first:** All client–server communication goes through well-defined REST (and later WebSocket) APIs; no direct database access from the frontend.
- **Scalability:** Design supports scaling from campus pilot to city-wide deployment (sensors, gateways, and cloud components).
- **Technology diversity:** Python for core API and optimization; React for dashboard; Node.js for real-time and worker services where appropriate.

### 2.2 High-Level System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           SMART WASTE MANAGEMENT SYSTEM                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────┐     LPWAN (LoRaWAN/NB-IoT)     ┌──────────────────────┐   │
│  │ Smart Bins   │ ──────────────────────────────►│ IoT Gateway /        │   │
│  │ (Ultrasonic  │                                │ Cloud IoT Hub        │   │
│  │  sensors)    │                                │ (Azure/AWS/GCP)      │   │
│  └──────────────┘                                └──────────┬───────────┘   │
│                                                             │               │
│  ┌──────────────┐     GPS + Driver App           │         │               │
│  │ Trucks       │ ──────────────────────────────►│         │               │
│  └──────────────┘                                │         ▼               │
│                                          ┌──────┴──────────────────────┐   │
│                                          │ Central Data Platform       │   │
│                                          │ (backend-python)            │   │
│                                          │ • Ingestion • Analytics     │   │
│                                          │ • Route optimization       │   │
│                                          │ • REST API                  │   │
│                                          └──────┬──────────────────────┘   │
│                                                 │                           │
│                    ┌────────────────────────────┼────────────────────┐     │
│                    │                            │                    │     │
│                    ▼                            ▼                    ▼     │
│           ┌────────────────┐          ┌────────────────┐   ┌─────────────┐ │
│           │ Operator        │          │ Node Services   │   │ Database    │ │
│           │ Dashboard       │          │ (gateway,       │   │ (PostgreSQL │ │
│           │ (frontend-     │◄─────────│  workers)       │   │  / NoSQL)   │ │
│           │  react)         │          └────────────────┘   └─────────────┘ │
│           │ localhost:3000  │                                               │
│           └────────────────┘                                                 │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.3 Repository and Component Structure

| Path | Responsibility | Technologies |
|------|----------------|--------------|
| **backend-python/** | Core API, data platform, route optimization, ingestion | Python 3.11+, FastAPI, Uvicorn, (future: PostgreSQL, Redis, OR-Tools) |
| **frontend-react/** | Operator dashboard: map, bin list, LED indicators, reports | React, TypeScript, Vite, Axios; dev server on port 3000 |
| **node-services/** | Real-time gateway (WebSocket/MQTT), background workers | Node.js, (future: WebSocket, MQTT, job queues) |
| **docs/** | Requirements, architecture, API specs, governance | Markdown |
| **infra/** | Infrastructure as code, deployment | (Future: Terraform/Pulumi, CI/CD) |

### 2.4 Backend (Python) Internal Structure

- **app/main.py** — FastAPI app factory, CORS, health and root endpoints, API router mounting.
- **app/api/** — REST route handlers (e.g. `/api/bins`, future: trucks, routes, reports).
- **app/core/** — Domain models (e.g. `Bin`); future: trucks, routes, collections.
- **app/services/** — Business logic (route optimization, scheduling).
- **app/ingestion/** — Handlers for sensor and GPS data.
- **app/config/** — Settings and environment.
- **app/db/** — Database models and migrations (when introduced).
- **tests/** — Unit and integration tests.

### 2.5 Frontend (React) Internal Structure

- **src/pages/** — Top-level pages (Dashboard, future: Reports, Settings).
- **src/components/** — Reusable UI (Header, BinList, future: Map, KPI cards).
- **src/hooks/** — Data fetching (e.g. `useBins`).
- **src/services/** — API client (Axios, base URL `/api` in development).
- **src/state/** — Global state (future, if needed).
- **src/styles/** — Global styles and theme.

### 2.6 Data Flow (Current and Target)

1. **Sensors → Platform:** Bin fill-level data is sent via LPWAN to an IoT gateway/cloud hub, then ingested by the backend (future).
2. **Backend → Dashboard:** Dashboard calls REST API (e.g. `GET /api/bins`, `GET /api/health`); in development, Vite proxies `/api` to `http://localhost:8000`.
3. **Trucks → Platform:** GPS and collection events from driver app to backend (future).
4. **Platform → Drivers:** Optimized routes and tasks dispatched to driver app (future).
5. **Real-time (future):** Node gateway can push live bin/truck updates to the dashboard via WebSockets.

### 2.7 Local Development Ports

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:3000 | React dev server (Vite) |
| Backend API | http://localhost:8000 | FastAPI (Uvicorn) |
| API proxy | /api → 8000 | Vite proxy so frontend uses relative `/api` URLs |

---

## 3. Security Governance

### 3.1 Security Principles

- **Least privilege:** Users and services have only the permissions required for their role.
- **Defense in depth:** Security at network, API, application, and data layers.
- **No secrets in code:** Credentials and keys in environment variables or secret managers.
- **Auditability:** Logging of access and sensitive operations (future).

### 3.2 Authentication and Authorization

| Aspect | Current (pilot) | Target |
|--------|------------------|--------|
| **Operators (dashboard)** | None | SSO or username/password; JWT or session-based auth |
| **Drivers (mobile app)** | None | Device or user auth; tokens for API access |
| **API-to-API** | None | API keys or service accounts for ingestion and internal services |
| **Roles** | Single user | Roles: Admin, Operator, Driver, Read-only |

Authorization rules (target): Operators view all bins and routes; drivers see only assigned routes and tasks; admins manage users and configuration.

### 3.3 API Security

- **HTTPS only** in production; TLS for all external and internal APIs.
- **CORS:** Restrict allowed origins (e.g. dashboard origin only); currently configured for `http://localhost:3000` in development.
- **Rate limiting:** Apply to public and authenticated endpoints to prevent abuse (future).
- **Input validation:** All inputs validated (e.g. Pydantic models in FastAPI); reject malformed or oversized payloads.
- **Error handling:** Do not expose stack traces or internal details to clients; use generic error messages and log details server-side.

### 3.4 IoT and Device Security

- **Device identity:** Each sensor and gateway has a unique identifier; only authorized devices can send data (future).
- **Secure connectivity:** TLS or secure LoRaWAN/NB-IoT where supported; no plaintext credentials over the air.
- **Firmware updates:** Signed and verified updates; rollback strategy (future).
- **Gateway hardening:** Minimal exposed surface; firewall and access control for gateway and cloud IoT endpoints.

### 3.5 Data Protection

- **Personal data:** Minimize collection; treat driver and operator data in line with LGPD (Brazil).
- **Data at rest:** Encrypt sensitive data in the database; use managed encryption where available.
- **Data in transit:** TLS for all client–server and server–server communication.
- **Retention:** Define and document retention periods for sensor and operational data; automated purge or anonymization where required.
- **Backups:** Regular backups with tested restore procedures; backup encryption and access control.

### 3.6 Operational Security

- **Secrets management:** Use `.env` (dev) and a secret manager in production; never commit secrets; use `.env.example` for documentation only.
- **Dependencies:** Keep dependencies updated; use automated scanning for known vulnerabilities (future).
- **Logging:** Log security-relevant events (auth failures, access to sensitive data); protect log integrity and access.

### 3.7 Compliance Considerations

- **LGPD (Brazil):** If personal data is processed, ensure legal basis, consent where applicable, and rights of data subjects; document in a privacy notice and internal procedures.
- **Internal policies:** Align with PUC and campus IT security and privacy policies.

---

## 4. Agents and Roles

### 4.1 Project Team (Human Roles)

| Role | Responsibility |
|------|----------------|
| **Project Manager** | Planning, timeline, stakeholder communication, risk and scope management. |
| **IoT Hardware Engineers** | Sensor selection, integration, gateway deployment, LPWAN design and maintenance. |
| **Software Developers (Backend)** | FastAPI services, ingestion, database, route optimization integration. |
| **Software Developers (Frontend)** | React dashboard, map, reports, and operator UX. |
| **Software Developers (Mobile)** | Driver application for routes, navigation, and collection confirmation. |
| **Data Scientists / Route Optimization Specialists** | VRP and ML models, tuning, and performance analysis. |
| **Network Engineers** | Campus and cloud network design, LoRaWAN/NB-IoT and gateway connectivity. |
| **GIS Specialists** | Campus mapping, bin and route geometry, map layers for dashboard. |
| **PUC Campus Operations Liaison** | Operational requirements, pilot coordination, and acceptance. |

### 4.2 System and Automation “Agents”

| Agent | Description | Owner / Component |
|-------|-------------|-------------------|
| **Sensor agent** | Each bin sensor (or firmware) that collects fill level and sends data on a schedule or on change. | IoT / firmware |
| **Ingestion agent** | Backend process that receives sensor and GPS data, validates it, and persists or forwards to analytics. | backend-python (ingestion) |
| **Optimization agent** | Service that runs VRP or ML models on current bin and truck state and produces recommended routes. | backend-python (services) |
| **Dispatch agent** | Assigns routes and tasks to drivers and notifies the driver app. | backend-python or node-services (workers) |
| **Real-time gateway** | Pushes live bin/truck updates to the dashboard. | node-services (gateway) |
| **Reporting agent** | Generates scheduled or on-demand reports (efficiency, fill trends, KPIs). | backend-python or node-services (workers) |

### 4.3 AI and Development Assistants (Cursor / IDE)

- **AGENTS.md** (project root): High-level context for AI assistants (project summary, conventions).
- **.cursor/rules/** (optional): File-specific or project-wide rules for code style, patterns, and architecture.
- Governance and architecture decisions in this document should be respected by both humans and AI-assisted development (e.g. API boundaries, security constraints, repository structure).

---

## 5. Implementation Phases

| Phase | Duration | Main activities |
|-------|----------|------------------|
| **1. Planning & Procurement** | 1–2 months | Campus mapping, bin locations, sensor/gateway selection and procurement, cloud setup. |
| **2. Sensor Deployment & Data Collection** | 2–3 months | Install sensors, deploy LoRaWAN/NB-IoT gateways, establish baseline fill-level patterns. |
| **3. Platform & Dashboard Development** | 3–4 months | Central platform, analytics, operator dashboard, route optimization module, API and proxy (e.g. localhost:3000 ↔ backend). |
| **4. Pilot Testing & Optimization** | 2 months | Deploy for campus trucks, monitor, tune algorithms, train operators and drivers. |
| **5. Evaluation & Reporting** | 1 month | Evaluate outcomes (fuel, time, overflows), report results, recommend city-wide scaling. |

---

## 6. Expected Benefits

- **Cost reduction:** Savings in fuel, labor, and vehicle maintenance through optimized routes and fewer unnecessary trips.
- **Efficiency:** Up to ~30% reduction in collection time and better resource use.
- **Environmental impact:** Lower carbon emissions from fewer truck miles.
- **Sanitation:** Fewer overflowing bins; cleaner campus.
- **Decision making:** Real-time insights into waste patterns and collection performance.
- **Scalability:** Design allows extension to the city of Campinas or other areas.

---

## 7. References

| Document | Purpose |
|----------|---------|
| [Agents.md](../Agents.md) | Executive summary and project context (source for this governance). |
| [README.md](../README.md) | Repository layout and local run instructions (frontend localhost:3000, backend :8000). |
| [docs/README.md](README.md) | Index of docs (requirements, architecture, API spec). |
| [backend-python/README.md](../backend-python/README.md) | Backend structure and run commands. |
| [frontend-react/README.md](../frontend-react/README.md) | Frontend structure and tech stack. |
| [node-services/README.md](../node-services/README.md) | Node services (gateway, workers) scope. |

---

*End of Smart Waste Project Governance document.*
