import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const [blogObject, setBlogObject] = useState(blog)
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  function handleClick() {
    setVisible(prev => !prev)
  }

  const increaseLikes = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    updateBlog(updatedBlog)
    setBlogObject(updatedBlog)
  }

  const handleDelete = () => {
    const remove = window.confirm('Do you really want to delete this blog?')
    remove && deleteBlog(blogObject.id)
  }

  return (
    <div className='blog' style={blogStyle}>
      <p className='blogTitle'>
        {blog.title}
        <button onClick={handleClick}>{visible ? 'Hide' : 'View'}</button>
      </p>
      {visible && (
        <div className='extendedBlog'>
          <p>
            URL: <strong>{blog.url}</strong>
          </p>
          <p className='likes' data-cy='likeButton'>
            Likes: <strong>{blogObject.likes}</strong>
            <button onClick={increaseLikes}>like</button>
          </p>
          <p>
            Author: <strong>{blog.author}</strong>
          </p>
          {deleteBlog && <button onClick={handleDelete}>Remove</button>}
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
}

export default Blog
