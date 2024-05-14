async function getLocationData(location){
  const apiKey = '850c0f76ad8944c6806162632240605';
  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(
  location)}`;

  try{
    const response = await fetch(apiUrl);
    if (!response.ok){
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data;
  } catch (error){
    console.error("Error fetching data:", error);
    return null;
  }
}

async function fetchAndLogData(location){
  try {
    const data = await getLocationData(location);
    if (data){
      console.log(data);
    } else {
      console.log("No data available");
    } 
  } catch (error){
    console.error("Error:", error);
  }
}

const location = prompt("Please enter a location");
fetchAndLogData(location);
