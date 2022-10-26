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

function displayDailyForecast(){
  let dailyForecastElement=document.querySelector("#daily-forecast");
  let dayParts=["Morning","Afternoon","Evening","Overnight"];
  dayParts.forEach(function(part){
let dailyForecastHTML =`<div class="row" id="daily-forecast">
   <div class="col-3">Morning</div> 
  <div class="col-3">Afternoon</div>
  <div class="col-3">Evening</div>
  <div class="col-3">Overnight</div>
  <div class="col-3">🌧️</div>
  <div class="col-3">🌧️</div>
  <div class="col-3">🌧️</div>
  <div class="col-3">🌥️</div>
  <div class="col-3"><span class="max">19°</span></div>
  <div class="col-3"><span class="max">19°</span></div>
  <div class="col-3"><span class="max">19°</span></div>
  <div class="col-3"><span class="max">16°</span></div>
</div>`});
  dailyForecastElement.innerHTML=dailyForecastHTML;
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
}

function search(city) {
  let apiKey = "faa50e274cdcc1720b61bb86d2823360";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-bar");
  search(cityInputElement.value);
}


function displayFahrenheitTemp(event){
    event.preventDefault();
    let temperatureElement=document.querySelector("#temperature-degrees");
    let fahrenheitTemp=(celsiusTemperature * 9)/5+32;
    temperatureElement.innerHTML = `${Math.round(fahrenheitTemp)}°F`;
}

function displayCelsiusTemp(event){
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature-degrees");
    temperatureElement.innerHTML = `${Math.round(celsiusTemperature)}°C`;
}
let celsiusTemp=null;

let searchForm = document.querySelector("#nav-bar");
searchForm.addEventListener("submit", handleSubmit);


let fahrenheitTempLink=document.querySelector("#fahrenheit");
fahrenheitTempLink.addEventListener("click", displayFahrenheitTemp);

let celsiusTempLink = document.querySelector("#celsius");
celsiusTempLink.addEventListener("click", displayCelsiusTemp);

search("Madrid");

function showPosition(position) {
  let apiKey = "5faa50e274cdcc1720b61bb86d2823360";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat={position.coords.latitude}&lon={position.coords.longitude}&appid=${apiKey}`;
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
function retrievePosition(position) {
  let apiKey = "faa50e274cdcc1720b61bb86d2823360";
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
