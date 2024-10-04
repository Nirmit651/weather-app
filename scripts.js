const searchButton = document.querySelector('#searchButton');
const searchInput = document.querySelector('#searchInput');

const currentDescriptionText = document.querySelector('#current-description');
const currentLocationText = document.querySelector('#current-location');
const tempText = document.querySelector('#temp')
const tempUnitText = document.querySelector('#unit');
const feelsLikeText = document.querySelector('#feels-like');
const chanceOfRainText = document.querySelector('#chance-of-rain');
const humidityText = document.querySelector('#humidity');
const sunriseText = document.querySelector('#sunrise');
const sunsetText = document.querySelector('#sunset');
const visibilityText = document.querySelector('#visibility');
const weeklyWeather = document.querySelector('.weekly-weather');

let temp, visibility, sunrise, sunset, humidity, chanceOfRain, 
weekDescription, resolvedAddress, feelsLike, currentDescription, days;

async function getWeather(city) {
    try {
        const response = await fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + city.replace(/\s+/g, '%20') + "?unitGroup=us&key=WAGGKLJUVJPXRNCWC55CXD5GR&contentType=json");
        const weather = await response.json();
        console.log(weather);
        
        currentDescription = weather.currentConditions.conditions;
        resolvedAddress = weather.resolvedAddress;
        temp = weather.currentConditions.temp;

        feelsLike = weather.currentConditions.feelslike;
        chanceOfRain = weather.currentConditions.precipprob;
        humidity = weather.currentConditions.humidity;
        sunrise = weather.currentConditions.sunrise;
        sunset = weather.currentConditions.sunset;
        visibility = weather.currentConditions.windspeed;

        weekDescription = weather.description;
        days = weather.days;
        
        console.log(currentDescription);
        console.log(resolvedAddress);
        console.log(temp);

        console.log(feelsLike);
        console.log(chanceOfRain);
        console.log(humidity);
        console.log(sunrise);
        console.log(sunset);
        console.log(visibility);

        console.log(weekDescription);

        renderWeather();

    }catch(err){
        console.log(err);
    }  
}

function renderWeather() {
    currentDescriptionText.textContent = currentDescription;
    currentLocationText.textContent = resolvedAddress;
    tempText.textContent = String(Math.round(temp));
    tempUnitText.textContent = '°F';
    feelsLikeText.textContent = 'Feels Like: ' + String(Math.round(feelsLike)) + '°F';
    chanceOfRainText.textContent = 'Change of Rain: ' + String(chanceOfRain) + '%';
    humidityText.textContent = 'Humidity: ' + String(humidity) + '%';
    sunriseText.textContent = 'Sunrise: ' + turnTo12Hour(sunrise) + ' AM';
    sunsetText.textContent = 'Sunset: ' + turnTo12Hour(sunset) + ' PM';
    visibilityText.textContent = 'Visibility: ' + String(visibility) + 'mi';

    
    for(let i = 0;i<days.length;i++){
        const dailyForecast = document.createElement('div');
        dailyForecast.classList.add('daily-item');

        const date = document.createElement('p');
        date.textContent = days[i].datetime.substring(5);
        dailyForecast.appendChild(date);

        const conditions = document.createElement('p');
        conditions.textContent = days[i].conditions;
        dailyForecast.appendChild(conditions);

        const range = document.createElement('p');
        range.textContent = 'Feels Like: ' + String(days[i].feelslike);
        dailyForecast.appendChild(range);

        const rainProb = document.createElement('p');
        rainProb.textContent = 'Rain%: ' + String(days[i].precipprob);
        dailyForecast.appendChild(rainProb);

        weeklyWeather.appendChild(dailyForecast);
    }

}

function turnTo12Hour(time) {
    if(Number(time.substring(0,2)) > 12){
        return String((Number(time.substring(0,2)) - 12)) + time.substring(2,5);
    } else {
        return time.substring(0,5);
    }
}

searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        city = searchInput.value;
        getWeather(city);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    getWeather('new york');
    console.log('Page is fully loaded and parsed!');
});
