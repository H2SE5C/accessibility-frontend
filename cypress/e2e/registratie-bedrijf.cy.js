describe('Registratie bedrijf', () => {
    it('registratie bedrijf met juiste informatie', () => {
          //dit werkt als bedrijf nog niet bestaat met naam en email
           cy.visit('http://localhost:3000/registreer-bedrijf');

           cy.get('#bedrijfsnaam').type('Bedrijf naam');
           cy.get('#email').type('testbedrijf@outlook.com');
           cy.get('#locatie').type('2532RE honerkderstraat 123');
           cy.get('#telefoonnummer').type('069483457');
           cy.get('#website').type('Testbedrijf.com');
           cy.get('#omschrijving').type('Omschrijving van bedrijf');
           cy.get('#wachtwoord').type('String123@');
           cy.get('form').submit();
           
           cy.get('.naar-login').should('be.visible');
       });

       it('registratie bedrijf met slechte wachtwoord formaat', () => {
           //dit werkt als bedrijf nog niet bestaat met naam en email
           cy.visit('http://localhost:3000/registreer-bedrijf');

           cy.get('#bedrijfsnaam').type('Niet gebruikte bedrijf naam');
           cy.get('#email').type('Nietgebruiktemail@outlook.com');
           cy.get('#locatie').type('2532RE honerkderstraat 123');
           cy.get('#telefoonnummer').type('069483457');
           cy.get('#website').type('Testbedrijf.com');
           cy.get('#omschrijving').type('Omschrijving van bedrijf');
           cy.get('#wachtwoord').type('slechtwachtwoord');

           cy.get('form').submit();
           cy.get('.text-danger').contains("Foutmelding: Wachtwoord is verkeerd");
       });
   });
