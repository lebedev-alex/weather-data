import React, { useState, useEffect } from 'react';
import format from 'date-fns/format';
import Loader from './Loader';

const Forecast = ({ data, trackingAllowed }) => {
  const [forecast, setForecast] = useState([]);  

  useEffect(() => {    
    setForecast(data);
  }, [data]);
  
  return (
    <section className="forecast">
      <h2>Forecast:</h2>
        {
        forecast.length !== 0 && trackingAllowed ? 
        <ul>
          {
          forecast.map(item => 
          <li key={item.dt}>
            <p>{format(+`${item.dt}000`, 'LLL do')}</p>
            <p className="forecastTemp">{Math.round(item.temp.day)}°C</p>
            <p>{item.weather[0].main}</p>      
          </li>)
          }
        </ul>
        : trackingAllowed ? <Loader /> : "Data unavailable."
        }   
    </section>
  )
}

export default Forecast;
