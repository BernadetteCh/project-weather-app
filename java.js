//Timestamp
function formatDate(time) {
  let currentTime = new Date();

  let hour = currentTime.getHours();

  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minutes = currentTime.getMinutes();

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

//Weather Data

function displayWeatherCondition(response) {
  celsiusTemperature = response.data.main.temp;
  let currentTemp = document.querySelector(".degree");
  currentTemp.innerHTML = Math.round(celsiusTemperature);

  let currentCity = document.querySelector("h1");
  currentCity.innerHTML = response.data.name;

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

  getForecast(response.data.coord);
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

//Forecast
function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col d-flex justify-content-center">
            <div class="forecast">
              <div class="forecast_first">
                <div class="weather-forecast-date">${formatDay(
                  forecastDay.dt
                )}</div>
                <img
                  src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt="forecast-icon"
                  class="forecast-icon"
                />
                <div class="weather-forecast-temperature">${Math.round(
                  forecastDay.temp.day
                )}°</div>
              </div>
            </div>
          </div>
        `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "fb5a52a1b1d04da9188f79aaf5843917";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(displayForecast);
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days[day];
}

//City navigation
function displayNewYork(event) {
  event.preventDefault();
  let unit = "metric";
  let apiKey = "fb5a52a1b1d04da9188f79aaf5843917";
  let city = "New York";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

let NewYork = document.querySelector("#NewYork");
NewYork.addEventListener("click", displayNewYork);

function displayVienna(event) {
  event.preventDefault();
  let unit = "metric";
  let apiKey = "fb5a52a1b1d04da9188f79aaf5843917";
  let city = "Vienna";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;

  axios.get(apiUrl).then(displayWeatherCondition);
}
let Vienna = document.querySelector("#Vienna");
Vienna.addEventListener("click", displayVienna);

function displayLondon(event) {
  event.preventDefault();
  let unit = "metric";
  let apiKey = "fb5a52a1b1d04da9188f79aaf5843917";
  let city = "London";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

let London = document.querySelector("#London");
London.addEventListener("click", displayLondon);

function displayParis(event) {
  event.preventDefault();
  let unit = "metric";
  let apiKey = "fb5a52a1b1d04da9188f79aaf5843917";
  let city = "Paris";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

let Paris = document.querySelector("#Paris");
Paris.addEventListener("click", displayParis);

//Variablen

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);
searchCity("New York");

let currentlocation = document.querySelector("button");
currentlocation.addEventListener("click", showLocation);
