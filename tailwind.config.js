/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/**/*.{njk,md,html,js}",
    "./_site/**/*.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Bricolage Grotesque"',
          "Inter",
          ...defaultTheme.fontFamily.sans,
        ],
      },
      colors: {
        'rf-blue': '#123456',
        'rf-green': '#4CAF50',
        'rf-grey': "#ECECEC",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
