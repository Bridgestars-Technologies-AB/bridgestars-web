<!-- This component is a container for other bidding-components -->
<script setup>
const p = defineProps(["wrapperClass", "header"]);
</script>
<template>
  <div :class="'flex flex-col ' + wrapperClass">
    <span class="text-[22px] text-white m-[10px]">{{ header }}</span>
    <div class="w-[90%] h-[2px] bg-dash-dark-400 mb-[10px] self-center"></div>
    <div class="flex flex-col w-full h-full border justify-center">
      <slot></slot>
    </div>
  </div>
</template>
