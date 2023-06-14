import { createApp } from "vue";
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

const options = {
    // You can set your default options here
    position: POSITION.BOTTOM_LEFT
};

const app = createApp();

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(Toast, options)
})

app.use(Toast, options);