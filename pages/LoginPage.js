import createUserPage from "./CreateUserPage"
import loginPage from "./LoginPage"
import { faker } from "@faker-js/faker"

//Dados do Admin
const nomeAdmin = faker.person.firstName();
const emailAdmin = faker.internet.email();
const passAdmin = faker.internet.password();

class LoginPage {
    
    acessar(){
        cy.visit('https://front.serverest.dev/')
    }

    preencheEmail(email){
        cy.get('[data-testid="email"]').type(email)
    }

    preencheSenha(senha){
        cy.get('[data-testid="senha"]').type(senha)
    }

    submeteLogin(){
        cy.get('[data-testid="entrar"]').click()
    }

    createUserButton() {
        return cy.get('[data-testid="cadastrar"]')
    }
 
    realizaLogin(email, senha){
        this.preencheEmail(email)
        this.preencheSenha(senha)
        this.submeteLogin()
    }    

}


export default new LoginPage()