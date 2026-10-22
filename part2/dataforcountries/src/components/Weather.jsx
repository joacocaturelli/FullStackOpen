import { useEffect, useState } from "react";
import { getWeather } from "../services/weather.js";

const Weater = ({ country }) => {
  const [weather, setWeather] = useState(null)

  const VITE_WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY
  
  useEffect(() => {
    getWeather(VITE_WEATHER_API_KEY, country.capitalInfo.latlng).then((weatherInfo) => (
      setWeather(weatherInfo)
    )).catch(
      console.log('No valid data was received from the API')
    )
  }, [])
  
  if (weather) {
    const temperature = Math.round(weather.current.temp_c);
    const icon = `https:${weather.current.condition.icon}`
    const wind = weather.current.wind_kph

    return (
      <div>
        <h2>Weather in {country.name.common}</h2>
        <p>Temperature: {temperature} Celsius</p>
        <img src={icon} alt="weather icon" />
        <p>Wind: {wind} k/h</p>
      </div>
    )
  }
}

export default Weater