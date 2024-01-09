import { initialize } from "bridgestars-db-client";

export default defineNuxtPlugin((nuxtApp) => {
  if (process.dev) {
    initialize(
      "http://localhost:1337/rest",
      "abc123"
    )
  }
});
