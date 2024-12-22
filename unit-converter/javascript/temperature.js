function convert(event) {
  event.preventDefault();
  const magnitude = event.target.magnitude.value;
  const convertFrom = event.target.convertFrom.value;
  const convertTo = event.target.convertTo.value;

  const resultContainer = document.getElementsByClassName("result-container");
  let child = resultContainer[0].lastElementChild;
  while (child) {
    resultContainer[0].removeChild(child);
    child = resultContainer[0].lastElementChild;
  }

  const result = document.createElement("div");
  result.textContent = `magnitude: ${magnitude}, convert from: ${convertFrom}, convert to: ${convertTo}`;

  resultContainer[0].appendChild(result);
}

function convertTemperature(event) {
  convert(event);

}