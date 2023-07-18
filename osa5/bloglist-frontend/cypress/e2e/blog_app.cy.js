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

      cy.get('.error')
      .should('contain', 'invalid username or password')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')

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
        cy.get('.add')
        .should('contain', 'a new blog Test title by Test author added')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')
      })

      describe('Several blogs exist', function() {
        beforeEach(function () {
          cy.createBlog({ title: 'Title 1', author: 'Author 1', url: 'www.url1.com' })
          cy.createBlog({ title: 'Title 2', author: 'Author 2', url: 'www.url2.com' })
          cy.createBlog({ title: 'Title 3', author: 'Author 3', url: 'www.url3.com' })
        })

        it('Blogs can be liked', function() {
          cy.contains('Title 1 Author 1')
            .contains('view')
            .click()

          cy.contains('Title 1 Author 1')
            .contains('likes')
            .parent()
            .find('#like-button')
            .click()

          cy.contains('Title 1 Author 1')
            .contains('likes 1')
        })

        it('Blogs can be removed', function() {
          cy.contains('Title 3 Author 3')
          .contains('view')
          .click()

          cy.contains('Title 3 Author 3')
          .contains('remove')
          .click()

          cy.on('window:confirm', function() {
            return true
          })

          cy.get('.edit')
          .should('contain', 'Blog removed successfully')
          .and('have.css', 'color', 'rgb(0, 128, 0)')
          .and('have.css', 'border-style', 'solid')
        })

        it('Only the user that added the blog can see remove button', function() {
          const user = {
            username: 'test',
            name: 'test',
            password: 'test'
          }
          cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
          cy.visit('')
          cy.login({ username: 'test', password: 'test' })

          cy.contains('Title 2 Author 2')
            .contains('view')
            .click()

          cy.contains('Title 2 Author 2')
            .contains('likes')
            .parent()
            .get("#remove-button")
            .should('not.exist')
        })
      })
    })
  })
})