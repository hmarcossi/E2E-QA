// performance-tests/generate_k6_report.js
const fs = require('fs');
const path = require('path');

const repoRoot = process.cwd();
const inputPath = path.join(repoRoot, 'performance-tests', 'test_reports', 'k6', 'load_result.json');
const outputPath = path.join(repoRoot, 'performance-tests', 'test_reports', 'k6');
const htmlFileName = 'k6_report.html';
const htmlFilePath = path.join(outputPath, htmlFileName);

console.log(`Caminho esperado do JSON de entrada K6: ${inputPath}`);
console.log(`Caminho esperado do HTML de saída K6: ${htmlFilePath}`);


// Garante que o diretório de saída exista antes de qualquer operação de escrita
if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

let k6SummaryMetrics = null; // Para armazenar o objeto 'metrics' do RunStatus final
let k6IndividualMetrics = {}; // Para coletar métricas individuais se o summary não for ideal

if (!fs.existsSync(inputPath)) {
    console.error(`Erro: Arquivo de resultados K6 JSON não encontrado em ${inputPath}.`);
    const errorHtmlContent = `
        <!DOCTYPE html>
        <html>
        <head><title>Relatório K6 - JSON Não Encontrado</title></head>
        <body>
            <h1>Erro ao Gerar Relatório K6</h1>
            <p>O arquivo de resultados JSON não foi encontrado: <code>${inputPath}</code></p>
            <p>Por favor, certifique-se de que o teste de carga K6 foi executado com sucesso e gerou o arquivo JSON.</p>
            <p>Data e Hora da Geração: ${new Date().toISOString()}</p>
        </body>
        </html>
    `;
    fs.writeFileSync(htmlFilePath, errorHtmlContent);
    console.log(`Relatório de erro HTML gerado em: ${htmlFilePath}`);
    process.exit(1);
}

try {
    const rawJsonLines = fs.readFileSync(inputPath, 'utf8').split('\n');
    
    // Processa cada linha JSON
    for (let i = 0; i < rawJsonLines.length; i++) {
        const line = rawJsonLines[i];
        if (!line.trim()) continue; // Pula linhas vazias

        try {
            const data = JSON.parse(line);
            if (data.type === 'Metric') {
                // Coleta dados de métricas individuais, se o summary não tiver todos os detalhes
                if (data.data && data.data.name) {
                    k6IndividualMetrics[data.data.name] = data.data.values;
                }
            } else if (data.type === 'RunStatus' && data.data && data.data.status === 'finished') {
                // Captura o resumo final da execução, que contém as métricas agregadas
                k6SummaryMetrics = data.data.metrics;
                console.log('--- RunStatus (finished) encontrado ---');
                console.log('Métricas do RunStatus:', JSON.stringify(k6SummaryMetrics, null, 2));
            }
        } catch (e) {
            console.warn(`Aviso (linha ${i + 1}): Pulando linha não-JSON ou mal formatada. Linha: "${line.substring(0, 100)}..." Erro: ${e.message}`);
        }
    }

} catch (e) {
    console.error(`Erro ao ler o arquivo de resultados K6 JSON Lines em ${inputPath}:`, e);
    const errorHtmlContent = `
        <!DOCTYPE html>
        <html>
        <head><title>Relatório K6 - Erro de Leitura/Parsing</title></head>
        <body>
            <h1>Erro ao Gerar Relatório K6</h1>
            <p>Não foi possível ler ou parsear o arquivo JSON de resultados (JSON Lines) em: <code>${inputPath}</code></p>
            <p>Detalhes do erro: ${e.message}</p>
            <p>Verifique o formato do arquivo.</p>
            <p>Data e Hora da Geração: ${new Date().toISOString()}</p>
        </body>
        </html>
    `;
    fs.writeFileSync(htmlFilePath, errorHtmlContent);
    console.log(`Relatório de erro HTML gerado em: ${htmlFilePath}`);
    process.exit(1);
}

// --- Extração de Métricas (Priorizando k6SummaryMetrics) ---
// Usar k6SummaryMetrics se disponível, caso contrário, tentar k6IndividualMetrics
const getFinalMetricValue = (metricName, key, decimals = 2, multiplier = 1) => {
    let value = 'N/A';
    if (k6SummaryMetrics && k6SummaryMetrics[metricName] && typeof k6SummaryMetrics[metricName].values[key] === 'number') {
        value = k6SummaryMetrics[metricName].values[key];
    } else if (k6IndividualMetrics[metricName] && typeof k6IndividualMetrics[metricName][key] === 'number') {
         // Fallback para métricas individuais se não estiverem no summary (menos comum para avg, p95, rate finais)
        value = k6IndividualMetrics[metricName][key];
    }

    if (typeof value === 'number') {
        return (value * multiplier).toFixed(decimals);
    }
    return value;
};

// Captura a duração do teste do RunStatus, se houver
const testRunDurationMs = k6SummaryMetrics && k6SummaryMetrics.vus && k6SummaryMetrics.vus.values && typeof k6SummaryMetrics.vus.values.duration === 'number'
    ? (k6SummaryMetrics.vus.values.duration / 1000).toFixed(2)
    : 'N/A';

