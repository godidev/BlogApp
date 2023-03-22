import axios from 'axios'
import { useEffect, useState } from 'react'

function User() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3005/api/users').then(res => setUsers(res.data))
  }, [])

  return (
    <table>
      <tr>
        <td></td>
        <th>Blogs created</th>
      </tr>
      {users.map(user => {
        console.log(user)
        return (
          <tr key={user.username}>
            <td>{user.username}</td>
            <td>{user.blogs.length}</td>
          </tr>
        )
      })}
    </table>
  )
}

export default User
