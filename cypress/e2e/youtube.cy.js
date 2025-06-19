require('cypress-xpath');
import youtubePage from "../pages/youtubePage";


describe('Memilih video', function () {
    it('pilih video trending', function () {
        // cy.visit(Cypress.env('youtubeBaseUrl'));
        // cy.wait(5000);
        // cy.get('#guide-button').click();
        // cy.get('[title="Trending"]').click();
        // cy.url().should('include', '/feed/trending');
        // cy.wait(15000);
        // cy.get('[role="tab"][tab-title="Film"]').click()
        // cy.get('ytd-video-renderer').eq(2)
        //     .find('yt-formatted-string.style-scope.ytd-video-renderer')
        //     .invoke('text')
        //     .as('videoTitle');
        // cy.get('ytd-channel-name').eq(2)
        //     .find('.yt-simple-endpoint.style-scope.yt-formatted-string')
        //     .invoke('text')
        //     .as('videoChannel');
        // cy.get('ytd-video-renderer').eq(2).click();
        // cy.url().should('include', '/watch');
        // cy.get('@videoTitle').then((title) => {
        //     cy.get('yt-formatted-string.style-scope.ytd-watch-metadata').should('contain', title.trim());
        // });
        // cy.get('@videoChannel').then((channel) => {
        //     cy.get('.yt-simple-endpoint.style-scope.yt-formatted-string').should('contain', channel.trim());
        // });

        youtubePage.visitYt();
        youtubePage.findTabFilmTrending();
        youtubePage.findThirdVideoTrending();
        youtubePage.veirfyVideoTrending();

    })

})