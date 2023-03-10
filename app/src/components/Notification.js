const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  const { color, text } = message
  const style = {
    color,
    border: `1px solid ${color}`,
  }
  return <p style={style}>{text}</p>
}

export default Notification
