describe('Wachtwoord wijzigen', () => {
    it('Wachtwoord wijzigen en inloggen', () => {
        
        cy.visit('http://localhost:3000/login');
        cy.get('#email').type('b@example.com');
        cy.get('#wachtwoord').type('String123!')
        cy.get('form').submit();
        cy.url().should('include', 'http://localhost:3000/Bedrijf');
        cy.contains('Bedrijf Profiel').click();
        cy.visit('http://localhost:3000/bedrijf/profiel'); 

        cy.contains('Wijzigen').click();
        cy.contains('Wijzig wachtwoord').click();
        
        cy.get('input[name="currentPassword"]').type('String123!');
        cy.get('input[name="newPassword"]').type('String1!');
        cy.get('input[name="newPasswordRepeat"]').type('String1!');

        cy.get('.btn-primary').click();

        cy.contains('Gegevens zijn gewijzigd!').should('exist');

        cy.contains('Log uit').click();

        cy.contains('Login').click();

        cy.get('#email').type('b@example.com');
        cy.get('#wachtwoord').type('String123!')
        cy.get('form').submit();
        cy.url().should('include', 'http://localhost:3000/Bedrijf');
    });
});
