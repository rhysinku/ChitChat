/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#2b2d42",
        secondary: "#8d99ae",
        background: "#edf2f4",
        accent: "#ef233c",
      },
    },
  },
  plugins: [],
};
