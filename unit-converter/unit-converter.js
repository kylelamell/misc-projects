const form = document.getElementsByClassName("form");

form.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent default form submission

  const magnitude = document.getElementsByClassName("magnitude").value;

  fetch("process.js", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ magnitude: magnitude, magnitude: magnitude })
  })
  .then(response => {
    const container = document.getElementsByClassName("result-container");
    const result = document.createElement("div");
    result.value = "Data working???";

    container.appendChild(result);

    console.log("Data sent successfully!");
  })
  .catch(error => {
    console.error("Error sending data:", error);
  });
});
