// client2/tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class', // Enables dark mode support
  theme: {
    extend: {
      colors: {
        scampi: {
          50: '#f5f6f9',
          100: '#E9E3FF',
          200: '#B9A2FF',
          300: '#9374FF',
          400: '#7551FF',
          500: '#4318FF',
          600: '#3311DB',
          700: '#2100B6',
          800: '#190793',
          900: '#11047A',
          950: '#2f2d3e',
        },
        gray: {
          // Customize or add more grays if necessary
        },
        blue: {
          // Customize or add more blues if necessary
        },
        green: {
          // Customize or add more greens if necessary
        },
      },
      keyframes: {
        slide: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        slide: 'slide 5s linear infinite',
      },
    },
  },
  plugins: [],
};
