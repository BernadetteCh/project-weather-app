//Timestamp
function formatDate(timestamp) {
  let currentTime = new Date(timestamp);
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

function displayWeatherCondition(response) {
  console.log(response);
  let currentTemp = document.querySelector(".degree");
  currentTemp.innerHTML = Math.round(celsiusTemperature);
  console.log(currentTemp);
  let currentCity = document.querySelector("h1");
  currentCity.innerHTML = response.data.name;
  console.log(currentCity);

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

  celsiusTemperature = response.data.main.temp;
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

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

//Convert into Fahrenheit & Celsius

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  currentTemp = document.querySelector(".degree");

  let fahrenheitlink = (celsiusTemperature * 9) / 5 + 32;

  currentTemp.innerHTML = Math.round(fahrenheitlink);
}

function displayCelsiusTemperature(event) {
  currentTemp = document.querySelector(".degree");
  currentTemp.innerHTML = Math.round(celsiusTemperature);
}

celsiusTemperature = null;

let fahrenheitlink = document.querySelector("#fahrenheit-temperature");
fahrenheitlink.addEventListener("click", displayFahrenheitTemperature);

let celsiuslink = document.querySelector("#celsius-temperature");
celsiuslink.addEventListener("click", displayCelsiusTemperature);

searchCity("New York");
