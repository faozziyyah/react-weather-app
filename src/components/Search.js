import React, { useState } from 'react'
import searchImg from "../assets/Vector.png";
import styles from "../css/Page.Module.css";

const url= "https://api.openweathermap.org/data/2.5/"
const apiKey = '5ee5730275c2be88687659f263c66764'

function Search() {

    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [weather, setWeather] = useState({});

    if  (loading === true) {
        return <p className={styles.loading}>Loading Please wait...</p>
    }

    if  (error) {

        return (
            <>
                <p>city not found</p>
            </>
        )
    }
  
    const search = evt => {
      if (evt.key === "Enter") {
        setLoading(true);
        
        fetch(`${url}weather?q=${query}&units=metric&APPID=${apiKey}`)
          .then(res => res.json())
          .then(result => {
            setWeather(result);
            setQuery('');
            setError(null);
            setLoading(false);
            console.log(result);
          })
           .catch((e) => {
                console.warn(e.message);
                setError('City Not Found');
                setLoading(false);
          });

      }
    }

    return (
        <div>
            <div className={styles.searchbox}>
                <img src={searchImg} alt="search" />
                <input 
                  type="text"
                  className={styles.searchbar}
                  placeholder="Search..."
                  onChange={e => setQuery(e.target.value)}
                  value={query}
                  onKeyPress={search}
                />
                <button onClick={search} className={styles.btn}>Search</button>
            </div>
            {(typeof weather.main != "undefined") ? (
                <div className={styles.resultbox}>
                    <section className={styles.resulttop}>
                        <h1 className="location">{weather.name}, {weather.sys.country}</h1>
                        <img
                            className={styles.resulticon}
                            src={"https://openweathermap.org/img/wn/"+weather.weather[0].icon+".png"}
                            alt=""
                        />
                    </section>
    
                    <section className={styles.resultbottom}>
                        <section className={styles.resultinfo}>
                            <h1 className={styles.resulttemp}> {Math.round(weather.main.temp)}°c </h1>
                            <h3 className={styles.resultweather}>{weather.weather[0].main}</h3>
                            <h3 className={styles.resultweather}>{weather.weather[0].description}</h3>
                        </section>

                        <section className={styles.resultextra}>
                            <h3 className={styles.resulthumidity}>Humidity: {weather.main.humidity}%</h3>
                            <h3 className={styles.resulthumidity}>Pressure: {weather.main.pressure} mmhg</h3>
                            <h3 className={styles.resulthumidity}>Wind: {weather.wind.speed} kph</h3>
                        </section>
                    </section>

                </div>
            ) : ('')}
      </div>
    );
}

export default Search
