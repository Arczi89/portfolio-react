/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/app/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
      },
      colors: {
        primary: 'goldenrod',
        accent: 'blue',
        background: 'lavender',
        heading: 'black',
        text: 'black',
        button: 'chocolate',
        border: 'maroon',
      },
    },
  },  
  plugins: [],
}
