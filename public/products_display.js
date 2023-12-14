// products_display.js   - Class Lecture Videos, and ChatGPT.

window.onload = function () {
    // Extracts and parses query parameters from the current URL
    let params = (new URL(document.location)).searchParams;

    // Loop through products
    for (let i in products) {
        // Check if there is quantity data in the query string
        if (params.has(`quantity${i}`)) {
            // Set quantity textbox value from the query string
            document.getElementById(`quantity${i}`).value = params.get(`quantity${i}`);
        }
        // Display invalid quantity message errors after pressing purchase
        displayError(`${i}`, 'quantity', params, 'error');
        // Display quantity above limit available errors after pressing purchase
        displayError(`${i}`, 'quantity', params, 'qtyLimit', true);
    }
};

// Function to display errors for invalid quantity and quantity above limit available
function displayError(index, inputType, params, errorType, replaceValue = false) {
    let elementId = `quantity${index}`;
    let errorId = `qtyError${index}`;

    // Check if there is an error in the query string
    if (params.has(`${inputType}${index}_${errorType}`)) {
        // Display error message
        document.getElementById(errorId).innerHTML = params.get(`${inputType}${index}_${errorType}`);
        // For any quantity above limit ordered - replaces the value of the quantity input field with the current available quantity.
        if (replaceValue) {
            document.getElementById(elementId).value = products[index].qty_available;
        }
        // Outline textbox red for invalid quantity
        document.getElementById(elementId).style.border = '2px solid red';
    }   };


// Display products name, price, quantity available, and sold seen in products_display.html
// Created quantity textbox for user to enter quantity they desired to buy.
for (let i in products) {
    document.write(`
        <div class="card mb-3 bg-light text-dark" style="margin-bottom: 20px;"> <!-- Add margin to create space -->
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${products[i].image}" class="img-fluid rounded-start" style="width:85%">
                </div>
                <div class="col-md-8">
                    <div class="card-body"> 
                        <h5 class="card-title text-success" style="font-size: 1.5em;">${products[i].name}</h5>
                        <p class="card-text" style="font-size: 1.2em;">$${products[i].price.toFixed(2)}</p>
                        <p class="card-text" style="font-size: 1.2em;">Available: ${products[i].qty_available}</p>
                        <p class="card-text" style="font-size: 1.2em;">Sold: ${products[i].total_sold}</p>
                        <div class="form-group">
                            <label style="margin: 5px; color: #006633; font-family:'Comic Sans MS', cursive; font-size: 1.2em;">Quantity:</label>
                            <input type="text" name="quantity${i}" id="quantity${i}" placeholder="Enter Quantity" value="0" onkeyup="validateQuantity(${i});" class="hidden">
                            <div id="qtyError${i}"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
    )   };

// Client side validation - show invalid quantity in real time as user input quantity into textbox
function validateQuantity(i) {
    // Retrieve the quantity input by the user
    const quantityInput = document.getElementById(`quantity${i}`);
        const qty = quantityInput.value;
        const quantity = +qty;
    // Retrieve the element where error message will be display
    const errorPlacement = document.getElementById(`qtyError${i}`);

    // Clear previous error messages
    errorPlacement.innerHTML = '';
    // Reset the border styling for the quantity input
    quantityInput.style.border = '';

    // Validation rules
    switch (true) {
        // Check if the quantity input is empty
        case qty === "":
            displayError("⚠️ Please enter quantity");
            break;
        // Check if the quantity is not a number
        case isNaN(quantity):
            displayError("⚠️ Not a number");
            break;
        // Check if the desired quantity exceeds available inventory
        case quantity > products[i]["qty_available"]:
            displayError(`⚠️ The desired quantity of ${quantity} exceeds available inventory`);
            break;
        // Check if the quantity is not a whole number
        case !Number.isInteger(quantity):
            displayError("⚠️ Please enter a whole number");
            break;
        // Check if the quantity is negative
        case quantity < 0:
            displayError("⚠️ Quantity cannot be negative");
            break;
        // Check if the quantity has a decimal
        case Number(qty) % 1 !== 0:
            displayError("⚠️ Please enter a whole number");
            break;
        // Default for valid input
        default:
    }

function displayError(errorMessage) {
        // Display error message 
        errorPlacement.innerHTML = errorMessage;}
}


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