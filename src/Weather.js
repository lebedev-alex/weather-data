import React, { useState, useEffect, Fragment } from 'react'
import Forecast from './Forecast';
import Loader from './Loader';

const Weather = () => {
  const [temp, setTemp] = useState(null);
  const [trackingAllowed, setTrackingAllowed] = useState(true);
  const [forecastData, setForecastData] = useState([]);

  useEffect(() => {
    function success(position) {
      const apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?';
      const apiKey = '7e53b98ecad2b65c4b89031d5961d449';
      
      try {
        const {latitude, longitude} = position.coords;
              
        async function getTemp() {
          const res = await fetch(`${apiUrl}lat=${latitude}&lon=${longitude}&units=metric&exclude=hourly,minutely&appid=${apiKey}`);
          const data = await res.json();        
          const temperature = Math.round(data.current.temp);   
          const forecast = data.daily.slice(1);
                        
          setTemp(temperature);
          setForecastData(forecast);
        }
  
        getTemp();
      } catch (error) {
        console.error(error);
      }
    }
    
    function error(error) {
      if (error.code === error.PERMISSION_DENIED)
      setTrackingAllowed(false);
    };
  
    navigator.geolocation.getCurrentPosition(success,error);
  }, [])

  return (
    <Fragment>
      <section className="currentTemp">
        <h2>Current temperature for your location is:</h2>
          {temp && trackingAllowed ? 
          <p className="temp">{temp}°C</p> : trackingAllowed ? <Loader /> : 
          <p>This page has been blocked from tracking your location.</p>}  
      </section> 
      <Forecast data={forecastData} trackingAllowed={trackingAllowed} />
    </Fragment>
  )
}

export default Weather;
