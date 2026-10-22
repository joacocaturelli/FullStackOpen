const Filter = ({inputValue, eventController}) => {
  return (
    <div>
      Find countries
      <input value={inputValue} onChange={eventController} name="filter"/>
    </div>
  )
}

export default Filter