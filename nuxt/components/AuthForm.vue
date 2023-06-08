<script setup>
const props = defineProps(["title", "subtitle", "fields"]);
defineEmits(["submit"]);

// fields = ["username", "password"];
</script>

<template>
  <div>
    <h1>{{ props.title }}</h1>
    <h2>{{ props.subtitle }}</h2>
    <!-- <EmailField v-if="fields.includes('email')" />
    <UsernameField v-if="fields.includes('username')" />
    <PasswordField v-if="fields.includes('password')" /> -->
    <!-- <div class="btn" @click="submit" /> -->
    <slot></slot>
  </div>
</template>
