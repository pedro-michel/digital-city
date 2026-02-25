# Smart Waste Management System
## Apresentacao Executiva para Banca

**Projeto:** Sistema Inteligente de Gestao de Residuos Solidos
**Instituicao:** PUC Campinas
**Autor:** Pedro Michel
**Data:** Fevereiro 2026

---

## 1. VISAO GERAL DO PROJETO

### 1.1 O Problema

A gestao de residuos solidos urbanos enfrenta desafios criticos que impactam diretamente a qualidade de vida nas cidades:

| Problema | Impacto |
|----------|---------|
| **Coletas desnecessarias** | Caminhoes coletam lixeiras meio-vazias, desperdicando combustivel e mao de obra |
| **Transbordamento** | Lixeiras cheias nao coletadas a tempo geram insalubridade e mau cheiro |
| **Rotas ineficientes** | Percursos fixos sem considerar o estado real das lixeiras |
| **Falta de dados** | Gestores operam "no escuro", sem visibilidade do sistema |
| **Custos elevados** | Recursos desperdicados em operacoes nao otimizadas |

**Numeros que ilustram o problema:**
- Estudos mostram que 30-40% das coletas sao realizadas em lixeiras com menos de 50% de capacidade
- Rotas fixas podem consumir ate 25% mais combustivel que rotas dinamicas
- A falta de dados impede planejamento estrategico e alocacao eficiente de recursos

### 1.2 Por Que Este Problema e Relevante?

**Relevancia Ambiental:**
- Reducao de emissoes de CO2 com menos viagens desnecessarias
- Prevencao de contaminacao por transbordamento
- Alinhamento com ODS 11 (Cidades Sustentaveis) e ODS 12 (Consumo Responsavel)

**Relevancia Economica:**
- Municipios gastam entre 5-15% do orcamento com gestao de residuos
- Otimizacao pode gerar economia de 20-30% nos custos operacionais
- Maior eficiencia na alocacao de recursos publicos

**Relevancia Social:**
- Melhoria na qualidade de vida dos cidadaos
- Reducao de problemas de saude publica
- Modernizacao de servicos publicos essenciais

**Relevancia Academica:**
- Aplicacao pratica de conceitos de IoT, Data Analytics e Otimizacao
- Integracao de multiplas disciplinas da Ciencia da Computacao
- Contribuicao para o ecossistema de Smart Cities

---

## 2. A SOLUCAO PROPOSTA

### 2.1 Conceito Central

O Smart Waste Management System e uma plataforma integrada que utiliza sensores IoT em lixeiras para coletar dados em tempo real, permitindo:

1. **Monitoramento Continuo** - Saber o nivel de preenchimento de cada lixeira a qualquer momento
2. **Alertas Automaticos** - Notificar quando lixeiras atingem niveis criticos
3. **Rotas Otimizadas** - Calcular o melhor percurso considerando apenas lixeiras que precisam de coleta
4. **Dashboard Operacional** - Interface visual para gestores tomarem decisoes informadas

### 2.2 Diferenciais da Solucao

| Aspecto | Abordagem Tradicional | Nossa Solucao |
|---------|----------------------|---------------|
| Coleta | Calendario fixo | Sob demanda, baseada em dados |
| Rotas | Mesmos percursos diarios | Dinamicas, otimizadas por IA |
| Visibilidade | Nenhuma ou manual | Tempo real via dashboard |
| Decisoes | Baseadas em experiencia | Baseadas em dados e analytics |
| Custos | Fixos e elevados | Reduzidos pela otimizacao |

### 2.3 Como Funciona (Fluxo de Dados)

