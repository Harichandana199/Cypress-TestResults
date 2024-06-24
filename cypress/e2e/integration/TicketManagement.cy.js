///<reference types='cypress'/>
describe('TestSuite',function()
{
it('addingNewTicket',function()
{
    cy.visit('http://localhost:3000');
    cy.get('.form-control').type('Dineout');
    cy.get('button[type="submit"]').click();
    cy.get('.sc-bdVaJa').contains("Dineout");

})
it('TicketDone',function()
{
  cy.visit('http://localhost:3000');
  cy.get('.WSCug').find('div.text-center').each(($el,index,$list)=>
    {
      let textTicket=$el.find('p.font-weight-bold').text();
      if(textTicket.includes('Charge'))
        {
          cy.wrap($el).find('.mr-4').click();
        }
        cy.get('.font-weight-bold').contains("Charge my phone");
    }
  )
})
it('TicketClose',function()
{
  cy.visit('http://localhost:3000');
  cy.get('.WSCug').find('div.text-center').each(($el,index,$list)=>
    {
      let textTicket=$el.find('p.font-weight-bold').text();
      if(textTicket.includes('Watch'))
        {
         
          cy.wrap($el).contains("Close").click();
        }
        cy.get('.font-weight-bold').contains("Watch my fav show");
    }
  )
})
it('TicketEdit',function()
{
  cy.visit('http://localhost:3000');
  cy.get('.WSCug').find('div.text-center').each(($el,index,$list)=>
    {
      let textTicket=$el.find('p.font-weight-bold').text();
      if(textTicket.includes('Cook'))
        {
         
          cy.wrap($el).find('button.btn-link').click();
          cy.get('.custom-select').select('Done');
          cy.get('button[type="submit"]').click();
        
        }
      }
  )
})
it('DragAndDrop',function()
{
  const dataTransfer = new DataTransfer();
  cy.visit('http://localhost:3000');
  cy.get('.sc-bwzfXH > :nth-child(1)').trigger('dragstart',
    {
      dataTransfer
  })
  cy.get(':nth-child(2) > .card > .sc-bwzfXH').trigger('drop',
    {
      dataTransfer
    }
  )
}
)
})