import { setServerURL } from "bridgestars-db-client";

export default defineNuxtPlugin((nuxtApp) => {
  if (process.dev) setServerURL("http://localhost:1337/rest");
});
