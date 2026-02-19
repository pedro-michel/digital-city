# Smart Waste Management - Azure Cloud Architecture Design

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Document version:** 1.0
**Created:** 2026-02-19
**Status:** Approved

---

## 1. Executive Summary

Este documento define a arquitetura cloud Azure para o Smart Waste Management System da PUC Campinas. A solução utiliza AKS (Azure Kubernetes Service) como plataforma de orquestração, com foco em governança, segurança e observabilidade.

**Decisões principais:**
- **Orquestração:** AKS (Kubernetes) com Application Gateway
- **CI/CD:** Azure DevOps Pipelines
- **IoT:** Azure IoT Hub + Event Grid
- **Database:** Azure Database for PostgreSQL Flexible Server
- **Região:** Brazil South

---

## 2. Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    SMART WASTE MANAGEMENT - AZURE                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   Internet → Front Door (WAF) → Application Gateway → AKS Cluster           │
│                                                           │                  │
│                                    ┌──────────────────────┼──────────────┐  │
│                                    │    AKS Namespaces    │              │  │
│                                    │  ┌─────────┐ ┌─────────┐ ┌───────┐  │  │
│                                    │  │frontend │ │backend  │ │workers│  │  │
│                                    │  │(React)  │ │(FastAPI)│ │(IoT)  │  │  │
│                                    │  └─────────┘ └─────────┘ └───────┘  │  │
│                                    └──────────────────────┼──────────────┘  │
│                                                           │                  │
│   IoT Hub → Event Grid ───────────────────────────────────┘                 │
│                                                           │                  │
│                              ┌────────────────────────────┼──────────────┐  │
│                              │      Data Layer (VNET)     │              │  │
│                              │  PostgreSQL    Redis    Storage          │  │
│                              └───────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Resource Organization

### 3.1 Resource Groups

| Resource Group | Recursos |
|----------------|----------|
| `rg-digitalcity-networking-brazilsouth` | VNet, App Gateway, Front Door, DNS |
| `rg-digitalcity-aks-brazilsouth` | AKS, ACR, Managed Identities |
| `rg-digitalcity-data-brazilsouth` | PostgreSQL, Redis, Storage |
| `rg-digitalcity-iot-brazilsouth` | IoT Hub, Event Grid, DPS |
| `rg-digitalcity-monitoring-brazilsouth` | Log Analytics, App Insights |

### 3.2 Naming Convention

| Tipo | Prefixo | Exemplo |
|------|---------|---------|
| Resource Group | `rg-` | `rg-digitalcity-aks-brazilsouth` |
| AKS Cluster | `aks-` | `aks-digitalcity` |
| Container Registry | `acr` | `acrdigitalcity` |
| PostgreSQL | `psql-` | `psql-digitalcity` |
| IoT Hub | `iot-` | `iot-digitalcity` |

### 3.3 Tags (Required)

```json
{
  "project": "digitalcity",
  "environment": "dev|staging|prod",
  "owner": "team-email",
  "cost-center": "puc-campinas"
}
```

---

## 4. AKS Cluster Configuration

### 4.1 Cluster Specs

| Setting | Value |
|---------|-------|
| Kubernetes Version | 1.29.x |
| System Node Pool | Standard_D2s_v3 x 2 |
| Workload Node Pool | Standard_D4s_v3 x 2-5 (autoscale) |
| Network Plugin | Azure CNI |
| Network Policy | Calico |

### 4.2 Namespaces

- `digitalcity-dev` - Development environment
- `digitalcity-staging` - Staging environment
- `digitalcity-prod` - Production environment
- `ingress-nginx` - Ingress controller
- `monitoring` - Prometheus/Grafana

### 4.3 Workloads

| Deployment | Replicas | Resources | HPA |
|------------|----------|-----------|-----|
| frontend | 2 | 128-256Mi, 100-200m | 2-5, CPU>70% |
| backend | 3 | 256-512Mi, 200-500m | 2-6, CPU>60% |
| iot-worker | 2 | 256-512Mi, 100-300m | 1-4, queue |

---

## 5. CI/CD Pipeline (Azure DevOps)

### 5.1 Pipeline Structure

```
azure-pipelines/
├── templates/
│   ├── docker-build.yml
│   ├── helm-deploy.yml
│   └── security-scan.yml
├── ci-frontend.yml
├── ci-backend.yml
├── cd-dev.yml
├── cd-staging.yml
└── cd-production.yml
```

### 5.2 Environments

| Environment | Trigger | Approval | Replicas |
|-------------|---------|----------|----------|
| dev | Push to main | Auto | 1 |
| staging | Success in dev | Auto | 2 |
| production | Success in staging | Manual | 3 |

### 5.3 CI Stages

1. **Build** - Docker image
2. **Test** - pytest/vitest
3. **Scan** - Trivy + SonarQube
4. **Push** - ACR with semantic tags

---

## 6. IoT Architecture

### 6.1 Data Flow

```
Sensors (ESP32) → LoRaWAN Gateway → IoT Hub → Event Grid → AKS Workers → PostgreSQL
```

### 6.2 Message Format

```json
{
  "deviceId": "bin-puc-001",
  "timestamp": "2026-02-19T14:30:00Z",
  "payload": {
    "fill_level": 85,
    "battery_percent": 72
  }
}
```

### 6.3 Routing Rules

| Condition | Destination |
|-----------|-------------|
| fill_level > 90 | Service Bus: critical-alerts |
| fill_level > 70 | Service Bus: warnings |
| * | Event Hub: telemetry |

---

## 7. Security

### 7.1 Identity

- **Azure AD** - User authentication, RBAC
- **Managed Identities** - AKS → ACR, KeyVault, PostgreSQL
- **Key Vault** - Secrets (DB passwords, JWT keys)

