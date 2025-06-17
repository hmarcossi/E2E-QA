const { defineConfig } = require("cypress");
const fs = require("fs-extra");
const path = require("path");

function getConfigurationByFile(file) {
  const pathToConfigFile = path.resolve("config", `${file}.json`);

  console.log(`Tentando ler arquivo de configuração em: ${pathToConfigFile}`);
  if (!fs.existsSync(pathToConfigFile)) {
    throw new Error(`Arquivo de configuração NÃO ENCONTRADO em: ${pathToConfigFile}. Por favor, verifique o caminho e a existência do arquivo.`);
  }

  try {
    const configContent = fs.readJsonSync(pathToConfigFile);
    return configContent;
  } catch (error) {
    throw new Error(`Erro ao PARSEAR o arquivo JSON em ${pathToConfigFile}: ${error.message}. Verifique a sintaxe JSON do arquivo.`);
  }
}

module.exports = defineConfig({
  reporter: 'mochawesome',
  reporterOptions: {
    overwrite: false,
    html: false,
    json: true,
    charts: true,
    reportPageTitle: 'ServeRest Cypress Test Results',
    embeddedScreenshots: true,
    inlineAssets: true,
    quiet: true,
  },
  e2e: {
    specPattern: [
      'backend-tests/**/*.cy.js',
      'frontend-tests/**/*.cy.js',
      'performance-tests/scripts/k6_data-setup.cy.js'
    ],
    defaultCommandTimeout: 30000,
    viewportWidth: 1280,
    viewportHeight: 720,
    retries: {
      runMode: 5,
      openMode: 0
    },
    supportFile: "support/e2e.js",
    
    setupNodeEvents(on, config) {
      const environment = config.env.ENV || "dev";
      console.log(`Carregando configuração de ambiente de: config/${environment.toLowerCase()}.json`);

      const fileConfig = getConfigurationByFile(environment.toLowerCase());
      
      if (fileConfig && fileConfig.serverest) {
        config.env.serverest = fileConfig.serverest;
      } else {
        console.warn(`Aviso: O arquivo config/${environment.toLowerCase()}.json não contém a chave 'serverest' no nível superior, ou está vazio/mal formatado.`);
        throw new Error("Erro: 'config.env.serverest.baseUrl' não está definido em 'config.env.serverest'. Verifique seu arquivo de configuração de ambiente e a existência da chave 'serverest' no topo.");
      }

      if (config.env.serverest.baseUrl) {
        config.baseUrl = config.env.serverest.baseUrl;
      } else {
        throw new Error("Erro: 'config.env.serverest.baseUrl' não está definido em 'config.env.serverest'. Verifique seu arquivo de configuração de ambiente.");
      }

      if (config.env.serverest.apiUrl) {
          config.env.K6_API_URL = config.env.serverest.apiUrl;
          config.env.K6_FRONTEND_URL = config.env.serverest.baseUrl;
      } else {
          throw new Error("Erro: 'config.env.serverest.apiUrl' não está definido em 'config.env.serverest'. Verifique seu arquivo de configuração de ambiente.");
      }

      const reportGroup = config.env.CYPRESS_REPORT_GROUP;
      if (reportGroup) {
          config.reporterOptions.reportDir = `cypress-results/${reportGroup}`;
          console.log(`Relatórios Cypress JSON serão salvos em: ${config.reporterOptions.reportDir}`);
      } else {
          config.reporterOptions.reportDir = 'cypress-results/misc';
          console.warn('Aviso: CYPRESS_REPORT_GROUP não definido. Relatórios Cypress serão salvos em cypress-results/misc.');
      }

      require('cypress-grep/src/plugin')(on, config);
      
      return config;
    },
  },
  env: {
    ENV: 'dev',
  }
});