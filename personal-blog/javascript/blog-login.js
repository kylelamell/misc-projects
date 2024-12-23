// get the login form from the html page
const form = document.getElementById("sign-in-form");

//create an event lsitener for the submit button
form.addEventListener("submit", (event) => {
  event.preventDefault();

  // gather form data into an object
  const formData = new FormData(form);

  // create a custom event to add the form data object as the events detail property
  const addData = new CustomEvent("formSubmitted", { 
    detail: { formData } 
  });

  // dispatch the custom event on the document object
  document.dispatchEvent(addData);
});

// In your JavaScript module
document.addEventListener("formSubmitted", (event) => {
  console.log("Form data:", event.detail.formData);

  const email = event.detail.formData.get("email");
  const password = event.detail.formData.get("password")

  console.log("email: ", email);
  console.log("password: ", password);

  
  

});