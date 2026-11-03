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

const People = ({people, searchName, handleDelete}) => {
  const peopleToShow = searchName.length === 0
    ? people
    : people.filter((person) => (
      person.name.toLowerCase().includes(searchName.toLowerCase())
    ))
    
  return (
    <div>
      {peopleToShow.map((person) => 
        <Person key={person.id} person={person} handleDelete={handleDelete}/>
      )}
    </div>
  )
}

export default People