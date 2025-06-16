import { faker } from '@faker-js/faker';
import {generateUserPayloadCreate} from '../factories/createUserPayload'

describe('Testes E2E Backend', () => {
    const apiUrl = `${Cypress.env("serverest").apiUrl}`;
    const endPoint = "/usuarios";

    const nome = faker.person.firstName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    let administrador = "false";

    it('Criar usuário com sucesso', () => {
        
        let payload = generateUserPayloadCreate(nome, email, password, administrador);
        
        cy.createUser(apiUrl, endPoint, payload)
        .then((response) => {

            expect(response.status).to.eq(201);
            expect(response.body.message).to.eq('Cadastro realizado com sucesso');
            expect(response.body._id).to.have.length(16);
        })
    })
    it('Criar usuário sem nome', () => {

        let payload = generateUserPayloadCreate('', email, password, administrador);

        cy.createUser(apiUrl, endPoint, payload)
        .then((response) => {

            expect(response.status).to.eq(400);
            expect(response.body.nome).to.eq('nome não pode ficar em branco');
        })
    })
    it('Criar usuário sem email', () => {

        let payload = generateUserPayloadCreate(nome, '', password, administrador);

        cy.createUser(apiUrl, endPoint, payload)
        .then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.email).to.eq('email não pode ficar em branco');
        })
    })
    it('Criar usuário sem senha', () => {
        let payload = generateUserPayloadCreate(nome, email, '', administrador);

        cy.createUser(apiUrl, endPoint, payload)
        .then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.password).to.eq('password não pode ficar em branco');
        })
    })
})
