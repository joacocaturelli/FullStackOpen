import axios from "axios";

export const getWeather = (VITE_WEATHER_API_KEY, location) => {
  const request = axios.get(
    `https://api.weatherapi.com/v1/forecast.json?key=${VITE_WEATHER_API_KEY}&q=${location}&days=2&aqi=no`,
  );

  return request.then((response) => response.data);
};
