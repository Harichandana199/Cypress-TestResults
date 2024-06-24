///<reference types='cypress'/>
describe('TestSuite',function()
{
it('EndToEnd',function()
{
    const dataTransfer= new DataTransfer();
    cy.visit('http://localhost:3000');
    //new ticket adding
    cy.get('.form-control').type('Book Train Ticket');
    cy.get('button[type="submit"]').click();
    cy.get('.sc-bdVaJa').contains("Book Train Ticket");
    cy.get('.WSCug').find('div.text-center').each(($el,index,$list)=>
        {
            let textTicket=$el.find('p.font-weight-bold').text();
            //Watch my fav show ticket will be done
            if(textTicket.includes('show'))
                {
                    cy.wrap($el).find('.mr-4').click();
                }
                //Charge my phone ticket close
                else if(textTicket.includes("Charge"))
                    {
                    
                        cy.wrap($el).contains("Close").click();
                    
                    }
                //Cook Donner ticket edit
                else if(textTicket.includes("Cook"))
                    {
                        cy.wrap($el).find('button.btn-link').click();
                        cy.get('.custom-select').select('Done');
                        cy.get('button[type="submit"]').click();
                        
                    }
                        //Book train ticket drag and drop
                        else(textTicket.includes('Book'))
                        {
                            cy.get(':nth-child(1) > .card > .sc-bwzfXH > :nth-child(2)').trigger('dragstart',
                                {
                                  dataTransfer
                              })
                              cy.get(':nth-child(2) > .card > .sc-bwzfXH').trigger('drop',
                                {
                                  dataTransfer
                                }
                                //cy.get(':nth-child(3) > .card > .d-flex')
                              )

                        }

        }
    )


})
})