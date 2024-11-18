/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        "custom-lg": "1330px",
      },
    },
  },
  plugins: [],
};
