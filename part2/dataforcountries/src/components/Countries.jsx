import { useState } from "react"
import Weater from "./Weather"

const Country = ({ country }) => {
  if (country) {
    return (
      <article>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Continent: {country.region} </p>

        <h3>Languages</h3>
        <ul>
          {Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>

        <img src={country.flags.png} alt={country.flag} />

        <Weater country={country} />
      </article>
    )
  }
}

const Countries = ({ countries, onSearch }) => {
  const [countryToShow, letCountryToShow] = useState(null)

  let countriesToShow = []

  if(onSearch !== '') {
    countriesToShow = countries.filter((country) => (
      country.name.common.toLowerCase().includes(onSearch.toLowerCase()
    )))
  }

  if (countriesToShow.length > 10) {
    return 'Too many matches, specify another filter'
  }

  if (countriesToShow.length === 1) {
    return (
      <div>
        <Country 
          country={countriesToShow[0]} 
        />
      </div>
    )
  }

  return (
    <div>
      {countriesToShow.map((country) => 
        <div key={country.name.common}>
          <p>
            {country.name.common}
          </p>
          <button onClick={() => letCountryToShow(country)}>Show</button>

          {country.name.common === countryToShow?.name.common 
            ? <Country country={countryToShow} />
            : <></>
          }
          
        </div>
      )}
    </div>
  )
}

export default Countries