# 🚀 Automação de Testes Mobile com Robot Framework + Appium

Projeto de automação de testes para um aplicativo de delivery de comida, utilizando Robot Framework, Appium.

## 📌 Pré-requisitos

- [Python 3.8+](https://www.python.org/downloads/)
- [Node.js](https://nodejs.org/)
- [Android Studio](https://developer.android.com/studio) (com SDK e AVD configurados)

## 🛠️ Configuração do Ambiente

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/seu-usuario/qafood-robot-appium.git
   cd qafood-robot-appium
   ```

2. **Instale as dependências**:
```bash
pip install -r requirements.txt
npm install -g appium
```

3. **Configure o emulador Android**:
```bash
Abra o Android Studio e crie um AVD (Android Virtual Device) com:
API Level: 30 (Android 11+)
Device: Pixel 4
```
## 📂 Estrutura do Projeto:

```bash
/qafood-robot-appium
├── apk/
│   └── qafood.apk           # APK do aplicativo sob teste
├── resources/               # Recursos usado no projeto
│   ├── page_objects/        # Mapeamento de elementos das telas
│   └── step_definitions/    # Keywords reutilizáveis
├── tests/                   # Arquivos de testes
│   └── fluxoe2e.robot       # Casos de teste
├── .github/workflows/       # Configuração do CI/CD
└── results/                 # Relatórios e screenshots
```

## 🔧 Como Executar os Testes Localmente
1. **Inicie o Appium**:
   ```bash
   appium --log-level debug
   ```
2. **Inicie o emulador Android**:
   ```bash
   emulator -avd <nome-do-avd>
   ```
3. **Execute os testes**:
   ```bash
   robot -d results tests/fluxo_login_test.robot
   ```
4. **Visualize os resultados**:
   ```bash
    Relatórios: results/log.html e results/report.html
    Screenshots: results/*.png
   ```

## ⚙️ CI/CD com GitHub Actions
```plaintext
Observação ao fluxo mobile: o Appium e o RobotFramework devem estar rodando localemente para executar os testes mobile.
A execução CI do mobile é muito instável ao rodar no GitHub Actions, portando é recomendado rodar localmente, Firebase Test Lab ou AWS Device Farm.
```
