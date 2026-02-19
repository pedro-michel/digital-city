# Smart Waste Management - Frontend Dashboard Design

**Data:** 2026-02-19
**Status:** Aprovado
**Autor:** Claude + Pedro Michel

---

## Resumo

Dashboard web para o Sistema Inteligente de Gerenciamento de Resíduos do campus PUC Campinas. Interface multi-página com tabs para visualização de mapa, KPIs e rotas de coleta.

## Decisões de Design

| Aspecto | Decisão |
|---------|---------|
| Usuários | Operadores + Gestores |
| Abordagem | Multi-página com Tabs |
| Visual | Dark mode moderno |
| UI Library | shadcn/ui + Tailwind CSS |
| Mapas | Leaflet + React Leaflet |
| Dados | Mock data realista (~18 lixeiras) |

---

## Estrutura de Páginas

### Layout Geral

```
┌─────────────────────────────────────────────────────────┐
│  Logo    Smart Waste Management       [Notif] [User]   │  ← Header fixo
├─────────────────────────────────────────────────────────┤
│  [Mapa]  [KPIs]  [Rotas]                                │  ← Tabs de navegação
├─────────────────────────────────────────────────────────┤
│                    Conteúdo da Tab                      │
└─────────────────────────────────────────────────────────┘
```

### Rotas

| Rota | Página | Descrição |
|------|--------|-----------|
| `/` | MapPage | Mapa interativo com lixeiras |
| `/kpis` | KpisPage | Métricas e indicadores |
| `/rotas` | RoutesPage | Planejamento de coletas |

---

## Página: Mapa

```
┌─────────────────────────────────────────────────────────┐
│  [Filtros: ● Cheias  ● Parciais  ● Vazias]   [Busca]    │
├───────────────────────────────────┬─────────────────────┤
│                                   │                     │
│         MAPA LEAFLET              │  Lixeira Selecionada│
│         (Campus PUC)              │  ─────────────────  │
│                                   │  Nome: Refeitório   │
│      🟢  🟢                       │  Nível: 95%         │
│           🟡    🔴                │  Local: Bloco A     │
│      🟢       🟡                  │  Última leitura:    │
│                                   │  há 5 min           │
└───────────────────────────────────┴─────────────────────┘
```

### Componentes

- **MapView**: Mapa Leaflet centralizado no campus PUC (-22.83, -47.05)
- **BinMarker**: Marcador circular colorido por status
- **FilterBar**: Checkboxes para filtrar + campo de busca
- **BinDetailPanel**: Painel lateral com detalhes da lixeira

### Cores dos Markers

| Status | Cor | Condição |
|--------|-----|----------|
| Crítico | #dc2626 (vermelho) | fill_level >= 90% |
| Atenção | #eab308 (amarelo) | fill_level 50-89% |
| Normal | #16a34a (verde) | fill_level < 50% |

---

## Página: KPIs

```
┌─────────────────────────────────────────────────────────┐
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │
│  │ 18       │ │ 4        │ │ 6        │ │ 8        │   │
│  │ Total    │ │ Críticas │ │ Atenção  │ │ Normais  │   │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘   │
├─────────────────────────────┬───────────────────────────┤
│   Distribuição por Status   │   Alertas Críticos        │
│                             │   ───────────────────     │
│   ████████████░░░░ 56%      │   🔴 Refeitório - 95%     │
│   Normal                    │   🔴 Biblioteca - 92%    │
│   ██████░░░░░░░░░░ 28%      │   🔴 Bloco C - 90%       │
│   Atenção                   │                           │
│   ███░░░░░░░░░░░░░ 16%      │   [Ver todas no mapa]     │
│   Crítico                   │                           │
└─────────────────────────────┴───────────────────────────┘
```

### Componentes

- **StatCard**: Card com número grande e label
- **StatusChart**: Barras horizontais de distribuição
- **AlertList**: Lista ordenada das lixeiras críticas

### Métricas

| Métrica | Cálculo |
|---------|---------|
| Total | bins.length |
| Críticas | bins.filter(b => b.fill_level >= 90).length |
| Atenção | bins.filter(b => b.fill_level >= 50 && < 90).length |
| Normais | bins.filter(b => b.fill_level < 50).length |

