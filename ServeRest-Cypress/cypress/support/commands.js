import { generateUserPayloadCreate } from "../factories/createUserPayload";
import { generateProductPayloadCreate } from "../factories/createProductPayload";
import { Faker } from "@faker-js/faker";

Cypress.Commands.add('login', (emailUser, passUser) => {
    return cy.request({
      method: 'POST',
      url: `${Cypress.env('serverest').apiUrl}/login`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: {
          email: emailUser,
          password: passUser,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

Cypress.Commands.add('createUserGetToken', (nomeUser, emailUser, passUser, admin) => {
    const apiUrl = `${Cypress.env("serverest").apiUrl}`;
    const endPoint = "/usuarios";
    const payload = generateUserPayloadCreate(nomeUser, emailUser, passUser, admin);
    return cy.createUser(apiUrl, endPoint, payload) .then(() => {
      return cy.login(emailUser, passUser).then((response) => {
        const token = response.body['authorization']; // Extrai o token
        return Cypress.Promise.resolve({token}); // Retorna o token como uma Promise resolvida
          });
      });
    });

Cypress.Commands.add('createUser', (apiUrl, endPoint, payload) => {
      return cy.request({
        method: 'POST',
        url: `${apiUrl}${endPoint}`,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        failOnStatusCode: false,
        body: payload,
      });
    });

Cypress.Commands.add('createProduct', (token, apiUrl, endPoint, payload) => {
    return cy.request({
      method: 'POST',
      url: `${apiUrl}${endPoint}`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token,
      },
      failOnStatusCode: false,
      body: payload,
    });
});

Cypress.Commands.add('getProductId', (nomeProduct) => {
  return cy.request({
    method: 'GET',
    url: `${Cypress.env('serverest').apiUrl}/produtos?nome=${nomeProduct}`,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    failOnStatusCode: false,
  }).then((response) => {
    const idProduct = response.body.produtos[0]._id;
    return Cypress.Promise.resolve({idProduct});
  })
});

Cypress.Commands.add('getProduct', (nomeProduct) => {
  return cy.request({
    method: 'GET',
    url: `${Cypress.env('serverest').apiUrl}/produtos?nome=${nomeProduct}`,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    failOnStatusCode: false,
  })
});

Cypress.Commands.add('deleteProduct', (token, idProduct) => {
  return cy.request({
    method: 'DELETE',
    url: `${Cypress.env('serverest').apiUrl}/produtos/${idProduct}`,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': token,
    },
    failOnStatusCode: false,
  });
});

Cypress.Commands.add('updateProduct', (token, idProduct, payload) => {
  return cy.request({
    method: 'PUT',
    url: `${Cypress.env('serverest').apiUrl}/produtos/${idProduct}`,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': token,
    },
    failOnStatusCode: false,
    body: payload,
  });
});
