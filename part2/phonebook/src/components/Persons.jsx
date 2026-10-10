const Person = ({person, handleDelete}) => {
  return (
    <>
      <p key={person.id}>
        {person.name} {person.number}
      </p>
      <button onClick={() => handleDelete(person.id, person.name)}>delete</button>
    </>
  )
}

const Persons = ({persons, searchName, handleDelete}) => {
  const personsToShow = searchName.length === 0
    ? persons
    : persons.filter((person) => (
      person.name.toLowerCase().includes(searchName.toLowerCase())
    ))
    
  return (
    <div>
      {personsToShow.map((person) => 
        <Person key={person.id} person={person} handleDelete={handleDelete}/>
      )}
    </div>
  )
}

export default Persons