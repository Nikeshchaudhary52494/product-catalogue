/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '480px',
      },
      colors: {
        primary: '#40A2E3',
        submit: '#0D9276', // Example primary color
        secondary: '#BBE2EC',
        tirtary: '#FFF6E9', // Example secondary color
        'on-primary': '#FFFFFF', // Text color on primary background
        'on-secondary': '#000000', // Text color on secondary background
      },
    },
  },
  plugins: [],
}
