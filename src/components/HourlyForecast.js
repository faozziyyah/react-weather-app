import React from 'react'
import moment from 'moment';
import styled from "styled-components";

const Hourly = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
`;



function HourlyForecast({hourlyForecast}) {
    return (
        <div className="hourly-container">
            <Hourly className="hourly">
                <p>{Math.round(hourlyForecast.main.temp)}℃</p>
                <img src={"https://openweathermap.org/img/wn/"+hourlyForecast.weather[0].icon +".png"} alt="" />
                <p>{moment.unix(hourlyForecast.dt).format('LT')}</p>
            </Hourly>
        </div>
    )
}

export default HourlyForecast
