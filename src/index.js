let now = new Date();
let todayDate = document.querySelector("#today-date");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
let day = days[now.getDay()];
let hour = now.getHours();
let minutes = now.getMinutes();
let lastUpdate = document.querySelector("#full-date");
lastUpdate.innerHTML = `${day} ${now.getDate()}${month} ${now.getFullYear()}`;
todayDate.innerHTML = `GMT: ${hour}:${minutes}`;
if (hour < 10) {
  todayDate.innerHTML = `GMT: 0${hour}:${minutes}`;
}
if (minutes < 10) {
  todayDate.innerHTML = `GMT: ${hour}:0${minutes}`;
}

function formatDay(timeStamp) {
  let date = new Date(timeStamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  return days[day];
}

function displayWeeklyForecast(response) {
  let weeklyForecast = response.data.daily;
  let weeklyForecastElement = document.querySelector(
    "#weekly-weather-forecast"
  );
  let weeklyForecastHTML = `<div class="row">`;
  weeklyForecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      weeklyForecastHTML =
        weeklyForecastHTML +
        `
  <div class="col-2">
  <div class="forecastDay">${formatDay(forecastDay.dt)}</div>
  <img src="https://openweathermap.org/img/wn/${
    forecastDay.weather[0].icon
  }@2x.png" alt="scattered-clouds" width="40"/>
   <div class="weekly-forecast-temperatures">
  <span class="max">${Math.round(forecastDay.temp.max)}°C/</span>
  <span class="min">${Math.round(forecastDay.temp.min)}°C</span>
  </div>
  </div>`;
    }
  });
  weeklyForecastHTML = weeklyForecastHTML + `</div>`;
  weeklyForecastElement.innerHTML = weeklyForecastHTML;
}
function getWeeklyForecast(coordinates) {
  let apiKey = "0264d06982177bca550db925824523d8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeeklyForecast);
}

function formatHour(timeStamp) {
  let date = new Date(timeStamp * 1000);
  let hour = date.getHours();
  let hours = [
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
  ];
  return hours[hour];
}
function displayTodayForecast(response) {
  let todayForecastElement = document.querySelector("#daily-forecast");
  let todayForecast = response.data.hourly;
  let todayForecastHTML = `<div class="row">`;
  todayForecast.forEach(function (todayForecastHour, index) {
    if (index < 24) {
      todayForecastHTML =
        todayForecastHTML +
        `<div class="col-2">
   <div class="today-part-forecast">${formatHour(todayForecastHour.dt)}</div>
   <img src="https://openweathermap.org/img/wn/${
     todayForecastHour.weather[0].icon
   }@2x.png" alt="scattered-clouds" width="40"/>
    <div class="max">${Math.round(todayForecastHour.temp)}°C
  </div>
  <hr/>
  </div>`;
    }
  });
  todayForecastHTML = todayForecastHTML + `</div>`;
  todayForecastElement.innerHTML = todayForecastHTML;
}

function getTodayForecast(coordinates) {
  let apiKey = "0264d06982177bca550db925824523d8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTodayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature-degrees");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#weather-icon");
  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = `${Math.round(celsiusTemperature)}°C`;
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = `Humidity:${response.data.main.humidity}%`;
  windElement.innerHTML = `Wind:${Math.round(response.data.wind.speed)}km/h`;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getWeeklyForecast(response.data.coord);
  getTodayForecast(response.data.coord);
}

function search(city) {
  let apiKey = "0264d06982177bca550db925824523d8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-bar");
  search(cityInputElement.value);
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-degrees");
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = `${Math.round(fahrenheitTemp)}°F`;
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-degrees");
  temperatureElement.innerHTML = `${Math.round(celsiusTemperature)}°C`;
}
let celsiusTemp = null;

let searchForm = document.querySelector("#nav-bar");
searchForm.addEventListener("submit", handleSubmit);

let fahrenheitTempLink = document.querySelector("#fahrenheit");
fahrenheitTempLink.addEventListener("click", displayFahrenheitTemp);

let celsiusTempLink = document.querySelector("#celsius");
celsiusTempLink.addEventListener("click", displayCelsiusTemp);

search("Madrid");

function showPosition(position) {
  let apiKey = "0264d06982177bca550db925824523d8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat={position.coords.latitude}&lon={position.coords.longitude}&appid=${apiKey}`;
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
function retrievePosition(position) {
  let apiKey = "0264d06982177bca550db925824523d8";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(displayTemperature);
}

function getYourLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let locationButton = document.querySelector(".yourLocation");
locationButton.addEventListener("click", getYourLocation);
navigator.geolocation.getCurrentPosition(retrievePosition);
