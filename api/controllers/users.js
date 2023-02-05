const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (request, response) => {
  const usersDB = await User.find({}).populate('blogs', { user : 0 })
  response.status(200).json(usersDB)
})

userRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (username.length < 3 || password.length < 3){
    response.status(400).json({ error: 'Username and password must be longer than 3 characters' })
  } else {
    const passwordHash = await bcrypt.hash(password, 10)

    try {
      const user = new User({
        username,
        name,
        passwordHash
      })

      const savedUser = await user.save()
      response.status(201).json(savedUser)
    } catch(error){
      error.message.includes('11000') &&
        response.json({ error: 'username already exists' })
    }
  }
})

module.exports = userRouter