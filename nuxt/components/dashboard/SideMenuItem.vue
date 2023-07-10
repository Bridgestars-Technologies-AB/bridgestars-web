<script setup>
const props = defineProps(['icon', 'keypath', 'link'])
const current_tab = inject("profile.side.selected")
console.log(props.keypath)
console.log(props.icon)
</script>

<template>
  <div class="flex items-center px-2 py-2">
    <div class="flex items-center">
      <span id="icon" :class="` ${icon}`"></span>
    </div>
    <span class="!text-light font-family text-[14px] font-light tracking-wide">
      {{ $t(props.keypath) }}
    </span>
  </div>
</template>

<style scoped>
#icon {
  @apply bg-dark dark:bg-light text-[24px] mr-[10px];
}
</style>
