// Server.js - Class Lecture Videos, ChatGPT

// Importing the Express.js framework 
const express = require('express');

// Create an instance of the Express application called "app"
// app will be used to define routes, handle requests, etc
const app = express();

// Monitor all requests regardless of their method (GET, POST, PUT, etc) and their path (URL)
app.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path);
    next();
});

// Route all other GET requests to serve static files from a directory named "public"
app.use(express.static(__dirname + '/public'));

// allows web server to understand and process data sent from HTML forms.
app.use(express.urlencoded({ extended: true }));

/* Import data from a JSON file containing information about products
__dirname represents the directory of the current module (where server.js is located)
__dirname + "./products.json" specifies the location of products.json */
const products = require(__dirname + '/products.json');

// Define a route for handling a GET request to a path that matches "./products.js"
app.get('/products.js', function (request, response, next) {
    // Send the response as JS
    response.type('.js');

    // Create a JS string (products_str) that contains data loaded from the products.json file
	// Convert the JS string into a JSON string and embed it within variable products
    const products_str = `let products = ${JSON.stringify(products)}`;

    // Send the string in response to the GET request
    response.send(products_str);
});

// import modules
const fs = require("fs");

// Path to stored user data
const filename = __dirname + "/user_data.json";

// Check if the specified file exists
if (fs.existsSync(filename)) {
// read the content of the file and convert it to a string
    let user_data_file = fs.readFileSync(filename, "utf-8");
// Parse the string as JSON and store it in the user_data variable
    user_data = JSON.parse(user_data_file);};

// Import the module
// Returns the hashed password as a hexadecimal string
const crypto = require('crypto');
const hashPassword = (password, secret = 'test') => (
    crypto.createHmac('sha256', secret).update(password).digest('hex')
);

// querystring to handle information in web addresses. which helps work with query strings in a web URL. 
const querystring = require('querystring');

// Handle POST request for "/purchase" endpoint
app.post("/purchase", function (request, response) {
    // Create an empty object to store errors
    const errors = {}; 
    // Track quantity selected by the user.
    let selectedQuantity = false; 
    // Represents at least one valid input in the loop.
    let isValidQuantity = false; // 
   
    // Looping through each product in the products array.
    for (let i in products) {
        const qty = request.body[`quantity${i}`];
// Check if the quantity for the current product is greater than zero
        if (qty > 0) {
            selectedQuantity = true; 
            isValidQuantity = true; }
// Check whenever there are no input value put placeholder.
        if (qty == "") 
            {   request.body[`quantity${i}`] = 0; }
// After pressing purchase: Check if the quantity for the current product is not a non-negative integer
        if (validateQuantity(qty) === false) {
        // Set an error message for any negative quantity order
            errors[`quantity${i}_error`] = validateQuantity(qty, true)
            isValidQuantity = true;         }
// After pressing purchase: check if quantity order exceeds current available inventory
        if (qty > products[i].qty_available) {
        // Set an error message for any ordered quantity higher than available inventory
            errors[`quantity${i}_qtyLimit`] = `<span style="color: red;">Ordered quantity of ${qty} surpassed the available inventory</span>`;
            isValidQuantity = true;         }                      
         }

// Update the quantity sold and available for the products.
function updateProductQuantities() {};

//Check if there are no validation errors 
if (Object.keys(errors).length === 0) {
    // If no errors, update product quantities based on user input
        updateProductQuantities(request.body);
    // Convert user input into a URL-encoded string
        const url = querystring.stringify(request.body);
    // Redirect to the invoice page with the user's input
        response.redirect("./invoice.html?" + url);
    // If there are validation errors:
    } else { redirectWithErrorMessages(request, response, errors);
    }   
    // redirect to the products display page with error messages
function redirectWithErrorMessages(request, response, errors) {
    const url = querystring.stringify(request.body);
    const errorsString = querystring.stringify(errors);
    response.redirect(`./products_display.html?${url}&${errorsString}`);
}});


// Account login
app.post("/login", (req, res) => {
// Initialize an object to store any errors
    const errors = {};
// Get the email from the request body
    const email = req.body["username"].toLowerCase();
// Get the password from the request body
    const password = req.body["password"];
// Create URLSearchParams object with request body
    const params = new URLSearchParams(req.body);

     // Check if the user with the given email exists in user_data
    if (!user_data[email]) {
    //  If user does not exist, add an error message for email
        errors[`${!user_data[email] ? "email" : "password"}ErrorMessage_Server`] = !user_data[email] ? `${email} is not associated with an account.` : "Wrong password.";
    // If password is incorrect, add an error message for password
    } else if (hashPassword(password) !== user_data[email].password) {
        errors["passwordErrorMessage_Server"] = "Incorrect password.";
    }
    // If there are no errors
    if (!Object.keys(errors).length) {
    // Update product quantities and total sold
        for (let i in products) {
            params.append(`quantity${i}`, req.body[`quantity${i}`]);
            products[i].qty_available -= +req.body[`quantity${i}`];
            products[i].total_sold  += +req.body[`quantity${i}`];
        }
    // Redirect to invoice page with updated parameters
        res.redirect("./invoice.html?" + params.toString());
    } else {
    //  If there are errors, add email and error URL parameters
        params.append("username", email);
        params.append("errorURL_Server", JSON.stringify(errors));
    //  Redirect to login page with error parameters
        res.redirect("./login.html?" + params.toString());
    }    }      );


