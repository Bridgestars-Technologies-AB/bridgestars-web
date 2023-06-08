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
  components: [{ path: "~/components/base" }, "~/components"],
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

        langDir: "localization/lang",
        defaultLocale: "en",
        lazy: true,
        /*options*/
      },
    ],
  ],
});
