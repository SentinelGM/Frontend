/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme.js");
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", ...fontFamily.sans],
      }
    },
  },
  plugins: [],
}
