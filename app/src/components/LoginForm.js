import { useState } from 'react'
import LoginInput from './LoginInput'
import Toggable from './Toggable'

export default function LoginForm ({ handleLogin }) {
  const [user, setUser] = useState({ username: '', password: '' })
  const { username, password } = user

  const handleSubmit = (event) => {
    event.preventDefault()

    handleLogin(
      {
        username,
        password
      }
    )
    setUser({ username: '', password: '' })
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setUser((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <Toggable btnLabel='Login'>
        <form onSubmit={handleSubmit}>
            <LoginInput
              type='text'
              name='username'
              value={username}
              handleChange={handleChange}
            />
            <LoginInput
              type='password'
              name='password'
              value={password}
              handleChange={handleChange}
            />
            <button id='form-login-button'>Login</button>
        </form>
    </Toggable>)
}
