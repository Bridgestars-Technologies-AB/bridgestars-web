<script setup>
import Toast, { POSITION } from "vue-toastification";
useHead({
  title: "Bridgestars",
  meta: [
    {
      name: "description",
      content: "Bridgestars provides custom IT solutions.",
    },
    {
      name:"viewport",
      content:"width=device-width, height=device-height, initial-scale=1"
    }
  ]
});
//import "tw-elements/dist/css/tw-elements.min.css";
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
