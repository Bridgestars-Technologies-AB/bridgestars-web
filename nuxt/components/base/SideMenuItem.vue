<script setup>
defineProps(['icon', 'text', 'link'])
</script>

<template>
  <div class="flex items-center px-2 py-1">
    <div class="flex items-center">
      <span id="icon" :class="` ${icon}`"></span>
    </div>
    <span class="!text-light font-family text-[14px] font-light tracking-wide">{{text}}</span>
  </div>
</template>

<style scoped>
#icon {
  @apply bg-dark dark:bg-light  text-[24px] mr-[10px];
}
</style>
