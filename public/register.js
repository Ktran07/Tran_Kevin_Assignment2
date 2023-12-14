// register.js - ChatGPT, Class lecture videos

// Get the search parameters from the current URL
  let params = new URL(document.location).searchParams;

window.onload = () => {
    /// Check if there are registration errors in the URL parameters, then parse the error data and update error messages
    if (params.has("errorRegistration")) registerErrorMessages(JSON.parse(params.get("errorRegistration")));   
    // Pass quantity data between pages and ensure the form captures this information when submitted
        orderedQty(document.getElementById("registerForm"));
    // Ensure valid inputs stay visible based on URL parameters
        validInputStay();
        };

// Keep valid name and email inputs so that it does not disappear after pressing register based on URL parameters
function validInputStay() {
    // forEach method to iterate through the parameters and values.
    new URLSearchParams(window.location.search).forEach((value, param) => {
        // Get the input element by its ID
        const retainInputs = document.getElementById(param);
        // Check if the input element exists and if the parameter is not in the list of skipped inputs (password, confirm password)
        if (retainInputs && !["password", "confirmPassword"].includes(param)) {
        // Set the input value from the URL parameter value 
            retainInputs.value = value; }  }   );
        };

// Update validation errors messages on the register page based on the inputted errors
function registerErrorMessages(errors) {
    for (const property in errors) {
    // Iterate through each property in the errors object and check if the error array for the property is not empty
        if (errors.hasOwnProperty(property) && errors[property].length > 0) {
    // Get the error message container by its ID
            const registerErrors = document.getElementById(`${property}_errorServerMessage`);
    // Set the innerHTML of the container to the error messages 
            registerErrors.innerHTML = errors[property].join('<br>');
    // Set the value of the corresponding input property to the value from URL parameters
            document.getElementById(property).value = params.get(property);
        }   }   };

// Used to pass quantity ordered data between pages ensuring that the form captures this information when submitted.
function orderedQty(formElement) {
    // based on URL parameters, 
    new URLSearchParams(window.location.search).forEach((value, param) => {
    // Specifically looking for parameters related to quantities
        if (param.startsWith('quantity')) {
            const desiredQty = document.createElement("input");
    //  assigning name and value (quantity parameter value from the URL) attributes to the desiredQty
            Object.assign(desiredQty, { type: "hidden", name: param, value });
            // include the input element to the provided form.
            formElement.appendChild(desiredQty);
        }   }   );
        };


// Settings for customize mouse cursor.
document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
});