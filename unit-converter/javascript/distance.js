// get the magnitude, convertFrom, and convertTo values from the form
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

// print the result to the html page
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

// convert from millimeters to whaterver we want
function convert(numMillimeters, convertTo) {
  let result;
  switch(convertTo) {
    case "millimeter":
      result = numMillimeters;
      break;
    case "centimeter":
      result = numMillimeters / 10;
      break;
    case "meter":
      result = numMillimeters / 1000;
      break;
    case "kilometer":
      result = numMillimeters / 1000000;
      break;
    case "inch":
      result = numMillimeters / 25.4;
      break;
    case "foot":
      result = numMillimeters / 304.8;
      break;
    case "yard":
      result = numMillimeters / 914.4;
      break;
    case "mile":
      result = numMillimeters / 1609344;
      break;
    default:
      console.log(`I have no clue how we got here from radio button input, convertTo: ${convertTo}`);
  }
  return result;
}

// this is out main function, called from the html form
function convertDistance(event) {
  event.preventDefault();
  const values = getValues(event);

  const conversion = `magnitude: ${values.magnitude}, convert from: ${values.convertFrom}, convert to: ${values.convertTo}`;
  console.log(conversion);

  // convert to millimeters by default to prevent 64 base cases
  let numMillimeters;
  let result;
  switch(values.convertFrom) {
    case "millimeter":
      numMillimeters = values.magnitude;
      result = convert(numMillimeters, values.convertTo);
      break;
    case "centimeter":
      numMillimeters = values.magnitude * 10;
      result = convert(numMillimeters, values.convertTo);
      break;
    case "meter":
      numMillimeters = values.magnitude * 1000;
      result = convert(numMillimeters, values.convertTo);
      break;
    case "kilometer":
      numMillimeters = values.magnitude * 1000000;
      result = convert(numMillimeters, values.convertTo);
      break;
    case "inch":
      numMillimeters = values.magnitude * 25.4;
      result = convert(numMillimeters, values.convertTo);
      break;
    case "foot":
      numMillimeters = values.magnitude * 304.8;
      result = convert(numMillimeters, values.convertTo);
      break;
    case "yard":
      numMillimeters = values.magnitude * 914.4;
      result = convert(numMillimeters, values.convertTo);
      break;
    case "mile":
      numMillimeters = values.magnitude * 1609344;
      result = convert(numMillimeters, values.convertTo);
      break;
    default:
      console.log(`I have no clue how we got here from radio button input, convertFrom: ${values.convertFrom}`);
  }

  console.log(`number of millimeters: ${numMillimeters}`);
  console.log(`the result: ${result}`);

  printConversion(result);
}

