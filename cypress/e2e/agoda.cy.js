require('cypress-xpath');
import agodaPage from "../pages/agodaPage";
Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('Blocked a frame with origin')) {
    return false;
  }
});

describe('Memilih tiket pesawat tujuan', function() {
  Cypress.config('defaultCommandTimeout', 30000)

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
    const fullName = `${this.data.dataPassenger.namePsgr} ${this.data.dataPassenger.lastNamePsgr}`;

    agodaPage.openSchedule(this.data.dataDeparture, this.data.dataArrival);
    agodaPage.filterAirlines(this.data.selectAirlines);
    cy.wait(10000);
    agodaPage.fillDataContact(this.data.dataContact.firstNameContact, this.data.dataContact.lastNameContact, this.data.dataContact.emailContact, this.data.dataContact.phoneNumContact);
    agodaPage.fillGenderPassenger(this.data.dataPassenger.genderPsgr);
    agodaPage.fillPassengerName(this.data.dataPassenger.namePsgr, this.data.dataPassenger.lastNamePsgr);
    agodaPage.fillDateofBirthPassenger(this.data.dataPassenger.dayBrthDatePsgr, this.data.dataPassenger.monthBrthDatePsgr, this.data.dataPassenger.yearBrthDatePsgr);
    agodaPage.fillPassportPsgr(
      this.data.dataPassenger.passportNumPsgr, 
      this.data.dataPassenger.nationalityPsgr, 
      this.data.dataPassenger.dayPassportExpPsgr, 
      this.data.dataPassenger.monthPassportExpPsgr, 
      this.data.dataPassenger.yearPassportExpPsgr)
    cy.get('[data-component="mob-price-desc-text"]')
      .invoke('text')
      .as('priceAirline');
    cy.get('[data-testid="toggle-text-component"]').click();

    cy.get('[data-component="flight-continue-to-addOns-button"]').click();
    cy.scrollTo('bottom', { duration: 15000 });
    cy.get('[data-testid="continue-to-payment-button"]').click();
    cy.get('[data-component="last-chance-decline-button"]').click();
    cy.url().should('include', '/bookings/payment');

    cy.get('[data-component="passenger-summary-list"] [data-component="name-container-name"]').should('have.text', fullName);

    cy.get('@priceAirline').then((name) => {
      cy.get('[data-component="mob-price-desc-text"]').should('have.text', name);
    });

    agodaPage.verifyTimeAirline();
    agodaPage.verifyCityDeparture(this.data.dataDeparture.cityDeparture);
    agodaPage.verifyCityArrival(this.data.dataArrival.cityArrival);
  });
});
