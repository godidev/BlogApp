import { useParams } from 'react-router-dom'

function User({ users }) {
  const id = useParams().id
  const user = users.find(user => user.id === id)

  if (!user) return null

  return (
    <>
      {user.blogs.map(blog => (
        <p key={blog.id}>{blog.title}</p>
      ))}
    </>
  )
}

export default User
