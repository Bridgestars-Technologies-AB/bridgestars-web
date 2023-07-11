/** @type {import('tailwindcss').Config} */
const {iconsPlugin, getIconCollections} = require("@egoist/tailwindcss-icons");

module.exports = {
  darkMode: 'class',
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  plugins: [
    require("daisyui"),
    //require("tailwindcss-animated"),
    iconsPlugin({
      collections: getIconCollections(["ic", "material-symbols", "mdi", "circle-flags", "tabler"]), 
      //tailwindcss chooses which icons to include based on usage 
    })
  ],
  daisui: {
    prefix:"daisy-"
  },
  theme: {
    //we should check which of these that are used
    backgroundColor: {
      dark: "#344767",
      primary: "#f74040", //röd
      secondary: "#2e294e", //lila
      info: "#2590ee", //"#49a3f1", //blå
      success: "#59BA83", //grön
      warning: "#fb8c00", //orange
      error: "#F44335", //röd
      blue: "rgb(73, 163, 241)",
      white: "#ffffff",
      light: "#dddddd",
      dark: "#344767",
      DEFAULT: "#f74040",
      "dash-dark":{
        200: "#475569",
        300: "#334155",
        400: "#1F2A40",
        500: "#141B2D",
        DEFAULT: "#141B2D",
      },
      "dash-light":{
        100: "#f5f5f5",
        200: "#eeeeee",
        300: "#e0e0e0",
        400: "#bdbdbd",
        500: "#9e9e9e",
        DEFAULT: "#9e9e9e",
      },
      "dash-accent":{
        DEFAULT: "#868dfb",
        light: "#6870fa",
      }
    },
    textColor: {
      dark: "#344767", //dark text
      DEFAULT: "#344767", //dark text
      grey: "#7b809a",
      light: "#dddddd",
      white: "#ffffff", //light text
      blue: "rgb(73, 163, 241)",
      "dash-accent":{
        DEFAULT: "#868dfb",
        light: "#6870fa",
      }
    },
    fontFamily: {
      family: '"Roboto", "Helvetica", "Arial", sans-serif',
      family2: '"Roboto Slab", sans-serif',
    },
    screens: {
      hsm: {raw:"(min-height: 700px)"},
      xs: "0px",
      // => @media (min-width: 0px) { ... } //everything smaller than 576px
      sm: "576px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "992px",
      // => @media (min-width: 1024px) { ... }

      xl: "1200px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1400px",
      // => @media (min-width: 1536px) { ... }
    },

    extend: {
      animation:{
        'shake': 'shake 1s cubic-bezier(.36,.07,.19,.97) both',
      },
      keyframes:{
        shake:{
              '15%, 85%': {
                transform: 'translate3d(-0.5px, 0, 0) rotate(2deg)'
              },
             '30%, 70%': {
                transform: 'translate3d(0.5px, 0, 0) rotate(-2deg)'
              },
              '40%, 60%': {
                transform: 'translate3d(-1px, 0, 0) rotate(5deg)'
              },
              '50%': {
                transform: 'translate3d(1px, 0, 0) rotate(-5deg)'
            }
        }
      }
    },
  }
};
