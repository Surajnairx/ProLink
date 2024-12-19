/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: "Poppins",
      },
      screens: {
        sm: "0px",
        md: "768px",
        lg: "1324px",
      },
    },
  },
  plugins: [],
};
