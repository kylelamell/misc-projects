// handle the form submission
const form = document.getElementById("city-code-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const cityCode = event.target.code.value;
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
      console.log("error fetching weather api information");
    }

    const data = await res.json();
    console.dir(data);
  }
  catch (err) {
    console.error(err.message);
  }
};