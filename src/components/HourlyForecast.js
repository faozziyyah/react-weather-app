import React from 'react'
import moment from 'moment';
import styles from "../css/Page.Module.css";



function HourlyForecast({hourlyForecast}) {
    return (
        <div className="hourly-container">
            <section className={styles.hourly}>
                <p>{Math.round(hourlyForecast.main.temp)}℃</p>
                <img src={"https://openweathermap.org/img/wn/"+hourlyForecast.weather[0].icon +".png"} alt="" />
                <p>{moment.unix(hourlyForecast.dt).format('LT')}</p>
            </section>
        </div>
    )
}

export default HourlyForecast
