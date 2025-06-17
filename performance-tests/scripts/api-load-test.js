import http from 'k6/http';
import { check } from 'k6';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import { textSummary } from 'https://js.k6.io/k6-summary/0.0.1/index.js';

const users = JSON.parse(open('../data/users.json'));

export const options = {
  vus: 5,
  duration: '30s',
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.01'],
  }
};
const BASE_API_URL = __ENV.K6_API_URL || 'https://serverest.dev';

export default function () {
  const { email, password } = users[__VU % users.length];
  
  const payload = JSON.stringify({
    email,
    password
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  };

  const res = http.post(`${BASE_API_URL}/login`, payload, params); 
  
  check(res, {
    'Login bem-sucedido': (r) => r.status === 200,
    'Token retornado': (r) => JSON.parse(r.body).authorization !== undefined,
    'Não deve retornar "Email e/ou senha inválidos"': (r) => {
        try {
            const body = JSON.parse(r.body);
            return body.message !== 'Email e/ou senha inválidos';
        } catch (e) {
            return false;
        }
    },
    'Tempo de resposta abaixo de 500ms': (r) => r.timings.duration < 500,
  });
}


export function handleSummary(data) {
  const htmlOutputPath = `./performance-tests/test_reports/k6/k6_report.html`;
  
  return {
    [htmlOutputPath]: htmlReport(data),
    'stdout': textSummary(data, { indent: ' ', enableColors: true }),
  };
}
