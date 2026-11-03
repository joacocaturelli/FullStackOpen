import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import People from './components/People.jsx'
import Notification from './components/Notification.jsx'
import personService from './services/people.js'
import './index.css'

const App = () => {
  const [people, setPeople] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [notification, setNotification] = useState({ message: null, type: '' })

  useEffect(() => {
    personService.getAll().then((initialPeople) => {
      setPeople(initialPeople)
    })
  }, [])

  const showNotification = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification({ message: null, type: '' })
    }, 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    if (people.some(person => person.name === newName)) {

      if (window.confirm(`${newName} is alredy added to phonebook, replace the old number with a new one?`)) {

        const person = people.find(p => p.name === newName)

        personService.update(person.id, personObject)
          .then((updatedPerson) => {
            setPeople(people.map(p => p.id !== person.id ? p : updatedPerson))
            setNewName('')
            setNewNumber('')
            showNotification(`Updated ${person.name}`, 'success')
        }).catch(error => {
          showNotification(`Information of ${person.name} has already been removed from server`, 'error')
        })
      }
    } else {

      personService.create(personObject)
        .then((returnedPerson) => {
          setPeople(people.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          showNotification(`Added ${returnedPerson.name}`, 'success')
      }).catch(error => {
        showNotification(`Error creating new contact`, 'error')
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
      
      personService.remove(id)
        .then(() => {
          setPeople(people.filter((person) => person.id !== id))
          showNotification(`Deleted ${name}`, 'success')
      }).catch(error => {
        showNotification(`Error deleting new contact`, 'error')
      })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>

      <Notification message={notification.message} type={notification.type} />

      <Filter inputValue={searchName} eventController={handleFilterChange}/>

      <h2>Add a new</h2>
      <PersonForm 
        name={newName} 
        number={newNumber} 
        submitController={addPerson} 
        nameController={handleNameChange} 
        numberController={handleNumberChange}
      />

      <h2>Numbers</h2>
      <People people={people} searchName={searchName} handleDelete={handleDelete} />
    </div>
  )
}

export default App