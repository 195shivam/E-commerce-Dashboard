/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'ubuntu':["Ubuntu", "sans-serif"],
        'montserrat':["Montserrat"],
        'Exo':["Exo"],
        'Merienda':["Merienda"],
        "Kaushan":["Kaushan Script"]
      }
    },
  },
  plugins: [],
}

