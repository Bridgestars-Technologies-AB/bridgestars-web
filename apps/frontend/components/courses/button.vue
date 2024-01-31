<script setup>
defineProps({ text: String, course: String });
const router = useRouter();
const route = useRoute();
</script>

<template>
  <button
    class="w-[80px] h-[20px] border text-[12px] text-white font-semibold"
    @click="() => navigateTo({ name: 'dash-my-courses-' + course })"
  >
    {{ text }}
  </button>
</template>
