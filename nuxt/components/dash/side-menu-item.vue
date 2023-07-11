<script setup>
const props = defineProps(['icon', 'keypath', 'selected', 'enabled'])
//selected = 6870fa
//hover 868dfb
const bgColor = props.selected ? "bg-dash-accent-light" : "bg-dark dark:bg-light group-hover:bg-dash-accent"
const textColor = props.selected ? "text-dash-accent-light" : "text-dark dark:text-light group-hover:text-dash-accent"
</script>

<template>
  <div class="flex items-center px-2 py-2 group hover:cursor-pointer">

    <div class="flex items-center">
      <span id="icon" :class="`${icon} ${bgColor} text-[24px] mr-[10px] group-hover:animate-shake`"></span>
    </div>

    <span :class="`font-family text-[14px] font-light tracking-wide ${textColor} ${enabled ? '' : 'line-through'}`">
      {{ $t(props.keypath) }}
    </span>

  </div>
</template>

<style scoped>

</style>
