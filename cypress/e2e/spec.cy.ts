
describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/')
  })
})

describe('CardForm component', () => {
  it('submits the form', () => {
    cy.visit('http://localhost:5173/')

    cy.get('[data-cy=dialog-trigger]').first().click();

    cy.get('[data-cy=form]').within(() => { // assumes that the form has a `data-cy="form"` attribute
      cy.get('input[name=name]').clear().type('new name ne'); // replace 'New Name' with the new name
      cy.get('input[name=avatar]').clear().type('https://picsum.photos/id/0/5000/3333'); // replace 'New Avatar' with the new avatar

      cy.get('[data-cy=save-button]').click(); // assumes that the save button has a `data-cy="save-button"` attribute
    });

    // Check that the form has been submitted with the new values
    // This depends on how you handle form submissions in your application
    // For example, if you display a success message, you can check that the success message is displayed
    // cy.get('[data-cy=success-message]').should('be.visible'); // assumes that the success message has a `data-cy="success-message"` attribute
  });
});