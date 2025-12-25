/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#fff',
          200: '#444444',
          300: '#2D2D2D',
        },
      },
      fontFamily: {
        garamond: ['"EB Garamond"', 'serif'],
      },  
    },
  },
  plugins: [],
}