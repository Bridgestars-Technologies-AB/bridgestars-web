import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const options = {
    // You can set your default options here
    position:"bottom-left",
    timeout:8000
};


export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(Toast, options)
})
