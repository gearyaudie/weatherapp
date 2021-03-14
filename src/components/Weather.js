import React, { useState } from "react";

function Weather() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState("");
  const [theIcon, setTheIcon] = useState("");
  const [date, setDate] = useState("");

  // Set Current Date //
  var today = new Date();
  var theDate =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();

  // Weather API Details Object //
  const weatherApi = {
    key: "e4dd8394eb5644d7df7c1d35d82738df",
    base: "https://api.openweathermap.org/data/2.5/",
  };

  // For the weather icon //
  const iconUrl = `https://openweathermap.org/img/wn/${theIcon}@4x.png`;

  // Search through the API with Query //
  const search = (e) => {
    if (e.key === "Enter") {
      fetch(
        `${weatherApi.base}weather?q=${query}&units=metric&appid=${weatherApi.key}`
      )
        .then((res) => res.json())
        .then((data) => {
          setWeather(data);
          if (data.weather != "undefined") {
            const { icon } = data.weather[0];
            setTheIcon(icon);
            setDate(theDate);
          } else {
            console.log(e);
          }
          setQuery("");
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <>
      <div className='weather'>
        <div className='container'>
          <input
            type='text'
            value={query}
            placeholder='Search..'
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={search}
          />
          {typeof weather.main != "undefined" ? (
            <div className='output card'>
              <div className='grid'>
                <div className='output-details'>
                  <h1 className='temperature'>
                    {Math.round(weather.main.temp)}°C
                  </h1>
                  <h3 className='location'>
                    {weather.name}, {weather.sys.country}
                  </h3>
                  <h3>{weather.weather[0].description}</h3>
                  <h3>{date}</h3>
                </div>
                <img src={iconUrl} alt='' />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default Weather;
