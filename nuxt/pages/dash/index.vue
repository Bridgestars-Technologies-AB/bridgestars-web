<script setup>
await loadTranslations("dashboard"); // load translation

const router = useRouter();
onMounted(() => {
  if (!Parse.User.current()) {
    router.push({ path: '/auth/sign-in' });
  }
})
const darkMode = provide("darkMode", ref(false))
</script>

<template>
  <div :class="`${darkMode ? 'dark':''} flex h-[100vh]`"><!-- enables tailwind darkmode, toggle this  -->
    <dash-side-menu/>
    <dash-top-menu/>
  </div>
</template>
