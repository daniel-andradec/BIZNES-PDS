/* global cy, describe, it, expect, Cypress */ // declare globals for eslint

describe('Customer - Cart Control', () => {
    // set scroll behavior to false
    Cypress.config('scrollBehavior', false);
    it('Should Add Products To Cart', () => {
        cy.visit('localhost:3000/#/');

        // if there are no products, do nothing
        cy.get('[data-testid="product-card"]').then((elements) => {
            if (elements.length === 0) {
                return;
            }
        });

        // add the first two products to the cart
        cy.get('[data-testid="product-card"]').first().click();

        // if there is an option select list, select the first option
        cy.get('[data-testid="option-select"]').then((elements) => {
            if (elements.length > 0) {
                cy.get('[data-testid="option-select"]').first().select(1);
            }
        });

        cy.get('[data-testid="add-to-cart-button"]').click();

        // add the second product to the cart
        cy.visit('localhost:3000/#/');
        cy.get('[data-testid="product-card"]').eq(1).click();

        // if there is an option select list, select the first option
        cy.get('[data-testid="option-select"]').then((elements) => {
            if (elements.length > 0) {
                cy.get('[data-testid="option-select"]').first().select(1);
            }
        });

        cy.get('[data-testid="add-to-cart-button"]').click();

        // check if localStorage cart is not empty
        cy.window().then((window) => {
            const cart = window.localStorage.getItem('cart');
            expect(cart).to.not.be.null;
        });
    });

    it('Should Update Product Quantity In Cart', () => {
        // Adiciona produtos ao carrinho
        cy.addProductToCart();
    
        // Vai para a página do carrinho
        cy.visit('localhost:3000/#/cart');
    
        // Obtém a quantidade inicial do primeiro produto
        cy.get('[data-testid="product-quantity-input"]').first().then((element) => {
            console.log(element.val());
            const quantityBefore = parseInt(element.val());
    
            // Aumenta a quantidade do primeiro produto duas vezes
            cy.get('[data-testid="increase-quantity-button"]').first().click();
            cy.get('[data-testid="increase-quantity-button"]').first().click();
    
            // Diminui a quantidade do primeiro produto uma vez
            cy.get('[data-testid="decrease-quantity-button"]').first().click();
    
            // Obtém a quantidade do primeiro produto novamente
            cy.get('[data-testid="product-quantity-input"]').first().then((newElement) => {
                const quantityAfter = parseInt(newElement.val());
                console.log(newElement.val());
    
                // Verifica se a quantidade mudou corretamente em 1
                expect(quantityAfter).to.equal(quantityBefore + 1);
            });
        });
    });
    

    it ('Should Remove a Product From Cart', () => {
        // add Products to cart
        cy.addProductToCart();        
        
        cy.wait(500);

        let cartLengthBefore = 0;
        cy.window().then((window) => {
            cartLengthBefore = window.localStorage.getItem('cart').length;
            expect(cartLengthBefore).to.be.greaterThan(0);
        });

        // go to cart page
        cy.visit('localhost:3000/#/cart');

        // remove the first product from the cart
        cy.get('[data-testid="remove-from-cart-button"]').first().click();

        // remove prod modal
        cy.get('[data-testid="remove-from-cart-confirm"]').click();

        // check if localStorage cart is not empty
        cy.window().then((window) => {
            const cartLengthAfter = window.localStorage.getItem('cart').length;
            expect(cartLengthAfter).to.be.lessThan(cartLengthBefore);
        });
    });
});
