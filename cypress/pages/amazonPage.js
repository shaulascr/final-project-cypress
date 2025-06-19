class amazonPage {
    visitAmazon() {
        cy.viewport(1920, 1080);
        cy.visit(Cypress.env('amazonBaseUrl'));
        cy.wait(5000);
    }
    searchItem(searchKeyword) {
        cy.get('#twotabsearchtextbox').click().type(searchKeyword);
        cy.get('#nav-search-submit-button').click();
        cy.url().should('include', searchKeyword);
    }
    sortExpensive() {
        // cy.get('#s-result-sort-select', { timeout: 30000 }).select('Price: High to Low', { force: true }).should('have.value', 'price-desc-rank');
        cy.get('#s-result-sort-select', { timeout: 30000 }).should('be.visible').select('Price: High to Low', { force: true });
        cy.url().should('include', 'price-desc-rank');
    }

    findPriceItem(){
        cy.get('[role="listitem"][data-index="8"]')
            .find('.a-price-whole')
            .should('be.visible')
            .invoke('text')
            .as('priceItem');
    }

    findTitleItem(){
        cy.get('[role="listitem"][data-index="8"]')
            .find('[data-cy="title-recipe"]')
            .should('be.visible')
            .invoke('text')
            .as('titleItem');
    }

    verifyItemClicked(){
        cy.get('@titleItem').then((title) => {
            cy.get('#productTitle').should('contain', title.trim());
        });
        cy.get('@priceItem').then((price) => {
            cy.get('#corePriceDisplay_desktop_feature_div')
            .find('.a-price-whole')
            .should('contain', price.trim());
        });
    }
}

export default new amazonPage()