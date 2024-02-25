/**
 * Formats a timestamp into a human-readable date string.
 * @param {string} timestamp - The timestamp to be formatted.
 * @returns {string} - The formatted date string.
 * @example
 * const timestamp = "2024-04-15T12:30:00Z";
 * const formattedDate = formatDateString(timestamp);
 */
export const formatDateString = (timestamp) => {
 // Array of month names
 const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
 ];

 // Create a Date object from the timestamp
 const date = new Date(timestamp);

 // Extract day, month, and year components
 const day = String(date.getDate()).padStart(2, "0");
 const monthIndex = date.getMonth();
 const month = months[monthIndex];
 const year = date.getFullYear();

 // Assemble the formatted date string
 const formattedDate = `${month} ${day}, ${year}`;

 return formattedDate;
};
