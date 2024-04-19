// Wait for the document to be fully loaded before executing JavaScript
document.addEventListener("DOMContentLoaded", function() {
  // Function to redirect to the home page after 5 seconds
  setTimeout(function() {
    window.location.href = "index.html"; // Replace 'home.html' with the URL of your home page
  }, 5000); // 5000 milliseconds = 5 seconds
});
