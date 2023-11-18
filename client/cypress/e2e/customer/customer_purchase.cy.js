/* global cy, describe, it, expect */ // declare globals for eslint

describe('Customer Purchase', () => {
    it('Should purchase a cart item successfully', () => {
        cy.intercept('POST', 'http://localhost:3030/api/transaction').as('purchase');
        cy.login('customer1@gmail.com', '123456');
        cy.addProductToCart();
        cy.visit('localhost:3000/#/cart');
        cy.get('[data-testid="checkout-button"]').click();
        cy.get('[data-testid="pix-button"]').click();
        cy.get('[data-testid="final-checkout-button"]').click();
        cy.wait('@purchase').then(({ response }) => {
            expect(response.statusCode).to.equal(201);
        });
    });
});
