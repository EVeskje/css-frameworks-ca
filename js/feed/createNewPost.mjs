// Import necessary modules
import { apiBaseUrl, allPostsApi } from "../api_constants.mjs";
import { displayAllPostsCards } from "../feed/fetchAllPosts.mjs";

// Function to handle form submission and create a new post
async function createPost(event) {
 event.preventDefault(); // Prevent default form submission behavior

 // Retrieve the user token from localStorage
 const userToken = localStorage.getItem("accessToken");

 // Get values from the form inputs and trim any leading/trailing whitespace
 const title = event.target.querySelector("#exampleInputTitle1").value.trim();
 const content = event.target
  .querySelector("#exampleInputTextArea1")
  .value.trim();
 const imageUrl = event.target
  .querySelector("#exampleInputImageUrl")
  .value.trim();

 // Check if required fields are filled
 if (!title || !content) {
  // If not, display an alert and exit the function
  alert("Please fill in all required fields");
  return;
 }

 // Create a new post object with form input values
 const newPost = { title, body: content, media: imageUrl };

 try {
  // Send a POST request to create a new post
  const response = await fetch(`${apiBaseUrl}${allPostsApi}`, {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${userToken}`,
   },
   body: JSON.stringify(newPost),
  });

  // Check if the request was successful
  if (!response.ok) {
   // If not, throw an error with a descriptive message
   throw new Error(`Failed to create post. Status: ${response.status}`);
  }

  // Reset the form after successful post creation
  event.target.reset();

  // Refresh the displayed posts
  await displayAllPostsCards();
 } catch (error) {
  // If an error occurs during the request or response handling...
  console.error("Error creating post:", error); // Log the error to the console
  alert("Failed to create post. Please try again later."); // Display a user-friendly error message
 }
}

// Event listener for when the DOM content has loaded
document.addEventListener("DOMContentLoaded", () => {
 // Get the form element for creating a new post
 const createPostForm = document.querySelector("#newPost");
 // Add submit event listener to the form, calling the createPost function
 createPostForm.addEventListener("submit", createPost);
});
