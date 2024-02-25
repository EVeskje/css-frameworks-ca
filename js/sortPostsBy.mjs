import { fetchWithToken } from "./accessToken.mjs";
import { apiBaseUrl, allPostsApi } from "./variables.mjs";
import { createCardElement } from "./createCards.mjs";

// Array to store fetched posts
let posts = [];

// URL to the fetch API
const APIURL = `${apiBaseUrl}${allPostsApi}?_author=true`;

/**
 * Sorts an array of posts in descending order based on their update timestamps.
 *
 * @param {Object[]} posts - The array of post objects to be sorted.
 * @returns {Object[]} - A new array of posts sorted in descending order by update timestamps.
 * @example
 * const sortedPosts = sortPostsNewest(postsArray);
 */
const sortPostsNewest = (posts) => {
  // Use the sort method to arrange posts based on update timestamps
  const sortedArray = posts.sort(function (a, b) {
    // Convert timestamps to Date objects for comparison
    const timeA = new Date(a.updated);
    const timeB = new Date(b.updated);

    // Compare timestamps in descending order
    return timeB - timeA;
  });
  // Return the sorted array of posts
  return sortedArray;
};

/**
 * Sorts an array of posts in ascending order based on their update timestamps.
 *
 * @param {Object[]} posts - The array of post objects to be sorted.
 * @returns {Object[]} - A new array of posts sorted in ascending order by update timestamps.
 * @example
 * const sortedPosts = sortPostsOldest(postsArray);
 */
const sortPostsOldest = (posts) => {
  // Use the sort method to arrange posts based on update timestamps
  const sortedArray = posts.sort(function (a, b) {
    // Convert timestamps to Date objects for comparison
    const timeA = new Date(a.updated);
    const timeB = new Date(b.updated);

    // Compare timestamps in ascending order
    return timeA - timeB;
  });
  // Return the sorted array of posts
  return sortedArray;
};

// Select the container for sort buttons
const sortButtonsContainer = document.querySelector("#sort-buttons");

// Add a click event listener to the sort buttons container
sortButtonsContainer.addEventListener("click", function (event) {
  // Check if the clicked element has an "id" property
  if (event.target.id === "newest") {
    // If the clicked button has an id of "newest"

    // Sort the posts by newest using the sortPostsNewest function
    const sortedArray = sortPostsNewest(posts);

    // Create card elements based on the sorted array and update the UI
    createCardElement(sortedArray);
  } else if (event.target.id === "oldest") {
    // If the clicked button has an id of "oldest"

    // Sort the posts by oldest using the sortPostsOldest function
    const sortedArray = sortPostsOldest(posts);

    // Create card elements based on the sorted array and update the UI
    createCardElement(sortedArray);
  }
});

/**
 * Initializes the app by fetching posts, rendering them, and handling sorting functionality.
 */
const initializeSortPosts = async () => {
  try {
    // Fetch posts from the API
    posts = await fetchWithToken(APIURL);
    // Render the fetched posts
    createCardElement(posts);
  } catch (error) {
    throw new Error("Error fetching posts:", error);
  }
};

// Call the initialize function to start the app
initializeSortPosts();
