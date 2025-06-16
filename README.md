## 🧪 ServeRest - Projeto de Automação de Testes de Qualidade
Bem-vindo ao projeto de automação de testes de qualidade para a aplicação ServeRest! Este repositório é um monorepo organizado para centralizar e gerenciar eficientemente diferentes tipos de testes, garantindo a qualidade abrangente da aplicação.

## 🎯 Visão Geral do Projeto
Este projeto tem como objetivo automatizar os testes para a aplicação ServeRest, abrangendo as camadas de API (Backend), Interface do Usuário (Frontend E2E), Performance (Carga) e Mobile. A estrutura modular permite a execução, manutenção e escalabilidade independentes de cada suíte de testes.

## 📂 Estrutura do Projeto
A organização do projeto segue uma estrutura de monorepo, onde cada tipo de teste reside em seu próprio diretório raiz, facilitando a gestão e o isolamento de dependências.
```plaintext
E2E-QA/
├── .github/                       # Configurações de CI/CD (GitHub Actions)
│   └── workflows/
│       └── tests-all.yml          # Workflow principal do GitHub Actions
├── backend-tests/                 # 🚀 Testes de API (Cypress)
│   ├── e2e_Product.cy.js          # Exemplo: Testes de produto via API
│   └── e2e_User.cy.js             # Exemplo: Testes de usuário via API
├── config/                        # ⚙️ Arquivos de configuração de ambiente (ex: dev.json)
│   └── dev.json
├── factories/                     # 🏭 Geração de massa de dados (Payloads)
├── frontend-tests/                # 💻 Testes E2E de Frontend (Cypress)
│   └── e2e_FrontEnd.cy.js         # Exemplo: Testes de fluxo do frontend
├── mobile-tests/                  # 📱 Testes Mobile (Robot Framework + Appium)
│   ├── apk/                       # Arquivos APK ou IPA do app
│   ├── resources/                 # Resources e keywords do Robot Framework
│   ├── tests/                     # Test Cases do Robot Framework
│   │   └── mobile_scenarios.robot
│   ├── .gitignore
│   ├── emulator-config.json
│   ├── README.md
│   └── requirements.txt           # Dependências Python para mobile
├── node_modules/                  # Dependências Node.js (instaladas na raiz)
├── pages/                         # 📄 Implementação do Page Object Model para frontend
│   ├── CreateUserPage.js
│   ├── CreatProductPage.js
│   ├── HomeAdminPage.js
│   └── LoginPage.js
├── performance-tests/             # 📈 Testes de Performance (K6)
│   ├── data/                      # Dados de entrada para testes de carga (ex: users.json)
│   ├── scripts/                   # Scripts de carga do K6 e setup de dados
│   │   ├── api-load-test.js
│   │   └── k6_data-setup.cy.js    # Setup de dados para K6 via Cypress
│   ├── test_reports/              # Relatórios de performance (JSON e HTML)
│   │   └── k6/
│   └── generate_k6_report.js      # Script para gerar relatório HTML do K6
├── scripts/                       # 🔧 Scripts auxiliares globais (ex: consolidação de relatórios)
│   └── generate_consolidated_report.js
├── support/                       # Suporte Cypress (comandos customizados e e2e)
│   ├── commands.js
│   └── e2e.js
├── .gitignore                     # Arquivos e diretórios a serem ignorados pelo Git
├── cypress.config.js              # Configuração centralizada do Cypress
├── package-lock.json
├── package.json                   # Gerenciador de dependências e scripts npm principal
└── README.md                      # Este arquivo
```

## 🛠️ Tecnologias Utilizadas

| Tipo de Teste | Ferramenta Principal | Linguagens | Plugins/Bibliotecas |
| ------------ | ------------ |
| Testes de API (Backend) | Cypress | JavaScript | code mochawesome, mochawesome-merge, cypress-grep|
| Testes E2E (Frontend) | Cypress | JavaScript | mochawesome, mochawesome-merge, cypress-grep, cypress-iframe |
| Testes de Performance | K6 | JavaScript | k6-html-reporter |
| Testes Mobile | Robot Framework + Appium | Python | robotframework-appiumlibrary, Appium-Python-Client |
| CI/CD | GitHub Actions | YAML | actions/checkout, actions/setup-node, actions/upload-artifact |

