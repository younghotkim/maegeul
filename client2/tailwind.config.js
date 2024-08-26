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
          100: '#e8e9f1',
          200: '#d6d8e7',
          300: '#babed6',
          400: '#989dc2',
          500: '#8082b1',
          600: '#6f6ea2',
          700: '#5d5a88',
          800: '#57537a',
          900: '#484662',
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
        slide: 'slide 10s linear infinite',
      },
    },
  },
  plugins: [],
};
