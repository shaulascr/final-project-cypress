class agodaPage {
    visitAgoda() {
        cy.visit(Cypress.env('agodaBaseUrl'));
        cy.wait(3000);
        cy.get('[data-selenium="agodaFlightsTab"]').contains('Flights').click()
        cy.url().should('include', '#flights');
        cy.wait(1000);
    }
    searchDeparture(searchCity) {
        cy.get('[data-selenium="flight-origin-search-input"]')
            .should('be.visible')
            .clear()
            .type(searchCity);
        cy.wait(1000);
    }
    selectDeparture(city, airport) {
        cy.get('[data-selenium="suggestion-text-highlight"]').should('have.text', city)
        cy.contains(airport).click();
    }
    verifySelectedDeparture(selectCity) {
        cy.get('#flight-origin-search-input')
            .should('have.value', selectCity);
    }
    fillDeparture(dataDeparture) {
        this.searchDeparture(dataDeparture.searchDeparture)
        this.selectDeparture(dataDeparture.displayCityDep, dataDeparture.airportDeparture);
        this.verifySelectedDeparture(dataDeparture.cityDeparture);

    }
    searchArrival(searchCity) {
        cy.get('[data-selenium="flight-destination-search-input"]')
            .should('be.visible')
            .clear()
            .type(searchCity);
        cy.wait(1000);
    }
    selectArrival(city, airport) {
        cy.get('[data-element-index="0"]')
            .should('be.visible')
            .and('contain.text', city);
        cy.contains(airport).click();
    }
    verifySelectedArrival(selectCity) {
        cy.get('#flight-destination-search-input')
            .should('have.value', selectCity)
    }
    fillArrival(dataArrival) {
        this.searchArrival(dataArrival.searchArrival);
        this.selectArrival(dataArrival.displayCityArr, dataArrival.airportArrival);
        this.verifySelectedArrival(dataArrival.cityArrival);
    }
    selectNextDay() {
        cy.get('.PriceSurgePicker-Day.today')
            .should('be.visible')
            .find('[data-selenium-date]')
            .should('exist')
            .invoke('attr', 'data-selenium-date')
            .then((todayDateStr) => {
                const today = new Date(todayDateStr);
                const tomorrow = new Date(today);
                tomorrow.setDate(today.getDate() + 1);

                const year = tomorrow.getFullYear();
                const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
                const day = String(tomorrow.getDate()).padStart(2, '0');
                const tomorrowStr = `${year}-${month}-${day}`;

                cy.get(`[data-selenium-date="${tomorrowStr}"]`).click();
            });
    }
    countPassaenger() {
        cy.contains('.SearchBoxTextDescription__title', '1 Passenger, Economy').should('have.length', 1);
        cy.get('[data-component="flight-search-cabinClass-Economy"]').contains('Economy').click();
    }
    openSchedule(dataDeparture, dataArrival) {
        this.visitAgoda()
        this.fillDeparture(dataDeparture);
        this.fillArrival(dataArrival);
        this.selectNextDay();
        this.countPassaenger();
        cy.get('[data-selenium="searchButton"]').click();
        cy.url().should('include', 'departureFrom=CGK');
    }
    filterAirlines(selectAirlines) {
        // cy.contains('Filters').click();
        // cy.get('[label="Show all 21 airlines"]').click();
        cy.get('[data-testid="flight-infinite-scroll"]')
            .scrollTo('bottom', { duration: 2000 }); // or scroll slowly

        cy.contains('Malaysia Airlines')
            .should('be.visible') // wait until it's in the DOM
            .first()
            .scrollIntoView()
            .click({ force: true });
    }
}

export default new agodaPage()