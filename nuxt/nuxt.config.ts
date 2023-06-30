// https://nuxt.com/docs/api/configuration/nuxt-config
import Icons from "unplugin-icons/vite";

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
    [
      "@nuxtjs/i18n",
      {
        vueI18n: "./localization/i18n.config.ts",
        locales: [
          {
            code: "en",
            file: "en-US.json",
            iso: "en-US",
          },
          {
            code: "sv",
            file: "sv-SE.json",
            iso: "sv-SE",
          },
        ],
        baseUrl: "https://bridgestars.net",
        strategy: "no_prefix",
        langDir: "localization/lang",
        defaultLocale: "en",
        lazy: true,
        /*options*/
      },
    ],
    ["unplugin-icons/nuxt", {}],
  ],
  // below is for icon autoimport
  vite: {
    plugins: [
      Icons({
        autoInstall: true,
      }),
    ],
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
