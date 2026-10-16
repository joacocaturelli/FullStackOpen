const Filter = ({inputValue, eventController}) => {
  return (
    <div>
      filter shown with
      <input value={inputValue} onChange={eventController} name="filter"/>
    </div>
  )
}

export default Filter