```
+-------------------+     +------------------+     +-------------------+
|  SENSORES IoT     |     |   PLATAFORMA     |     |   INTERFACES      |
|  (Lixeiras)       |     |   CENTRAL        |     |   DE USUARIO      |
+-------------------+     +------------------+     +-------------------+
|                   |     |                  |     |                   |
| - Sensor          |     | - Recebe dados   |     | - Dashboard Web   |
|   ultrasonico     |---->| - Processa       |---->| - App Motorista   |
|   (nivel)         |     |   informacoes    |     | - Alertas SMS     |
|                   |     | - Calcula rotas  |     |                   |
| - GPS             |     | - Gera alertas   |     | - Relatorios      |
|   (localizacao)   |     | - Armazena       |     | - Mapas           |
|                   |     |   historico      |     |                   |
| - Bateria/Solar   |     |                  |     |                   |
+-------------------+     +------------------+     +-------------------+
        |                         |                        |
        v                         v                        v
   Dados a cada              Processamento            Visualizacao
   15-30 minutos             em tempo real            imediata
```

---

## 3. O QUE JA EXISTE NO MVP

### 3.1 Status Atual: Prova de Conceito Funcional

O MVP demonstra a viabilidade tecnica da solucao com uma implementacao end-to-end simplificada.

### 3.2 Funcionalidades Implementadas

#### Backend (API Python/FastAPI)
| Funcionalidade | Status | Descricao |
|----------------|--------|-----------|
| API REST | ✅ Implementado | Endpoints para consulta de lixeiras |
| Health Check | ✅ Implementado | Monitoramento de saude do servico |
| Modelo de Dados | ✅ Implementado | Estrutura Bin com todos os atributos |
| CORS | ✅ Implementado | Comunicacao segura com frontend |

#### Frontend (Dashboard React/TypeScript)
| Funcionalidade | Status | Descricao |
|----------------|--------|-----------|
| Mapa Interativo | ✅ Implementado | Visualizacao geografica com Leaflet/OpenStreetMap |
| Indicadores de Status | ✅ Implementado | Cores vermelho/amarelo/verde por nivel |
| Dashboard KPIs | ✅ Implementado | Metricas em tempo real (total, criticas, atencao) |
| Visualizacao de Rotas | ✅ Implementado | Polyline no mapa com sequencia de paradas |
| Filtros e Busca | ✅ Implementado | Filtrar por status, buscar por nome |
| Painel de Detalhes | ✅ Implementado | Informacoes detalhadas da lixeira selecionada |
| Lista de Alertas | ✅ Implementado | Lixeiras criticas destacadas |
| Resumo de Rota | ✅ Implementado | Distancia total e tempo estimado |

#### Dados de Demonstracao
| Item | Quantidade | Localizacao |
|------|------------|-------------|
| Lixeiras Simuladas | 18 | Campus PUC Campinas |
| Criticas (>90%) | 4 | Distribuidas pelo campus |
| Em Atencao (50-90%) | 6 | Distribuidas pelo campus |
| Normais (<50%) | 8 | Distribuidas pelo campus |

### 3.3 Stack Tecnico Implementado

**Backend:**
- Python 3.11+ com FastAPI
- Uvicorn (servidor ASGI)
- Pydantic (validacao de dados)

**Frontend:**
- React 18 com TypeScript
- Vite (build tool de alta performance)
- Tailwind CSS (estilizacao)
- Leaflet (mapas interativos)
- Axios (HTTP client)
- React Router v7 (navegacao SPA)

### 3.4 Codigo-Fonte e Linhas de Codigo

| Componente | Linhas | Arquivos |
|------------|--------|----------|
| Backend Python | ~190 | 4 arquivos |
| Frontend React | ~1.300 | 20+ arquivos |
| Documentacao | ~1.100 | 5 arquivos |
| **Total** | **~2.600** | **30+ arquivos** |

---

## 4. O QUE NAO EXISTE (LACUNAS DO MVP)

### 4.1 Funcionalidades Planejadas (Roadmap)

#### Curto Prazo (1-3 meses)
| Funcionalidade | Prioridade | Complexidade |
|----------------|------------|--------------|
| Banco de dados PostgreSQL | Alta | Media |
| Autenticacao JWT | Alta | Media |
| Ingestao real de sensores | Alta | Alta |
| Engine de otimizacao de rotas | Alta | Alta |
| Testes automatizados | Media | Media |

