// login.js -  ChatGPT, Class lecture videos

// Get the search parameters from the current URL
    let params = (new URL(document.location)).searchParams;
   
window.onload = function () {
         // Iterate over an array of form IDs
        ['login_form', 'register_form'].forEach(formId => 
        // Call the orderedQty function for each form ID
            orderedQty(document.getElementById(formId)));
   
        // Parse the error parameter from the URL and store it in the errors object.
        const errors = JSON.parse(params.get("errorURL_Server")) || {};
       // Function to update error messages on the HTML login page based on type and element ID.
        const updateError = (type, elementId) => {
       //  Check if there is an error message for the specified type in the errors object.
            if (errors[`${type}ErrorMessage_Server`]) {
        // Update the HTML content of the specified element with the error message.
                document.getElementById(`${elementId}_HTML`).innerHTML = errors[`${type}ErrorMessage_Server`];
                if (type === 'password') document.getElementById('username').value = params.get('username');
            }
        };
        // type = email, password + errorMessage_Server 
        // elementId = emailInputError, passwordInputError + _HTML
        updateError('email', 'emailInputError');
        updateError('password', 'passwordInputError');  };

// Function to add quantity input fields to a given form.
function orderedQty(form) {
    //  Extract and loop through querystring parameters from the URL.
        const urlParams = new URLSearchParams(window.location.search);
        for (const [param, value] of urlParams) {
    //  Check if the parameter name starts with quantity.
            if (param.startsWith('quantity')) {
    // Create the input element with the parameter name and value, and append it to the form.
                const input = Object.assign(document.createElement("input"), { type: "hidden", name: param, value });
                form.appendChild(input);
            } } };