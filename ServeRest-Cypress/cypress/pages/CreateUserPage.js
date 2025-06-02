class CreateUserPage {

    nameInput() {
        return cy.get('[data-testid="nome"]')
    }
    emailInput() {
        return cy.get('[data-testid="email"]')  
    }
    passwordInput() {
        return cy.get('[data-testid="password"]')
    }
    createButton() {
        return cy.get('[data-testid="cadastrarUsuario"]')
    }
    
    createButtonLoginPage() {
        return cy.get('[data-testid="cadastrar"]')
    }

    adminButton() {
        return cy.get('[data-testid="checkbox"]')
    }
    
    messageError() {
        return cy.get('.alert').contains('Email é obrigatório')
    }
    messageSuccess() {
        return cy.get('.alert').contains('Cadastro realizado com sucesso')
    }
    createUser(name, email, password) {
        this.nameInput().type(name)
        this.emailInput().type(email)
        this.passwordInput().type(password)
        this.createButton().click()
    }

    createAdmin(name, email, password) {
        this.nameInput().type(name)
        this.emailInput().type(email)
        this.passwordInput().type(password)
        this.adminButton().click()
        this.createButtonLoginPage().click()
    }
}

export default new CreateUserPage()