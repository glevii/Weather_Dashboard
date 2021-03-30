var searchBtn = document.querySelector(".searchBtn");

searchBtn.addEventListener("click", function () {
  fiveDay();
  currentWeather();
});

function currentWeather() {
  var cityName = document.querySelector(".cityName").value;
  var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName},au&appid=0275a6d35dd97e39a7e43e6ae04fd495&units=metric`;
  
  var todayWeather = document.querySelector(".todayWeather");
  

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    todayWeather.innerHTML = ""

    var todayForecast = response;
    var lat = todayForecast.coord.lat;
    var lon = todayForecast.coord.lon;

    todayWeather.innerHTML = todayWeather.innerHTML + `<div class="jumbotron">
    <h3 class="today">${todayForecast.name} (${moment(todayForecast.dt, "X").format("DD/MM/YYYY")}) <img src="http://openweathermap.org/img/w/${todayForecast.weather[0].icon}.png"
            class="image" alt="...">
    </h3>
    <p class="temperature">Temperature: ${todayForecast.main.temp} °C</p>
    <p class="humidity">Humidity: ${todayForecast.main.humidity}%</p>
    <p class="windSpeed">Wind Speed: ${todayForecast.wind.speed} KMH</p>
    <p>UV Index: <button class="UVIndex"></button></p>
    
</div>
`
getUVIndex(lat, lon);
  })
}

function getUVIndex(lat, lon) {
  var queryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&appid=0275a6d35dd97e39a7e43e6ae04fd495&units=metric`

  var UVIndexBtn = document.querySelector(".UVIndex");

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);

    var UVI = response.current.uvi;

    if (UVI < 5) {
      UVIndexBtn.setAttribute("style", "background-color:green;");
    }
    else if (UVI < 7) {
      UVIndexBtn.setAttribute("style", "background-color:yellow;");
    }
    else {
      UVIndexBtn.setAttribute("style", "background-color:red;");
    }

    UVIndexBtn.append(UVI)

  })

}


function fiveDay() {
  var cityName = document.querySelector(".cityName").value;
  var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName},au&appid=0275a6d35dd97e39a7e43e6ae04fd495&units=metric`;

  var cardDeck = document.querySelector(".card-deck");

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    cardDeck.innerHTML = ""
    var fiveDayForecastArray = response.list;
    for (let i = 0; i < fiveDayForecastArray.length; i++) {
      if (fiveDayForecastArray[i].dt_txt.includes("15:00:00")) {

        cardDeck.innerHTML = cardDeck.innerHTML + `<div class="card">
        <div>
           <h5>${moment(fiveDayForecastArray[i].dt, "X").format("DD/MM/YYYY")}</h5>
           </div>
           <img src="http://openweathermap.org/img/w/${fiveDayForecastArray[i].weather[0].icon}.png" class="image" alt="...">
           <div class="card-body">
               <p class="card-text">Temp: ${fiveDayForecastArray[i].main.temp} °C</p>
               <p class="card-text">Humidity: ${fiveDayForecastArray[i].main.humidity}%</p>
           </div>
       </div>`

      }
    }
  })
}