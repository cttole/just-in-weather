


var searchBtn = document.getElementById('search');

function getApi() {
    var searchInput = document.getElementById('search-input').value;
    var apiKey = '3897163780046d10a78d264dc13524a8'; 

    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&appid=" + apiKey;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })
        .catch(function (error) {
            console.log(error);
        });
}

searchBtn.addEventListener("click", getApi);





var searchBtn = document.getElementById('search');
var apiKey = "3897163780046d10a78d264dc13524a8";

function getCoordinates(city) {
    var requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + encodeURIComponent(city) + '&key=' + apiKey;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data.results.length > 0) {
                var latitude = data.results[0].geometry.lat;
                var longitude = data.results[0].geometry.lng;
                console.log('Coordinates:', latitude, longitude);
            } else {
                console.log('No results found for the given city');
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

searchBtn.addEventListener('click', function () {
    var cityInput = document.getElementById('search-input').value;
    getCoordinates(cityInput);
});


var searchBtn = document.getElementById('search');
var apiKey = '3897163780046d10a78d264dc13524a8'; 

function updateWeatherCard(data) {
    var cityName = data.name;
    
    var temperature = data.main.temp;
    var fTemp = temperature * 9 / 5 + 32;  // converts celcius to ferenheight
    var weatherDescription = data.weather[0].description;
    var windSpeed = data.wind.speed;
    var humidity = data.main.humidity;
    var visibility = data.visibility;

// fixes temperature decimal
    const number = fTemp;
    const fixedNum = Math.round(number*100)/100;
    
console.log(cityName)
var cardTitle = document.querySelector('.card .city');
cardTitle.textContent = cityName;

var temperatureElement = document.querySelector('.card .display-4');
temperatureElement.textContent = fTemp + '°F';

var weatherDescriptionElement = document.querySelector('.card .small');
weatherDescriptionElement.textContent = weatherDescription;

var windSpeedElement = document.querySelector('.card .fa-wind ~ span');
windSpeedElement.textContent = windSpeed + ' km/h';

var humidityElement = document.querySelector('.card .fa-tint ~ span');
humidityElement.textContent = humidity + '%';

var visibilityElement = document.querySelector('.card .fa-sun ~ span');
visibilityElement.textContent = (visibility / 1000) + ' km';
}

function getWeatherData(city) {
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + encodeURIComponent(city) + '&appid=' + apiKey + '&units=metric';

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            updateWeatherCard(data);
        })
        .catch(function (error) {
            console.log(error);
        });
}

searchBtn.addEventListener('click', function () {
    var cityInput = document.getElementById('search-input').value;
    getWeatherData(cityInput);
});





// local storage search history

function saveSearchToHistory(city) {
    var searches = JSON.parse(localStorage.getItem('searches')) || [];
    searches.unshift(city);
    searches = searches.slice(0, 5); // Limit the history to 5 searches, adjust as needed
    localStorage.setItem('searches', JSON.stringify(searches));
    updateSearchHistory();
  }
  
  function updateSearchHistory() {
    var searchHistoryElement = document.getElementById('searchHistory');
    var searches = JSON.parse(localStorage.getItem('searches')) || [];
    searchHistoryElement.innerHTML = '';
  
    searches.forEach(function (city) {
      var searchItem = document.createElement('div');
      searchItem.classList.add('search-item');
      searchItem.textContent = city;
      searchItem.addEventListener('click', function () {
        document.getElementById('search-input').value = city;
        handleSearch();
      });
      searchHistoryElement.appendChild(searchItem);
    });
  }
  
  function handleSearch() {
    var cityInput = document.getElementById('search-input').value;
    getWeatherData(cityInput);
    saveSearchToHistory(cityInput);
  }
  
  searchBtn.addEventListener('click', handleSearch);
  
  updateSearchHistory();
