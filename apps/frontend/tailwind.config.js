/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#009CA6",
        secondary: "#012D5A",
        offwhite: "#eaeaea",
        gold: "#D4B547",
        highlight: "#F6BD38",
      },

      transitionProperty: {
        width: "width",
      },
    },
  },
  plugins: [],
};
