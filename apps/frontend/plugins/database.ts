import { initialize } from "bridgestars-db-client";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  if (process.dev && !config.public.PROD_SERVER) {
    initialize("http://localhost:1337/rest", "abc123");
  }
});
