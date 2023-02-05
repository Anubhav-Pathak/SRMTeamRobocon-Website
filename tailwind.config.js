/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs"],
  theme: {
    extend: {
      colors: {
        'dark-blue' : '#09141F',
        'robo-red' : "#FF0000"
      },
      spacing: {
        'img': '42rem',
        'bot1': '31rem',
        'bot2': '20rem',
        'himg': '38rem'
      },
      keyframes: {
        jump1: {
          '0%' : {top: '0rem', left: '25rem'},
          '75%' : {top: '-11rem', left: '31.5rem'},
          '100%' : {top: '-10rem', left: '31rem'}
        },
        jump2: {
          '0%' : {top: '0rem'},
          '75%' : {top: '-14rem'},
          '100%' : {top: '-12rem'}
        },
      },
      animation: {
        'jumping-bot1': 'jump1 .7s ease-in',
        'jumping-bot2': 'jump2 .7s ease-in'
      }
    },
  },
  plugins: [],
}
