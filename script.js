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




document.getElementById('paymentForm').addEventListener('submit', function(event) {
  event.preventDefault();

  // Get form values
  var cardNumber = document.getElementById('cardNumber').value.trim();
  var expiryDate = document.getElementById('expiryDate').value.trim();
  var cvv = document.getElementById('cvv').value.trim();

  // Perform validation
  if (isValidCardNumber(cardNumber) && isValidExpiryDate(expiryDate) && isValidCVV(cvv)) {
    // Here you can implement the checkout logic, e.g., redirecting to a confirmation page.
    alert('Redirecting to confirmation payment...');
    // Redirect to confirmation page
    window.location.href = 'confirmation.html';
  } else {
    if (!isValidCardNumber(cardNumber)) {
      alert('Invalid card number. Please enter a valid 16-digit number.');
    } else if (!isValidExpiryDate(expiryDate)) {
      alert('Invalid expiry date. Please enter a valid date in MM/YYYY format.');
    } else if (isExpired(expiryDate)) {
      alert('Card has already expired. Please use a valid card.');
    } else if (!isValidCVV(cvv)) {
      alert('Invalid CVV code. Please enter a valid 3 or 4-digit number.');
    }
  }
});

// Function to validate card number
function isValidCardNumber(cardNumber) {
  // Implement your card number validation logic here
  return /^\d{16}$/.test(cardNumber); // Example: Check if it's a 16-digit number
}

// Function to validate expiry date
function isValidExpiryDate(expiryDate) {
  // Implement your expiry date validation logic here
  return /^\d{2}\/\d{4}$/.test(expiryDate); // Example: Check if it's in MM/YYYY format
}

// Function to check if expiry date is in the past
function isExpired(expiryDate) {
  var today = new Date();
  var parts = expiryDate.split('/');
  var expiryMonth = parseInt(parts[0], 10);
  var expiryYear = parseInt(parts[1], 10);
  var expiry = new Date(expiryYear, expiryMonth - 1); // Subtract 1 from month since JavaScript months are zero-based
  return expiry < today;
}

// Function to validate CVV
function isValidCVV(cvv) {
  // Implement your CVV validation logic here
  return /^\d{3,4}$/.test(cvv); // Example: Check if it's a 3 or 4-digit number
}



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



