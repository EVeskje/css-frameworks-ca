// Import API base URL and endpoint for all posts
import { apiBaseUrl, allPostsApi } from "../api_constants.mjs";

// Import fetch function and access token from access token module
import { fetchWithToken, token } from "../token/accessToken.mjs";

// Function to delete a post using its ID
export const deletePost = async (id) => {
 try {
  // Send a DELETE request to the API to delete the post with the given ID
  const response = await fetchWithToken(`${apiBaseUrl}${allPostsApi}/${id}`, {
   method: "DELETE",
   headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
   },
  });

  // Check if there was an error in the response
  if (response.error) {
   // If there's an error, throw an error with the error message
   throw new Error(`Error deleting post: ${response.statusText}`);
  } else {
   // If deletion is successful, display an alert and redirect to the profile page
   alert("Post is deleted!");
   window.location.href = "/profile/";
  }
 } catch (error) {
  // If there's an error during the deletion process, throw an error
  throw new Error(`Error deleting post: ${error}`);
 }
};

// Select DOM elements related to the delete confirmation modal and buttons
const cancelDeleteButton = document.querySelector("#cancelDelete");
const confirmDeleteButton = document.querySelector("#confirmDelete");
const deleteConfirmationModal = document.querySelector(
 "#deleteConfirmationModal"
);

// Event listener for canceling deletion
cancelDeleteButton.addEventListener("click", () => {
 // Hide the delete confirmation modal when cancel button is clicked
 deleteConfirmationModal.style.display = "none";
});

// Event listener for confirming deletion and initiating the delete process
confirmDeleteButton.addEventListener("click", () => {
 // Retrieve the post ID from the delete confirmation modal
 const postId = deleteConfirmationModal.getAttribute("data-post-id");

 // Check if the postId is valid
 if (postId) {
  // If postId is valid, call the deletePost function with the postId
  deletePost(postId);
 } else {
  // If postId is not defined or incorrect, throw an error
  throw new Error("postId is not defined or has an incorrect value.");
 }

 // Hide the delete confirmation modal after deletion process is initiated
 deleteConfirmationModal.style.display = "none";
});
