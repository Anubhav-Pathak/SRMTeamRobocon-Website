/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs"],
  theme: {
    extend: {
      colors: {
      },
      fontFamily: {
        'primary': ['eurofighter', 'Times'],
        'secondary' : ['exo', 'sans-serif']
      }
    },
  },
  plugins: [],
}
