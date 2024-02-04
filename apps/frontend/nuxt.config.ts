// https://nuxt.com/docs/api/configuration/nuxt-config

import { periodicSyncForUpdates } from "virtual:nuxt-pwa-configuration";

export default defineNuxtConfig({
  devtools: { enabled: true },
  //css: ["~/assets/css/main.css"],
  components: [
    { path: "~/components/base", prefix: "base-" },
    { path: "~/components/auth", prefix: "auth-" },
    { path: "~/components/dash", prefix: "dash-" },
    "~/components",
  ],
  imports: {
    dirs: ["composables", "composables/stores"],
  },
  //experimental: {
  // payloadExtraction: true,
  // watcher: "parcel",
  //},
  modules: [
    // "@nuxtjs/i18n",
    "@vite-pwa/nuxt",
    //"@nuxtjs/pwa",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxt/content",
    "@nuxt/image",
    "@averjs/nuxt-compression",
  ],
  image: {
    format: ["webp"],
    quality: 85,
  },
  runtimeConfig: {
    public: {
      sentry: {
        dsn: process.env.SENTRY_DSN,
        environment: process.dev ? "dev" : "prod",
      },
      PROD_SERVER: process.env.PROD_SERVER,
    },
  },
  nitro: {
    routeRules: {
      "/backend/**": {
        proxy: "http://localhost/**"
      }
    }
    //preset: "vercel-edge",
  },
  routeRules: {
    "/": { prerender: true }, // build static resource
    "/auth/**": { prerender: true },
    "/dash/**": { ssr: false }, //only client side
  },
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
  pwa: {
    registerType: "autoUpdate",
    workbox: {
      globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
    },
    client: {
      installPrompt: true,
      // you don't need to include this: only for testing purposes
      // if enabling periodic sync for update use 1 hour or so (periodicSyncForUpdates: 3600)
      periodicSyncForUpdates: 20,
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallbackAllowlist: [/^\/$/],
      type: "module",
    },
    includeAssets: ["favicon.png", "apple-touch-icon.png", "mask-icon.png"],
    manifest: {
      name: "Bridgestars",
      short_name: "Bridgestars",
      icons: [
        {
          src: "/pwa/pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "/pwa/pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "/pwa/pwa-maskable-192x192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "maskable",
        },
        {
          src: "/pwa/pwa-maskable-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable",
        },
      ],
      //"start_url": "/",
      display: "standalone",
      background_color: "#FFFFFF",
      theme_color: "#FFFFFF",
      description:
        "Bridgestars provides custom IT-solutions for Contract Bridge.",
    },
  },
  // below is for icon autoimport
  vite: {
    plugins: [],
  },
  build: {
    transpile: ["vue-toastification", "bridgestars-db-client", "parse-sdk-ts"],
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
  app: {
    head: {
      script: [{}],
      title: "Bridgestars",
      meta: [
        {
          name: "description",
          content: "Bridgestars provides custom IT solutions for Bridge.",
        },
        {
          name: "viewport",
          content:
            "width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0 user-scalable=no", //not sure this makes a difference but SO says it is good to have it.
        },
        {
          name: "theme-color",
          content: "#ffffff",
          media: "(prefers-color-scheme: light)",
        },
        {
          name: "theme-color",
          content: "#000000",
          media: "(prefers-color-scheme: dark)",
        },
      ],
      link: [
        {
          rel: "icon",
          href: "/pwa/favicon-32x32.png",
          type: "image/png",
          sizes: "32x32",
        },
        {
          rel: "icon",
          href: "/pwa/favicon-16x16.png",
          type: "image/png",
          sizes: "16x16",
        },
        {
          rel: "apple-touch-icon",
          href: "/pwa/apple-touch-icon.png",
        },
        {
          rel: "manifest",
          href: "/manifest.webmanifest",
        },
        // {
        //   rel: "mask-icon",
        //   href: "/mask-icon.svg",
        //   color: "#ffffff",
        // },
      ],
    },
  },
});
