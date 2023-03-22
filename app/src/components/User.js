import { useParams } from 'react-router-dom'

function User({ users }) {
  const id = useParams().id
  const user = users.find(user => user.id === id)

  if (!user) return null

  return (
    <>
      <h2>{user.name}</h2>
      <h3>Added Blogs</h3>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  )
}

export default User
