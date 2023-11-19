/* global cy, describe, it, expect */ // declare globals for eslint

describe('Vendor Product Control', () => {
    it('Should register a new product successfully', () => {
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

        // adicionar categoria
        cy.get('[data-testid="product-category-input"]').click();
        cy.get('.option-label input[type="checkbox"]').first().check();
        cy.get('.category-modal .add').click();

        // adicionar imagem
        cy.get('[data-testid="product-image-input"]').attachFile('test-image.png');

        // salvar
        cy.get('[data-testid="product-save-button"]').click();

        // wait for the response from the API and check the status code
        cy.wait('@createProduct').then(({ response }) => {
            expect(response.statusCode).to.equal(201);
        });
    });

    it('Should update a product successfully', () => {
        // intercept declaration
        cy.intercept('PUT', 'http://localhost:3030/api/product/*').as('updateProduct');      

        // go to vendor panel
        cy.login('vendor1@biz.com', '123456');

        // visits products page
        cy.wait(500);
        cy.visit('localhost:3000/#/vendor-products');

        // edit the last product in the list
        cy.get('[data-testid="edit-product-button"]').last().click();

        // Preenche os detalhes do produto
        cy.get('[data-testid="product-name-input"]').clear().type('Produto Teste Editado');
        cy.get('[data-testid="product-description-input"]').clear().type('Descrição do Produto Teste Editado');
        cy.get('[data-testid="product-price-input"]').clear().type('100');
        cy.get('[data-testid="product-quantity-input"]').clear().type('100');

        // adicionar categoria
        cy.get('[data-testid="product-category-input"]').click();
        // add second category
        cy.get('.option-label input[type="checkbox"]').eq(1).check();
        cy.get('.category-modal .add').click();

        // salvar
        cy.get('[data-testid="product-save-button"]').click();

        // wait for the response from the API and check the status code
        cy.wait('@updateProduct').then(({ response }) => {
            expect(response.statusCode).to.equal(204);
        });

    });

    it('Should delete a product successfully', () => {
        // intercept declaration
        cy.intercept('DELETE', 'http://localhost:3030/api/product/*').as('deleteProduct');      

        // go to vendor panel
        cy.login('vendor1@biz.com', '123456');

        // visits products page
        cy.wait(500);
        cy.visit('localhost:3000/#/vendor-products');

        // delete the last product in the list
        cy.get('[data-testid="delete-product-button"]').last().click();
        
        cy.get('[data-testid="delete-product-confirm"]').click();

        // wait for the response from the API and check the status code
        cy.wait('@deleteProduct').then(({ response }) => {
            expect(response.statusCode).to.equal(204);
        });
    });

    it('Should list the products with a category filter', () => {
        // go to vendor panel
        cy.login('vendor1@biz.com', '123456');

        // visits products page
        cy.wait(500);
        cy.visit('localhost:3000/#/vendor-products');

        // filter by category
        cy.get('[data-testid="filter-button"]').click();
        cy.get('.option-label input[type="checkbox"]').first().check();

        cy.get('.option-label input[type="checkbox"]').first().parent().invoke('text').then((categoryName) => {
            console.log(categoryName);
    
            cy.get('.category-modal .add').click();
    
            // Verifica se a lista tem apenas produtos com a categoria selecionada
            cy.get('[data-testid="product-category"]').each(($el) => {
                cy.wrap($el).should('contain', categoryName.trim());
            });
        });
    });
});
