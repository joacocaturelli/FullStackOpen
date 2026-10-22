import { useState, useEffect } from 'react'
import Filter from './components/Filter.jsx'
import Countries from './components/Countries.jsx'
import countriServices from './services/countries.js'

function App() {
  const [countries, setCountries] = useState([])
  const [onSearch, setOnSearch] = useState('')

  useEffect(() => {
    countriServices.getAll(onSearch).then((searchedCountries) => {
      setCountries(searchedCountries)
    }).catch(
      console.log('No valid data was received from the API')
    )
  }, [])


  const handleFilterChange = (event) => {
    setOnSearch(event.target.value)
  }
  
  return (
    <div>

      <Filter inputValue={onSearch} eventController={handleFilterChange}/>

      <Countries countries={countries} onSearch={onSearch}/>

    </div>
  )
}

export default App
