const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require ('./controllers/login')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
mongoose.set('strictQuery', true)

app.use(cors())
app.use(express.json())

app.use('/api/login', loginRouter)

const mongoUrl = config.MONGODB_URI

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(mongoUrl)
  .then(() =>  logger.info('connected to MongoDB'))
  .catch((error) => logger.error('error connecting to MongoDB:', error.message))

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}


module.exports = app