/** @type {import('tailwindcss').Config} */
import { iconsPlugin, getIconCollections } from "@egoist/tailwindcss-icons";
import flowbite from "flowbite/plugin";
import typography from "@tailwindcss/typography";

const backgroundColors = {
  "color-dark": "#344767",
  primary: "#f74040", //röd
  secondary: "#2e294e", //lila
  info: "#2590ee", //"#49a3f1", //blå
  success: "#59BA83", //grön
  warning: "#fb8c00", //orange
  error: "#F44335", //röd
  white: "#fefefe",
  "color-light": "#dddddd",
  DEFAULT: "#f74040",
  dark: {
    100: "#1a1625",
    200: "#2f2b3a",
    300: "#46424f",
    400: "#5e5a66",
    500: "#76737e",
    600: "#908d96",
    DEFAULT: "#908d96",
  },
  light: {
    100: "#9e9e9e",
    200: "#bdbdbd",
    300: "#e0e0e0",
    400: "#eeeeee",
    500: "#f5f5f5",
    DEFAULT: "#9e9e9e",
  },
  "dash-accent": {
    DEFAULT: "#04b694",
    light: "#04b694",
  },
};
const textColors = {
  spades: "#2B72C0",
  hearts: "#f1716f",
  diamonds: "#f78217",
  clubs: "#349e3f",
  dark: "#344767", //dark text
  DEFAULT: "#344767", //dark text
  grey: "#7b809a",
  light: "#dddddd",
  white: "#ffffff", //light text
  blue: "rgb(73, 163, 241)",
  "dash-accent": {
    DEFAULT: "#04b694",
    light: "#04b694",
  },
  borderColor: {
    ...backgroundColors, //ska det verkligen vara här??
  },
};

module.exports = {
  darkMode: "class",
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./node_modules/flowbite/**/*.{js,ts}",
  ],
  plugins: [
    //require("tailwindcss-animated"),
    iconsPlugin({
      collections: getIconCollections([
        "ic", //used a lot
        "material-symbols", //used a lot
        "mdi",
        "circle-flags", //used for flags duh
        "tabler", //used for sign out icon
        "basil",
        "majesticons",
        "fluent-emoji-high-contrast",
      ]),
      //tailwindcss chooses which icons to include based on usage
    }),
    flowbite,
    typography,
  ],
  theme: {
    //we should check which of these that are used
    extend: {
      backgroundColor: {
        ...backgroundColors,
      },
      textColor: {
        ...textColors,
      },
      textDecorationColor: {
        ...textColors,
      },
      borderColor: {
        ...backgroundColors,
      },
      placeholderColor: {
        ...textColors,
      },
      animation: {
        shake: "shake 1s cubic-bezier(.36,.07,.19,.97) both",
      },
      keyframes: {
        shake: {
          "15%, 85%": {
            transform: "translate3d(-0.5px, 0, 0) rotate(2deg)",
          },
          "30%, 70%": {
            transform: "translate3d(0.5px, 0, 0) rotate(-2deg)",
          },
          "40%, 60%": {
            transform: "translate3d(-1px, 0, 0) rotate(5deg)",
          },
          "50%": {
            transform: "translate3d(1px, 0, 0) rotate(-5deg)",
          },
        },
      },
      transitionProperty: {
        "decoration-color": "text-decoration-color",
      },
      typography: () => ({
        //{theme} => ({})
        policy: {
          css: {
            "--tw-prose-headings": "#FFFFFF",
          },
        },
      }),
    },
    fontFamily: {
      family: '"Poppins", "Helvetica", "Arial", sans-serif',
      family2: '"Roboto Slab", sans-serif',
    },
    screens: {
      hxs: { raw: "(min-height: 0px)" },
      hsm: { raw: "(min-height: 576px)" },
      hmd: { raw: "(min-height: 768px)" },
      hlg: { raw: "(min-height: 992px)" },
      hxl: { raw: "(min-height: 1200px)" },

      xs: "0px",
      // => @media (min-width: 0px) { ... } //everything smaller than 576px
      sm: "576px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lm: "862px",

      lg: "992px",
      // => @media (min-width: 1024px) { ... }

      xl: "1200px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1400px",
      // => @media (min-width: 1536px) { ... }
    },
  },
  safelist: [
    "w-64",
    "w-1/2",
    "rounded-l-lg",
    "rounded-r-lg",
    "bg-gray-200",
    "grid-cols-4",
    "grid-cols-7",
    "h-6",
    "leading-6",
    "h-9",
    "leading-9",
    "shadow-lg",
  ],
  // purge: {
  //   options: {
  //     blocklist: ["true", "false", /^debug-/], //prune 'true' and 'false' classes so that we can use ${open && 'bg-color-dark'} without polluting classList
  //   },
  // },
};
