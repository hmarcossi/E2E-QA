class CreatProductPage {
    nameInput() {
        return cy.get('[data-testid="nome"]')
    }
    priceInput() {
        return cy.get('[data-testid="preco"]')
    }
    descriptionInput() {
        return cy.get('[data-testid="descricao"]')
    }
    amountInput() {
        return cy.get('[data-testid="quantity"]')
    }
    imageInput() {
        return cy.get('[data-testid="imagem"]')
    }
    createButton() {
        return cy.get('[data-testid="cadastarProdutos"]')
    }
    createProduct(name, price, description, amount) {
        this.nameInput().type(name)
        this.priceInput().type(price)
        this.descriptionInput().type(description)
        this.amountInput().type(amount)
        this.createButton().click()
    }
    checkProduct(nomeProduct) {
        cy.contains('td', nomeProduct).should('be.visible')
    };
        
        
}

export default new CreatProductPage()