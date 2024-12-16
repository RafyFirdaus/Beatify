/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'spotify-black': '#121212',
        'spotify-dark': '#282828',
        'spotify-green': '#1DB954',
        'spotify-light': '#B3B3B3',
      }
    },
  },
  plugins: [],
}

