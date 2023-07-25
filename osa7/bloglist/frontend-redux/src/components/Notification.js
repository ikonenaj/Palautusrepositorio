import { useSelector } from "react-redux"

const Notification = ({ message, action }) => {
  const notification = useSelector(state => state.notification)
  if (message === null) {
    return null
  }

  return (
    notification &&
    <div>
      {notification}
    </div>
  )
}

export default Notification
