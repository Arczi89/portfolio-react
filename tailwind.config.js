/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: false,
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
        primary: '#FFA954',
        accent: 'wheat',
        background: 'cornsilk',
        heading: '#6F4E37',
        text: 'maroon',
        button: 'chocolate',
        border: 'darkgoldenrod',
      },
    },
  },  
  plugins: [],
}
