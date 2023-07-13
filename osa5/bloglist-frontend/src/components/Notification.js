const Notification = ({ message, action }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className={action}>
        {message}
      </div>
    )
  }

export default Notification;