
describe('template spec', () => {

  it('passes', () => {

    cy.visit('http://localhost:5173/')
  })
})

describe('CardForm component Create', () => {
  it('submits the form', () => {
    cy.visit('http://localhost:5173/')

    cy.get('[data-cy=dialog-trigger-create]').then(($elements) => {
      cy.wrap($elements).click({ force: true });

    });

    cy.get('[data-cy=form]').within(() => { // assumes that the form has a `data-cy="form"` attribute
      const randomName = `Name ${Math.floor(Math.random() * 1000)}`; // generates a random name like "Name 123"
      const randomAvatar = `https://picsum.photos/200/300?random=${Math.floor(Math.random() * 1000)}`; // generates a random avatar URL

      cy.get('input[name=name]').clear().type(randomName);
      cy.get('input[name=avatar]').clear().type(randomAvatar);
      cy.get('[data-cy=save-button]').click(); // assumes that the save button has a `data-cy="save-button"` attribute
    });
  });
})

describe('CardForm component Edit', () => {
  it('submits the form', () => {
    cy.visit('http://localhost:5173/')

    cy.get('[data-cy=dialog-trigger]').then(($elements) => {
      const randomIndex = Math.floor(Math.random() * $elements.length);
      cy.wrap($elements).eq(randomIndex).click({ force: true });
    });

    cy.get('[data-cy=form]').within(() => { // assumes that the form has a `data-cy="form"` attribute
      const randomName = `Name ${Math.floor(Math.random() * 1000)}`; // generates a random name like "Name 123"
      const randomAvatar = `https://picsum.photos/200/300?random=${Math.floor(Math.random() * 1000)}`; // generates a random avatar URL

      cy.get('input[name=name]').clear().type(randomName);
      cy.get('input[name=avatar]').clear().type(randomAvatar);
      cy.get('[data-cy=save-button]').click(); // assumes that the save button has a `data-cy="save-button"` attribute
    });

    // Check that the form has been submitted with the new values

  });
});

describe('CardForm component Delete' ,() =>{
  it('deletes the form', () => {
    cy.visit('http://localhost:5173/')

    cy.get('[data-cy=dialog-trigger-delete]').then(($elements) => {
      const randomIndex = Math.floor(Math.random() * $elements.length);
      cy.wrap($elements).eq(randomIndex).click({ force: true });
    });
    // cy.get('[data-cy=dialog-trigger-delete]').first().click({ force: true});

    cy.get('[data-cy=delete-button]').click()
  })
})

describe('CardForm component Add', () => {

})

describe('search filter name', () => {
  it('searches the name', () => {
    cy.visit('http://localhost:5173/')

    cy.get('[data-cy=search]').type('Escamilla')
  })

})