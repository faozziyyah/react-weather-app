import moment from 'moment';
import React from 'react'
import styled from "styled-components";

const ForecastContainer = styled.footer`
    display: flex;
    width: 40%;
    flex-direction: column;
    color: #fff;
`;

const ForecastHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
`;

const ForecastDays = styled.div`
    background: #8862fc;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 2em;
    border-radius: 10px;
`;

const ForecastMain = styled.div`
    display: flex;
    flex-direction: column;
    background-color: rgba(255,255,255, 0.1);
    border-radius: 20px;
    margin-top: 1em;
    padding-top: 1em;
    padding-bottom: 1em;
`;

const ForecastDetails = styled.article`
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    height: 30px;
`;

const ForecastLine = styled.hr`
    color: rgba(255, 255, 255, 0.1);
`;

function Forecast({forecast}) {
    return (
        <ForecastContainer className="forecast-container">
            <ForecastHeader className="forecast-heading">
                <h4>Next Forecast</h4>
                <ForecastDays className="forecast-days">Five Days</ForecastDays>
            </ForecastHeader>
            <ForecastMain className="forecast-main">
                {forecast.map((data) => {
                    return (
                        <div className="forecasts">
                            <ForecastDetails className="forecast">
                                <p className="forecast-date">{moment.unix(data.dt).format('MMM Do')}</p>
                                <img className="forecast-icon" src={"https://openweathermap.org/img/wn/"+data.weather[0].icon+".png"} alt="" />
                                <p className="forecast-temp">{Math.round((data.temp.max + data.temp.min)/2)}℃</p>
                            </ForecastDetails>
                            <ForecastLine className="line"/>
                        </div>
                    )
                })}
            </ForecastMain>
        </ForecastContainer>
    )
}

export default Forecast
