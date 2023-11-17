// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


/* global cy, Cypress, expect */ // declare globals for eslin

import 'cypress-file-upload';

Cypress.Commands.add('login', (email, password) => {
    cy.intercept('POST', 'http://localhost:3030/api/users/login').as('login');
    cy.visit('localhost:3000/#/login');
    cy.get('input[id="email"]').type(email);
    cy.get('input[id="password"]').type(password);
    cy.get('#login').click();
    cy.wait('@login').then(({ response }) => {
        expect(response.statusCode).to.equal(204);
    });
});

Cypress.Commands.add('addProductToCart', () => {
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