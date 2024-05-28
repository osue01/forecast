const APIKEY = "70fc9519257c8157df1f3d00152ce8af";
let currentStored = [];
let forecastStored = [];

//form submission
document.querySelector("form").addEventListener("submit", searchbtn);

//handle searchbtn
async function searchbtn(event) {
  event.preventDefault();
  const myCity = document.getElementById("cityInput").value;
  const requestURL = `http://api.openweathermap.org/geo/1.0/direct?q=${myCity}&limit=1&appid=${APIKEY}`;
  const coord = await getCoord(requestURL);

  const currentURL = `http://api.openweathermap.org/data/2.5/weather?lat=${coord.lat}&lon=${coord.lon}&units=imperial&appid=${APIKEY}`;
  //need function like getCoord that will return 1 day weather
  currentStored = [];
  await getWeather(currentURL);
  console.log("weather stored", currentStored);

  //then new api url to fetch 5 day forecast
  const forecastURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${coord.lat}&lon=${coord.lon}&appid=${APIKEY}`;
  await getForecast(forecastURL);
}

//call api
async function getCoord(requestURL) {
  const response = await fetch(requestURL);
  const data = await response.json();
  if (data.length > 0) {
    return data[0];
  }
  return null;
}

// call 1 day weather
async function getWeather(currentURL) {
  try {
    const weatherResponse = await fetch(currentURL);
    const weatherData = await weatherResponse.json();
    console.log("weather data", weatherData);
    // console.log("weathr response", weatherResponse);
    const icon = weatherData.weather[0].icon;
    const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    const t = weatherData.main.temp;
    const w = weatherData.wind.speed;
    const h = weatherData.main.humidity;
    currentStored.push({
      img: iconURL,
      t: t,
      w: w,
      h: h,
    });

    return weatherData[0];
  } catch (error) {
    console.error(error);
  }
}

//call 5 day weather
async function getForecast(forecastURL) {
  try {
    const forecastResponse = await fetch(forecastURL);
    const forecastData = await forecastResponse.json();
    console.log("forecast", forecastData);

    const icon = forecastData.list[0].icon;
    const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    const t = forecastData.list;
    // console.log(forecastData.list);
    for (let i = 0; i < 5; i++) {
      forecastStored.push(t[i]);
    }
    console.log(forecastStored);
    //     const w = forecastData.wind.speed;
    //     const h = forecastData.main.humidity;
    //     forecastStored.push({
    //       img: iconURL,
    //       t: t,
    //       w: w,
    //       h: h,
    //     });

    //     return forecastData[0];
  } catch (error) {
    console.error(error);
  }
}
