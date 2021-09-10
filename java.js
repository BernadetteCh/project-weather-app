//#Feature #1
function formatDate(timestamp) {
  let currentTime = new Date();
  console.log(currentTime);

  let hour = currentTime.getHours();
  console.log(hour);
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minutes = currentTime.getMinutes();
  console.log(minutes);
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentTime.getDay()];

  return `${day} ${hour}:${minutes}`;
}
//City Change Feature #2
/*
function searchCity(event) {
  event.preventDefault();
  let input = document.querySelector("#input-city");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${input.value}`;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

//Bonus Feature

//Switch to Fahrenheit---> für Homework Week 5 entfernen?

function showfahrenheit(event) {
  event.preventDefault();

  let fahrenheit = document.querySelector(".degree");
  fahrenheit.innerHTML = "75";
}

let fahrenheitunit = document.querySelector("#fahrenheit-temperature");
fahrenheitunit.addEventListener("click", showfahrenheit);

//switch to Celsius

function showCelsius(event) {
  event.preventDefault();
  let celsius = document.querySelector(".degree");
  celsius.innerHTML = "24";
}

let celsiusunit = document.querySelector("#celsius-temperature");
celsiusunit.addEventListener("click", showCelsius);*/

function displayWeatherCondition(response) {
  console.log(response);

  let currentCity = document.querySelector("h1");
  currentCity.innerHTML = response.data.name;
  console.log(currentCity);
  let currentTemp = document.querySelector(".degree");
  currentTemp.innerHTML = Math.round(response.data.main.temp);
  console.log(currentTemp);
  let currenthumidity = document.querySelector(".humidity");
  currenthumidity.innerHTML = response.data.main.humidity;
  let currentwind = document.querySelector(".wind");
  currentwind.innerHTML = Math.round(response.data.wind.speed);
  let weatherdescription = document.querySelector(".description");
  weatherdescription.innerHTML = response.data.weather[0].description;
  let date = document.querySelector("#date");
  date.innerHTML = formatDate(response.data.dt * 1000);
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
}

function searchCity(city) {
  let unit = "metric";
  apiKey = "fb5a52a1b1d04da9188f79aaf5843917";
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city").value;
  searchCity(city);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);
searchCity("New York");

//Current Location

function searchLocation(position) {
  apiKey = "fb5a52a1b1d04da9188f79aaf5843917";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  unit = "metric";
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function showLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentlocation = document.querySelector("button");
currentlocation.addEventListener("click", showLocation);
//Change into Fahrenheit
