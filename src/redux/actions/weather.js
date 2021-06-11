import axios from "axios";
import {
  FETCH_WEATHER_REQUEST,
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_FAILURE,
  FETCH_ICON,
} from "../types/weather";

export const fetchWeatherRequest = () => {
  return {
    type: FETCH_WEATHER_REQUEST,
  };
};

export const fetchWeatherSuccess = (weather, icon) => {
  return {
    type: FETCH_WEATHER_SUCCESS,
    payload: weather,
    payload2: icon,
  };
};

export const fetchWeatherFailure = (error) => {
  return {
    type: FETCH_WEATHER_FAILURE,
    payload: error,
  };
};

export const fetchWeather = (query) => {
  return (dispatch) => {
    dispatch(fetchWeatherRequest);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=e4dd8394eb5644d7df7c1d35d82738df`
    )
      .then((res) => res.json())
      .then((data) => {
        const weather = data;

        if (data.weather != "undefined") {
          const { icon } = data.weather[0];
          dispatch(fetchWeatherSuccess(weather, icon));

          console.log(icon);
          // console.log(weather, icon);
        } else {
          console.log("Error");
        }
      })
      .catch((err) => {
        dispatch(fetchWeatherFailure(err));
      });
  };
};
