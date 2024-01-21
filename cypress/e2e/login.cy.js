 describe('Login', () => {
     it('login met juist email en wachtwoord', () => {
           
            cy.visit('http://localhost:3000/login');

      
            cy.get('#email').type('medewerker@example.com');
            cy.get('#wachtwoord').type('String123!')

            cy.get('form').submit();

            cy.url().should('include', 'http://localhost:3000/Medewerker'); 
        });

        it('login met onjuist email en wachtwoord', () => {
            
            cy.visit('http://localhost:3000/login');

            
            cy.get('#email').type('invalid@example.com');
            cy.get('#wachtwoord').type('wrongpassword');

       
            cy.get('form').submit();

            cy.get('.text-danger').should('be.visible');
        });
    });
