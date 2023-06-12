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
      info: "#49a3f1", //blå
      success: "#59BA83", //grön
      warning: "#fb8c00", //orange
      error: "#F44335", //röd
      bridgeBlue:'rgb(52, 71, 103)',
      bridgeGray: 'rgb(52, 71, 103)'
    },
    extend: {},
  },
};
