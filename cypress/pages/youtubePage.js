class youtubePage {
    visitYt(){
        cy.visit(Cypress.env('youtubeBaseUrl'));
        cy.wait(5000);
    }
    findTabFilmTrending(){
        cy.get('#guide-button').click();
        cy.get('[title="Trending"]').click();
        cy.url().should('include', '/feed/trending');
        cy.wait(15000);
        cy.get('[role="tab"][tab-title="Film"]').click();
        cy.wait(15000);
    }
    findThirdVideoTrending(){
        cy.get('ytd-video-renderer').eq(2)
            .find('yt-formatted-string.style-scope.ytd-video-renderer').eq(0)
            .invoke('text')
            .as('videoTitle');
        cy.get('ytd-channel-name').eq(2)
            .find('.yt-simple-endpoint.style-scope.yt-formatted-string')
            .invoke('text')
            .as('videoChannel');
        cy.get('ytd-video-renderer').eq(2).click();
        cy.url().should('include', '/watch');
    }
    veirfyVideoTrending(){
        cy.get('@videoTitle').then((title) => {
            cy.get('yt-formatted-string.style-scope.ytd-watch-metadata').should('contain', title.trim());
        });
        cy.get('@videoChannel').then((channel) => {
            cy.get('.yt-simple-endpoint.style-scope.yt-formatted-string').should('contain', channel.trim());
        });
    }
}

export default new youtubePage()