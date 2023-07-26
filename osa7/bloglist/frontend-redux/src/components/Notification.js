import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const message = notification.message
  const className = notification.className

  return (
    message &&
    <div className={className}>
      {message}
    </div>
  )
}

export default Notification
