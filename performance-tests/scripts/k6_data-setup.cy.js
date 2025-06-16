import { faker } from '@faker-js/faker';
import { generateUserPayloadCreate } from '../../factories/createUserPayload';

describe('Setup para k6 - Criação de usuários', () => {
  it('Gerar usuários aleatórios para teste de carga', () => {
    const apiUrl = 'https://serverest.dev';
    const endPoint = '/usuarios';
    
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

    cy.writeFile('../data/users.json', users);

    users.forEach(user => {
      cy.request({
        method: 'POST',
        url: `${apiUrl}${endPoint}`,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: user,
        failOnStatusCode: false
      });
    });
  });
  
});