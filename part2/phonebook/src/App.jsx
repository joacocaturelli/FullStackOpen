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
  const [notification, setNotification] = useState({ type: '', message: null, error: null })

  useEffect(() => {
    personService.getAll()
      .then((initialPeople) => {setPeople(initialPeople)})
      .catch(error => {console.log(error.response.data.error)})
  }, [])

  const showNotification = (type, message, error) => {
    console.log('t', type);
    console.log('m', message);
    console.log('e', error);
    
    setNotification({ type, message, error })
    setTimeout(() => {
      setNotification({ type: '', message: null, error: null })
    }, 7000)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    if (people.some(person => person.name.toLowerCase() === newName.toLowerCase())) {

      if (window.confirm(`${newName} is alredy added to phonebook, replace the old number with a new one?`)) {

        const person = people.find(p => p.name.toLowerCase() === newName.toLowerCase())

        personService.update(person.id, personObject)
          .then((updatedPerson) => {
            setPeople(people.map(p => p.id !== person.id ? p : updatedPerson))
            setNewName('')
            setNewNumber('')
            showNotification('success', `Updated ${person.name}`)
        }).catch(error => {
          showNotification('err', `Error updating ${person.name}`, error.response.data.error)
        })
      }
    } else {

      personService.create(personObject)
        .then((returnedPerson) => {
          setPeople(people.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          showNotification('success', `Added ${returnedPerson.name}`)
      }).catch(error => {
        showNotification('err', `Error creating new contact`, error.response.data.error)
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
          showNotification('success', `Deleted ${name}`)
      }).catch(error => {
        showNotification('err', `Error deleting contact`, error.response.data.error)
      })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>

      <Notification type={notification.type} message={notification.message} error={notification.error} />

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