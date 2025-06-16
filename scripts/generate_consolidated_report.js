const fs = require('fs');
const path = require('path');

const consolidatedReportDir = 'consolidated_reports';
const outputPath = path.join(__dirname, '..', consolidatedReportDir);
const indexPath = path.join(outputPath, 'index.html');

const backendReportPath = 'mochawesome-report/backend-report.html';
const frontendReportPath = 'mochawesome-report/frontend-report.html';
const k6ReportPath = 'performance-tests/test_reports/k6/k6_report.html';


if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <title>Relatório Consolidado de Testes ServeRest</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; background-color: #f0f2f5; color: #333; }
        .container { max-width: 800px; margin: auto; background-color: #fff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
        h1 { color: #2c3e50; text-align: center; margin-bottom: 30px; border-bottom: 2px solid #eee; padding-bottom: 15px; }
        ul { list-style: none; padding: 0; }
        li { margin-bottom: 15px; background-color: #e9f0f7; padding: 15px; border-radius: 8px; border-left: 5px solid #3498db; }
        li a { text-decoration: none; color: #2980b9; font-weight: bold; font-size: 1.1em; }
        li a:hover { text-decoration: underline; color: #21618c; }
        .footer { text-align: center; margin-top: 40px; font-size: 0.9em; color: #7f8c8d; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Relatório Consolidado de Testes ServeRest</h1>
        <ul>
            <li><a href="./backend/backend-report.html" target="_blank">Relatório de Testes Backend (API)</a></li>
            <li><a href="./frontend/frontend-report.html" target="_blank">Relatório de Testes Frontend (E2E)</a></li>
            <li><a href="./performance/k6_report.html" target="_blank">Relatório de Testes de Performance (K6)</a></li>
        </ul>
        <div class="footer">
            Gerado por GitHub Actions
        </div>
    </div>
</body>
</html>
`;

fs.writeFile(indexPath, htmlContent, (err) => {
    if (err) {
        console.error("Erro ao escrever o relatório consolidado:", err);
        process.exit(1);
    }
    console.log(`Relatório consolidado gerado em: ${indexPath}`);
});