/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#fdfbf7',
          100: '#FAF8F3',
          200: '#F4EFE6',
          300: '#EAE1D2',
          400: '#DDD0BC',
          500: '#C8B69C',
        },
        gold: {
          100: '#F5E2A8',
          200: '#E5CC7A',
          300: '#D4B86A',
          400: '#C9A96E',
          500: '#B28A5D',
          600: '#8C7330',
        },
        charcoal: {
          800: '#2A2421',
          900: '#1C1715',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
        italiana: ['"Italiana"', 'serif'],
        script: ['"Alex Brush"', 'cursive'],
        arabic: ['"Amiri"', 'serif'],
        bodoni: ['"Bodoni Moda"', 'serif'],
      }
    },
  },
  plugins: [],
}
