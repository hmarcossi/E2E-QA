class HomeAdminPage {
    homeButton() {
        return cy.get('[data-testid="home"]')
    }
    createUserButton() {
        return cy.get('[data-testid="cadastrarUsuarios"]')
    }

    listUsersButton() {
        return cy.get('[data-testid="listarUsuarios"]')
    }

    createProductButton() {
        return cy.get('[data-testid="cadastrarProdutos"]')
    }
    
    listProductsButton() {
        return cy.get('[data-testid="listarProdutos"]')
    }

    reportButton() {
        return cy.get('[data-testid="relatorios"]')
    }

    logoutButton() {
        return cy.get('[data-testid="logout"]')
    }
}

export default new HomeAdminPage()