/*
------------------- CENÁRIO DE TESTE -------------------
Realizar login e pegar o token do usuário

Criterios aplicados:
    - Carga de 500 VUs (virtual users) por 5min

Validações:
    - Status code 200
    - Tempo requisicao p(95) < 500ms
    - requisicao com falha < 1%
    - Usuario logado com sucesso - msg de erro não pode ser 'Email e/ou senha inválidos'
    - Tempo de resposta < 500
*/

import http from 'k6/http';
import { check } from 'k6';
// import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

// // Função para gerar relatório HTML
// export function handleSummary(data) {
//   return {
//     "./cypress/test_reports/k6/load_result.html": htmlReport(data),
//   };
// }

// Carrega os usuários do arquivo gerado pelo Cypress
const users = JSON.parse(open('../../k6/data/users.json'));

export const options = {
  vus: 5,          // Usuários virtuais
  duration: '30s',   // Duração do teste
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% das requisições devem ser <500ms
  }
};

export default function () {
  // Seleciona um usuário e extrai apenas email e senha
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

  const res = http.post('https://serverest.dev/login', payload, params);
  
  check(res, {
    'Login bem-sucedido': (r) => r.status === 200,
    'Token retornado': (r) => JSON.parse(r.body).authorization !== undefined,
    'Email e/ou senha inválidos': (r) => JSON.parse(r.body).message !== 'Email e/ou senha inválidos',
    'Tempo de resposta': (r) => r.timings.duration < 500,
  });
}