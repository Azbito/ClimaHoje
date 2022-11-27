import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './styles.scss'
import thermometer from './assets/thermometer.png'
import sun from './assets/sun.png'
import cloud from './assets/cloud.png'
import rain from './assets/rain.png'
import thunderstorm from './assets/thunderstorm.png'

export default function AppRouter() {
  const [location, setLocation] = useState(false)
  const [weather, setWeather] = useState({})

  let getWeather = async (lat, long) => {
    let res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=41.40338&lon=2.17403&appid=${process.env.REACT_APP_OPEN_WEATHER_KEY}`,
      {
        params: {
          lat: lat,
          lon: long,
          appid: process.env.REACT_APP_OPEN_WEATHER_KEY,
          lang: 'pt',
          units: 'metric'
        }
      }
    )
    setWeather(res.data)
    console.log(res.data)
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      getWeather(position.coords.latitude, position.coords.longitude)
      setLocation(true)
    })
  }, [])
  if (!location) {
    return (
      <div className="warning">
        <h3>Você precisa habilitar a localização no navegador.</h3>
      </div>
    )
  } else {
    return (
      <div className="container">
        <div className="weather-images">
          <img src={thermometer} alt="weather" />
          <img src={cloud} alt="weather" />
          <img src={rain} alt="weather" />
          <img src={sun} alt="weather" />
          <img src={thunderstorm} alt="weather" />
        </div>
        <p>Clima nas suas coordenadas</p>
        <br />
        <br />
        <ul className="temperatures">
          <br />
          <h2>
            Temperatura atual: <strong>{weather?.main?.temp}°</strong>
          </h2>
          <h2>
            Temperatura máxima: <strong>{weather?.main?.temp_max}°</strong>
          </h2>
          <h2>
            Temperatura mínima: <strong>{weather?.main?.temp_min}°</strong>
          </h2>
          <h2>
            Sensação: <strong>{weather?.main?.feels_like}°</strong>
          </h2>
          <h2>
            Pressão: <strong>{weather?.main?.pressure}hpa</strong>
          </h2>
          <h2>
            Umidade: <strong>{weather?.main?.humidity}%</strong>
          </h2>
          <br />
        </ul>
      </div>
    )
  }
}
