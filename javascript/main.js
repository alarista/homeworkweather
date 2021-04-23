var locations = [];
var locationEl = document.querySelector("#location-search");
var currentWeatherEl = document.querySelector("#current-weather");
var apiKey = "0549f376659f67f825a1568a079bfafd"

function searchMade(event){
    event.preventDefault();
    var location = locationEl.value.trim();
    getWeather(location);
    previousLocation(location);
}

function saveLocation(){
    localStorage.setItem("locations", JSON.stringify(locations));
}

function getWeather(location) {
    var requestURL = "https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}"

    fetch(requestURL)
    .then(function(response){
        response.json().then(function(data){
            displayCurrentW(data,city);
        });
    });
}

function displayCurrentW(weather, searchLocation){
    currentWeatherEl.textContent = "";
    locationEl.textContent = searchLocation;

    var currentDay = document.createElement("span");
    currentDay.textContent = " (" + moment(weather.dt.value).format("MMM D, YYYY") + ") ";
    locationEl.appendChild(currentDay);

    var temperatureEl = document.createElement("span");
    temperatureEl.textContent = "Temperature: " + weather.main.temp + " °F";
    temperatureEl.classList = "list-group-item"

    var lat = weather.coord.lat;
    var lon = weather.coord.lon;

}

function previousLocation(pastSearch){
    pastSearchEl = document.createElement("button");
    pastSearchEl.textContent = pastSearch;
    pastSearchEl.classList = "d-flex w-100 btn-light border p-2";
    pastSearchEl.setAttribute("previous-city-search",pastSearch)
    pastSearchEl.setAttribute("type", "submit");

    pastSearchButtonEl.prepend(pastSearchEl);

}

function previousSearchHandler(event){
    var location = event.target.getAttribute("previous-city-search");
    getWeather(city);

}


pastSearchButtonEl.addEventListener("click", pastSearchHandler);
