<script setup>
const props = defineProps(['icon', 'key', 'link'])
const current_tab = inject("profile.side.selected")
</script>

<template>
  <div class="flex items-center px-2 py-1">
    <div class="flex items-center">
      <span id="icon" :class="` ${icon}`"></span>
    </div>
    <span class="!text-light font-family text-[14px] font-light tracking-wide">
      <slot/>
    </span>
  </div>
</template>

<style scoped>
#icon {
  @apply bg-dark dark:bg-light text-[24px] mr-[10px];
}
</style>
