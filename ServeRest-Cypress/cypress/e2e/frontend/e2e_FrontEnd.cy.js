import loginPage from "../../pages/LoginPage"
import homeAdminPage from "../../pages/HomeAdminPage"
import createUserPage from "../../pages/CreateUserPage"
import creatProductPage from "../../pages/CreatProductPage"

import { faker } from "@faker-js/faker"


describe('Testes E2E Frontend', () => {
    //Dados do Admin
    const nomeAdmin = faker.person.firstName();
    const emailAdmin = faker.internet.email();
    const passAdmin = faker.internet.password();
    //Dados do usuário
    const nomeUser = faker.person.firstName();
    const emailUser = faker.internet.email();
    const passUser = faker.internet.password();
    //Dados do produto
    const nomeProduct = faker.string.alpha(10);
    const priceProduct = faker.string.numeric(2);
    const descriptionProduct = faker.string.alpha(20);
    const amountProduct = faker.string.numeric(2);

    beforeEach(() => {
        loginPage.acessar();
    })

    it('Criar Usuário Admin com sucesso', () => {
        loginPage.createUserButton().click()
        createUserPage.createAdmin(nomeAdmin, emailAdmin, passAdmin)
        createUserPage.messageSuccess().should('be.visible')
    })

    it('Criar Usuário Admin sem email' , () => {
        loginPage.createUserButton().click()
        createUserPage.createAdmin(nomeAdmin, ' ', passAdmin)
        createUserPage.messageError().should('be.visible')
    })

    it('Login Admin com Sucesso', () => {
        loginPage.realizaLogin(emailAdmin, passAdmin)
        homeAdminPage.homeButton().should('be.visible')
    })
    it('Criar Usuário com acesso Admin - Sucesso', () => {
        loginPage.realizaLogin(emailAdmin, passAdmin)
        homeAdminPage.createUserButton().click()
        createUserPage.createUser(nomeUser, emailUser, passUser)
        
    })
    it('Criar um produto com acesso Admin - Sucesso', () => {
        loginPage.realizaLogin(emailAdmin, passAdmin)
        homeAdminPage.createProductButton().click()
        creatProductPage.createProduct(nomeProduct, priceProduct, descriptionProduct, amountProduct)
        creatProductPage.checkProduct(nomeProduct)
    })
})