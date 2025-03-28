/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        1 : '#1c1f2e',
        2 : '#161925',
      },
      keyframes: {
        textGlow: {
          "0%": { color: "#ffea00" }, // Bright Yellow
          "25%": { color: "#ffbf00" }, // Warm Orange
          "50%": { color: "#FFFF33" }, // Bright Neon Yellow (Glowing Effect)
          "75%": { color: "#ffbf00" }, // Back to Warm Orange
          "100%": { color: "#ffea00" }, // Loop back to Yellow
        },
      },
      animation: {
        textGlow: "textGlow 4s infinite alternate", // Slowed down from 2s → 4s
      },
    },
  },
  plugins: [],
};