##🚦 Pré-requisitos
Certifique-se de ter as seguintes ferramentas instaladas em seu ambiente de desenvolvimento:
**Node.js:** Versão 18 ou superior (recomendado a mesma versão usada no CI, ex: v20).
**npm: ** Vem com o Node.js.
**Python:** Versão 3.8 ou superior (para Robot Framework/Appium).
**pip:** Gerenciador de pacotes Python.
**K6:** O executável K6.
**Appium Server:** Necessário para executar testes mobile localmente.
**Java Development Kit (JDK):** Necessário para Appium e emuladores Android.
**Android SDK / Android Studio:** Para emuladores ou dispositivos Android (para testes mobile).
**VS Code (Opcional):** Com a extensão "GitHub Local Actions" para execução local do CI.
##🚀 Como Iniciar
1. Clone o Repositório:
```plaintext
git clone https://github.com/hmarcossi/E2E-QA.git
cd E2E-QA
```
2. Instale as dependência:
Execute este comando na raiz do projeto. Ele instalará todas as dependências Node.js para Cypress e K6 (scripts auxiliares), e também as dependências Python para o módulo mobile (postinstall).
```code
npm install
```

3. Configuração de Ambiente:
Revise e ajuste o arquivo ```config/dev.json``` conforme as URLs e credenciais do seu ambiente.
Se for executar testes mobile, certifique-se de que o Appium Server está rodando e as capabilities em ```mobile-tests/resources/mobile_resources.robot``` estão configuradas para seu dispositivo/emulador. Você precisará de um arquivo ```.apk``` dentro de ```mobile-tests/apk/```.

## 🏃 Executando os Testes
Você pode executar os testes de cada módulo individualmente ou orquestrar a execução de todos a partir do package.json principal.
Execução Individual de Módulos (Local)
Todos os comandos devem ser executados a partir da raiz do projeto.

| Comando npm | Descrição |
|------------------|------------|
| npm run api:dev | 🚀 Executa todos os testes de API (Backend) em modo headless (--env ENV=dev). |
| npm run ui:dev | 💻 Executa todos os testes E2E (Frontend) em modo headless (--env ENV=dev). |
| npm run k6:setup | ⚙️ Executa o script Cypress para setup de dados para o K6. |
| npm run k6:run | 📈 Executa os testes de carga do K6 e salva o resultado em JSON. |
| npm run generate:k6-report | 📊 Gera o relatório HTML dos testes de carga K6 a partir do JSON. |
| npm run generate:backend-report | 📊 Mescla os JSONs e gera o relatório HTML consolidado para Backend. |
| npm run generate:frontend-report | 📊 Mescla os JSONs e gera o relatório HTML consolidado para Frontend. |
| npm run test:mobile | 📱 Executa os testes Mobile com Robot Framework. |
| npm run cypress | 🌐 Abre a interface gráfica do Cypress Test Runner (para depuração). |
| npm run open:dev | 🌐 Abre a interface gráfica do Cypress com o ambiente dev predefinido. |

Executando Todos os Testes (Local)
Para executar todas as suítes de teste (Backend, Frontend e Performance) sequencialmente:
```code
npm run test:all
```

## 📊 Relatórios
Este projeto gera relatórios detalhados para cada suíte de teste, além de um relatório consolidado no pipeline de CI/CD.

- **Testes de API & E2E (Cypress):**
 - Os resultados brutos (JSONs) são salvos em ```cypress-results/backend/``` e ```cypress-results/frontend/``` após cada execução de spec.
 - Para gerar os relatórios HTML finais (visualmente amigáveis), execute ```npm run generate:backend-report``` e ```npm run generate:frontend-report```. Os relatórios serão salvos em ```mochawesome-report/```.