#### Medio Prazo (3-6 meses)
| Funcionalidade | Prioridade | Complexidade |
|----------------|------------|--------------|
| Integracao Azure IoT Hub | Alta | Alta |
| WebSockets (real-time) | Media | Media |
| App mobile motorista | Media | Alta |
| Exportacao de relatorios PDF | Media | Baixa |
| Multi-tenant (varias prefeituras) | Baixa | Alta |

#### Longo Prazo (6-12 meses)
| Funcionalidade | Prioridade | Complexidade |
|----------------|------------|--------------|
| Machine Learning preditivo | Media | Alta |
| Integracao com ERPs municipais | Baixa | Alta |
| App nativo iOS/Android | Baixa | Alta |

### 4.2 Pontos Ainda em Aberto

| Area | Questao em Aberto | Impacto |
|------|-------------------|---------|
| **Sensores** | Modelo exato de sensor a utilizar | Custo e precisao |
| **Comunicacao** | LoRaWAN vs NB-IoT vs 4G | Cobertura e custo |
| **Alimentacao** | Solar vs bateria vs rede | Manutencao |
| **Integracao** | APIs de sistemas municipais existentes | Interoperabilidade |
| **Seguranca** | Politicas de acesso e LGPD | Compliance |

---

## 5. DETALHAMENTO DAS LACUNAS ESPECIFICAS

### 5.1 Quantidade de Caminhoes Envolvidos

**Cenario do Piloto (Campus PUC Campinas):**

| Parametro | Valor Estimado | Justificativa |
|-----------|----------------|---------------|
| Area do campus | ~1 km² | Perimetro aproximado |
| Total de lixeiras | 50-100 | Estimativa baseada em pontos de coleta |
| Caminhoes necessarios | 1-2 | Suficiente para a area |
| Frequencia atual | Diaria | Padrao municipal |
| Frequencia otimizada | 2-3x/semana | Baseada em dados |

**Escala para Cidade Inteira (Campinas):**

| Parametro | Valor Estimado | Fonte |
|-----------|----------------|-------|
| Populacao | ~1.2 milhao | IBGE 2024 |
| Area urbana | ~388 km² | Prefeitura |
| Lixeiras publicas | ~5.000-10.000 | Estimativa |
| Caminhoes atuais | ~50-80 | Estimativa frota municipal |
| Reducao esperada | 20-30% | Estudos de caso similares |

**Nota:** Numeros precisos dependem de levantamento junto a Prefeitura de Campinas.

### 5.2 Tecnologias IoT Disponiveis/Utilizadas

#### Sensores de Nivel (Preenchimento)

| Tecnologia | Vantagens | Desvantagens | Custo Unit. |
|------------|-----------|--------------|-------------|
| **Ultrasonico** (escolhido) | Preciso, duravel, baixo consumo | Afetado por umidade | $15-30 |
| Infravermelho | Barato, rapido | Pouco preciso para residuos | $5-15 |
| Radar | Muito preciso | Caro, complexo | $50-100 |
| Peso (celula de carga) | Preciso | Instalacao complexa | $30-60 |

**Justificativa da Escolha:** Sensores ultrasonicos oferecem melhor relacao custo-beneficio para o contexto municipal, com precisao de +/-2cm e durabilidade comprovada.

#### Conectividade

| Tecnologia | Alcance | Consumo | Custo Mensal | Uso |
|------------|---------|---------|--------------|-----|
| **LoRaWAN** (primario) | 2-15 km | Muito baixo | Gratuito* | Areas urbanas |
| **NB-IoT** (backup) | Cobertura celular | Baixo | R$5-15/mes | Fallback |
| 4G/LTE | Cobertura celular | Alto | R$20-50/mes | Casos especiais |
| WiFi | 50-100m | Medio | Gratuito | Locais especificos |

*LoRaWAN requer infraestrutura propria (gateways) ou parceria com operador.

#### Arquitetura IoT Proposta

```
[Sensor Ultrasonico] --> [Modulo LoRa/NB-IoT] --> [Gateway/Torre]
                                                        |
                                                        v
                                              [Azure IoT Hub]
                                                        |
                                                        v
                                              [Plataforma Central]
```

### 5.3 Estrategia de Escala

