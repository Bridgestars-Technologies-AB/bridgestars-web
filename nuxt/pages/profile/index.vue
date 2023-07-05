<script setup>
const router = useRouter();
onMounted(() => {
  if (!Parse.User.current()) {
    router.push({ path: '/auth/sign-in' });
  }
})
</script>

<template>
  <div>Welcome to profile</div>
  <button
    @click="
      {
        Parse.User.logOut();
        router.push({ path: '/auth/sign-in' });
      }
    "
  >
    Sign out!
  </button>
</template>
