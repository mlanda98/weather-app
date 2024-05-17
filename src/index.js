import { getLocationData, toggleTemperatureUnit } from './weather-functions';

function displayWeatherData(data) {
  const weatherDataContainer = document.getElementById('weatherData');
  weatherDataContainer.classList.remove('hidden');

  const unit = document.getElementById('unitCheckbox').checked ? 'C' : 'F';
  const temperature =
    unit === 'C' ? data.temperature.celsius : data.temperature.fahrenheit;

  const weatherContent = document.createElement('div');
  weatherContent.className = 'weatherData';

  weatherContent.innerHTML = `
  <p class="location">${data.location}</p>
  <p class="location">${data.region}</p>
  <p>Temperature: ${temperature}${unit}</p>
  <p>Condition: ${data.condition}</p>
  <img class="condition-icon" src="${data.icon}" alt="${data.condition}"/>
  <p>Humidity: ${data.humidity}%</p>
  <p>Wind: ${data.wind} mph</p>`;

  weatherDataContainer.innerHTML = '';
  weatherDataContainer.appendChild(weatherContent);
}
async function fetchAndLogData(location) {
  try {
    const data = await getLocationData(location);
    if (data) {
      displayWeatherData(data);
    } else {
      console.log('no data available');
    }
  } catch (error) {
    console.error(error);
  }
}

async function toggleTemperature() {
  try {
    const locationInput = document.getElementById('location').value;
    const data = await getLocationData(locationInput);
    if (data) {
      const unit = document.getElementById('unitCheckbox').checked ? 'C' : 'F';
      const newData = toggleTemperatureUnit(data, unit);
      displayWeatherData(newData);
    } else {
      console.log('no data available');
    }
  } catch (error) {
    console.error(error);
  }
}

document.getElementById('fetchButton').addEventListener('click', (event) => {
  event.preventDefault();
  const locationInput = document.getElementById('location').value;
  fetchAndLogData(locationInput);
});

document.getElementById('unitCheckbox').addEventListener('change', () => {
  toggleTemperature();
});
