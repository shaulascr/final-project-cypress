class agodaPage {
    visitAgoda() {
        cy.visit(Cypress.env('agodaBaseUrl'));
        cy.wait(5000);
        cy.get('[data-selenium="agodaFlightsTab"]').contains('Flights').click()
        cy.wait(10000);
        cy.url().should('include', '#flights');
        cy.wait(10000);
    }
    searchDeparture(searchCity) {
        cy.get('[data-selenium="flight-origin-search-input"]')
            .should('be.visible')
            .clear()
            .type(searchCity);
        cy.wait(5000);
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
        this.fillDeparture(dataDeparture);
        this.fillArrival(dataArrival);
        this.selectNextDay();
        this.countPassaenger();
        cy.get('[data-selenium="searchButton"]').click();
        cy.url().should('include', 'departureFrom=CGK');
    }
    filterAirlines(selectAirlines) {
        cy.scrollTo('bottom', { duration: 10000 });

        cy.contains(selectAirlines)
            .scrollIntoView()
            .should('be.visible')
            .first()
            .click({ force: true });
        cy.get('[data-testid="departure-time"]')
            .invoke('text')
            .as('departureTime');
        cy.get('[data-testid="arrival-time"]')
            .invoke('text')
            .as('arrivalTime');
        cy.get('[data-component="flight-card-bookButton"]').click();
        cy.url().should('include', '/bookings');
    }

    fillDataContact(firstName, lastName, email, phoneNum) {
        cy.get('[datatestid="contact.contactFirstName"]').clear().type(firstName);
        cy.get('[datatestid="contact.contactLastName"]').clear().type(lastName);
        cy.get('[datatestid="contact.contactEmail"]').clear().type(email);
        cy.contains('Indonesia').should('have.text', 'Indonesia');
        cy.get('[data-testid="contact.contactPhoneNumber-PhoneNumberDataTestId"]').type(phoneNum);
    }

    fillPassengerName(firstName, lastName) {
        cy.get('[datatestid="flight.forms.i0.units.i0.passengerFirstName"]').clear().type(firstName);
        cy.get('[datatestid="flight.forms.i0.units.i0.passengerLastName"]').clear().type(lastName);
    }

    fillPassportPsgr(passportNum, nationality, dayExpPassport, monthExpPassport, yearExpPassport) {
        cy.get('[datatestid="flight.forms.i0.units.i0.passportNumber"]').clear().type(passportNum);
        cy.get('[data-element-name="passenger-nationality-input"]').click()
        cy.get('[placeholder="Search"]').click().type(nationality);
        cy.get('[role="listbox"] li').first().should('be.visible').click();
        cy.get('[data-element-name="passenger-passport-issue-country-input"]').click();
        cy.get('[placeholder="Search"]').click().type(nationality);
        cy.get('[role="listbox"] li').first().should('be.visible').click();
        cy.get('[data-testid="flight.forms.i0.units.i0.passportExpiryDate-DateInputDataTestId"]').click().type(dayExpPassport);
        cy.get('[data-testid="flight.forms.i0.units.i0.passportExpiryDate-MonthInputDataTestId"]').click();
        cy.contains(monthExpPassport)
            .scrollIntoView()
            .should('be.visible')
            .click({ force: true });
        cy.get('[data-testid="flight.forms.i0.units.i0.passportExpiryDate-YearInputDataTestId"]').click().type(yearExpPassport);
    }

    fillGenderPassenger(genderPsgr) {
        cy.contains(genderPsgr).click();
    }
    fillDateofBirthPassenger(dayBrthDate, monthBrthDate, yearBrthDate) {
        cy.get('[data-testid="flight.forms.i0.units.i0.passengerDateOfBirth-DateInputDataTestId"]').click().type(dayBrthDate);
        cy.get('[data-testid="flight.forms.i0.units.i0.passengerDateOfBirth-MonthInputDataTestId"]').click();
        cy.contains(monthBrthDate)
            .scrollIntoView()
            .should('be.visible')
            .click({ force: true });
        cy.get('[data-testid="flight.forms.i0.units.i0.passengerDateOfBirth-YearInputDataTestId"]').click().type(yearBrthDate);
    }
    fillDataPassenger(gender, name, lastName,) {
        this.fillGenderPassenger(gender);
        cy.get().clear().type(name);
        cy.get().clear.type(lastName);
        this.fillDateofBirthPassenger();

    }

    verifyTimeAirline() {
        cy.get('@departureTime').then((time) => {
            cy.get('[data-component="mob-flight-segment-departure"]').should('contain', time.trim());
        });

        cy.get('@arrivalTime').then((time) => {
            cy.get('[data-component="mob-flight-segment-arrival"]').should('contain', time.trim());
        });
    }

    verifyCityDeparture(cityDeparture) {
        cy.get('[data-component="mob-flight-slice-originAirportCode"]').should('have.text', cityDeparture);
    }
    verifyCityArrival(cityArrival) {
        cy.get('[data-component="mob-flight-slice-destinationAirportCode"]').should('have.text', cityArrival)
    }
}

export default new agodaPage()