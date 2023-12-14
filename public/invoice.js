// invoice.js    - Class Lecture Videos, ChatGPT

// Get the URL parameters from the current document's location
let params = (new URL(document.location)).searchParams;

// Go to log in page when user are not log in.
!params.has('username') ? location.href = "./login.html" + location.search : undefined;

// Array to store quantities for each product
let quantities = [];

// Loop through each product
for (let i = 0; i < products.length; i++) {
    // Check if a quantity parameter exists for the current product
   if (params.has(`quantity${i}`)) {
      // Retrieve the quantity parameter value and convert it to an integer
      const quantity = parseInt(params.get(`quantity${i}`), 10);
      // Add the quantity to the quantities array
      quantities.push(quantity);
   }
}

// Function to generate invoice rows
function generateInvoiceRows() {
    let invoiceTableBody = document.getElementById('invoiceTableBody');
    let subtotal = 0;
    let shipping = 0;
    let tax_rate = 0.04;
    let tax = 0;
    let total = 0;

    // Loop through each product
    for (let i = 0; i < products.length; i++) {
        let quantity = quantities[i] || 0; // Use the quantity from parameters or default to 0

        // Skip products with zero quantity
        if (quantity === 0) {
            continue;
        }

// Retrieve the price of the current product from the products array
        let price = products[i].price;
// Calculate the extended price for the current product based on its quantity
        let extendedPrice = quantity * price;
// Add all the extended price equal to the subtotal, updating the total cost
        subtotal += extendedPrice;

        // Create a new table row to display product image, name, quantity, price, and extended price.
        let row = document.createElement('tr');
        row.innerHTML = `
        <td style="text-align: center; border: 2px solid #d32f2f;">
        <div style="width: 250px; height: 250px; overflow: hidden; border-radius: 50%; background-color: #f5f5f5; display: flex; align-items: center; justify-content: center; margin: 0 auto;">
            <img src="${products[i].image}" alt="${products[i].name}" style="max-width: 80%; max-height: 80%; border-radius: 50%;">
        </div>
    </td> 
    <td style="font-weight: bold; color: #2e7d32; border: 2px solid #d32f2f;">${products[i].name}</td>
    <td style="color: #1976d2; text-align: center; font-size: 20px; border: 2px solid #d32f2f;">${quantity}</td>
    <td style="color: #5d4037; border: 2px solid #d32f2f;">$${price.toFixed(2)}</td>
    <td style="color: #e64a19; border: 2px solid #d32f2f;">$${extendedPrice.toFixed(2)}</td>`;
        // Append the row to the table body
        invoiceTableBody.appendChild(row);
    }


// Compute shipping
    // If the subtotal is equal or under $300, shipping is $12.
    // If the subtotal is above $300, shipping is $25.
    if (subtotal <= 300) {
        shipping = 12;
    } else {
        shipping = 25;
    }

    // Compute sales tax after calculating subtotal
    tax = tax_rate * subtotal;

    // Compute total
    total = subtotal + tax + shipping;

// Display the subtotal, tax, shipping, and total at the end of the table
// Add a row for the subtotal
let subtotalRow = document.createElement('tr');
subtotalRow.innerHTML = `
    <td colspan="4" class="text-right" style="border-bottom: 2px solid #d32f2f;"> Sub-total  </td>
    <td style="border-bottom: 2px solid #d32f2f;">$${subtotal.toFixed(2)}</td>
    `;  invoiceTableBody.appendChild(subtotalRow);

// Add a row for tax
let taxRow = document.createElement('tr');
taxRow.innerHTML = `
    <td colspan="4" class="text-right" style="border-bottom: 2px solid #d32f2f;">Tax (${(tax_rate * 100).toFixed(2)}%)</td>
    <td style="border-bottom: 2px solid #d32f2f;">$${tax.toFixed(2)}</td>
    `;  invoiceTableBody.appendChild(taxRow);

// Add a row for shipping
let shippingRow = document.createElement('tr');
shippingRow.innerHTML = `
    <td colspan="4" class="text-right" style="border-bottom: 2px solid #d32f2f;">Shipping</td>
    <td style="border-bottom: 2px solid #d32f2f;">$${shipping.toFixed(2)}</td>
    `;  invoiceTableBody.appendChild(shippingRow);

// Add a row for total
let totalRow = document.createElement('tr');
totalRow.innerHTML = `
    <td colspan="4" class="text-right" style="border-bottom: 2px solid #d32f2f;"> <b> Total </b></td>
    <td style="border-bottom: 2px solid #d32f2f;"><b> $${total.toFixed(2)} </b></td> 
    `;  invoiceTableBody.appendChild(totalRow)
}

// Call the function to generate invoice rows when the page is loaded
document.addEventListener('DOMContentLoaded', function () {
    generateInvoiceRows();
});



// Settings for custom cursor:
document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
});