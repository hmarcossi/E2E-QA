const fs = require('fs');
const path = require('path');

const reportsDir = path.join(process.cwd(), 'consolidated_reports');
const outputFilePath = path.join(reportsDir, 'index.html');

const reportConfig = {
    backend: {
        name: 'Testes de API (Backend)',
        path: path.join(reportsDir, 'backend', 'backend-report.html'),
        link: './backend/backend-report.html'
    },
    frontend: {
        name: 'Testes E2E (Frontend)',
        path: path.join(reportsDir, 'frontend', 'frontend-report.html'),
        link: './frontend/frontend-report.html'
    },
    performance: {
        name: 'Testes de Carga (K6)',
        path: path.join(reportsDir, 'performance', 'k6_report.html'),
        link: './performance/k6_report.html'
    }
};

function createReportSection(report) {
    const fileExists = fs.existsSync(report.path);
    const status = fileExists ? 'SUCESSO' : 'FALHA';
    const statusColor = fileExists ? '#28a745' : '#dc3545';
    const link = fileExists ? `<a href="${report.link}" target="_blank">Ver Relatório Detalhado</a>` : 'Relatório não encontrado';

    return `
        <div class="report-card">
            <h2>${report.name}</h2>
            <div class="status">
                Status: <span class="status-badge" style="background-color: ${statusColor};">${status}</span>
            </div>
            <div class="report-link">
                ${link}
            </div>
        </div>
    `;
}


function generateDashboard() {
    console.log('Gerando dashboard consolidado...');

    const sections = Object.values(reportConfig).map(createReportSection).join('');

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Painel de Controle de Qualidade</title>
        <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; margin: 0; background-color: #f0f2f5; color: #1c1e21; }
            .container { max-width: 960px; margin: 40px auto; padding: 20px; }
            header { text-align: center; margin-bottom: 40px; }
            header h1 { color: #1877f2; font-size: 2.5em; }
            header p { color: #606770; font-size: 1.1em; }
            .reports-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
            .report-card { background-color: #fff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); padding: 25px; transition: transform 0.2s; }
            .report-card:hover { transform: translateY(-5px); }
            .report-card h2 { font-size: 1.4em; margin-top: 0; color: #333; border-bottom: 1px solid #e0e0e0; padding-bottom: 10px; margin-bottom: 15px; }
            .status { margin-bottom: 15px; font-size: 1em; }
            .status-badge { color: white; padding: 5px 12px; border-radius: 15px; font-weight: bold; font-size: 0.9em; }
            .report-link a { color: #1877f2; text-decoration: none; font-weight: bold; }
            .report-link a:hover { text-decoration: underline; }
            footer { text-align: center; margin-top: 50px; color: #90949c; font-size: 0.9em; }
        </style>
    </head>
    <body>
        <div class="container">
            <header>
                <h1>Painel de Controle de Qualidade</h1>
                <p>Resumo da execução dos testes automatizados.</p>
            </header>
            <main class="reports-grid">
                ${sections}
            </main>
            <footer>
                <p>Relatório gerado em: ${new Date().toLocaleString('pt-BR')}</p>
            </footer>
        </div>
    </body>
    </html>
    `;

    fs.writeFileSync(outputFilePath, htmlContent);
    console.log(`Dashboard consolidado gerado com sucesso em: ${outputFilePath}`);
}

generateDashboard();