
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend:{
      colors:{
        green:{
          "1":"#EFFBF5",
          "5":"#DEF7EB",
          "10":"#CEF3E1",
          "20":"#BEEFD7",
          "30":"#ADEBCD",
          "40":"#9DE7C3",
          "50":"#8DE2B9",
          "100" : "#4BD291",
          "200" : "#3BCE87",
          "300" : "#2EB875",
          "400" : "#2DB472",
          "500" : "#29A368",
          "600" : "#25935E",
          "700" : "#218353",
          "800" : "#1D7249",
          "900" : "#18623E"
        }
      }
    }
  },
  plugins: [],
};
