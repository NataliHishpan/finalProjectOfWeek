let now = new Date();
function formatDate(date) {
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
  let hours = date.getHours();
  let minutes = date.getMinutes();

  let formattedDate = day + " " + hours + ":" + minutes;

  return formattedDate;
}

let currentDate = document.querySelector("#date");
currentDate.innerHTML = formatDate(now);

function showWeather(response) {
  console.log(response.data);
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
  let currentTemperature = document.querySelector("#temperature");
  currentTemperature.innerHTML = Math.round(response.data.main.temp);
  let currentHumidity = document.querySelector("#currentHumidity");
  currentHumidity.innerHTML = response.data.main.humidity;
  let currentWind = document.querySelector("#currentWind");
  currentWind.innerHTML = Math.round(response.data.wind.speed);
  let weatherDescription = document.querySelector("#weatherDescription");
  weatherDescription.innerHTML = response.data.weather[0].description;
}

function searchCity(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function userCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-text-input").value;
  searchCity(city);
}
let form = document.querySelector(".search-form");
form.addEventListener("submit", userCity);

function showPosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function getCurrentPosistion(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#currentPosistionButton");
button.addEventListener("click", getCurrentPosistion);
