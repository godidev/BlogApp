import { Link } from 'react-router-dom'

function User({ users }) {
  return (
    <table>
      <thead>
        <tr>
          <td></td>
          <th>Blogs created</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => {
          return (
            <tr key={user.username}>
              <td>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default User
