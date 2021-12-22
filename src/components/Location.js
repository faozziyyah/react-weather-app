import React, { useEffect, useState } from "react";
import axios from "axios";
import Weather from "./Weather";
import Forecast from "./Forecast";
import HourlyForecast from "./HourlyForecast";
import styled from "styled-components";
import { Loader } from 'semantic-ui-react';
import Search from "./Search";
import styles from "../css/Page.Module.css";

const url = 'https://api.openweathermap.org/data/2.5/onecall'
const base= "https://api.openweathermap.org/data/2.5/"
const apiKey = '5ee5730275c2be88687659f263c66764'

const HourlyWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    margin: auto;
    margin-top: 2em;
    color: #fff;
`;

function Location() {

    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);  
    const [city, setCity] = useState('');
    const [temprature, setTemprature] = useState(null);
    const [icon, setIcon] = useState('');
    const [description, setDescription] = useState('');
    const [forecast, setForecast] = useState([]);
    const [hourlyForecast, setHourlyForecast] = useState([]);
    const [loading, setloading] = useState(true);

    useEffect(() => {

        navigator.geolocation.getCurrentPosition(function (position) {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
          });

        axios.get(`${url}?lat=${latitude}&lon=${longitude}&exclude=minutely&appid=${apiKey}&units=metric`)
        .then((weatherData) => {
            console.log(weatherData.data);
            setloading(false);
            setTemprature(weatherData.data.current.temp);
            setCity(weatherData.data.timezone)
            setDescription(weatherData.data.current.weather[0].main);
            setIcon(weatherData.data.current.weather[0].icon);
            setForecast(weatherData.data.daily)
        })

        axios.get(`${base}forecast?lat=${latitude}&lon=${longitude}&cnt=7&appid=${apiKey}&units=metric`)
        .then((hourlyData) => {
            console.log(hourlyData.data.list);
            setHourlyForecast(hourlyData.data.list)
        })

    }, [latitude, longitude])


    return (
        <main className={styles.app}>
            <Search />

            {loading ? (
        <div className={styles.footers}>
          <p className={styles.loader}>Loading..Please Wait</p>
          <Loader active inline='centered' />
        </div>
      ) : (
          <div className='content'>
              <HourlyWrapper className={styles.hourlywrapper}>
                  <h4>Today's Forecast</h4>
                  <section className={styles.hourlycontainer}>
                  {hourlyForecast.map((hourlyForecast, index) => 
                      <HourlyForecast 
                           hourlyForecast={hourlyForecast}
                      />
                   )}
                </section>
            </HourlyWrapper>
              
              <footer className={styles.footer}>
                  <Forecast 
                    forecast={forecast}
                  />
                  <Weather 
                      temprature={temprature}
                      city={city}
                      description={description}
                      icon={icon}
                  />
             </footer>         
          </div>
      )}                
        </main>
  
    )
}

export default Location
