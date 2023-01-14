const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/weather", (req, res) => {
  const { lat, lon } = req.query;
  axios
    .get("https://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat,
        lon,
        appid: process.env.API_KEY,
        units: "imperial",
      },
    })
    .then(({ data }) => {
      res.json({
        data: parseWeatherData(data),
      });
    })
    .catch((e) => {
      console.log(e);
      res.sendStatus(500);
    });
});

function parseWeatherData(data) {
  const { temp: currentTemp, temp_max: highTemp, temp_min: lowTemp, feels_like: feelsLike } = data.main;
  const { weather } = data;
  const icon = weather[0].icon;
  const { speed: windSpeed } = data.wind;

  return {
    currentTemp: Math.round(currentTemp),
    highTemp: Math.round(highTemp),
    lowTemp: Math.round(lowTemp),
    feelsLike: Math.round(feelsLike),
    windSpeed: Math.round(windSpeed),
    icon,
    description: weather[0].description,
  };
}

app.listen(3001);
