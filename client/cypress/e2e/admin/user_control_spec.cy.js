/* global cy, describe, it, expect */ // declare globals for eslint

describe('Admin - User Control', () => {
    it('Should delete a customer successfully', () => {
        // intercept declaration
        cy.intercept('DELETE', 'http://localhost:3030/api/customer/*').as('deleteCustomer');

        // login as admin
        cy.login('iago@adm.biz', '123456');

        // if there is no customer, do nothing
        cy.get('[data-testid="delete-customer-button"]').then((elements) => {
            if (elements.length === 0) {
                return;
            }
        });

        // delete the last customer in the list
        cy.get('[data-testid="delete-customer-button"]').last().click({ force: true });

        // delete modal
        cy.get('[data-testid="delete-customer-confirm"]').click();

        // await the response from the API and check the status code
        cy.wait('@deleteCustomer').then(({ response }) => {
            expect(response.statusCode).to.equal(204);
        });
    });

    it('Should delete a vendor successfully', () => {
        // intercept declaration
        cy.intercept('DELETE', 'http://localhost:3030/api/vendor/*').as('deleteVendor');

        // login as admin
        cy.login('iago@adm.biz', '123456');

        // go to vendor's tab
        cy.get('[data-testid="vendors-tab"]').click();

        // if there is no vendor, do nothing
        cy.get('[data-testid="delete-vendor-button"]').then((elements) => {
            if (elements.length === 0) {
                return;
            }
        });

        // delete the last vendor in the list
        cy.get('[data-testid="delete-vendor-button"]').last().click({ force: true });

        // delete modal
        cy.get('[data-testid="delete-vendor-confirm"]').click();

        // await the response from the API and check the status code
        cy.wait('@deleteVendor').then(({ response }) => {
            expect(response.statusCode).to.equal(204);
        });
    });
});
