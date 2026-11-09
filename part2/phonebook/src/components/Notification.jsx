const Notification = ({ type, message, error }) => {
  if (message === null) {
    return
  }

  return (
    <div className={type}>
      {error 
        ? `${message}: ${error}`
        : message
      } 
    </div>
  )
}

export default Notification