#### Fase 1: Piloto (Meses 1-6)
- **Escopo:** Campus PUC Campinas
- **Lixeiras:** 50-100 unidades
- **Objetivo:** Validar tecnologia e processos
- **Investimento:** ~R$50.000-100.000
- **Metricas de Sucesso:**
  - Reducao de 15% em coletas desnecessarias
  - 95% uptime do sistema
  - Satisfacao dos operadores

#### Fase 2: Bairro (Meses 6-12)
- **Escopo:** 1-2 bairros de Campinas
- **Lixeiras:** 500-1.000 unidades
- **Objetivo:** Testar escalabilidade
- **Investimento:** ~R$200.000-400.000
- **Desafios:** Vandalismo, conectividade, manutencao

#### Fase 3: Cidade (Meses 12-24)
- **Escopo:** Toda area urbana de Campinas
- **Lixeiras:** 5.000-10.000 unidades
- **Objetivo:** Operacao em larga escala
- **Investimento:** ~R$2.000.000-5.000.000
- **Requisitos:** Parcerias publico-privadas, licitacao

#### Fase 4: Expansao Regional (Apos 24 meses)
- **Escopo:** Outras cidades da RMC
- **Modelo:** Franquia ou licenciamento
- **Objetivo:** Replicacao e sustentabilidade

#### Metricas de Escalabilidade Tecnica

| Parametro | Piloto | Cidade | Regional |
|-----------|--------|--------|----------|
| Lixeiras | 100 | 10.000 | 100.000 |
| Mensagens/dia | 10.000 | 1.000.000 | 10.000.000 |
| Armazenamento/mes | 1 GB | 100 GB | 1 TB |
| Custo Cloud/mes | R$200 | R$5.000 | R$50.000 |

---

## 6. MODELO DE FINANCIAMENTO

### 6.1 Quem Paga?

#### Modelo Primario: Publico com Parcerias Privadas

```
+-------------------+     +-------------------+     +-------------------+
|   SETOR PUBLICO   |     |  SETOR PRIVADO    |     |    ACADEMIA       |
+-------------------+     +-------------------+     +-------------------+
| - Prefeitura      |     | - Fornecedores    |     | - Universidades   |
|   (CAPEX/OPEX)    |     |   de sensores     |     |   (P&D)           |
| - Estado (FAPESP) |     | - Telecom         |     | - Incubadoras     |
| - Federal         |     |   (conectividade) |     |   (apoio)         |
|   (BNDES, FINEP)  |     | - Integradoras    |     |                   |
+-------------------+     +-------------------+     +-------------------+
```

#### Fontes de Financiamento Potenciais

| Fonte | Tipo | Valor Potencial | Aplicacao |
|-------|------|-----------------|-----------|
| **Prefeitura Campinas** | Orcamento municipal | R$500K-2M | CAPEX + OPEX |
| **FAPESP** | Pesquisa aplicada | R$100K-500K | P&D e piloto |
| **BNDES** | Financiamento | R$1M-10M | Escala |
| **FINEP** | Inovacao | R$500K-2M | Desenvolvimento |
| **Parcerias Privadas** | Contrapartida | Variavel | Equipamentos |
| **PPP** | Concessao | Variavel | Operacao |

### 6.2 Tipos de Retorno

#### Retorno Financeiro (Economia)

| Item | Valor Anual Estimado | Premissas |
|------|---------------------|-----------|
| Reducao de combustivel | R$200.000-500.000 | -25% em viagens |
| Reducao de manutencao | R$100.000-200.000 | -20% desgaste frota |
| Otimizacao de mao de obra | R$300.000-600.000 | -30% horas extras |
| **Total Economia/ano** | **R$600.000-1.300.000** | Cenario conservador |

**ROI Estimado:** 2-4 anos para recuperar investimento inicial do piloto municipal.

#### Retorno Social

| Beneficio | Impacto | Indicador |
|-----------|---------|-----------|
| Saude publica | Menos vetores de doencas | Reducao de denuncias |
| Qualidade de vida | Cidade mais limpa | Pesquisas de satisfacao |
| Educacao ambiental | Consciencia sobre residuos | Engajamento cidadao |
| Emprego qualificado | Tecnologia vs. braco | Capacitacao de equipes |

