// api_constants.mjs
import { apiBaseUrl, allPostsApi } from "../api_constants.mjs";

// accessToken.mjs
import { fetchWithToken, token } from "../token/accessToken.mjs";

// api.js
export const deletePost = async (id) => {
 try {
  const response = await fetchWithToken(`${apiBaseUrl}${allPostsApi}/${id}`, {
   method: "DELETE",
   headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
   },
  });

  if (response.error) {
   throw new Error(`Error deleting post: ${response.statusText}`);
  } else {
   alert("Post is deleted!");
   window.location.href = "/profile/";
  }
 } catch (error) {
  throw new Error(`Error deleting post: ${error}`);
 }
};

// main.js
const cancelDeleteButton = document.querySelector("#cancelDelete");
const confirmDeleteButton = document.querySelector("#confirmDelete");
const deleteConfirmationModal = document.querySelector(
 "#deleteConfirmationModal"
);

// Event listener for canceling deletion
cancelDeleteButton.addEventListener("click", () => {
 deleteConfirmationModal.style.display = "none";
});

// Event listener for confirming the deletion and initiating the delete process
confirmDeleteButton.addEventListener("click", () => {
 const postId = deleteConfirmationModal.getAttribute("data-post-id");

 if (postId) {
  deletePost(postId);
 } else {
  throw new Error("postId is not defined or has an incorrect value.");
 }

 deleteConfirmationModal.style.display = "none";
});
