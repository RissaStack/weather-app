const inputEl = document.querySelector('#search-input');

const searchEl = document.querySelector('#search-form');

const weatherApiRootUrl = 'https://api.openweathermap.org';
const apiKey = '816c2621a1505bc4baa5d3bdf7034738';

//get coordinates
function getCords() {
    let city = inputEl.value;
    let url = `${weatherApiRootUrl}/geo/1.0/direct?q=${city}&appid=${apiKey}`;
    fetch(url)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            console.log(data);
            let lat = data[0].lat;
            let lon = data[0].lon;
            console.log(lat, lon);
            getForecast(lat, lon);
            getCurrentWeather(lat, lon);
        });
}

//get current weather using the coordinates
function getCurrentWeather(lat, lon) {
    let url = `${weatherApiRootUrl}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
    fetch(url)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            console.log('current weather', data);
            renderCurrentDay(data);
        });
}

//get forecast using the coordinates
function getForecast(lat, lon) {
    let url = `${weatherApiRootUrl}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
    fetch(url)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            console.log(data);
        });
}

//render current day
function renderCurrentDay(data) {
    let today = document.querySelector('#today');
    let cityName = document.createElement('h2');
    let date = document.createElement('h3');
    let temp = document.createElement('h3');
    let wind = document.createElement('h3');
    let humidity = document.createElement('h3');
    let weatherConditions = document.createElement('h3');
    let icon = document.createElement('img');

    cityName.textContent = data.name;
    date.textContent = dayjs().format('MM/DD/YYYY');
    temp.textContent = `Temp: ${data.main.temp}°F`;
    wind.textContent = `Wind: ${data.wind.speed} MPH`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    weatherConditions.textContent = `Conditions: ${data.weather[0].description}`;
    icon.setAttribute(
        'src',
        `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
    );

    today.append(cityName, date, temp, wind, humidity, weatherConditions, icon);
}

//save searches to local storage
 function saveSearches() {
   let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    let city = inputEl.value;
    searchHistory.push(city);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    renderSearchHistory();
}

//render search history
function renderSearchHistory() {
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    let searchHistoryEl = document.querySelector('#search-history');
    searchHistoryEl.innerHTML = '';
    for (let i = 0; i < searchHistory.length; i++) {
        let btn = document.createElement('button');
        btn.textContent = searchHistory[i];
        btn.setAttribute('class', 'btn btn-secondary');
        btn.setAttribute('type', 'button');
        btn.setAttribute('data-city', searchHistory[i]);
        searchHistoryEl.append(btn);
    }
}


searchEl.addEventListener('submit', function (e) {
    e.preventDefault();
    console.log(inputEl.value);
    getCords();
});
