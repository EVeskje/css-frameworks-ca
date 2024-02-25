import { apiBaseUrl, profileUrl } from "../variables.mjs";
import { fetchWithToken } from "../token/accessToken.mjs";

// Retrieve user profile information from localStorage
const user = JSON.parse(localStorage.getItem("userProfile"));

/**
 * Fetches the user profile data with an access token.
 * @returns {Promise<UserProfile>} - A promise that resolves to the user's profile data.
 */
const fetchUserProfile = async () => {
 return await fetchWithToken(
  `${apiBaseUrl}${profileUrl}${user.name}?_posts=true`
 );
};

// Target DOM elements for user information display
const profilePicContainer = document.querySelector("#profilePic");
const userNameContainer = document.querySelector("#userName");

/**
 * Displays the user's name and avatar.
 *
 * @throws {Error} - Throws an error if there's an issue during the display process.
 */
const displayUserName = async () => {
 try {
  // Fetch user profile data
  const json = await fetchUserProfile();
  // Display user name
  userNameContainer.innerText = json.name;
  // Set user avatar image source with a fallback if not available
  profilePicContainer.src = !!json.avatar
   ? json.avatar
   : "../images/default_profile.jpg";
 } catch (error) {
  // Throw an error
  throw new Error(error);
 }
};
// Initial call to display the single post card
displayUserName();
