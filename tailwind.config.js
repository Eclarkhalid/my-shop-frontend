/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'text': '#000000',
        'background': '#FFFFFF',
        'primary': '#e7821d',
        'secondary': '#b4b4f3',
        'accent': '#232F3E',
       },
       
    },
  },
  plugins: [],
}