const httpReqDurationAvg = getFinalMetricValue('http_req_duration', 'avg');
const httpReqDurationP95 = getFinalMetricValue('http_req_duration', 'p(95)');
const httpReqsCount = getFinalMetricValue('http_reqs', 'count', 0);
const httpReqsRate = getFinalMetricValue('http_reqs', 'rate');
const httpReqFailedRate = getFinalMetricValue('http_req_failed', 'rate', 4, 100); // Para converter para porcentagem
const vusMax = getFinalMetricValue('vus', 'value', 0); // VUS final, não a duração total

// --- Determinar o status do teste com base nos thresholds ---
let testStatus = 'UNKNOWN';
let statusColor = '#6c757d'; // Gray (unknown)

const p95Value = parseFloat(httpReqDurationP95);
const failedRateValue = parseFloat(httpReqFailedRate);

const thresholdDurationPassed = p95Value !== 'N/A' && !isNaN(p95Value) && p95Value < 500;
const thresholdFailedPassed = failedRateValue !== 'N/A' && !isNaN(failedRateValue) && failedRateValue < 1; // 1%

if (p95Value === 'N/A' || failedRateValue === 'N/A' || isNaN(p95Value) || isNaN(failedRateValue)) {
    testStatus = 'INCOMPLETO/ERRO';
    statusColor = '#ffc107'; // Yellow (warning)
} else if (thresholdDurationPassed && thresholdFailedPassed) {
    testStatus = 'PASSED';
    statusColor = '#28a745'; // Green
} else {
    testStatus = 'FAILED';
    statusColor = '#dc3545'; // Red
}


// --- Conteúdo HTML do relatório ---
const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <title>Relatório de Performance K6</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background-color: #f4f4f4; color: #333; line-height: 1.6; }
        .container { max-width: 900px; margin: auto; background-color: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h1 { color: #0056b3; text-align: center; margin-bottom: 30px; border-bottom: 2px solid #eee; padding-bottom: 15px; }
        h2 { color: #0056b3; border-bottom: 1px solid #eee; padding-bottom: 5px; margin-top: 25px; }
        table { width: 100%; border-collapse: collapse; margin-top: 15px; }
        th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
        th { background-color: #e9e9e9; font-weight: bold; }
        .summary-box { background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 20px; border: 1px solid #eee; }
        .status-badge { display: inline-block; padding: 5px 10px; border-radius: 5px; font-weight: bold; color: white; background-color: ${statusColor}; }
        .metric-value { font-weight: bold; color: #555; }
        .pass-status { color: #28a745; font-weight: bold; }
        .fail-status { color: #dc3545; font-weight: bold; }
        .warn-status { color: #ffc107; font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Relatório de Performance K6</h1>

        <div class="summary-box">
            <p><strong>Status Geral do Teste:</strong> <span class="status-badge">${testStatus}</span></p>
            <p><strong>Duração do Teste:</strong> <span class="metric-value">${testRunDurationMs}</span> segundos</p>
            <p><strong>Usuários Virtuais (VUs) Máximos:</strong> <span class="metric-value">${vusMax}</span></p>
            <p><strong>Requisições Totais:</strong> <span class="metric-value">${httpReqsCount}</span></p>
            <p><strong>Taxa de Requisições:</strong> <span class="metric-value">${httpReqsRate}</span> req/s</p>
            <p>Data e Hora da Geração: ${new Date().toLocaleString()}</p>
        </div>

        <h2>Métricas de Requisição HTTP</h2>
        <table>
            <thead>
                <tr>
                    <th>Métrica</th>
                    <th>Média</th>
                    <th>P95 (95º Percentil)</th>
                    <th>Taxa de Falha</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>'http_req_duration' (p95)</td>
                    <td><span class="metric-value">${httpReqDurationAvg}</span></td>
                    <td><span class="metric-value">${httpReqDurationP95}</span></td>
                    <td><span class="metric-value">${httpReqFailedRate}</span>%</td>
                </tr>
            </tbody>
        </table>

        <h2>Thresholds Definidos</h2>
        <table>
            <thead>
                <tr>
                    <th>Métrica</th>
                    <th>Limite</th>
                    <th>Valor Atual</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>'http_req_duration' (p95)</td>
                    <td>&lt;500ms</td>
                    <td><span class="metric-value">${httpReqDurationP95}</span>ms</td>
                    <td class="${thresholdDurationPassed ? 'pass-status' : 'fail-status'}">${thresholdDurationPassed ? 'PASS' : 'FAIL'}</td>
                </tr>
                <tr>
                    <td>'http_req_failed' (rate)</td>
                    <td>&lt;1%</td>
                    <td><span class="metric-value">${httpReqFailedRate}</span>%</td>
                    <td class="${thresholdFailedPassed ? 'pass-status' : 'fail-status'}">${thresholdFailedPassed ? 'PASS' : 'FAIL'}</td>
                </tr>
            </tbody>
        </table>
        <p style="font-style: italic; margin-top: 20px;">Nota: Este relatório é gerado a partir dos resultados JSON do K6. Para detalhes completos, consulte o arquivo 'load_result.json'.</p>
    </div>
</body>
</html>
`;

fs.writeFileSync(htmlFilePath, htmlContent);
console.log(`Relatório HTML do K6 gerado em: ${htmlFilePath}`);