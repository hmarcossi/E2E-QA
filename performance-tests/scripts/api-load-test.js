import http from 'k6/http';
import { check } from 'k6';

const users = JSON.parse(open('../data/users.json'));

export const options = {
  vus: 5,
  duration: '30s',
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.80'], 
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
    'Status da requisição é 200 (Login bem-sucedido)': (r) => r.status === 200,
    'Corpo da resposta contém um token de autorização': (r) => r.json('authorization') !== undefined,
  });
}