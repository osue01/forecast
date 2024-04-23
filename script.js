const requestURL = `http://api.openweathermap.org/geo/1.0/direct?q=Sanfrancisco&limit=1&appid=70fc9519257c8157df1f3d00152ce8af`;

async function checkWeather() {
  const response = await fetch(requestURL);
  var data = await response.json();

  console.log(data);
}

checkWeather();
//form submission
document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();
});

// fetch(requestURL)
//   .then(function (response) {
//     // In order to use the data, it must first be parsed. Use .json() when the
//     // API response format is JSON.
//     return response.json();
//   })
//   .then(function (data) {
//     console.log("Fetch Response \n-------------");
//     console.log(data);
//   });
