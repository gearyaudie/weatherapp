import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchWeather } from "../redux/actions/weather";
import { RootState } from "../redux/reducers";

export const Weather: React.FC = () => {
  const [query, setQuery] = useState("");
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

  const weatherData = useSelector((state: RootState) => state.weather.weather);
  const iconData = useSelector((state: RootState) => state.weather.icon);
  const dispatch = useDispatch();

  const iconUrl = `https://openweathermap.org/img/wn/${iconData}@4x.png`;
  // For the weather icon //

  const getWeather = (e: any) => {
    e.preventDefault();
    console.log("form submitted");
    if (query === "") {
      console.log("no city or country");
    } else {
      dispatch(fetchWeather(query));
      setDate(theDate);
    }
  };

  // Search through the API with Query //
  // const search = (e) => {
  //   if (e.key === "Enter") {
  //     //   fetch(
  //     //     `${weatherApi.base}weather?q=${query}&units=metric&appid=${weatherApi.key}`
  //     //   )
  //     //     .then((res) => res.json())
  //     //     .then((data) => {
  //     //       setWeather(data);
  //     //       if (data.weather != "undefined") {
  //     //         const { icon } = data.weather[0];
  //     //         setTheIcon(icon);
  //     //         setDate(theDate);
  //     //       } else {
  //     //         console.log(e);
  //     //       }
  //     //       setQuery("");
  //     //     })
  //     //     .catch((e) => console.log(e));
  //     dispatch(fetchWeather(query));
  //     console.log(weatherData);
  //   }
  // };

  return (
    <>
      <div className="weather">
        <div className="container">
          <form onSubmit={getWeather}>
            <input
              type="text"
              value={query}
              placeholder="Enter a City or Country..."
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>

          {typeof weatherData.main !== "undefined" ? (
            <div className="output card">
              <div className="grid">
                <div className="output-details">
                  <h1 className="temperature">
                    {Math.round(weatherData.main.temp)}°C
                  </h1>
                  <h3 className="location">
                    {weatherData.name}, {weatherData.sys.country}
                  </h3>
                  <h3>{weatherData.weather[0].description}</h3>
                  <h3>{date}</h3>
                </div>
                <img src={iconUrl} alt="" />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};