- **Testes de Performance (K6):**
 - Os resultados JSON são salvos em ```performance-tests/test_reports/k6/load_result.json``` após npm run ```k6:run```.
 - Execute ```npm run generate:k6-report``` para gerar o relatório HTML em performance-```tests/test_reports/k6/k6_report.html```.
- **Relatório Consolidado (CI/CD):**
 - Após a execução de todos os jobs de teste no GitHub Actions, um job final (resumo-relatorios) consolida links para os relatórios individuais em um único ```index.html```.
- Este relatório consolidado é publicado como um artefato no GitHub Actions, facilitando a visualização rápida do status geral dos testes. Ele será encontrado em um diretório como ```consolidated_reports/``` dentro do artefato.

## 🌐 Integração Contínua (CI/CD)
Este projeto está configurado com GitHub Actions para automatizar a execução dos testes e a geração de relatórios.
- **Workflow**: O arquivo de workflow principal está localizado em ```.github/workflows/tests-all.yml```.
- **Gatilhos**: O pipeline é acionado em cada ```push``` e ```pull_request``` para a branch ```main```.
- **Jobs**: Inclui jobs separados para ```backend-api-tests```,```frontend-e2e-tests```, e ```performance-tests```.
- **Dependências**: Os jobs são configurados com ```needs``` para garantir a ordem de execução e dependências.
- **Relatórios Automáticos**: Os relatórios individuais (Cypress e K6) são gerados e publicados como artefatos. Um relatório HTML consolidado (```index.html```) é gerado no final, mesmo que alguns testes falhem, fornecendo uma visão geral rápida.
Você pode acompanhar o status dos builds e baixar os relatórios gerados na aba "Actions" do seu repositório GitHub.

## Análise dos Resultados e Conclusão

**Testes de Carga (load_result.json)**
Os testes foram feitos em ambiente local com 500 VUs por 5min. Para o GitHub Actions esse valor foi reduzido para evitar quebra e teste instável na pipeline (5 VUs ~ 30sec).
```plaintext
1. Problemas Identificados:
- Login e Token: 51.3% das requisições falharam (`http_req_failed: 0.512`).
2. Checks Críticos:            
	Login bem-sucedido`: 924 falhas vs. 878 passos.
    Token retornado`: 924 falhas vs. 878 passos.
3. Tempo de Resposta:
        Pico de 235ms  (aceitável, mas com falhas que sugerem instabilidade).
        Threshold Excedido:  `p(95)<500`  não atendido em  `http_req_duration`.
            
Possíveis Causas:
- Limitações de autenticação (ex: taxa de geração de tokens).
- Configuração inadequada de timeout ou concorrência.
```

**Testes de Frontend (frontend-report.json)**

```plaintext
1. Todos os 5 testes passaram (`"passes": 5`), cobrindo:
-   Criação de usuários admin/não admin.            
-   Login e navegação.            
-   Criação de produtos.
            
2.  Performance:
-  "Criar Usuário Admin" demora 2715 ms – pode indicar lentidão na renderização ou chamadas API.
                
Recomendações:
-Reduzir tempos de espera em testes (ex: usar  `cy.intercept()`  para mock de APIs).
- Incluir testes de responsividade e acessibilidade.
```

**Testes de Backend (backend-report.json)**

```plaintext
1. Todos os 11 testes passaram (`"passes": 11`), cobrindo:
- CRUD de produtos e usuários.
- Validação de campos obrigatórios (nome, email, senha).
- Gestão de tokens (ex: edição sem token retorna 401).
            
2. Duração dos Testes:
- Testes como "Editar produto com sucesso" demoram 562 ms (mais que o dobro de outros).
        
Recomendações:
- Otimização:   Investigar por que a edição de produtos é lenta (ex: consultas complexas).
- Cobertura:  Adicionar testes para limites de caracteres e valores inválidos (ex: email mal formatado)
```
