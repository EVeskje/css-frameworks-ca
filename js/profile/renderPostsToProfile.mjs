// Import necessary modules
import { apiBaseUrl, profileUrl } from "../api_constants.mjs";
import { fetchWithToken } from "../token/accessToken.mjs";
import { createMessage } from "../errorMessage.mjs";
import { formatDateString } from "../feed/formatDate.mjs";

// Retrieve user profile information from localStorage
const user = JSON.parse(localStorage.getItem("userProfile"));

// Function to fetch profile posts of the logged-in user
const fetchUserProfilePosts = async () =>
 await fetchWithToken(
  `${apiBaseUrl}${profileUrl}${user.name}?_author=true&_posts=true`
 );

// Function to create HTML card element for a single post
const createCardAllPosts = (postData) => {
 // Create main container for card layout
 const cardColLayout = document.createElement("div");
 cardColLayout.className = "col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3";

 // Create anchor element for linking to individual post
 const cardPostContent = document.createElement("a");
 cardPostContent.href = `../post/index.html?id=${postData.id}`;
 cardPostContent.className = "card h-100 my-3";
 cardColLayout.appendChild(cardPostContent);

 // Create image element for post image
 const cardPostImage = document.createElement("img");
 cardPostImage.src = postData.media || "../images/img_placeholder.jpg";
 cardPostImage.className = "card-img-top feed-card-img";
 cardPostImage.id = "cardPostImage";
 cardPostContent.appendChild(cardPostImage);

 // Create container for text content of post
 const cardPostTextContent = document.createElement("div");
 cardPostTextContent.className = "card-body px-3 pt-3 pb-0";
 cardPostContent.appendChild(cardPostTextContent);

 // Create title element for post title
 const cardPostTitle = document.createElement("h5");
 cardPostTitle.innerText = postData.title;
 cardPostTitle.className = "card-title mb-2";
 cardPostTitle.id = "cardPostTitle";
 cardPostTextContent.appendChild(cardPostTitle);

 // Create container for author name and profile image
 const userNameOnCardLayout = document.createElement("div");
 userNameOnCardLayout.className = "d-flex flex-row align-items-center mb-1";
 cardPostTextContent.appendChild(userNameOnCardLayout);

 // Create image element for author profile image
 const profileImageThumbnail = document.createElement("img");
 profileImageThumbnail.src = postData.avatar || "../images/default_profile.jpg";
 profileImageThumbnail.className = "rounded-circle me-1 profile-img-thumbnail";
 userNameOnCardLayout.appendChild(profileImageThumbnail);

 // Create element for author name
 const userName = document.createElement("p");
 userName.innerText = postData.owner;
 userName.className = "mb-0";
 userName.id = "cardPostBody";
 userNameOnCardLayout.appendChild(userName);

 // Create container for post footer
 const cardFooterWrapper = document.createElement("div");
 cardFooterWrapper.className =
  "d-flex align-items-center justify-content-between p-3";
 cardPostContent.appendChild(cardFooterWrapper);

 // Create element for displaying post date
 const cardPostDatePublished = document.createElement("small");
 cardPostDatePublished.innerText = formatDateString(postData.created);
 cardPostDatePublished.className = "text-secondary";
 cardFooterWrapper.appendChild(cardPostDatePublished);

 // Create container for dropdown menu
 const sortByButtonWrapper = document.createElement("div");
 sortByButtonWrapper.className = "btn-group";
 cardFooterWrapper.appendChild(sortByButtonWrapper);

 // Create button for dropdown menu
 const sortByButton = document.createElement("button");
 sortByButton.className =
  "btn btn-outline-secondary btn-sm dropdown-toggle d-flex align-items-center";
 sortByButton.type = "button";
 sortByButton.setAttribute("data-bs-toggle", "dropdown");
 sortByButton.setAttribute("aria-expanded", "false");
 sortByButtonWrapper.appendChild(sortByButton);

 // Create SVG icon for dropdown button
 const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
 svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
 svg.setAttribute("width", "16");
 svg.setAttribute("height", "16");
 svg.setAttribute("fill", "currentColor");
 svg.classList = "bi bi-gear mr-2";
 svg.setAttribute("viewBox", "0 0 16 16");
 sortByButton.appendChild(svg);

 // Create path elements for SVG icon
 const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
 path1.setAttribute(
  "d",
  "M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"
 );
 svg.appendChild(path1);

 const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
 path2.setAttribute(
  "d",
  "M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"
 );
 svg.appendChild(path2);

 // Create dropdown menu
 const dropDownMenu = document.createElement("div");
 dropDownMenu.className = "dropdown-menu";
 sortByButtonWrapper.appendChild(dropDownMenu);

 // Create dropdown item for editing post
 const dropDownItemEditPost = document.createElement("a");
 dropDownItemEditPost.className = "dropdown-item";
 dropDownItemEditPost.innerText = "Edit post";
 dropDownItemEditPost.id = "edit-post";
 dropDownItemEditPost.href = `/post/edit.html?id=${postData.id}`;
 dropDownMenu.appendChild(dropDownItemEditPost);

 // Create dropdown item for deleting post
 const dropDownItemDeletePost = document.createElement("a");
 dropDownItemDeletePost.className = "dropdown-item";
 dropDownItemDeletePost.innerText = "Delete post";
 dropDownItemDeletePost.id = "delete-post";
 dropDownItemDeletePost.href = "#";
 dropDownItemDeletePost.addEventListener("click", () => {
  deleteConfirmationModal.style.display = "block";
  deleteConfirmationModal.dataset.postId = postData.id;
 });
 dropDownMenu.appendChild(dropDownItemDeletePost);

 return cardColLayout;
};

// Target HTML elements
const loaderContainer = document.querySelector(".loader-container");
const userPostsContainer = document.querySelector(".user-posts_profile-page");
const errorMessage = createMessage("error");

let loadingPosts = false;

// Function to display all posts
const displayAllPostsCards = async () => {
 try {
  // Prevent multiple simultaneous loading requests
  if (loadingPosts) return;
  loadingPosts = true;
  loaderContainer.style.display = "block";

  // Fetch user profile data and posts
  const { posts } = await fetchUserProfilePosts();
  userPostsContainer.innerHTML = "";

  // Iterate over each post data and create a card for each post
  posts.forEach((postData) => {
   const postCard = createCardAllPosts(postData);
   userPostsContainer.appendChild(postCard);
  });
 } catch (error) {
  // Display error message if there's an issue during fetch operation
  userPostsContainer.innerHTML = errorMessage;
  throw new Error(error);
 } finally {
  // Reset loading flag and hide loader
  loadingPosts = false;
  loaderContainer.style.display = "none";
 }
};

// Initial call to display all posts
displayAllPostsCards();
