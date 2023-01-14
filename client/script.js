import axios from "axios";

navigator.geolocation.getCurrentPosition(positionSuccess, positionError);

function positionSuccess({ coords }) {
  getWeather(coords.latitude, coords.longitude);
}

function positionError() {
  alert("There was an error getting your location, please allow us to use your location and refresh the page ");
}

function getWeather(lat, lon) {
  axios
    .get("http://localhost:3001/weather", { params: { lat, lon } })
    .then((res) => {
      rednerWeather(res.data.data);
    })
    .catch((e) => {
      console.log(e);
      alert("Error getting weather. Please try again");
    });
}

function setValue(selector, value) {
  document.querySelector(`[data-${selector}]`).textContent = value;
}

function getIconUrl(icon, { large = false } = {}) {
  const size = large ? "@2x" : "";
  return `http://openweathermap.org/img/wn/${icon}${size}.png`;
}

const currentIcon = document.querySelector("[data-current-icon]");
function rednerWeather({ currentTemp, highTemp, lowTemp, feelsLike, windSpeed, description, icon }) {
  currentIcon.src = getIconUrl(icon, { large: true });
  setValue("current-temp", currentTemp);
  setValue("current-high", highTemp);
  setValue("current-low", lowTemp);
  setValue("current-wind", windSpeed);
  setValue("feels-like", feelsLike);
  setValue("current-description", description);
  document.body.classList.remove("blurred");
  console.log(currentTemp, highTemp);
}
