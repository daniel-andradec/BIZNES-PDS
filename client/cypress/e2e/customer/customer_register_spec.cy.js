/* global cy, describe, it, expect */ // declare globals for eslint

describe('Customer Registration', () => {
    it('Should register a new customer successfully', () => {
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

      // random email to use in the email field (to avoid email already registered)
      const randomEmail = `${Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)}@example.com`;
      cy.get('input[id="email"]').type(randomEmail);

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
});