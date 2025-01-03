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

    const data = await res.json();

    console.dir(data);
    
  }
  catch (err) {
    console.error(err.message);
  }
};