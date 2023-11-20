/* global cy, describe, it */ // declare globals for eslint

describe('Vendor Product Control', () => {
    it('Should not register a product without category', () => {
        // intercept declaration
        cy.intercept('POST', 'http://localhost:3030/api/product').as('createProduct');      

        // login as vendor
        cy.login('vendor1@biz.com', '123456');

        // visits products page
        cy.wait(500);
        cy.visit('localhost:3000/#/vendor-products');

        // click add product button
        cy.get('[data-testid="add-product-button"]').click();

        // Preenche os detalhes do produto
        const randomNumber = Math.floor(Math.random() * 1000);
        cy.get('[data-testid="product-name-input"]').type('Produto Teste ' + randomNumber);
        cy.get('[data-testid="product-description-input"]').type('Descrição do Produto Teste');
        cy.get('[data-testid="product-price-input"]').type(randomNumber);
        cy.get('[data-testid="product-quantity-input"]').type('50');

        // nao adicionar categoria

        // adicionar imagem
        cy.get('[data-testid="product-image-input"]').attachFile('test-image.png');

        // salvar
        cy.get('[data-testid="product-save-button"]').click();

        // should not call api
        cy.get('@createProduct').should('not.exist');
    });

    it('Should not update a product without category', () => {
        // intercept declaration
        cy.intercept('PUT', 'http://localhost:3030/api/product/*').as('updateProduct');      

        // go to vendor panel
        cy.login('vendor1@biz.com', '123456');

        cy.wait(500);
        // visits products page
        cy.visit('localhost:3000/#/vendor-products');
        
        // edit the last product in the list
        cy.get('[data-testid="edit-product-button"]').last().click({ force: true });

        // product details
        cy.get('[data-testid="product-name-input"]').clear().type('Produto Teste Editado');
        cy.get('[data-testid="product-description-input"]').clear().type('Descrição do Produto Teste Editado');
        cy.get('[data-testid="product-price-input"]').clear().type('100');
        cy.get('[data-testid="product-quantity-input"]').clear().type('100');

        // clear category
        cy.get('[data-testid="product-category-input"]').click();
        cy.get('.category-modal .add').click();

        // salvar
        cy.get('[data-testid="product-save-button"]').click();

        // wait for the response from the API and check the status code
        cy.get('@updateProduct').should('not.exist');
    });
});