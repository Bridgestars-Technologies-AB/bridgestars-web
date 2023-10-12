<script setup>
defineProps(["wrapperClass", "header", "showImage"]);
</script>
<template>
  <div :class="'flex flex-col bg-dash-dark-100 ' + wrapperClass">
    <div
      v-if="header"
      class="w-full h-[15%] flex flex-row justify-center items-center mt-[10px] mb-[5px]"
    >
      <span class="text-[22px] items-center text-white font-semibold h-auto">{{
        header
      }}</span>
    </div>

    <div
      :class="`flex flex-row justify-start items-center w-[60%] h-[80%] ${
        showImage ? 'hidden sm:block' : 'hidden'
      }`"
    >
      <div class="w-[100%] h-[100%] ml-[25px]">
        <!-- fixa nuxtImg -->
        <img
          class="max-w-[100%] max-h-[100%]"
          src="../../assets/game/owls/owl-1.png"
        />
      </div>
    </div>

    <div class="w-[90%] h-[2px] bg-dash-dark-400 mb-[7px] self-center"></div>
    <div class="sm:flex sm:flex-col sm:w-full sm:h-full sm:justify-start">
      <slot></slot>
    </div>
  </div>
</template>
