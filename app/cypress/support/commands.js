Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3005/api/login/', {
    username,
    password
  }).then(({ body }) => {
    localStorage.setItem('loggedUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('newBlog', ({ title, url, author, likes = 0 }) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3005/api/blogs',
    body: { title, url, author, likes },
    headers: {
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}` // eslint-disable-line
    }
  })
  cy.visit('http://localhost:3000')
})
