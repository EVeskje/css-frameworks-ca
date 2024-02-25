import { apiBaseUrl, allPostsApi } from "./variables.mjs";
import { fetchWithToken } from "./accessToken.mjs";
import { createMessage } from "./errorMessage.mjs";
import { formatDateString } from "./formatDate.mjs";

/**
 * Fetches all posts with an access token
 * @returns {Promise} A promise representing the asynchronous operation of fetching posts.
 */
const fetchAllPosts = async () => {
 return await fetchWithToken(`${apiBaseUrl}${allPostsApi}?_author=true`);
};

/**
 * Creates an HTML card element.
 *
 * @param {Object} postData The data for the post.
 * @returns {HTMLElement} The generated HTML card element.
 */
const createCardAllPosts = (postData) => {
 const cardColLayout = document.createElement("div");
 cardColLayout.className = "col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3";

 const cardPostContent = document.createElement("a");
 cardPostContent.href = `../post/index.html?id=${postData.id}`;
 cardPostContent.className = "card h-100 my-3";
 cardColLayout.appendChild(cardPostContent);

 const cardPostImage = document.createElement("img");
 // Set the source (src) attribute of the image. Use the postData.media if it's truthy,
 // if not, use the fallback image "../images/img_placeholder.jpg"
 cardPostImage.src = !!postData.media
  ? postData.media
  : "../images/img_placeholder.jpg";
 cardPostImage.className = "card-img-top feed-card-img";
 cardPostContent.appendChild(cardPostImage);

 const cardPostTextContent = document.createElement("div");
 cardPostTextContent.className = "card-body py-2 px-3";
 cardPostContent.appendChild(cardPostTextContent);

 const cardPostTitle = document.createElement("h6");
 cardPostTitle.innerText = postData.title;
 cardPostTitle.className = "card-title my-3";
 cardPostTextContent.appendChild(cardPostTitle);

 const userNameOnCardLayout = document.createElement("div");
 userNameOnCardLayout.className = "d-flex flex-row align-items-center mb-1";
 cardPostTextContent.appendChild(userNameOnCardLayout);

 const profileImageThumbnail = document.createElement("img");
 // Set the source (src) attribute of the image. Use the postData.author.avatar if it's truthy,
 // if not, use the fallback image "../images/default_profile.jpg"
 profileImageThumbnail.src = !!postData.author.avatar
  ? postData.author.avatar
  : "../images/default_profile.jpg";
 profileImageThumbnail.className = "rounded-circle me-1 profile-img-thumbnail";
 userNameOnCardLayout.appendChild(profileImageThumbnail);

 const userName = document.createElement("p");
 userName.innerText = postData.author.name;
 userName.className = "mb-0 d-flex align-items-center";
 userNameOnCardLayout.appendChild(userName);

 const cardPostDatePublishedWrapper = document.createElement("div");
 cardPostDatePublishedWrapper.className = "card-footer text-end";
 cardPostContent.appendChild(cardPostDatePublishedWrapper);

 const cardPostDatePublished = document.createElement("small");
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
