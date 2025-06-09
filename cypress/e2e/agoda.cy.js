require('cypress-xpath');
import agodaPage from "../pages/agodaPage";

describe('Memilih tiket pesawat tujuan', function() {
  this.beforeEach(function(){
    cy.fixture('dataAgoda').as('data');
    agodaPage.visitAgoda();
  })
  it('isi data keberangkatan dan tujuan', function() {
    agodaPage.fillDeparture(this.data.dataDeparture);
    agodaPage.fillArrival(this.data.dataArrival);   
    agodaPage.selectNextDay();
    agodaPage.countPassaenger();
    cy.get('[data-selenium="searchButton"]').click();
    cy.url().should('include', 'departureFrom=CGK');
  });
  it('pilih tanggal keberangkatan', function(){
    agodaPage.openSchedule(this.data.dataDeparture, this.data.dataArrival);
    agodaPage.filterAirlines(this.data.selectAirlines);
  });
});

 // cy.visit(Cypress.env('agodaBaseUrl'));
    // // cy.get('.tab-flight-tab').click();
    // cy.get('[data-selenium="agodaFlightsTab"]').contains('Flights').click()
    // cy.url().should('include', '#flights');
    // cy.wait(1000); 
    // cy.get('[data-selenium="flight-origin-search-input"]')
    //   .should('be.visible')
    //   .clear()
    //   .type('Jakarta');
    // cy.wait(1000); 
    // cy.get('[data-selenium="suggestion-text-highlight"]').should('have.text', 'Jakarta')
    // cy.contains('Soekarno-Hatta International Airport').click();
    // cy.get('#flight-origin-search-input')
    //   .should('have.value', 'Jakarta (CGK)');
    // cy.get('[data-selenium="flight-destination-search-input"]')
    // .should('be.visible')
    // .clear()
    // .type('Singapura');
    // cy.wait(1000);
    // cy.get('[data-element-index="0"]')
    //   .should('be.visible')
    //   .and('contain.text', 'Singapore, Singapore');
    // // cy.get('[data-selenium="suggestion-text"]').should('have.text', 'Singapore, Singapore');
    // // data-selenium="suggestion-text-highlight"
    // // cy.contains('Soekarno-Hatta International Airport').click();
    // //  Changi Airport