let cart = [];
let totalPrice = 0;

document.addEventListener('DOMContentLoaded', function() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      parseXML(this);
      addProductClickEvent();
    }
  };
  xmlhttp.open("GET", "products.xml", true);
  xmlhttp.send();
});

function parseXML(xml) {
  var xmlDoc = xml.responseXML;
  var products = Array.from(xmlDoc.getElementsByTagName("product"));

  // Sort the products by name
  products.sort((a, b) => {
    var nameA = a.getElementsByTagName("name")[0].textContent.toUpperCase();
    var nameB = b.getElementsByTagName("name")[0].textContent.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  var productList = document.querySelector(".productRow");

  for (var i = 0; i < products.length; i++) {
    var product = products[i];
    var productName = product.getElementsByTagName("name")[0].textContent;
    var productPrice = parseFloat(product.getElementsByTagName("price")[0].textContent); // Parse price to float
    var productImage = product.getElementsByTagName("image")[0].textContent;

    var productItem = document.createElement("article");
    productItem.classList.add("productInfo");
    productItem.innerHTML = `
      <div><img src="${productImage}" alt="${productName}"></div>
      <p class="name">${productName}</p>
      <p class="price">RM${productPrice.toFixed(2)}</p>
      <input type="button" onclick="addToCart('${productName}', ${productPrice})" value="Add to Cart" class="AddtoCartButton">
    `;
    productList.appendChild(productItem);
  }
}

function addToCart(name, price) {
  cart.push({ name, price });
  totalPrice += price;
  updateCartDisplay();
}

function removeItem(index) {
  totalPrice -= cart[index].price;
  cart.splice(index, 1);
  updateCartDisplay();
}

function updateCartDisplay() {
  const cartItemsElement = document.querySelector('.cartItems');
  const totalPriceElement = document.querySelector('.totalPrice');

  cartItemsElement.innerHTML = '';
  cart.forEach((item, index) => {
    const itemElement = document.createElement('div');
    itemElement.innerHTML = `${item.name} - RM${item.price.toFixed(2)} <button onclick="removeItem(${index})" class="removeItemButton">Remove</button>`;
    cartItemsElement.appendChild(itemElement);
  });

  totalPriceElement.textContent = `RM ${totalPrice.toFixed(2)}`;
}

//checkout
function checkout() {
  // Here you can implement the checkout logic, e.g., redirecting to a payment page.
  alert('Redirecting to payment page...');
  // Redirect to the payment page
  window.location.href = 'payment.html';
}


// Function to validate credit card number format
function isValidCreditCard(cardNumber) {
  // This is a simple validation, you might want to use a more robust library for real-world use
  // Check if the cardNumber contains only digits and has a length of 16 (typical length of credit card numbers)
  return /^\d{16}$/.test(cardNumber);
}

// Function to handle payment submission
function submitPayment() {
  // Get payment form data
  var cardNumber = document.getElementById('cardNumber').value;
  var expiryDate = document.getElementById('expiryDate').value;
  var cvv = document.getElementById('cvv').value;
  var nameOnCard = document.getElementById('name').value;

  // Validate credit card number format
  if (!isValidCreditCard(cardNumber)) {
    alert('Please enter a valid credit card number.');
    return; // Exit the function if credit card number is invalid
  }

  // Check if any of the required fields are empty
  if (!cardNumber || !expiryDate || !cvv || !nameOnCard) {
    alert('Please fill in all required fields.');
    return; // Exit the function if any required field is empty
  }

  // Simulate payment processing (replace with actual payment processing logic)
  // Here, you can send the payment data to a server for processing
  // For demonstration purposes, we're just showing an alert
  alert('Processing payment...');

  // Simulate a successful payment
  var isPaymentSuccessful = true; // Replace this with your actual payment processing result
  if (isPaymentSuccessful) {
    // Display a message indicating payment success
    alert('Payment successful! Redirecting to confirmation page...');

    // Redirect to the confirmation page after a short delay (for demonstration purposes)
    setTimeout(function() {
      window.location.href = 'confirmation.html';
    }, 2000); // Redirect after 2 seconds
  } else {
    // Display a message indicating payment failure
    alert('Payment failed! Please try again.');
  }
}



// Payment Page

// Function to handle payment submission

function submitPayment() {
  // Get payment form data
  var cardNumber = document.getElementById('cardNumber').value;
  var expiryDate = document.getElementById('expiryDate').value;
  var cvv = document.getElementById('cvv').value;
  var nameOnCard = document.getElementById('name').value;

  // Simulate payment processing (replace with actual payment processing logic)
  // Here, you can send the payment data to a server for processing
  // For demonstration purposes, we're just showing an alert
  alert('Processing payment...');

  // Simulate a successful payment
  var isPaymentSuccessful = true; // Replace this with your actual payment processing result
  if (isPaymentSuccessful) {
    // Display a message indicating payment success
    alert('Payment successful! Redirecting to confirmation page...');

    // Redirect to the confirmation page after a short delay (for demonstration purposes)
    setTimeout(function() {
      window.location.href = 'confirmation.html';
    }, 2000); // Redirect after 2 seconds
  } else {
    // Display a message indicating payment failure
    alert('Payment failed! Please try again.');
  }
}

// Event listener for the payment form submission
document.getElementById('paymentForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission

  // Call the submitPayment function when the form is submitted
  submitPayment();
});




// Click down content
document.addEventListener("DOMContentLoaded", function() {
  const clickableDiv = document.getElementById("myDiv");
  const contentDiv = document.getElementById("content");

  clickableDiv.addEventListener("click", function() {
    contentDiv.classList.toggle("hidden");
    clickableDiv.classList.toggle("clicked");
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const clickableDiv = document.getElementById("myDiv-1");
  const contentDiv = document.getElementById("content-1");

  clickableDiv.addEventListener("click", function() {
    contentDiv.classList.toggle("hidden-1");
    clickableDiv.classList.toggle("clicked-1");
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const clickableDiv = document.getElementById("myDiv-2");
  const contentDiv = document.getElementById("content-2");

  clickableDiv.addEventListener("click", function() {
    contentDiv.classList.toggle("hidden-2");
    clickableDiv.classList.toggle("clicked-2");
  });
});


// Function to load XML data
function loadXMLDoc(filename) {
  if (window.XMLHttpRequest) {
    xhttp = new XMLHttpRequest();
  } else {
    xhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xhttp.open("GET", filename, false);
  xhttp.send();
  return xhttp.responseXML;
}

// Add event listener for view cart button
document.getElementById("view-cart").addEventListener("click", function() {
  document.getElementById("cart-modal").style.display = "block";
});




// Load XML file and display products
let xmlDoc = loadXMLDoc("products.xml");
displayProducts(xmlDoc);



/* Login/Sign Up */
// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}