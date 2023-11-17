document.addEventListener("DOMContentLoaded", function () {
 // Add an event listener to the login button
 document.getElementById("loginButton").addEventListener("click", function () {
  // Get the username and password input values
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  // Check if the username and password have the correct length
  if (username.length >= 3 && password.length >= 6) {
   // Redirect to the feed page
   window.location.href = "/feed/index.html";
  } else {
   // Handle invalid username or password length
   alert("Invalid username or password length. Please try again.");
  }
 });
});
