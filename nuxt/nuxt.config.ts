// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {

      },
      autoprefixer: {},
    },
  },
  components: [
    { path: "~/components/base", prefix: "base-" },
    { path: "~/components/auth", prefix:"auth-" },
    { path: "~/components/dash", prefix: "dash-" },
    "~/components",
  ],
  imports:{
    dirs:[
    "composables",
    "composables/stores",
    ]
  },
  modules: [
    // "@nuxtjs/i18n",
    // '@vite-pwa/nuxt',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/tailwindcss', // we probably have two tailwindcss plugins, but this one is needed for the flowbite to work, should probably remove the other one
  ],
  // i18n: {
  //   vueI18n: "./localization/i18n.config.ts",
  //   locales: [
  //     {
  //       name: "English",
  //       code: "en",
  //       file: "en.json",
  //       iso: "en-US",
  //       flag: "i-circle-flags-gb",
  //     },
  //     {
  //       name: "Svenska",
  //       code: "sv",
  //       file: "sv.json",
  //       iso: "sv-SE",
  //       flag: "i-circle-flags-se",
  //     },
  //   ],
  //   baseUrl: "https://bridgestars.net",
  //   strategy: "no_prefix",
  //   langDir: "localization/lang",
  //   defaultLocale: "en",
  //   lazy: true,
  //   detectBrowserLanguage: {
  //     useCookie: false
  //   }
  //   /*options*/
  // },
//   pwa:{
// //???
//   },
  // below is for icon autoimport
  vite: {
    plugins: [ ],
  },
  build:{
    transpile: ["vue-toastification"],
  },
  app: {
    head: {
      script: [{
        src:
          "https://cdnjs.cloudflare.com/ajax/libs/balance-text/3.3.1/balancetext.min.js", // script to balance titles on home page
      }],
      title: "Bridgestars",
      meta: [
        {
          name: "description",
          content: "Bridgestars provides custom IT solutions for Bridge.",
        },
        {
          name: "viewport",
          content: "width=device-width, height=device-height, initial-scale=1.0", //not sure this makes a difference but SO says it is good to have it.
        },
      ],
    },
  },
});
