function updateWeather(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#current-temperature");
  let cityElement = document.querySelector("#current-city");
  let temperature = response.data.temperature.current;
  let conditionElement = document.querySelector("#condition");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#current-time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
  conditionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  timeElement.innerHTML = formatDate(date);
  iconElement.innerHTML = `<img
                src="${response.data.condition.icon_url}"
                class="weather-app-icon"
              />`;
  getForecast(response.data.city);
}
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}
function searchCity(city) {
  let apiKey = "tfb34aff78c33f3d839do95056440025";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}
function actionSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}
function getForecast(city) {
  let apiKey = "tfb34aff78c33f3d839do95056440025";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}
function displayForecast(response) {
  console.log(response);
  let forecastHTML = "";
  response.data.daily.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="row">
            <div class="col-2">
              <div class="weather-forecast-day">${day}</div>
              <img
                src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/mist-day.png"
                alt=""
                width="40"
              />
              <div class="weather-forecast-temperature">
                <span class="forecast-temperature-max">${Math.round(
                  day.temperature.maximum
                )}°</span>
                <span class="forecast-temperature-min">${Math.round(
                  day.temperature.minimum
                )}°</span>
              </div>
            </div>
          </div>`;
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHTML;
}
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", actionSearchSubmit);
searchCity("London");
