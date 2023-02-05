describe('Blog app', function () {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3005/api/testing/reset')
    const users = [
      {
        username: 'testUser',
        name: 'Test',
        password: 'test'
      },
      {
        username: 'secondUser',
        name: 'Second',
        password: 'test'
      }]
    cy.request('POST', 'http://localhost:3005/api/users/', users[0])
    cy.request('POST', 'http://localhost:3005/api/users/', users[1])
    cy.visit('http://localhost:3000')
  })

  it('Login button is shown', function () {
    cy.contains('Log in')
  })

  it('Login form can be opened', function () {
    cy.contains('Login').click()
  })

  it('Unsuccesful login', function () {
    cy.contains('Login').click()
    cy.get('input:first').type('asdf')
    cy.get('input:last').type('test')
    cy.get('#form-login-button').click()
    cy.contains('Log Out').should('not.exist')
  })

  it('Succesful login', function () {
    cy.contains('Login').click()
    cy.get('input:first').type('testUser')
    cy.get('input:last').type('test')
    cy.get('#form-login-button').click()
    cy.contains('Log Out')
  })
})

describe('When logged in', () => {
  beforeEach(() => {
    cy.login({ username: 'testUser', password: 'test' })
  })

  it('Note form can be displayed', () => {
    cy.contains('Add Blog').click()
  })

  it('A blog can be created', () => {
    cy.contains('Add Blog').click()
    cy.contains('Blog manually created').should('not.exist')
    cy.get('[data-cy="title"]').type('Blog manually created')
    cy.get('[data-cy="author"]').type('testUser')
    cy.get('[data-cy="url"]').type('www.asdf.com')
    cy.contains('Create Blog').click()
    cy.contains('Blog manually created')
  })

  describe('And a blog exists', () => {
    beforeEach(() => {
      cy.newBlog({
        title: 'Test Blog',
        url: 'www.test.com',
        author: 'testUser',
        likes: 24
      })
    })

    it('User can like its own blog', () => {
      cy.contains('Test Blog').contains('View').click()
      cy.contains('Test Blog').get('[data-cy="likeButton"]').find('button').click()
    })

    it('User can remove its own blog', () => {
      cy.contains('Test Blog').contains('View').click()
      cy.contains('Remove').click()
    })
  })

  describe('And there are multiple blogs', () => {
    beforeEach(() => {
      cy.newBlog({
        title: 'Blog with third most likes',
        url: 'www.test.com',
        author: 'testUser',
        likes: 6
      })
      cy.newBlog({
        title: 'Blog with most likes',
        url: 'www.test.com',
        author: 'testUser',
        likes: 2
      })
      cy.newBlog({
        title: 'Blog with second most likes',
        url: 'www.test.com',
        author: 'testUser',
        likes: 4
      })
    })

    it('should be ordered by likes', () => {
      cy.get('.blog').eq(0).should('contain', 'Blog with most likes')
      cy.get('.blog').eq(1).should('contain', 'Blog with second most likes')
      cy.get('.blog').eq(2).should('contain', 'Blog with third most likes')
    })
  })

  describe('When logged in as another user', () => {
    beforeEach(() => {
      cy.login({ username: 'secondUser', password: 'test' })
    })

    it('User can\'t delete other blogs', () => {
      cy.contains('Test Blog').contains('View').click()
      cy.contains('Remove').should('not.exist')
    })
  })
})
