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
    it ('Should not login with wrong credentials', () => {
        const randomEmail = Math.floor(Math.random() * 1000) + '@wontWork.com';
        const randomPassword = Math.floor(Math.random() * 1000);

        cy.intercept('POST', 'http://localhost:3030/api/users/login').as('login');
        cy.visit('localhost:3000/#/login');
        cy.get('input[id="email"]').type(randomEmail);
        cy.get('input[id="password"]').type(randomPassword);
        cy.get('#login').click();
        cy.wait('@login').then(({ response }) => {
            expect(response.statusCode).to.equal(403);
        });
    }); 
});