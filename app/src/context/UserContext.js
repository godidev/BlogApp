import { createContext, useReducer } from 'react'
import loginService from '../services/login'
import { NotificationContextProvider } from './NotificationContext'

const userReducer = (state, action) => {
  switch (action.type) {
    case 'getUser': {
      const loggedUserJSON = window.localStorage.getItem('loggedUser')
      if (loggedUserJSON !== 'undefined') {
        return JSON.parse(loggedUserJSON)
      } else {
        return null
      }
    }
    case 'set':
      return action.payload
    case 'logoutUser':
      window.localStorage.removeItem('loggedUser')
      return null
    default:
      return state
  }
}

export const loginUser = async userData => {
  const { username, password } = userData

  const userLogin = await loginService.login({
    username,
    password,
  })
  window.localStorage.setItem('loggedUser', JSON.stringify(userLogin))

  return { type: 'set', payload: userLogin }
}

const UserContext = createContext()

export function UserContextProvider({ children }) {
  const [user, dispatch] = useReducer(userReducer, null)

  return (
    <UserContext.Provider value={[user, dispatch]}>
      <NotificationContextProvider>{children}</NotificationContextProvider>
    </UserContext.Provider>
  )
}

export default UserContext
