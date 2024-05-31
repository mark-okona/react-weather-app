import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const apiKey = "65b833bc893711a450b887187627354a";
  let cityName = "London";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
  console.log(url);

  const searchLocation = async (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      setLocation("");
    }
  }
  return (
    <div className='app'>
      <div className='search'>
        <input
          value={location}
          type='text'
          placeholder='Enter location...'
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
        />
      </div>
      <div className='container'>
        <div className='top'>
          <div className='location'>
            <p>{data.name}</p>
          </div>
          <div className='temperature'>
            { data.main && <h1>{data.main.temp.toFixed()}°C</h1>  }
          </div>
          <div className='description'>
            { data.weather && <p>{data.weather[0].main}</p> }
          </div>
        </div>

        {data.name != undefined &&
          <div className='bottom'>
          <div className='feels-like'>
            { data.main && <p className='bold'>{data.main.feels_like.toFixed()}°C</p> }
            { data.main && <p>Feels like</p> }
          </div>
          <div className='humidity'>
            { data.main && <p className='bold'>{data.main.humidity}%</p> }
            { data.main && <p>Humidity</p> }
          </div>
          <div className='wind'>
            { data.wind && <p className='bold'>{data.wind.speed.toFixed()} km/h</p> }
            { data.wind && <p>Wind</p> }
          </div>
        </div>
        }

      </div>
    </div>
  )
}

export default App;
