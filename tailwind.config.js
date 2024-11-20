/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [],
  content: ['./src/**/*.{js,jsx,ts,tsx,html}', './index.html'],

  theme: {
    extend: {
      textColor: {
        primary: '#1D2B31',
        success: '#218838',
        secondary: '#F5A623',
        error: '#FF4040',
      },
      backgroundColor: {
        primary: '#1D2B31',
        secondary: '#F5A623',
        error: '#FF4040',
      },
      borderColor: {
        primary: '#D0D5DD',
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
