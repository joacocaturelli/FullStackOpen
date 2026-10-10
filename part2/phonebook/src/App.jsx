import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons.js'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.some(person => person.name === newName)) {

      if (window.confirm(`${newName} is alredy added to phonebook, replace the old number with a new one?`)) {

        const person = persons.find(p => p.name === newName)

        personService.update(person.id, personObject).then((updatedPerson) => {
          setPersons(persons.map(p => p.id !== person.id ? p : updatedPerson))
          setNewName('')
          setNewNumber('')
        })
      }
    } else {

      personService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setSearchName(event.target.value)
  }

  const handleDelete = (id, name) => {

    if (window.confirm(`Do you really want to remove ${name} from your contacts?`)) {
      
      personService.remove(id).then((removedPerson) => {
        setPersons(persons.filter((person) => person.id !== removedPerson.id))
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter inputValue={searchName} eventController={handleFilterChange}/>

      <h3>Add a new</h3>
      <PersonForm 
        name={newName} 
        number={newNumber} 
        submitController={addPerson} 
        nameController={handleNameChange} 
        numberController={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons persons={persons} searchName={searchName} handleDelete={handleDelete} />
    </div>
  )
}

export default App