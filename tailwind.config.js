/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'barca-blue': '#004D98',
        'barca-red': '#A50044',
        'barca-gold': '#EDBB00',
        'barca-bg': '#F0F4F8',
        'barca-text': '#181733',
      },
    },
  },
  plugins: [],
}