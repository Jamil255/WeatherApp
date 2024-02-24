import React, { useState, useEffect } from 'react'
import './Wether.css'
const API_KEY = '64ff52908c19e81d88410533d42d3a97'
const DEFAULT_CITY = 'karachi'

function WeatherApp() {
  const [search, setSearch] = useState('')
  const [weatherData, setWeatherData] = useState(null)
  const [error, setError] = useState(null)

  const pressBtn = async (searchValue) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${API_KEY}&units=metric`
      const response = await fetch(url)
      if (!response.ok) {
        alert('something went wrong')
      }
      const data = await response.json()
      console.log(data)
      setWeatherData(data)
      setSearch('')
    } catch (error) {
      setError(error.message)
    }
  }

  useEffect(() => {
    // Call pressBtn with the default city when the component mounts
    pressBtn(DEFAULT_CITY)
  }, []) // Empty dependency array ensures this effect runs only once after initial render

  return (
    <div className="container">
      <div className="top-bar">
        <input
          type="text"
          placeholder="Search...."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="search-icons">
          <img
            src="/search.png"
            alt="Search"
            onClick={() => pressBtn(search)}
          />
        </div>
      </div>
      {error && <div className="error-message">{error}</div>}
      {weatherData && (
        <>
          <div className="img">
            <img
              src={`https://openweathermap.org/img/w/${weatherData?.weather[0]?.icon}.png`}
              alt="Cloud"
            />
          </div>
          <p>{weatherData?.weather[0]?.description}</p>
          <div className="temp">{weatherData?.main?.temp}°C</div>
          <div className="location">{weatherData?.name}</div>
          <div className="data-con">
            <div className="element">
              <img src="/humidity.png" alt="Humidity" className="icon" />
              <div className="data">
                <div className="percent">{weatherData?.main?.humidity}%</div>
                <div className="text">Humidity</div>
              </div>
            </div>
            <div className="element">
              <img src="/wind.png" alt="Wind Speed" className="icon" />
              <div className="data">
                <div className="percent">{weatherData?.wind?.speed} km/h</div>
                <div className="text">Wind Speed</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default WeatherApp
