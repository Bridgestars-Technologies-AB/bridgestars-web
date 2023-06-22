/** @type {import('tailwindcss').Config} */
module.exports = {
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
    require("tailwindcss-animated"),
  ],
  theme: {
    colors: {
      primary: "#f74040", //röd
      secondary: "#2e294e", //lila
      info: "#2590ee", //"#49a3f1", //blå
      success: "#59BA83", //grön
      warning: "#fb8c00", //orange
      error: "#F44335", //röd
      blue: "rgb(73, 163, 241)",
      signIn: "rgb(123, 128, 154)",
      dark: "#344767", //dark text
      lightDark: "#7b809a",
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

    extend: {},
  },
};
