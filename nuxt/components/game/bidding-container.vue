<!-- This component is a container for other bidding-components -->
<script setup>
const p = defineProps(["wrapperClass", "header", "showImage"]);
</script>
<template>
  <div :class="'flex flex-col bg-dash-dark-200 ' + wrapperClass">
    <div
      v-if="header"
      class="w-full h-[15%] flex flex-row justify-center items-center"
    >
      <span class="text-[22px] items-center text-white font-semibold h-auto">{{
        header
      }}</span>
    </div>

    <div
      v-if="showImage"
      class="flex flex-row justify-start items-center w-[60%] h-[80%]"
    >
      <div class="w-[100%] h-[100%] ml-[25px]">
        <img
          class="max-w-[100%] max-h-[100%]"
          src="../../assets/game/owls/Layer-1.png"
        />
      </div>
    </div>

    <div class="w-[90%] h-[2px] bg-dash-dark-400 mb-[10px] self-center"></div>
    <div class="flex flex-col w-full h-full border justify-center">
      <slot></slot>
    </div>
  </div>
</template>