// Account registration
app.post("/register", function (request, response, next) {
 // Extract and format user input
    const { username, password, confirmPassword, name } = request.body;

// Initialize empty errors object with specific error types
    const errors = {username: [], name: [], password: [], confirmPassword: [] };

// Validates the format of the email address to ensure it fit with the email format
   if (!/^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(username)) {
        errors["username"].push("Error: Email entered is not valid.");

// Validation for username that checks the registering email address against the email addresses saved in user data file.
    } else if (typeof user_data[username] != "undefined") {
        errors["username"].push(`Errors: ${username} is already associated with an account.`);  }

// Validation for name that allows only letters and 1 optional spaces in the input field of register.html
    if (!/^[a-zA-Z]+(?:\s[a-zA-Z]+)?$/.test(name)) {
    errors["name"].push("Error: Enter a valid name using only alphabetical characters.");   }

// Validation for name that limits characters in the input field of register.html
    else if (name.length > 30 || name.length < 2) {
    errors["name"].push("Error: Name cannot be more than 30 characters, minimum of 2 characters.");  }   

// Validation for password that spaces are not allowed
     if (!/^\S+$/.test(password)) {
        errors["password"].push("Error: Space characters are not allowed.");

// Passwords must contain at least one number and one special character.
    } else if (!/^(?=.*\d)(?=.*\W).+$/.test(password)) {
        errors["password"].push("Error: Passwords must contain at least one number and one special character.");

// Validation to make sure confirm password is the same as passwords entered
    }  else if (password !== confirmPassword) {
        errors["confirmPassword"].push("Error: Passwords entered is different.");   }

// Validation for password that limits characters in the input field of register.html
    if ((password.length < 10 && password.length >= 1) || password.length > 16) {
        errors["password"].push("Error: Password cannot be more than 16 characters, minimum of 10 characters.");    }

// Ensure that if all the registration inputs are valid with 0 errors, proceeds to invoice if invalid return to registration.
    let registerErrors = 0;

// Accumulate the total length of errors for each type
registerErrors += Object.values(errors).reduce((sum, error) => sum + error.length, 0);

// Check if there are no registration errors
    if (registerErrors === 0) {
    // Successful registration:
    // Create a new entry in user_data for the registered user
         // Store the user's name
        user_data[username] = { name: request.body.name,
        //  Store the hashed password
            password: hashPassword(request.body.password) };
            
//   store user-related data in a file
        fs.writeFileSync(filename, JSON.stringify(user_data, null, 2));

        // Redirect to invoice.html with URL-encoded parameters from the request body
        response.redirect(`./invoice.html?${new URLSearchParams(request.body).toString()}`);
        return;
// Handle the case when account registration fails
    } else {
// Construct query parameters for redirection to the registration page and redirect to the registration page with the constructed query parameters errors.
        response.redirect(`./register.html?${new URLSearchParams({ username, name, errorRegistration: JSON.stringify(errors) }).toString()}`);
    }   }   );

// logout to products_display.html
app.get('/logout', (request, response) => {
// go to products_display.html after logging out.
response.redirect("./products_display.html");
});

// Start the server; listen on port 8080 for incoming HTTP requests
app.listen(8080, () => console.log(`listening on port 8080`));


// Server side validation -error message to be display after pressing purchase button
function validateQuantity(inputValue, displayError = false) {
    const errors = []; // Creating an empty array errors to store any validation error messages.

    // Check conditions and push error messages
    switch (true) {
        // Check if the quantity is non-negative
        case inputValue < 0:
            errors.push('<span style="color: red;">Quantity must be non-negative</span>');
            break;
        // Check if the quantity is a whole number
        case inputValue.includes('.'):
            errors.push('<span style="color: red;">Invalid decimal number! Please enter a whole number</span>');
            break;
        // Check if the quantity is a number
        case Number.isNaN(Number(inputValue)):
            errors.push('<span style="color: red;">Quantity must be a number</span>');
            break;
        default:
            break;
    };

    // Return errors 
    const errorCount = errors.length;
    return displayError ? errors : (errorCount && !errorCount) || (errorCount + 1) % 2 === 1; };