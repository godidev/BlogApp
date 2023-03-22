import { useParams } from 'react-router-dom'

function User({ users }) {
  const id = useParams().id
  const { blogs } = users.find(user => user.id === id)

  console.log({ blogs })
  return (
    <>
      {blogs.map(blog => (
        <p key={blog.id}>{blog.title}</p>
      ))}
    </>
  )
}

export default User
