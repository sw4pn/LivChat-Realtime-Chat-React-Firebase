/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sofia: ["Sofia", "Exo", "sans-serif"],
        exo: ["Exo", "Sofia", "sans-serif"],
      },

      boxShadow: {
        down: `1px 2px 10px 0 rgba(0,0,0,0.7)`,
      },
    },
  },
  plugins: [],
};
