// cypress/e2e/api/k6-data-setup.cy.js
import { faker } from '@faker-js/faker';
import { generateUserPayloadCreate } from '../factories/createUserPayload';

describe('Setup para k6 - Criação de usuários', () => {
  it('Gerar usuários aleatórios para teste de carga', () => {
    const apiUrl = 'https://serverest.dev';
    const endPoint = '/usuarios';
    
    // Gerar array de usuários
    const users = Array(10).fill().map(() => {
      const userData = {
        nome: faker.person.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        administrador: "true"
      };
      
      return generateUserPayloadCreate(
        userData.nome,
        userData.email,
        userData.password,
        userData.administrador
      );
    });

    // Salvar dados brutos para o k6
    cy.writeFile('cypress/k6/data/users.json', users);

    // Opcional: Criar usuários na API (se necessário)
    users.forEach(user => {
      cy.request({
        method: 'POST',
        url: `${apiUrl}${endPoint}`,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: user,
        failOnStatusCode: false // Para não falhar se usuário já existir
      });
    });
  });
  
});