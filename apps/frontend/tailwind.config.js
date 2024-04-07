/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#009CA6",
        secondary: "#013B96",
        offwhite: "#eaeaea",
      },
      width: {
        "10vw": "10vw",
        "20vw": "20vw",
        "30vw": "30vw",
        "90vw": "90vw",
        "80px": "80px",
        "100px": "100px",
        "500px": "500px",
        "1000px": "1000px",
        "2000px": "2000px",
        "3000px": "3000px",
        "4000px": "4000px",
      },
      height: {
        "10vh": "10vh",
        "20vh": "20vh",
        "80px": "80px",
        "100px": "100px",
        "500px": "500px",
        "1000px": "1000px",
        "2000px": "2000px",
        "3000px": "3000px",
        "4000px": "4000px",
      },
      left: {
        200: "200px",
      },
    },
  },
  plugins: [],
};
