import axios from "axios";
import React, { useEffect, useState } from "react";
import Weather from "./components/Weather";
import Forecast from "./components/Forecast";
import HourlyForecast from "./components/HourlyForecast";
import searchImg from "../src/assets/Vector.png";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { Loader } from 'semantic-ui-react';
import { Link, Routes, Route} from 'react-router-dom';
import Current from "./components/Current";

const url = 'https://api.openweathermap.org/data/2.5/onecall'
const base= "https://api.openweathermap.org/data/2.5/"
const apiKey = '5ee5730275c2be88687659f263c66764'

const GlobalStyle = createGlobalStyle`
    body{
        width: 100%;
    }
`;

const SearchBox = styled.div`
    background-color: rgba(255,255,255, 0.1);
    display: flex;
    align-items: center;
    width: 78%;
    margin: auto;
    margin-top: 2em;
    border-radius: 10px;
    padding-left: 1em;
`;

const SearchBar = styled.input`
    background-color: transparent;
    border: none;
    outline: none;
    width: 80%;
    padding-left: 10px;
    margin-right: -0.05em;
    ::placeholder,
  ::-webkit-input-placeholder {
    color: #fff;
  }
`;

const Button = styled.button`
    background-color: #8862fc;
    color: #fff;
    border: none;
    outline: none;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100%;
    padding: 15px 1em;
    border-radius: 15px;
`;

const Main = styled.div`
    background: #7047eb;
    width: 90%;
    height: 100vh;
    margin: auto;
    padding-top: 2em;
    padding-bottom: 15em;
`;

const Footer = styled.div`
display: flex;
width: 90%;
margin: auto;
justify-content: space-around;
margin-top: 3em;
`;

const HourlyWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    margin: auto;
    margin-top: 2em;
    color: #fff;
`;

const HourlyContainer = styled.div`
    width: 100%;
    margin: auto;
    background-color: rgba(255,255,255, 0.1);
    display: flex;
    justify-content: space-around;
    border-radius: 10px;
`;

function App() {

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
        <Main className="app">
            <Routes>
            <Route path="/current/*" element={<Current />} />
            </Routes>
            <GlobalStyle /> 

            <SearchBox className="search-box">
            <img src={searchImg} alt={searchImg} />
            <SearchBar 
                type="text" 
                className="" 
                placeholder="Lagos, Nigeria"
            />
            <Link to="/current">
              <Button >Search</Button>
            </Link>
        </SearchBox>

            {loading ? (
        <div>
          <p>Loading..Please Wait</p>
          <Loader active inline='centered' />
        </div>
      ) : (
          <div className='content'>
              <HourlyWrapper className="hourly-wrapper">
                  <h4>Today's Forecast</h4>
                  <HourlyContainer>
                  {hourlyForecast.map((hourlyForecast, index) => 
                      <HourlyForecast 
                           hourlyForecast={hourlyForecast}
                      />
                   )}
                </HourlyContainer>
            </HourlyWrapper>
              
              <Footer className="footer">
                  <Forecast 
                    forecast={forecast}
                  />
                  <Weather 
                      temprature={temprature}
                      city={city}
                      description={description}
                      icon={icon}
                  />
             </Footer>         
          </div>
      )}                
        </Main>
  
    )
}

export default App
