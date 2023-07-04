// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  components: [
    { path: "~/components/base" },
    { path: "~/components/auth" },
    "~/components",
  ],
  modules: [
    "@nuxtjs/i18n",
    '@vite-pwa/nuxt'
  ],
  i18n: {
    vueI18n: "./localization/i18n.config.ts",
    locales: [
      {
        name: "English",
        code: "en",
        file: "en.json",
        iso: "en-US",
        flag: "i-circle-flags-gb",
      },
      {
        name: "Svenska",
        code: "sv",
        file: "sv.json",
        iso: "sv-SE",
        flag: "i-circle-flags-se",
      },
    ],
    baseUrl: "https://bridgestars.net",
    strategy: "no_prefix",
    langDir: "localization/lang",
    defaultLocale: "en",
    lazy: true,
    detectBrowserLanguage: {
      useCookie: false
    }
    /*options*/
  },
  pwa:{
//???
  },
  // below is for icon autoimport
  vite: {
    plugins: [ ],
  },
  tailwindcss: {
    exposeConfig: true,
  },
  app: {
    head: {
      script: [{
        src:
          "https://cdnjs.cloudflare.com/ajax/libs/balance-text/3.3.1/balancetext.min.js",
      }],
      title: "Bridgestars",
      meta: [
        {
          name: "description",
          content: "Bridgestars provides custom IT solutions.",
        },
        {
          name: "viewport",
          content: "width=device-width, height=device-height, initial-scale=1",
        },
      ],
    },
  },
});
