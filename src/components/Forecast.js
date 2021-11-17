import React from 'react';
import styles from '../css/Page.Module.css';

function Forecast({forecast}) {

    return (    
           
            <div className={styles.box}>
                <p className={styles.datelocale}>{new Date(forecast.dt * 1000).toLocaleDateString()}</p>
                <p className={styles.temp}>{Math.round(forecast.main.temp)}℃</p>
                <img
                    className={styles.icons}
                    src={"https://openweathermap.org/img/wn/"+forecast.weather[0].icon +".png"}
                    alt=""
                />
                <p className={styles.p1}>{new Date(parseInt (forecast.dt) * 1000).toGMTString()}</p>
            </div>
    )
}

export default Forecast
