# Digital City

Projeto com backend FastAPI (Python) e frontend React (Vite).

## Pré-requisitos

- **Python 3** (com `pip`) – [python.org](https://www.python.org/downloads/)
- **Node.js 18+** (com `npm`) – [nodejs.org](https://nodejs.org/)

## Configuração e execução

### 1. Instalar dependências

No PowerShell, na pasta do projeto:

```powershell
.\install.ps1
```

Isso instala:
- Backend: FastAPI, Uvicorn, python-dotenv
- Frontend: dependências do `package.json`

### 2. Iniciar o projeto

```powershell
.\start.ps1
```

Serão abertas duas janelas:
- **Backend** em http://localhost:8000  
- **Frontend** em http://localhost:3000  

Acesse a aplicação em **http://localhost:3000**.

### Execução manual

**Backend:**
```powershell
cd backend-python
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```
(ou use `py` em vez de `python` se for o caso no seu sistema.)

**Frontend** (em outro terminal):
```powershell
cd frontend-react
npm run dev
```

## Variáveis de ambiente (backend)

O arquivo `backend-python\.env` já foi criado a partir de `.env.example`.  
Variáveis disponíveis: `PORT`, `ALLOWED_ORIGINS`.
