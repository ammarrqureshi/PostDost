/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      lightGrey: 'rgba(216, 197, 255, 0.7)',
      grey: '#94989B',
      violet: '#5e17eb',
      black: '#0e0e0e',
      green: '#29A614',
      red: '#D81F1F',
      white:'FFFFFF'
    },
    extend: {
      boxShadow: {
        '2xl': ' 0px 0px 19px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};
