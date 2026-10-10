const Filter = ({inputValue, eventController}) => {
  return (
    <div>
      filter shown with
      <input value={inputValue} onChange={eventController} />
    </div>
  )
}

export default Filter