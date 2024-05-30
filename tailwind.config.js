/** @type {import('tailwindcss').Config} */

const customColors = {
  birch: '#efefef'
};

export default {
  content: ['./src/**/*.{html,js}', './index.html'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Brandon Thin'],
        serif: ['Montserrat, sans-serif']
      },
      colors: customColors
    }
  },
  plugins: []
};
