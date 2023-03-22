/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs"],
  theme: {
    extend: {
      fontFamily: {
        'primary': ['eurofighter', 'Times'],
        'secondary' : ['exo', 'sans-serif']
      },
      colors: {
        'primary': "#171924",
        'secondary': "#FFFFFF",
        'tertiary': "#878787",
        'quaternary': "#004CAA"
      },
      backgroundImage: {
        'glass': "linear-gradient(180deg, rgba(255, 255, 255, 0.09) 0%, rgba(255, 255, 255, 0.01) 100%)",
        'inverted-glass': "linear-gradient(0deg, rgba(255, 255, 255, 0.09) 0%, rgba(255, 255, 255, 0.01) 100%)",
        'footer': "linear-gradient(180deg, #171924 15.1%, rgba(135, 135, 135, 1) 100%)"
      },
    },
  },
  plugins: [],
}
