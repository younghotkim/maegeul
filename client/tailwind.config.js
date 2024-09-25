// client2/tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class', // Enables dark mode support
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"'],
        'plus-jakarta-sans': ['Plus Jakarta Sans'],
        inter: ['Inter'],
      },
      colors: {
        scampi: {
          50: '#f5f6f9',
          100: '#EFF4FB',
          200: '#E1E9F8',
          300: '#C9D4EA',
          400: '#B0BBD5',
          500: '#8F9BBA',
          600: '#68769F',
          700: '#485585',
          800: '#2D396B',
          900: '#1B2559',
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
