async function getLocationData(location) {
  const apiKey = '850c0f76ad8944c6806162632240605';
  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(
    location
  )}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();

    const extractedData = {
      location: data.location.name,
      region: data.location.region,
      currentTemperature: data.current.feelslike_f,
      condition: data.current.condition.text,
      humidity: data.current.humidity,
      temperature: data.current.temp_f,
      wind: data.current.wind_mph,
    };
    return extractedData;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

async function fetchAndLogData(location) {
  try {
    const data = await getLocationData(location);
    if (data) {
      console.log(data);
    } else {
      console.log('no data available');
    }
  } catch (error) {
    console.error('error');
  }
}
async function fetchData(event) {
  event.preventDefault();
  const locationInput = document.getElementById('location').value;
  await fetchAndLogData(locationInput);
}

document.getElementById('weatherForm').addEventListener('submit', fetchData);
