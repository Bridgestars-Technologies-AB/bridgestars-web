<!-- Component for button used on course pages for navigating the dashboard -->
<script setup>
defineProps({ text: String, course: String });
</script>

<template>
  <button
    class="w-[80px] h-[20px] rounded-2xl m-1 text-[12px] bg-[#168f7c] text-white font-semibold"
    @click="() => navigateTo({ name: 'dash-' + course })"
  >
    {{ text }}
  </button>
</template>
