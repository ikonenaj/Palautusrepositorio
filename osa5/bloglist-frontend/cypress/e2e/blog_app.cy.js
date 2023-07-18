describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      username: 'root',
      name: 'root',
      password: 'root'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('root')
      cy.get('#login-button').click()

      cy.contains('root logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error').contains('invalid username or password')
      cy.get('html').should('not.contain', 'root logged in')
    })

    describe('When logged in', function() {
      beforeEach(function() {
        cy.login({ username: 'root', password: 'root' })
      })

      it('A blog can be created', function() {
        cy.contains('new blog').click()
        cy.get('#title').type('Test title')
        cy.get('#author').type('Test author')
        cy.get('#url').type('www.test.com')
        cy.get('#submit-button').click()
        cy.get('.add').contains('a new blog Test title by Test author added')
      })
    })
  })
})