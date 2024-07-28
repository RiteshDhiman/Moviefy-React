/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily:{
      'poetsen':['Poetsen One'],
      'roboto':['Roboto Condensed'],
      'poppins':['Poppins'],
      'mukta': ['Mukta'],
      'oswald': ['Oswald'],
      'fina': ['Fira Sans'],
      'krona' : ['Krona One'],
      'lato' : ['Lato']
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.no-scrollbar': {
          /* Hide both horizontal and vertical scrollbars */
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          '-ms-overflow-style': 'none', /* IE and Edge */
          'scrollbar-width': 'none', /* Firefox */
          overflow: '-moz-scrollbars-none', /* Firefox */
          overflow: 'scroll hidden', /* Chrome, Safari, Opera */
        },
      };
      addUtilities(newUtilities);
    },
  ],
}

