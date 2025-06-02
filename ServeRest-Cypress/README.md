# ServeRest Automation Suite

![k6](https://img.shields.io/badge/k6-load%20testing-blue)
![Cypress](https://img.shields.io/badge/Cypress-E2E%20testing-brightgreen)

Projeto de automação completo para a API ServeRest, combinando:
- **Testes E2E** com Cypress (Frontend e API)
- **Testes de Carga** com k6
- **CI/CD** integrado via GitHub Actions

## ⚙️ Pré-requisitos
- Node.js v18+
- npm v9+
- Cypress v12+
- Acesso a:
  - Frontend: `https://front.serverest.dev`
  - API: `https://serverest.dev`
  - Docker img (paulogoncalvesbh/serverest:latest)

## 🛠 Instalação
```bash
# Instalar dependências
npm install

# Instalar Cypress
npm install cypress --save-dev
```

## ▶️ Execução dos Testes
```bash
# Executar testes em modo interativo
npm run open:dev

# Executar todos os testes headless
npm run headless:dev

# Executar apenas os testes de API
npm run api:dev

# Executar apenas os testes de Frontend
npm run ui:dev

# Executar os testes de carga
npm run k6:setup  # Geração de massas de dados
npm run k6:run    # Execução dos testes de carga
```

## 📂 Estrutura de Diretórios
```bash
├── cypress/
│   ├── config/             # Configurações de ambiente
│   ├── e2e/
│   │   ├── backend/        # Testes de API
│   │   └── frontend/       # Testes de Frontend
│   ├── factories/
│   ├── k6/                 # Testes de carga com K6
│   │   ├── data/           # Massas de dados
│   │   └── scripts/        # Scripts de testes de carga
│   ├── pages/              # Page Objects
│   └── support/            # Suport API e helpers
├── cypress.config.js
├── README.md
├── package.json
└── package-lock.json
```

## 🔧 CI/CD Pipeline
O fluxo automatizado no GitHub Actions executa:

1. Testes Cypress em paralelo:
- Suite de BackEnd
- Suite de FrontEnd
- Suite de Carga

2. Testes de Carga com k6:
- Usa dados gerados pelo Cypress
