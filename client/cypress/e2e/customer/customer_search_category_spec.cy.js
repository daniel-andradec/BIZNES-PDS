/* global cy, describe, it */ // declare globals for eslint

describe('Customer Search', () => {
    it('Should purchase a cart item successfully', () => {
        cy.visit('localhost:3000/#/');
        cy.get('[data-testid="search-box"]').type("Apple");
        cy.get('[data-testid="search-icon"]').click();

        //check if all products retrieved have the word "Apple" in their name
        cy.get('[data-testid="product-card"]').each((element) => {
            cy.wrap(element).find('[data-testid="name"]').should('contain', 'Apple');
        });
    });
});