<script setup>
import Toast, { POSITION } from "vue-toastification";
//import "tw-elements/dist/css/tw-elements.min.css";
provide("first_time_at_home", ref(true));
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
