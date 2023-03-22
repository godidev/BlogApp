import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'set':
      return action.payload
    case 'clear':
      return null
    default:
      return state
  }
}

const NotificationContext = createContext()

export function NotificationContextProvider({ children }) {
  const [notification, setNotification] = useReducer(notificationReducer, null)
  return (
    <NotificationContext.Provider value={[notification, setNotification]}>
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
