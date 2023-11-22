import { useLocalTestServer } from "bridgestars-db-client"

export default defineNuxtPlugin((nuxtApp) => {
  useLocalTestServer()
})
