/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brown: "#7A5A49",
        beige: "#F3EFEA",
      },
      fontFamily: {
        serif: ['"Noto Serif KR"', "ui-serif", "serif"],
        sans: ["'Noto Sans KR'", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
