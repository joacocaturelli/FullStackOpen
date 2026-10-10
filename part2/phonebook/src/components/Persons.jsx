const Person = ({person}) => {
  return (
    <p key={person.id}>
      {person.name} {person.number}
    </p>
  )
}

const Persons = ({persons, searchName}) => {
  const personsToShow = searchName.length === 0
    ? persons
    : persons.filter((person) => (
      person.name.toLowerCase().includes(searchName.toLowerCase())
    ))
    
  return (
    <div>
      {personsToShow.map((person) => 
        <Person key={person.id} person={person} />
      )}
    </div>
  )
}

export default Persons