/* global cy, describe, it, expect */ // declare globals for eslint

describe('Login Control', () => {
    it('Should login a vendor successfully', () => {
        cy.login('vendor1@biz.com', '123456');
        //it has to go to the vendor panel
        cy.url().should('include', '/#/vendor-panel');
    });
    it('Should login a customer successfully', () => {
        cy.login('customer1@gmail.com', '123456');
        //it has to go to the customer panel
        cy.url().should('eq', 'http://localhost:3000/#/');
    });
    it('Should login an admin successfully', () => {
        cy.login('iago@adm.biz', '123456');
        //it has to go to the admin panel
        cy.url().should('include', '/#/admin-panel');
    }); 
});