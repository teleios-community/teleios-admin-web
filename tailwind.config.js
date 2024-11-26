/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [],
  content: ['./src/**/*.{js,jsx,ts,tsx,html}', './index.html'],

  theme: {
    extend: {
      colors: {
        primary: '#1D2B31',
        success: '#218838',
        secondary: '#F5A623',
        error: '#FF4040',
      },
      fontFamily: {
        primary: 'Montserrat, sans-serif',
        secondary: 'Inter, sans-serif',
      },
      padding: {
        primary: '3vw',
      },
    },
  },
};
