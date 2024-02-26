// Importing necessary modules and utilities
import { apiBaseUrl, allPostsApi } from "../api_constants.mjs";
import { fetchWithToken } from "../token/accessToken.mjs";
import { createMessage } from "../errorMessage.mjs";
import { formatDateString } from "./formatDate.mjs";

/**
 * Fetches all posts with an access token asynchronously.
 * @returns {Promise} A promise representing the asynchronous operation of fetching posts.
 */
const fetchAllPosts = async () => {
 return await fetchWithToken(`${apiBaseUrl}${allPostsApi}?_author=true`);
};

/**
 * Creates an HTML card element for a post.
 *
 * @param {Object} postData The data for the post.
 * @returns {HTMLElement} The generated HTML card element.
 */
const createCardAllPosts = (postData) => {
 // Create layout for the card column
 const cardColLayout = document.createElement("div");
 cardColLayout.className = "col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3";

 // Create anchor element for the card content
 const cardPostContent = document.createElement("a");
 cardPostContent.href = `/post/index.html?id=${postData.id}`;
 cardPostContent.className = "card h-100 my-3";
 cardColLayout.appendChild(cardPostContent);

 // Create image element for the post
 const cardPostImage = document.createElement("img");
 // Set the source (src) attribute of the image. Use postData.media if available, else use the fallback image
 cardPostImage.src = !!postData.media
  ? postData.media
  : "/images/img_placeholder.jpg";
 cardPostImage.className = "card-img-top feed-card-img";
 cardPostContent.appendChild(cardPostImage);

 // Create container for the text content of the card
 const cardPostTextContent = document.createElement("div");
 cardPostTextContent.className = "card-body py-2 px-3";
 cardPostContent.appendChild(cardPostTextContent);

 // Create title element for the post
 const cardPostTitle = document.createElement("h6");
 cardPostTitle.innerText = postData.title;
 cardPostTitle.className = "card-title my-3";
 cardPostTextContent.appendChild(cardPostTitle);

 // Create layout for the user name display
 const userNameOnCardLayout = document.createElement("div");
 userNameOnCardLayout.className = "d-flex flex-row align-items-center mb-1";
 cardPostTextContent.appendChild(userNameOnCardLayout);

 // Create thumbnail image element for the user profile
 const profileImageThumbnail = document.createElement("img");
 // Set the source (src) attribute of the image. Use postData.author.avatar if available, else use the default profile image
 profileImageThumbnail.src = !!postData.author.avatar
  ? postData.author.avatar
  : "/images/default_profile.jpg";
 profileImageThumbnail.className = "rounded-circle me-1 profile-img-thumbnail";
 userNameOnCardLayout.appendChild(profileImageThumbnail);

 // Create paragraph element for the user name
 const userName = document.createElement("p");
 userName.innerText = postData.author.name;
 userName.className = "mb-0 d-flex align-items-center";
 userNameOnCardLayout.appendChild(userName);

 // Create wrapper for the published date display
 const cardPostDatePublishedWrapper = document.createElement("div");
 cardPostDatePublishedWrapper.className = "card-footer text-end";
 cardPostContent.appendChild(cardPostDatePublishedWrapper);

 // Create small element for displaying the published date
 const cardPostDatePublished = document.createElement("small");
 // Format the date string using formatDate utility function
 const formattedDate = formatDateString(postData.created);
 cardPostDatePublished.innerText = formattedDate;
 cardPostDatePublished.className = "text-secondary";
 cardPostDatePublishedWrapper.appendChild(cardPostDatePublished);

 return cardColLayout;
};

// Targeting DOM elements
const loaderContainer = document.querySelector(".loader-container");
const allPostsContainer = document.querySelector(".all-posts_card-container");
const errorMessage = createMessage("error");

// Flag to prevent multiple simultaneous loading requests
let loadingPosts = false;

/**
 * Displays post cards by fetching and rendering posts.
 *
 * @throws {Error} - Throws an error if there's an issue during the fetch operation.
 */
export const displayAllPostsCards = async () => {
 try {
  // If posts are already being loaded, return
  if (loadingPosts) {
   return;
  }

  // Set loading flag to true
  loadingPosts = true;

  // Display loader while posts are being fetched
  loaderContainer.style.display = "block";

  // Fetch posts
  const posts = await fetchAllPosts();

  // Clear existing cards from the container
  allPostsContainer.innerHTML = "";

  // Iterate over each post data and create a card for each post
  posts.forEach((postData) => {
   // Create a card element for the current post data
   const postCard = createCardAllPosts(postData);
   // Append the generated card to the container for all posts
   allPostsContainer.appendChild(postCard);
  });
 } catch (error) {
  // Display error message
  allPostsContainer.innerHTML = errorMessage;
  // Throw a new error
  throw new Error(error);
 } finally {
  // Reset loading flag and hide loader
  loadingPosts = false;
  loaderContainer.style.display = "none";
 }
};

// Initial call to display blog cards
displayAllPostsCards();
