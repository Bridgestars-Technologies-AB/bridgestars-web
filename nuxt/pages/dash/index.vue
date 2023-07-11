<script setup>
await loadTranslations("dashboard"); // load translation

const router = useRouter();
onMounted(() => {
  if (!Parse.User.current()) {
    router.push({ path: '/auth/sign-in' });
  }
})
const darkMode = useDarkMode() 
</script>

<template>
  <div :class="`${darkMode.value ? 'dark':''} flex h-[100vh]`"><!-- enables tailwind darkmode, toggle this  -->
    <dash-side-menu/>
    <dash-top-menu/>
  </div>
</template>
