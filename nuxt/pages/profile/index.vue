<script setup>
await loadTranslations("dashboard"); // load translation

const router = useRouter();
onMounted(() => {
  if (!Parse.User.current()) {
    router.push({ path: '/auth/sign-in' });
  }
})
</script>

<template>
  <div class="dark flex h-[100vh]"><!-- enables tailwind darkmode, toggle this  -->
    <DashboardSideMenu>
    </DashboardSideMenu>
  </div>
</template>
