// handle the form submission
const form = document.getElementById("city-code-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const city = event.target.city.value;
  getWeatherData(city);
});

async function getWeatherData(city) {
  try {
    const res = await fetch("/api/weatherAPI", {
      method: "post",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ city: city })
    });

    if (!res.ok) {
      console.log("error fetching weather api information");
    }

    const data = await res.json();
    const weatherContainer = document.getElementById("weather-container");

    for (const day of data.days) {
      const div = document.createElement("div");
      div.className = "weather-day";
      div.id = day.datetime;
      
      for (const [key, value] of Object.entries(day)) {
        const p = document.createElement("p");
        p.innerHTML = `${key}: ${value}`;

        div.appendChild(p);
      };

      weatherContainer.appendChild(div);
    }

    console.dir(data);
  }
  catch (err) {
    console.error(err.message);
  }
};