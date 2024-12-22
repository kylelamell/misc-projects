function getValues(event) {
  const magnitude = event.target.magnitude.value;
  const convertFrom = event.target.convertFrom.value;
  const convertTo = event.target.convertTo.value;

  const object = {
    magnitude: magnitude,
    convertFrom: convertFrom,
    convertTo: convertTo
  }

  return object;
}

function printConversion(conversion) {
  const resultContainer = document.getElementsByClassName("result-container");
  let child = resultContainer[0].lastElementChild;
  while (child) {
    resultContainer[0].removeChild(child);
    child = resultContainer[0].lastElementChild;
  }

  const result = document.createElement("div");
  result.textContent = `${conversion}`;

  resultContainer[0].appendChild(result);
}

function convert(kelvin, convertTo) {
  let result;
  switch(convertTo) {
    case "celsius":
      result = kelvin - 273.15;
      break;
    case "fahrenheit":
      result = ((kelvin - 273.15) * 9 / 5) + 32;
      break;
    case "kelvin":
      result = kelvin;
      break;
    default:
      console.log(`I have no clue how we got here from radio button input, convertTo: ${convertTo}`);
  }
  return result;
}

function convertTemperature(event) {
  event.preventDefault();
  const values = getValues(event);

  const conversion = `magnitude: ${values.magnitude}, convert from: ${values.convertFrom}, convert to: ${values.convertTo}`;
  console.log(conversion);

  let kelvin;
  let result;
  switch(values.convertFrom) {
    case "celsius":
      kelvin = parseFloat(values.magnitude) + 273.15;
      result = convert(kelvin, values.convertTo);
      break;
    case "fahrenheit":
      kelvin = ((parseFloat(values.magnitude) - 32.0) * 5 / 9) + 273.15;
      result = convert(kelvin, values.convertTo);
      break;
    case "kelvin":
      kelvin = parseFloat(values.magnitude);
      result = convert(kelvin, values.convertTo);
      break;
    default:
      console.log(`I have no clue how we got here from radio button input, convertFrom: ${values.convertFrom}`);
  }
  console.log(kelvin);
  console.log(result);

  printConversion(result);
}

