import { useState } from 'react'
import Toggable from './Toggable'
import PropTypes from 'prop-types'

export default function BlogsForm ({ addBlog }) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    addBlog(
      {
        title,
        author,
        url
      }
    )
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
        <Toggable btnLabel='Add Blog'>
            <form id='form' onSubmit={handleSubmit}>
                <div><label>Title</label><input id='title' type='text' data-cy='title' onChange={({ target }) => setTitle(target.value)} value={title}></input></div>
                <div><label>Author</label><input id='author' type='text' data-cy='author' onChange={({ target }) => setAuthor(target.value)} value={author}></input></div>
                <div><label>URL</label><input id='url' type='text' data-cy='url' onChange={({ target }) => setUrl(target.value)} value={url}></input></div>
                <button>Create Blog</button>
            </form>
        </Toggable>
  )
}

BlogsForm.propTypes = {
  addBlog: PropTypes.func.isRequired
}
