/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
    


    },

    colors: {
            'azure': {  
      DEFAULT: '#336699',  
      50: '#A3C2E0',  
      100: '#94B8DB',  
      200: '#75A3D1',  
      300: '#578FC7',  
      400: '#3D7AB8',  
      500: '#336699',  
      600: '#254A6F',  
      700: '#172E45',  
      800: '#09121B',  
      900: '#000000',  
      950: '#000000'
    },

    ...colors,
    }



  },
  plugins: [],
}