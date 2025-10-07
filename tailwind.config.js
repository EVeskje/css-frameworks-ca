/** @type {import('tailwindcss').Config} */
export default {
 content: [
  "./index.html",
  "./feed/index.html",
  "./profile/index.html",
  "./src/**/*.{js,ts}",
 ],
 theme: {
  extend: {
   container: { center: true, padding: "1rem" },
  },
 },
 plugins: [],
};
