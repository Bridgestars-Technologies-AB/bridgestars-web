<script setup>
await loadTranslations("dashboard"); // load translation

if(useRoute().name === "dash") {
  navigateTo("dash/overview");
}

onMounted(() => {
  if (!Parse.User.current()) {
    useRouter().push({ path: '/auth/sign-in' });
  }
})
const darkMode = useDarkMode() 
</script>

<template>
  <div :class="`${darkMode.value ? 'dark':''} flex h-[100vh]`"><!-- enables tailwind darkmode, toggle this  -->
    <dash-side-menu/>
    <div class="flex-col flex-grow">
      <dash-top-menu/>
      <div class="h-full dark:bg-[#141B2D]">
        <NuxtPage/>
      </div>
    </div>
  </div>
</template>
