require('cypress-xpath');
import amazonPage from "../pages/amazonPage";
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false;
});

describe('Checkout from Amazon', function() {
    Cypress.config('defaultCommandTimeout', 30000)

    this.beforeEach(function(){
        cy.fixture('dataAmazon').as('data');
        amazonPage.visitAmazon();
      })
    it('visit amazon', function(){
        amazonPage.searchItem(this.data.searchKeyword);
        amazonPage.sortExpensive();
        amazonPage.findTitleItem();
        amazonPage.findPriceItem();
        cy.get('[role="listitem"][data-index="8"]').click();
        amazonPage.verifyItemClicked();
    });
    
});