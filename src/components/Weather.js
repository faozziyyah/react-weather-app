import React from 'react'
import moment from 'moment';
import styled from "styled-components";
import location from '../assets/Location.png';
import bgimage from '../assets/Rectangle.png';
import styles from "../css/Page.Module.css";

const WeatherTop = styled.header`
    background: url(${bgimage});
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    padding: 10px;
`;

const City = styled.header`
    background: #7047eb;
    width: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-radius: 10px;
`;

const CityName = styled.h3`
    font-size: 12px;
    margin-left: 10px;
`;

const LocationIcon = styled.img`
    width: 15%;
`;

const WeatherCond = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    margin-top: 4em;
    height: 50px;
    margin-bottom: -10px;
`;

const Temp = styled.h1`
    font-size: 35px;
`;

const WeatherInfo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    text-align: center;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
`;

const Date = styled.p`
    font-size: 13px;
`;

const WeatherIcon = styled.img`
width: 30%;
`;

function Weather({temprature, city, description, icon}) {

    return (
        <aside className={styles.wrapper}>

            <WeatherTop className="locationbox">
                <City className="city">
                    <LocationIcon src={location} alt="" />
                    <CityName className="location">{city}</CityName>
                </City>
                <WeatherCond className="weathercond">
                    <Temp className="temperature">{Math.floor(temprature)}℃</Temp>
                    <WeatherIcon
                        className="icon"
                        src={"https://openweathermap.org/img/wn/"+icon+".png"}
                        alt=""
                    />
                </WeatherCond>
            </WeatherTop>

            <WeatherInfo className="weatherinfo">
                <Date className="date">{moment().format('dddd, Do MMMM')}</Date>
                <h5 className="weather">{description} </h5>
                    
            </WeatherInfo>
            </aside>
    )
}

export default Weather
