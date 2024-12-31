const form = document.getElementById("city-code-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const code = event.target.code.value;

  const weatherContainer = document.getElementById("weather-container");
  const p = document.createElement("p");
  p.innerHTML = code;

  weatherContainer.appendChild(p);

  console.log(code);
});

async function getWeatherData(code) {
  try {

  }
  catch (err) {
    console.log(err);
  }
}