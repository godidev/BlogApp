import { useContext } from 'react'
import NotificationContext from '../context/NotificationContext'

const Notification = () => {
  const [notification] = useContext(NotificationContext)
  if (notification === null) {
    return null
  }
  const { color, text } = notification
  const style = {
    color,
    border: `1px solid ${color}`,
  }
  return <p style={style}>{text}</p>
}

export default Notification
