<script setup>
definePageMeta({
  middleware: [
    function (from, to) {
      if (!process.dev) {
        // return createError({statusCode:404, statusMessage: 'Page not found: /dev'})
        return navigateTo("/", {});
        // return abortNavigation(new Error("error route not found"))
      }
    },
  ],
});
const dev = ref(process.dev);
const route = useRoute();
console.log(URL);
function back() {
  console.log(route.path);
  const url = route.path.split("/").slice(0, -1).join("/");
  navigateTo(url);
}
</script>
<template>
  <div
    v-if="dev"
    class="flex items-center m-3 cursor-pointer absolute left-[20px] top-[20px]"
    @click="back"
  >
    <span
      class="i-material-symbols-arrow-back-ios text-blue xs:text-[14px] md:text-[20px]"
    />
    <a class="xs:text-[14px] md:text-[20px] text-blue font-family2 mr-1">{{
      route.name == "dev" ? "Back to home" : "Back"
    }}</a>
  </div>
  <NuxtPage />
</template>
