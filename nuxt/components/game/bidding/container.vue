<script setup>
defineProps({ wrapperClass: String, header: String, showImage: Boolean });
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
        showImage ? 'hidden lm:block' : 'hidden'
      }`"
    >
      <div class="w-[100%] h-[100%] ml-[25px]">
        <NuxtImg
          alt="owl"
          src="/bridgestars/game/owls/owl-1.png"
          class="scale-[1]"
        />
      </div>
    </div>

    <div class="w-[90%] h-[2px] bg-dash-dark-400 self-center"></div>
    <div
      class="w-full h-[80%] mt-[10px] lm:flex lm:flex-col lm:w-full lm:h-full lm:justify-center border"
    >
      <slot></slot>
    </div>
  </div>
</template>
