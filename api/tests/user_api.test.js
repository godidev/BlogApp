const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const { getUsernames } = require('./helpers')
const server = require('../index')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  const user = new User({ username: 'enigma69', name: 'Pedro', password: 'rotonda' })

  await user.save()
})

afterEach(() => { server.close() })

describe('when there is initially one user in db', () => {
  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await getUsernames()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await getUsernames()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    expect(usersAtEnd).toContain(newUser.username)
  })

  test('creation of user with username/password < 3', async () => {
    const user = {
      username: 'JohnDoe',
      name: 'John Doe',
      password: 'a1',
    }
    await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
})

describe('getting users data', () => {
  test('get all users', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})