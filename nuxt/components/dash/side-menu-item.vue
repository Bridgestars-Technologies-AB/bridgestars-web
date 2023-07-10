<script setup>
const props = defineProps(['icon', 'keypath', 'link'])
const current_tab = inject("profile.side.selected")
//selected = 6870fa
//hover 868dfb
const bgColor = current_tab.value === props.keypath ? "bg-[#6870fa]" : "bg-dark dark:bg-light group-hover:bg-[#868dfb]"
const textColor = current_tab.value === props.keypath ? "text-[#6870fa]" : "text-dark dark:text-light group-hover:text-[#868dfb]"
</script>

<template>
  <div class="flex items-center px-2 py-2 group hover:cursor-pointer">

    <div class="flex items-center">
      <span id="icon" :class="`${icon} ${bgColor} text-[24px] mr-[10px] group-hover:animate-shake`"></span>
    </div>

    <span :class="`font-family text-[14px] font-light tracking-wide ${textColor}`">
      {{ $t(props.keypath) }}
    </span>

  </div>
</template>

<style scoped>

</style>