#### Retorno Politico/Institucional

| Beneficio | Descricao |
|-----------|-----------|
| **Imagem de Inovacao** | Campinas como referencia em Smart Cities |
| **Compliance** | Atendimento a Politica Nacional de Residuos |
| **Transparencia** | Dados abertos sobre gestao de residuos |
| **Replicabilidade** | Modelo para outras cidades brasileiras |
| **Parcerias** | Atracao de investimentos em tecnologia |

### 6.3 Modelo de Sustentabilidade

```
ANO 1-2: Investimento publico + grants de pesquisa
    |
    v
ANO 2-3: Economia operacional cobre OPEX parcialmente
    |
    v
ANO 3-4: Autossustentavel com economia gerada
    |
    v
ANO 4+: Expansao com recursos proprios ou PPP
```

---

## 7. ARQUITETURA TECNICA (RESUMO)

### 7.1 Diagrama de Alto Nivel

```
+------------------------------------------------------------------+
|                        SMART WASTE SYSTEM                         |
+------------------------------------------------------------------+
|                                                                    |
|  +------------+    +------------+    +------------+               |
|  |  SENSORES  |    |  GATEWAY   |    |   CLOUD    |               |
|  |  (Campo)   |--->|   (LoRa)   |--->|  (Azure)   |               |
|  +------------+    +------------+    +------+-----+               |
|                                             |                      |
|                    +------------------------+                      |
|                    |                        |                      |
|              +-----v-----+           +------v------+              |
|              |  BACKEND  |           |  FRONTEND   |              |
|              |  (FastAPI)|<--------->|   (React)   |              |
|              +-----------+           +-------------+              |
|                                                                    |
+------------------------------------------------------------------+
```

### 7.2 Componentes do MVP

| Camada | Tecnologia | Status |
|--------|------------|--------|
| Sensores | Mock data | Simulado |
| Gateway | N/A | Nao implementado |
| Cloud | Local dev | Planejado Azure |
| Backend | FastAPI | ✅ Funcional |
| Frontend | React | ✅ Funcional |
| Banco de Dados | Mock | Planejado PostgreSQL |

---

## 8. PROXIMOS PASSOS

### 8.1 Imediato (Proximo mes)

1. [ ] Finalizar documentacao para banca
2. [ ] Preparar apresentacao visual (slides)
3. [ ] Gravar video demonstrativo do MVP
4. [ ] Consolidar feedback do orientador

### 8.2 Pos-Banca (Se aprovado)

1. [ ] Buscar parceria com Prefeitura de Campinas
2. [ ] Submeter projeto ao edital FAPESP/PIPE
3. [ ] Implementar integracao real com sensores
4. [ ] Desenvolver app mobile para motoristas

---

## 9. CONCLUSAO

O Smart Waste Management System representa uma aplicacao pratica e relevante de tecnologias de IoT e Smart Cities para resolver um problema real e significativo da gestao urbana brasileira.

**Pontos Fortes:**
- MVP funcional demonstrando viabilidade tecnica
- Arquitetura escalavel e bem documentada
- Problema relevante com impacto social e economico mensuravel
- Stack tecnologico moderno e adequado

**Pontos de Atencao:**
- Dependencia de parcerias para sensores reais
- Necessidade de validacao em campo
- Modelo de financiamento ainda conceitual

**Visao de Futuro:**
Tornar Campinas uma referencia em gestao inteligente de residuos, contribuindo para uma cidade mais limpa, eficiente e sustentavel.

---

## ANEXOS

- **Anexo A:** Codigo-fonte no GitHub (repositorio privado)
- **Anexo B:** Documentacao tecnica detalhada (`/docs/`)
- **Anexo C:** Diagramas e fluxos (`/docs/diagrams-and-blocks-for-word.md`)
- **Anexo D:** Arquitetura Azure (`/docs/plans/2026-02-19-azure-cloud-architecture-design.md`)

---

*Documento gerado em Fevereiro de 2026*
*Versao 1.0*
