const inputEl = document.querySelector('#search-input');

const searchEl = document.querySelector('#search-button');

const weatherApiRootUrl = 'https://api.openweathermap.org';
const apiKey = '816c2621a1505bc4baa5d3bdf7034738';

function getCords() {
    let city = inputEl.value;
    let url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;
    fetch(url)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            console.log(data);
            let lat = data[0].lat;
            let lon = data[0].lon;
            console.log(lat, lon);
        });
}

searchEl.addEventListener('click', function () {
    console.log(inputEl.value);
    getCords();
});
