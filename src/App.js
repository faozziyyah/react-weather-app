/* eslint-disable no-lone-blocks */
import React, { useState } from 'react';
import styles from './css/Page.Module.css';
import searchImg from './assets/Vector.png';
import location from './assets/Location.png';
import Forecast from './components/Forecast';

const api = {
  key: "5ee5730275c2be88687659f263c66764",
  base: "https://api.openweathermap.org/data/2.5/"
} 

function App() {

  const [query, setQuery] = useState('lagos');
  const [weather, setWeather] = useState('');
  const [forecasts, setForecast] = useState([]);

  const search = evt => {
      if (evt.key === "Enter") {
                       // eslint-disable-next-line no-lone-blocks
                       {/* request to fetch the current weather */}
          fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
              .then(res => res.json())
              .then(result => {
                  setWeather(result);
                  console.log(result);
              });
              
              {/* request to fetch the 5days/3hourly weather forecast */}
          fetch(`${api.base}forecast?q=${query}&cnt=5&units=metric&APPID=${api.key}`)
              .then(data => data.json())
              .then(forecastData => {
                  setForecast(forecastData.list);
                  console.log(forecastData.list);
              })
      }
  }

  const dateInfo = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={styles.app}>
    <main className={styles.main}>
      <div className={styles.searchbox}>
        <img src={searchImg} alt={searchImg} />
        <input 
          type="text" 
          className={styles.searchbar} 
          placeholder="Lagos, Nigeria"
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
        />
        <button type="button" className={styles.btn} onClick={search}>search</button>
      </div>

      {(typeof weather.main != "undefined") ? (

        <div className={styles.container}>
            <h1 className={styles.h1}>Next Forecast</h1>
            <section className={styles.details}>
                {forecasts.map((forecast, index) => 
                     <Forecast 
                          key = {index}
                          forecast = {forecast}
                     />
                )}
            </section>

            <h1 className={styles.h1}>Next Forecast</h1>

            <div className={styles.wrapper}>

            <div className={styles.locationbox}>
                <div className={styles.city}>
                    <img src={location} alt="" />
                    <h3 className={styles.location}> {weather.name}, {weather.sys.country}</h3>
                </div>
                <div className={styles.weathercond}>
                    <h1 className={styles.temperature}>{Math.round(weather.main.temp)}℃</h1>
                    <img
                        className={styles.icon}
                        src={"https://openweathermap.org/img/wn/"+weather.weather[0].icon +".png"}
                        alt=""
                    />
                </div>
            </div>

            <div className={styles.weatherinfo}>
                <p className={styles.date}>{dateInfo(new Date())}</p>
                <h5 className={styles.weather}>{weather.weather[0].main}</h5>
                    
            </div>
            </div>
        </div>

      ) : ('')}
      
    </main>
    </div>
  );
}

export default App;
