import { useNotificationContent } from "../notificationContext"

const Notification = () => {
  const content = useNotificationContent()
  console.log(content);

  return ( content.message &&
    <div className={content.style}>
      {content.message}
    </div>
  )
}

export default Notification
