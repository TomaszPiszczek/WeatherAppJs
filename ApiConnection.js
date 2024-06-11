document.getElementById('city-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const city = document.getElementById('city-input').value;
    const apiKey = '';
    const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
    const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`);
    const weatherData = await weatherResponse.json();
    const forecastData = await forecastResponse.json();

    // Update current weather
    document.getElementById('city-name').textContent = weatherData.name;
    document.getElementById('current-temp').textContent = `${Math.round(weatherData.main.temp)}°C`;
    document.getElementById('feels-like').textContent = `${Math.round(weatherData.main.feels_like)}°C`;
    document.getElementById('pressure').textContent = `${weatherData.main.pressure} hPa`;
    document.getElementById('wind').textContent = `${weatherData.wind.speed} km/h`;
    document.getElementById('weather-description').textContent = weatherData.weather[0].description;
    document.getElementById('weather-icon').src = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

    const sunsetdate = new Date(weatherData.sys.sunset * 1000);
    const sunsethour = sunsetdate.getHours();
    const minutes = sunsetdate.getMinutes();
    document.getElementById('sunset-time').textContent = `${sunsethour}:${minutes < 10 ? '0' : ''}${minutes}`;

    const sunrisedate = new Date(weatherData.sys.sunrise * 1000);
    const sunrisehour = sunrisedate.getHours();
    const minutes2 = sunrisedate.getMinutes();
    document.getElementById('sunrise-time').textContent = `${sunrisehour}:${minutes2 < 10 ? '0' : ''}${minutes2}`;


    const forecastContainer = document.getElementById('forecast-container');
    forecastContainer.innerHTML = '';
    forecastData.list.forEach(item => {
        const date = item.dt_txt;
        const tempMax = item.main.temp_max;
        const tempMin = item.main.temp_min;
        const description = item.weather[0].description;
        const icon = item.weather[0].icon;
        forecastContainer.innerHTML += `
            <div class="weather-currently-middle-forecast flex justify-between items-center border-t py-4">
                <div class="weather-currently-middle-forecast-day-label text-gray-700">${date}</div>
                <img src="http://openweathermap.org/img/wn/${icon}.png" class="weather-currently-middle-forecast-ico w-10 h-10" alt="${description}">
                <div class="weather-currently-middle-forecast-temperature flex text-gray-700">
                    <span class="weather-currently-middle-forecast-temperature-max mr-2">${Math.round(tempMax)}°C</span>
                    <span class="weather-currently-middle-forecast-temperature-min">${Math.round(tempMin)}°C</span>
                </div>
            </div>
        `;
    });
});
