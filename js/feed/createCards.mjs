import { formatDateString } from "./formatDate.mjs";

/**
 * Renders all the posts in the selected container.
 * @param {Object[]} posts An array of post objects to be rendered.
 * @param {string} searchTerm The term used for searching.
 * @example
 * Assume filteredPosts is an array of post objects obtained through some filtering mechanism.
 * renderPosts(filteredPosts, searchTerm);
 */
export const createCardElement = (posts, searchTerm) => {
 const postsContainer = document.querySelector(".all-posts_card-container");
 postsContainer.innerHTML = "";

 if (posts.length === 0) {
  // If no posts are found, display a message with the search term
  const noResultsMessage = document.createElement("p");
  noResultsMessage.className = "d-flex justify-content-center bold";
  noResultsMessage.innerText = `Search result "${searchTerm}" not found.`;
  postsContainer.appendChild(noResultsMessage);
 } else {
  // Render the posts
  posts.forEach((postData) => {
   // Create main container for card layout
   const cardColLayout = document.createElement("div");
   cardColLayout.className = "col-6 col-sm-6 col-md-4 col-lg-3";

   // Create anchor element for linking to individual post
   const cardPostContent = document.createElement("a");
   cardPostContent.href = `../post/index.html?id=${postData.id}`;
   cardPostContent.className = "card h-100 my-3";
   cardColLayout.appendChild(cardPostContent);

   // Create image element for post image
   const cardPostImage = document.createElement("img");
   // Set the source (src) attribute of the image. Use the postData.media if it's truthy,
   // if not, use the fallback image "../images/img_placeholder.jpg"
   cardPostImage.src = !!postData.media
    ? postData.media
    : "../images/img_placeholder.jpg";
   cardPostImage.className = "card-img-top feed-card-img";
   cardPostContent.appendChild(cardPostImage);

   // Create container for text content of post
   const cardPostTextContent = document.createElement("div");
   cardPostTextContent.className = "card-body py-2 px-3";
   cardPostContent.appendChild(cardPostTextContent);

   // Create title element for post title
   const cardPostTitle = document.createElement("h6");
   cardPostTitle.innerText = postData.title;
   cardPostTitle.className = "card-title text-to-uppercase";
   cardPostTextContent.appendChild(cardPostTitle);

   // Create container for author name and profile image
   const userNameOnCardLayout = document.createElement("div");
   userNameOnCardLayout.className = "d-flex flex-row align-items-center mb-1";
   cardPostTextContent.appendChild(userNameOnCardLayout);

   // Create image element for author profile image
   const profileImageThumbnail = document.createElement("img");
   // Set the source (src) attribute of the image. Use the postData.author.avatar if it's truthy,
   // if not, use the fallback image "../images/default_profile.jpg"
   profileImageThumbnail.src = !!postData.author.avatar
    ? postData.author.avatar
    : "/images/default_profile.jpg";
   profileImageThumbnail.className =
    "rounded-circle me-1 profile-img-thumbnail";
   userNameOnCardLayout.appendChild(profileImageThumbnail);

   // Create element for author name
   const userName = document.createElement("p");
   userName.innerText = postData.author.name;
   userName.className = "mb-0 d-flex align-items-center";
   userNameOnCardLayout.appendChild(userName);

   // Create container for post footer
   const cardPostDatePublishedWrapper = document.createElement("div");
   cardPostDatePublishedWrapper.className = "card-footer text-end";
   cardPostContent.appendChild(cardPostDatePublishedWrapper);

   // Create element for displaying post date
   const cardPostDatePublished = document.createElement("small");
   const formattedDate = formatDateString(postData.created);
   cardPostDatePublished.innerText = formattedDate;
   cardPostDatePublished.className = "text-secondary";
   cardPostDatePublishedWrapper.appendChild(cardPostDatePublished);

   // Append the card layout to the posts container
   postsContainer.appendChild(cardColLayout);
  });
 }
};
