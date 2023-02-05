const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  try {
    const id = request.params.id
    const blogs = await Blog.findById(id).populate('user')
    response.status(200).json(blogs)
  } catch (error){
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response) => {
  const { body } = request
  if (!body.title || !body.url) {
    response.status(400).end()
  } else {
    const { title, author, url, likes = 0 } = body

    const token = getTokenFrom(request)
    if (!token || !(jwt.verify(token, process.env.SECRET).id)) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const decodedToken = jwt.verify(token, process.env.SECRET)

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title,
      author,
      url,
      likes,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()
    response.status(201).json(savedBlog)
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  const token = getTokenFrom(request)
  if (!token || !(jwt.verify(token, process.env.SECRET).id)) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const decodedToken = jwt.verify(token, process.env.SECRET)
  const blog = await Blog.findById(id)

  if (blog.user.toString() !== decodedToken.id.toString()) {
    response.status(400).json({ error: 'You have no permision to delete' })
  }

  try {
    await Blog.findOneAndDelete(id)
    response.status(204).end()
  } catch (error) {
    console.error(error)
  }
})

blogsRouter.put('/:id', async (request, response) => {
  let { likes = 0 } = request.body
  const { title, author, url } = request.body
  const id = request.params.id

  const token = getTokenFrom(request)

  if (!token || !(jwt.verify(token, process.env.SECRET).id)) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const decodedToken = jwt.verify(token, process.env.SECRET)
  const user = await User.findById(decodedToken.id)

  if ( user._id.toString() ) {
    const blog = { title,author,url,likes, }
    try {
      const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true })
      response.json(updatedBlog.toJSON())
    } catch (error){
      response.status(400).end()
    }
  } else {
    return response.status(401).json({ error: 'Unauthorized' })
  }
})

module.exports = blogsRouter