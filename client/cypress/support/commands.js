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

Cypress.Commands.add('registerVendor', (email) => {
    // intercept declaration
    cy.intercept('GET', 'https://viacep.com.br/ws/30350230/json/').as('getCep');
    cy.intercept('POST', 'http://localhost:3030/api/vendor').as('registerVendor');

    // visits register page
    cy.visit('localhost:3000/#/register/2');

    // fill the form
    // random number to use in the name field
    const randomNumber = Math.floor(Math.random() * 1000);
    cy.get('input[id="companyName"]').type(`Test Vendor ${randomNumber}`);
    cy.get('input[id="fantasyName"]').type(`Test Vendor ${randomNumber}`);
    cy.get('input[id="CNPJ"]').type('12345678911223');
    cy.get('input[id="phone"]').type('1234567891');

    cy.get('input[id="email"]').type(email);

    cy.get('input[id="password"]').type('123456');
    cy.get('input[id="passwordConfirmation"]').type('123456');

    // CEP field
    cy.get('input[id="cep"]').type('30350230'); 
    // wait for the response from the CEP API and check the status code
    cy.wait('@getCep').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });

    cy.get('input[id="number"]').type('123');
    cy.get('textarea[id="devolutionPolicy"]').type('Não aceitamos devoluções');
    // submit the form
    cy.get('.submit-button button').click();

    // wait for the response from the API and check the status code
    cy.wait('@registerVendor').then(({ response }) => {
      expect(response.statusCode).to.equal(201);
    });
});

Cypress.Commands.add('registerCustomer', (email) => {
    // intercept declaration
    cy.intercept('GET', 'https://viacep.com.br/ws/30350230/json/').as('getCep');
    cy.intercept('POST', 'http://localhost:3030/api/customer').as('registerCustomer');

    // visits register page
    cy.visit('localhost:3000/#/register/1');

    // fill the form
    // random number to use in the name field
    const randomNumber = Math.floor(Math.random() * 1000);
    cy.get('input[id="name"]').type(`Test User ${randomNumber}`);

    cy.get('input[id="birthDate"]').type('1990-01-01');
    cy.get('input[id="CPF"]').type('12345678911');
    cy.get('input[id="phone"]').type('123456789');

    cy.get('input[id="email"]').type(email);

    cy.get('input[id="password"]').type('123456');
    cy.get('input[id="passwordConfirmation"]').type('123456');

    // CEP field
    cy.get('input[id="cep"]').type('30350230'); 
    // wait for the response from the CEP API and check the status code
    cy.wait('@getCep').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });

    cy.get('input[id="number"]').type('123');

    // submit the form
    cy.get('.submit-button button').click();

    // wait for the response from the API and check the status code
    cy.wait('@registerCustomer').then(({ response }) => {
      expect(response.statusCode).to.equal(201);
    });
});