### 7.2 Network

- **Front Door** - DDoS protection, WAF (OWASP rules)
- **App Gateway** - L7 routing, TLS termination
- **Private Endpoints** - PostgreSQL, Redis (no public IPs)
- **NSG** - Restrict traffic between subnets

### 7.3 Compliance

- LGPD compliance checklist
- Microsoft Defender for Cloud
- Activity logs retention: 1 year

---

## 8. Observability

### 8.1 Stack

- **Azure Monitor** - Unified platform
- **Container Insights** - AKS metrics
- **Application Insights** - APM traces
- **Log Analytics** - Centralized logs (90 days)
- **Grafana** - Dashboards

### 8.2 SLOs

| Service | Metric | Target |
|---------|--------|--------|
| API | Latency p99 | < 500ms |
| API | Availability | 99.5% |
| API | Error Rate | < 1% |
| IoT | Message Lag | < 5min |

### 8.3 Alerts

| Severity | Condition | Action |
|----------|-----------|--------|
| Critical | Pod restarts > 5/10min | Teams + PagerDuty |
| Critical | Error rate > 10% | Teams + PagerDuty |
| Warning | CPU > 80% for 5min | Teams |
| Warning | Device offline > 1hr | Email |

---

## 9. Cost Estimate (Monthly)

| Resource | SKU | Cost |
|----------|-----|------|
| AKS | D2s_v3 x2, D4s_v3 x2 | ~$200 |
| PostgreSQL | Flexible B2s | ~$30 |
| Redis | Basic C0 | ~$16 |
| IoT Hub | S1 | ~$25 |
| App Gateway | WAF_v2 | ~$100 |
| Storage/Logs | Various | ~$30 |
| **Total** | | **~$400/mês** |

---

## 10. Alternative Architectures

### 10.1 Alternative A: Container Apps (Lower Cost)

**When to use:** Budget < $150/mês, time sem K8s experience, MVP

```
Static Web Apps (FREE) → Container Apps (Consumption) → PostgreSQL
```

**Cost:** ~$86-106/mês

**Trade-offs:**
- (-) Menos controle de rede
- (-) Sem WAF nativo
- (+) Scale-to-zero
- (+) Menor complexidade

### 10.2 Alternative B: App Service + Functions

**When to use:** Time familiar com PaaS, preferência por deploy sem containers

```
App Service Plan (P1v3) → Web Apps + Functions → PostgreSQL
```

**Cost:** ~$201-216/mês

**Trade-offs:**
- (-) Menos portável (Azure only)
- (-) Menos flexível para workloads
- (+) Deployment slots nativos
- (+) Curva de aprendizado baixa

### 10.3 Decision Matrix

| Critério | AKS | Container Apps | App Service |
|----------|-----|----------------|-------------|
| Custo | ~$400 | ~$100 | ~$200 |
| Complexidade | Alta | Baixa | Média |
| Portabilidade | Alta | Média | Baixa |
| Multi-tenant | Fácil | Possível | Difícil |

**Migração futura:** Se custos precisarem ser reduzidos, Container Apps é o caminho.

---

## 11. Database Schema (Reference)

```sql
-- Core tables
CREATE TABLE bins (
    id SERIAL PRIMARY KEY,
    device_id VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(200),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    current_fill_level INT DEFAULT 0,
    battery_percent INT,
    last_seen_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE telemetry (
    id SERIAL PRIMARY KEY,
    bin_id INT REFERENCES bins(id),
    fill_level INT NOT NULL,
    battery_percent INT,
    temperature DECIMAL(5, 2),
    recorded_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE alerts (
    id SERIAL PRIMARY KEY,
    bin_id INT REFERENCES bins(id),
    alert_type VARCHAR(20) NOT NULL, -- 'critical', 'warning'
    status VARCHAR(20) DEFAULT 'open', -- 'open', 'acknowledged', 'resolved'
    created_at TIMESTAMP DEFAULT NOW(),
    resolved_at TIMESTAMP
);

CREATE TABLE routes (
    id SERIAL PRIMARY KEY,
    route_date DATE NOT NULL,
    truck_id VARCHAR(50),
    status VARCHAR(20) DEFAULT 'planned', -- 'planned', 'in_progress', 'completed'
    total_distance_km DECIMAL(10, 2),
    estimated_time_min INT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE route_stops (
    id SERIAL PRIMARY KEY,
    route_id INT REFERENCES routes(id),
    bin_id INT REFERENCES bins(id),
    sequence INT NOT NULL,
    collected_at TIMESTAMP
);
```

---

## 12. API Contract (Reference)

### Bins API (provided later by PUC)

```yaml
# Expected endpoints when API is available
GET /api/bins
  Response: Bin[]

GET /api/bins/{id}
  Response: Bin

GET /api/bins/{id}/telemetry?from=&to=
  Response: Telemetry[]

# Internal endpoints (our backend)
POST /api/internal/telemetry
  Body: { deviceId, fill_level, battery_percent, timestamp }

GET /api/routes/today
  Response: Route with stops

POST /api/routes/optimize
  Body: { date, threshold }
  Response: OptimizedRoute
```

---

## 13. Next Steps

1. **Infrastructure Setup** - Terraform/Bicep para provisionar recursos Azure
2. **AKS Configuration** - Helm charts para deploy dos workloads
3. **CI/CD Pipelines** - Azure DevOps YAML pipelines
4. **IoT Integration** - Configurar IoT Hub e workers
5. **Backend Evolution** - Expandir FastAPI com novos endpoints
6. **Frontend Integration** - Conectar dashboard às APIs reais

---

*End of Cloud Architecture Design Document*
