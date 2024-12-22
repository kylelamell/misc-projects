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

function convert(numMilligrams, convertTo) {
  let result;
  switch(convertTo) {
    case "milligram":
      result = numMilligrams;
      break;
    case "gram":
      result = numMilligrams / 1000;
      break;
    case "kilogram":
      result = numMilligrams / 1000000;
      break;
    case "ounce":
      result = numMilligrams / 28349.5;
      break;
    case "pound":
      result = numMilligrams / 453592;
      break;
    default:
      console.log(`I have no clue how we got here from radio button input, convertTo: ${convertTo}`);
  }

  return result;
}

function convertWeight(event) {
  event.preventDefault();
  const values = getValues(event);

  const conversion = `magnitude: ${values.magnitude}, convert from: ${values.convertFrom}, convert to: ${values.convertTo}`;
  console.log(conversion);

  let numMilligrams;
  let result;
  switch(values.convertFrom) {
    case "milligram":
      numMilligrams = values.magnitude;
      result = convert(numMilligrams, values.convertTo);
      break;
    case "gram":
      numMilligrams = values.magnitude * 1000;
      result = convert(numMilligrams, values.convertTo);
      break;
    case "kilogram":
      numMilligrams = values.magnitude * 1000000;
      result = convert(numMilligrams, values.convertTo);
      break;
    case "ounce":
      numMilligrams = values.magnitude * 28349.5;
      result = convert(numMilligrams, values.convertTo);
      break;
    case "pound":
      numMilligrams = values.magnitude * 453592;
      result = convert(numMilligrams, values.convertTo);
      break;
    default:
      console.log(`I have no clue how we got here from radio button input, convertFrom: ${values.convertFrom}`);
  }

  console.log(numMilligrams);
  console.log(result);

  printConversion(result);

}

