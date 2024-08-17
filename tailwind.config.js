/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#FF6247',
        coral: {
          500: "#FF6247",
          700: "#FF4F34",
        },
      },
    },
  },
  plugins: [],
};