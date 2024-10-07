const weatherContent = document.getElementById('weather_API');

// Locations to fetch weather from (with latitude and longitude)
const locations = [
    { name: 'Gjøvik', latitude: 60.7954, longitude: 10.6916 },
    { name: 'Tromsø', latitude: 69.6492, longitude: 18.9553 },
    { name: 'Oslo', latitude: 59.9139, longitude: 10.7522 },
    { name: 'Bodø', latitude: 67.2804, longitude: 14.4049 },
    { name: 'Trondheim', latitude: 63.4305, longitude: 10.3951 }
];

// Converts weather code to readable text
function convertWeatherCode(code) {
    const weatherDescription = {
        0: "Clear sky",
        1: "Mainly clear",
        2: "Partly cloudy",
        3: "Overcast",
        45: "Fog",
        48: "Depositing rime fog",
        51: "Light drizzle",
        53: "Moderate drizzle",
        55: "Dense drizzle",
        61: "Slight rain",
        63: "Moderate rain",
        65: "Heavy rain",
        66: "Freezing rain",
        67: "Heavy freezing rain",
        71: "Slight snowfall",
        73: "Moderate snowfall",
        75: "Heavy snowfall",
        80: "Slight rain showers",
        81: "Moderate rain showers",
        82: "Violent rain showers",
        95: "Thunderstorm",
        96: "Thunderstorm with slight hail",
        99: "Thunderstorm with heavy hail"
    };
    return weatherDescription[code]
}

// Fetches and displays weather data
function fetchWeather() {
    weatherContent.innerHTML = '';

    // Loops for each location, fetches weather data
    locations.forEach(location => {
        const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true`;

        // Fetch weather data for the location
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const weatherData = data.current_weather;
                const weatherDescription = convertWeatherCode(weatherData.weathercode);

                const weatherRow = document.createElement('tr');
                weatherRow.innerHTML = `
                    <td>${location.name}</td>
                    <td>${weatherData.temperature}°C</td>
                    <td>${weatherData.windspeed} km/h</td>
                    <td>${weatherData.winddirection}°</td>
                    <td>${weatherDescription}</td>
                `;
                weatherContent.appendChild(weatherRow);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    });
}

// First load of weather
fetchWeather();

// Refreshs every 5 minutes
setInterval(fetchWeather, 300000);