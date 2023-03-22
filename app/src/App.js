import { StrictMode, useContext, useEffect } from 'react'
import NotificationContext from './context/NotificationContext'
import UserContext, { loginUser } from './context/UserContext'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogsForm from './components/BlogsForm'

const App = () => {
  const queryClient = useQueryClient()

  const result = useQuery('blogs', blogService.getAll)

  const newUpdateBlogMutation = useMutation(
    updatedBlog => blogService.update(updatedBlog),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('blogs')
      },
    },
  )

  const newCreateBlogMutation = useMutation(
    newBlog => blogService.create(newBlog),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('blogs')
      },
    },
  )

  const newDeleteBlogMutation = useMutation(
    deletedBlog => blogService.deleteBlog(deletedBlog),
    {
      onSuccess: () => {
        queryClient.getQueryData('blogs')
      },
      onSettled: () => {
        queryClient.invalidateQueries('blogs')
      },
    },
  )

  const [, setNotification] = useContext(NotificationContext)
  const [user, dispatch] = useContext(UserContext)

  useEffect(() => {
    dispatch({ type: 'getUser' })
  }, [])

  const blogs = result.data

  const handleLogin = async userObject => {
    dispatch(await loginUser(userObject))
  }

  const handleLogout = () => {
    dispatch({ type: 'logoutUser' })
  }

  const addBlog = async blogObject => {
    const { title, author, url } = blogObject

    blogService.setToken(user.token)
    try {
      newCreateBlogMutation.mutate({ title, author, url }, { important: true })
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
      newUpdateBlogMutation.mutate(BlogToUpdate, { important: true })

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
      newDeleteBlogMutation.mutate(id, { important: true })

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
