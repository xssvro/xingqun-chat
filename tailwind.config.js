/** @type {import('tailwindcss').Config} */
import tailwindScrollbar from 'tailwind-scrollbar';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      scrollbars:  {
        thin: {
          width: '2px'
        }
      }
    },
  },
  plugins: [
    tailwindScrollbar
  ],
}
