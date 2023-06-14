<script setup>
const router = useRouter();
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
