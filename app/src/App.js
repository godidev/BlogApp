import { useEffect, StrictMode, useContext } from 'react'
import NotificationContext from './context/NotificationContext'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogsForm from './components/BlogsForm'
import { useDispatch, useSelector } from 'react-redux'
import {
  initializeBlogs,
  deleteBlogState,
  addBlogState,
  changeBlog,
} from './features/blog/blogSlice'
import { getUser, loginUser, logoutUser } from './features/user/userSlice'

const App = () => {
  const [, setNotification] = useContext(NotificationContext)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const handleLogin = async userObject => {
    const { username, password } = userObject
    try {
      dispatch(
        loginUser({
          username,
          password,
        }),
      )
    } catch (error) {
      console.error(error)
    }
  }

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  const addBlog = async blogObject => {
    const { title, author, url } = blogObject

    blogService.setToken(user.token)
    try {
      const newBlog = await blogService.create({ title, author, url })
      dispatch(addBlogState(newBlog))
      setNotification({
        type: 'set',
        payload: {
          color: 'green',
          text: `A new blog ${title} by ${author} added`,
        },
      })
    } catch (error) {
      setNotification({
        type: 'set',
        payload: { text: "Coultn't create blog" },
      })
    }
    setTimeout(() => setNotification({ type: 'clear' }), 5000)
  }

  const updateBlog = async BlogToUpdate => {
    blogService.setToken(user.token)
    try {
      const updatedBlog = await blogService.update(BlogToUpdate)
      const { likes } = updatedBlog
      dispatch(changeBlog({ id: updatedBlog.id, likes }))

      setNotification({
        type: 'set',
        payload: {
          color: 'green',
          text: `Blog ${BlogToUpdate.title} was successfully updated`,
        },
      })

      setTimeout(() => setNotification({ type: 'clear' }), 5000)
    } catch (exception) {
      setNotification({
        type: 'set',
        payload: {
          color: 'red',
          text: `Cannot update blog ${BlogToUpdate.title}`,
        },
      })

      setTimeout(() => setNotification({ type: 'clear' }), 5000)
    }
  }

  const deleteBlog = async id => {
    blogService.setToken(user.token)
    try {
      await blogService.deleteBlog(id)
      dispatch(deleteBlogState(id))

      setNotification({
        type: 'set',
        payload: {
          color: 'green',
          text: 'Blog Deleted!',
        },
      })
    } catch (error) {
      setNotification({
        type: 'set',
        payload: {
          color: 'red',
          text: "Couldn't delete blog!",
        },
      })
    }
    setTimeout(() => setNotification({ type: 'clear' }), 5000)
  }

  if (!user) {
    return (
      <>
        <h2>Log in to application</h2>
        <LoginForm handleLogin={handleLogin} />
      </>
    )
  }

  const renderBlogs =
    Array.isArray(blogs) &&
    blogs
      .slice()
      .sort((a, b) => a.likes - b.likes)
      .map(blog => {
        const removeFromDB = blog.user.id === user.id ? deleteBlog : null
        return (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={updateBlog}
            deleteBlog={removeFromDB}
          />
        )
      })

  return (
    <StrictMode>
      <div>
        <h2>blogs</h2>
        <Notification />
        <p>{user.username} logged in</p>
        <div>
          <button onClick={handleLogout}>Log Out</button>
        </div>
        {renderBlogs}
        <BlogsForm addBlog={addBlog} />
      </div>
    </StrictMode>
  )
}

export default App
