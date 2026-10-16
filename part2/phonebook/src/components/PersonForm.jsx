const PersonForm = ({name, number, submitController, nameController, numberController}) => {
  return (
    <form onSubmit={submitController}>
      <div>name:<input value={name} onChange={nameController} name="name"/></div>
      <div>number: <input value={number} onChange={numberController} name="number"/></div>
      <div><button type="submit" >add</button></div>
    </form>
  )
}

export default PersonForm