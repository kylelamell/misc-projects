// handle the form submission
const form = document.getElementById("city-code-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const city = event.target.city.value;
  getWeatherData(city);
});

async function getWeatherData(city) {
  try {
    const res = await fetch("/weather", {
      method: "post",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ city: city })
    });

    if (!res.ok) {
      console.log("error fetching weather api information");
    }

    const response = await res.json();
    const weatherData = response.data;

    const weatherContainer = document.getElementById("weather-container");

    const div = document.createElement("div");
    
    for (const [key, value] of Object.entries(weatherData)) {
      const p = document.createElement("p");
      p.innerHTML = `${key}: ${value}`
      div.appendChild(p);
    }

    weatherContainer.appendChild(div);

    console.dir(weatherData);
  }
  catch (err) {
    console.error(err.message);
  }
};