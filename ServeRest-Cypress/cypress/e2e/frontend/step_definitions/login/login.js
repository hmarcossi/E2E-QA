import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

Given("teste", () => {
  cy.visit("https://front.serverest.dev/login");
  // cy.contains('h1', 'Login').should('be.visible');
});

When('preencho email {string} e senha {string}', (email, senha) => {
  cy.get('[data-testid="email"]').type(email);
  cy.get('[data-testid="password"]').type(senha);
  cy.get('[data-testid="entrar"]').click();
});

Then('vejo a mensagem {string}', (mensagem) => {
  cy.contains(mensagem).should('be.visible');
});