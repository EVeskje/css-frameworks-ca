import { apiBaseUrl, allPostsApi } from "./variables.mjs";
import { displayAllPostsCards } from "./fetchAllPosts.mjs";

// Event listener for when the DOM content has loaded
document.addEventListener("DOMContentLoaded", () => {
  // Get the form element for creating a new post
  const createPostForm = document.querySelector("#newPost");
  // Add an event listener to the form for the submit event
  createPostForm.addEventListener("submit", createPost);
});

/**
 * Handles the form submission to create a new post.
 * @param {Event} event - The form submission event.
 * @returns {Promise<void>} - A promise that resolves when the post creation is complete.
 */
const createPost = async (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Retrieve the user token from localStorage
  const userToken = localStorage.getItem("accessToken");

  // Get values from the form inputs
  const title = event.target.querySelector("#exampleInputTitle1").value;
  const content = event.target.querySelector("#exampleInputTextArea1").value;
  const imageUrl = event.target.querySelector("#exampleInputImageUrl").value;

  // Check if required fields are filled
  if (!title || !content) {
    // Display an alert if required fields are not filled
    alert("Please fill in all required fields");
    return;
  }

  // Create a new post object with form input values
  const newPost = {
    title: title,
    body: content,
    media: imageUrl,
  };

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
      // Throw an error if the request was not successful
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // Reset the form after successful post creation
    event.target.reset();

    // Refresh the displayed posts
    await displayAllPostsCards();
  } catch (error) {
    // Throw an error with a detailed message if an error occurs
    throw new Error("Error creating post:", error);
  }
};
