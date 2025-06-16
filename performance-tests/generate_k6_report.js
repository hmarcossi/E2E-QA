const fs = require('fs');
const path = require('path');
const Reporter = require('k6-html-reporter');

const inputPath = path.join(__dirname, 'test_reports', 'k6', 'load_result.json');
const outputPath = path.join(__dirname, 'test_reports', 'k6');

if (!fs.existsSync(inputPath)) {
    console.error(`Erro: Arquivo de resultados K6 não encontrado em ${inputPath}. Por favor, execute 'npm run k6:run' primeiro.`);
    process.exit(1);
}


const reporterOptions = {
    jsonFile: inputPath,
    output: outputPath,
    filename: 'k6_report.html',
    title: 'ServeRest K6 Load Test Report',
};

Reporter.generate(reporterOptions);

console.log(`Relatório HTML do K6 gerado em: ${path.join(outputPath, 'k6_report.html')}`);