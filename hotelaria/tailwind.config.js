/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{tsx,ts}"],
  theme: {
    extend: {
      colors: {
        "princ": "#886abe",
        "modal": "rgba(0, 0, 0, 0.5)"
      },
      gridTemplateColumns: {
        "colum-register": "35% 65%",
        "inputs-register": "repeat(auto-fit, minmax(50%, 1fr))"
      },

      width: {
        "fill-available": "-webkit-fill-available"
      }
    },
  },
  plugins: [],
}

