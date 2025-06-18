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
