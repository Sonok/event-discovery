/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',                // manual dark mode toggle
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        // named gradients for light (“sunrise”) and dark (“sunset”) themes
        sunrise: 'linear-gradient(to bottom right, #fcd34d, #fbbf24, #fb7185)',
        sunset:  'linear-gradient(to bottom right, #be123c, #6d28d9, #312e81)',
      }
    }
  },
  plugins: []
}
