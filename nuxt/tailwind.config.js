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
    require("tw-elements/dist/plugin.cjs"),
    require("tailwindcss-animated"),
  ],
  theme: {
    colors: {
      primary: "#f74040",
      secondary: "#2e294e",
      infoabc: "#49a3f1",
      success: "#59BA83",
      warning: "#fb8c00",
      error: "#F44335",
    },
  },
};
