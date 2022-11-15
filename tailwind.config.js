/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: [
    './pages/**/*.{html,js,ts,tsx}',
    './components/**/*.{html,js,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};