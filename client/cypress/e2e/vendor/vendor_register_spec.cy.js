/* global cy, describe, it, expect */ // declare globals for eslint

describe('Vendor Registration', () => {
    it('Should register a new customer successfully', () => {
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
      cy.get('textarea[id="devolutionPolicy"]').type('Não aceitamos devoluções');
      // submit the form
      cy.get('.submit-button button').click();
  
      // wait for the response from the API and check the status code
      cy.wait('@registerVendor').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
      });
    });
});