const form = document.getElementById("city-code-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const cityCode = event.target.code.value;

  const weatherContainer = document.getElementById("weather-container");
  const p = document.createElement("p");
  p.innerHTML = cityCode;

  weatherContainer.appendChild(p);

  getWeatherData(cityCode);
});

async function getWeatherData(cityCode) {
  try {
    const res = await fetch("/api/weatherAPI", {
      method: "post",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ code: cityCode })
    });

    if (!res.ok) {
      console.log("error fetching weather api information")
    }

    const data = await res.json();
    console.log(data);
  }
  catch (err) {
    console.error(err.message);
  }
}