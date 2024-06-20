/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "mainblack": "#000000",
        "mainyellow": "#fee034"
      },
      backgroundColor: {
        "mainblack": "#000000",
        "mainyellow": "#fee034"
      }
    },
  },
  plugins: [],
}

