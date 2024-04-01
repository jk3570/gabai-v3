/** @type {import('tailwindcss').Config} */

import { config } from 'dotenv';

const colors = require('tailwindcss/colors');
module.exports = {
  mode: 'jil',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
    
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

        'bkg': "hsl(var(--color-bkg) / <alpha-value>)",
        'label': "hsl(var(--color-label) / <alpha-value>)",
        'content': "hsl(var(--color-content) / <alpha-value>)",
      }
    },


  },
  plugins: [],
  darkMode: "class",
};