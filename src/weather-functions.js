/* eslint-disable import/prefer-default-export */

export async function getLocationData(location) {
  const apiKey = '850c0f76ad8944c6806162632240605';
  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(location)}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();

    const temperatureFahrenheit = data.current.temp_f;
    const temperatureCelsius = data.current.temp_c;

    const extractedData = {
      location: data.location.name,
      region: data.location.region,
      temperature: {
        celsius: temperatureCelsius,
        fahrenheit: temperatureFahrenheit,
      },
      condition: data.current.condition.text,
      icon: data.current.condition.icon,
      humidity: data.current.humidity,

      wind: data.current.wind_mph,
    };
    return extractedData;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

export function toggleTemperatureUnit(data, unit) {
  if (!data || !data.temperature) {
    console.error('Invalid data');
    return null;
  }

  const currentTemp = unit === 'F' ? data.temperature.fahrenheit : data.temperature.celsius;
  if (unit === 'C' && 'celsius' in data.temperature) {
    console.log('Temperature is already in Celsius');
    return data;
  }
  if (unit === 'F' && 'fahrenheit' in data.temperature) {
    console.log('Temperature is already in Fahrenheit');
    return data;
  }

  if (unit === 'F') {
    data.temperature.fahrenheit = currentTemp;
    delete data.temperature.celsius;
  } else if (unit === 'C') {
    data.temperature.celsius = currentTemp;
    delete data.temperature.fahrenheit;
  } else {
    console.error('invalid unit');
    return null;
  }
  return data;
}