---

## Página: Rotas

```
┌─────────────────────────────────────────────────────────┐
│  Rota do Dia: 19/02/2026          [Recalcular Rota]     │
├───────────────────────────────────┬─────────────────────┤
│                                   │  Ordem de Coleta    │
│         MAPA LEAFLET              │  ─────────────────  │
│         (Rota traçada)            │  1. Refeitório 95%  │
│                                   │  2. Biblioteca 92%  │
│      ━━━━━━━━━━━━━━━              │  3. Bloco C 90%     │
│     ╱              ╲              │  4. Praça 75%       │
│    🔴───────────────🔴            │  ─────────────────  │
│       🚛 Início                   │  Total: 1.15 km     │
│                                   │  Tempo: ~25 min     │
└───────────────────────────────────┴─────────────────────┘
```

### Componentes

- **RouteMap**: Mapa com polyline da rota + markers numerados
- **RouteList**: Lista ordenada das lixeiras a coletar
- **RouteSummary**: Cards com distância, tempo, quantidade

### Lógica da Rota

- Inclui lixeiras com fill_level >= 70%
- Ordena por nível (mais cheias primeiro)
- Distância calculada via Haversine
- Tempo: ~3 min por lixeira + deslocamento

---

## Estrutura de Arquivos

```
src/
├── components/
│   ├── ui/                    # shadcn/ui components
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── TabNav.tsx
│   │   └── PageContainer.tsx
│   ├── map/
│   │   ├── MapView.tsx
│   │   ├── BinMarker.tsx
│   │   ├── RoutePolyline.tsx
│   │   └── BinPopup.tsx
│   ├── bins/
│   │   ├── BinDetailPanel.tsx
│   │   ├── BinFilterBar.tsx
│   │   └── BinList.tsx
│   ├── kpis/
│   │   ├── StatCard.tsx
│   │   ├── StatusChart.tsx
│   │   └── AlertList.tsx
│   └── routes/
│       ├── RouteList.tsx
│       └── RouteSummary.tsx
├── pages/
│   ├── MapPage.tsx
│   ├── KpisPage.tsx
│   └── RoutesPage.tsx
├── hooks/
│   ├── useBins.ts
│   ├── useRoute.ts
│   └── useBinStats.ts
├── data/
│   └── mockBins.ts
├── lib/
│   ├── utils.ts
│   └── geo.ts
├── services/
│   └── api.ts
├── App.tsx
├── main.tsx
└── index.css
```

---

## Dependências

```json
{
  "dependencies": {
    "react-router-dom": "^6.x",
    "leaflet": "^1.9.x",
    "react-leaflet": "^4.x",
    "lucide-react": "^0.x",
    "class-variance-authority": "^0.x",
    "clsx": "^2.x",
    "tailwind-merge": "^2.x"
  },
  "devDependencies": {
    "tailwindcss": "^3.x",
    "autoprefixer": "^10.x",
    "postcss": "^8.x",
    "@types/leaflet": "^1.x"
  }
}
```

---

## Tema Visual

### Dark Mode

```css
:root {
  --background: 222 47% 6%;      /* #0a0f1a */
  --foreground: 210 40% 96%;
  --card: 222 47% 9%;            /* #0f1629 */
  --primary: 217 91% 60%;        /* #3b82f6 */
  --muted: 217 33% 17%;
  --border: 217 33% 17%;
}
```

### Paleta de Status

| Status | Cor | Hex |
|--------|-----|-----|
| Crítico | Vermelho | #dc2626 |
| Atenção | Amarelo | #eab308 |
| Normal | Verde | #16a34a |

---

## Dados Mock

18 lixeiras distribuídas pelo campus PUC:
- 4 críticas (fill_level >= 90%)
- 6 em atenção (fill_level 50-89%)
- 8 normais (fill_level < 50%)

Coordenadas centradas em: -22.83, -47.05 (PUC Campinas)

---

## Próximos Passos

1. Criar plano de implementação detalhado
2. Configurar Tailwind + shadcn/ui
3. Implementar estrutura de rotas
4. Desenvolver componentes em ordem de dependência
5. Integrar mapa Leaflet
6. Conectar com dados mock
7. Testar responsividade
