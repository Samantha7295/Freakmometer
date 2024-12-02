import React, { useEffect, useState } from 'react';
import ChillGuy from './ChillGuy.tsx';

const apiKey = 'fd5c92beaa2aa1e02858517ae7645125';

// const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
// console.log(API_KEY); 

const Hero = () => {
  const [city, setCity] = useState('Ohio');
  const [units, setUnits] = useState('metric');
  const [validCity, setValidCity] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [weatherTemp, setWeatherTemp] = useState(''); //get rid of this later
  const [dailyForecast, setDailyForecast] = useState([]);
  const [timeZone, setTimeZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [submitted, setSubmitted] = useState(false);
  // const [apiKey, setApiKey] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchApiKey = async () => {
  //     try {
  //       const response = await fetch('/api/config');
  //       const data = await response.json();
  //       setApiKey(data.apiKey); 
  //     } catch (error) {
  //       console.error('Error fetching API key:', error);
  //     }
  //   };

  //   fetchApiKey();
  // }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCity(e.target.value);
  };

  const toggleUnits = () => {
    setUnits((prevUnits) => {
      const newUnits = prevUnits === 'metric' ? 'imperial' : 'metric';
      return newUnits;
    })
  }

  const fetchWeather = async () => {
    // if (!apiKey) {
    //   console.error('API key is not loaded');
    //   return;
    // }

    setSubmitted(true);
    try {
      const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`;
      const response = await fetch(apiUrl);
  
      if (!response.ok) {
        setErrorMessage('Error fetching weather data. Please try again.');
        setValidCity(false);
        return;
      }
  
      const data = await response.json();
  
      if (data.cod === "200") {
        setValidCity(true);
        setErrorMessage('');
        
        
        setWeatherTemp(data.list[0].main.temp);
  
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        const dailyData = data.list.filter((reading) => {
          const readingDate =  new Date(reading.dt_txt); 
          console.log('readingDate: ', readingDate);
          const localReadingDate = new Date(
            new Date(reading.dt_txt).toLocaleString('en-US', { timeZone: timeZone })
          );

          console.log('timeZone', timeZone);
          
          console.log('LocalReadingDate', localReadingDate);
          console.log('CurrentDate', currentDate);
          return (
            localReadingDate.getDate() === currentDate.getDate()
            || (localReadingDate > currentDate && localReadingDate.getHours() === 0) // Future midnight forecasts
          );
        });
        setDailyForecast(dailyData);
        
      } else {
        console.error('Invalid City', data.message);
        setValidCity(false);
        setErrorMessage('Invalid city. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setValidCity(false);
      setErrorMessage('Something went wrong. Please try again later.');
    }
  };

  useEffect(() => {
    if (city) {
      fetchWeather();
    }
  }, [units, city]);
    

  const description = dailyForecast.length > 0 ? dailyForecast[0].weather[0].description : '';

  return (
    <div className="py-20 px-20 text-white font-semi-bold">
      <div className='flex justify-between px-10 items-start '>
        <div className = ''>
        <h1 className="font-sans text-7xl">Freakmometer</h1>
          <h3 className="font-sans text-2xl py-2">
            A weather app to help check the air's rizzcount!</h3>
          <p className="font-['Courier New'] text-2xl py-7">
            Where Are You Mewing Right Now? </p>
          <div className = "flex items-center space-x-4">
            <input 
            type="text" 
            name = "cityInput" 
            placeholder="City Name" 
            value = {city}
            onChange = {handleInputChange}
            className="py-2 px-4 rounded-lg text-black"/>
            <button onClick={fetchWeather} className="rounded-lg py-2 px-2 bg-pink-700 text-1xl hover:bg-pink-800 text-white">
            ✅</button>

            <button onClick = {toggleUnits} className = "py-2 px-4 rounded-lg bg-yellow-400 hover:bg-pink-800 text-white">
              {units === 'metric' ? '°C' : '°F'}
            </button>       
          </div>
      
          <div className = 'mt-1 text-sm font-sans '>
            {submitted &&
            (!validCity ? (
              <p className="text-red-500">{errorMessage}</p>
            ) : (
              <p className="text-white">This city has a level 10 GYAAATTTTTTTT🍑🗺.</p>
            ))}
          </div>  
        </div>
        <div className = "">
          <ChillGuy city={city} description={description}/>
        </div>
      </div>

      {submitted && validCity && (
        <h1 className = 'text-4xl pt-10 px-10'>Daily FREAKcast of {city} 🌎</h1>
      )}


      <div className = 'flex flex-wrap justify-center items-center space-x-4 py-5'>
        {dailyForecast.map((day, index) => (
          <div key = {index} className = 'flex flex-col items-center shadow-lg shadow-indigo-900 bg-white/20 rounded-lg p-10 w-80 h-96'>
            <p className='text-4xl'>{new Date(day.dt_txt).toLocaleString('default', { weekday: 'long' })}</p>
            <p className = 'text-md'>{new Date(day.dt_txt).toLocaleString('default', { month : 'long' })} {new Date(day.dt_txt).getDate()}</p>

            <img src = {`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
            alt = {day.weather[0].description} />
            <p className='text-3xl'>{Math.round(day.main.temp)}°{units === 'metric' ? 'C' : 'F'} FREAK </p>
            <div className = 'text-md py-6'>
              <p>Feels like: {Math.round(day.main.feels_like)}°{units === 'metric' ? 'C' : 'F'} FREAK</p>
              <p>Description: {day.weather[0].description}</p>
              <p>Precipitation: {day.rain ? day.rain['3h'] : 0 } mm</p>
              <p>Wind Speed: {units === 'metric' ? day.wind.speed : (day.wind.speed * 2.23694).toFixed(2)} {units === 'metric' ? 'm/s' : 'mph'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Hero
