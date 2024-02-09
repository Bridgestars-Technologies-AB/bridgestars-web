<script setup>
defineProps({ header: String, showImage: Boolean });
</script>
<template>
  <div :class="`${$attrs.class} flex flex-col bg-white dark:bg-dark-100`">
    <div
      v-if="header"
      class="w-full h-[15%] flex flex-row justify-center items-center mt-[10px] mb-[5px]"
    >
      <span
        class="text-[22px] items-center text-dark dark:text-white font-semibold h-auto"
        >{{ header }}</span
      >
    </div>

    <div
      :class="`flex flex-row justify-start items-center w-[60%] h-[80%] ${
        showImage ? 'hidden lg:block' : 'hidden'
      }`"
    >
      <div class="w-[100%] h-[100%] ml-[25px]">
        <img
          alt="owl"
          src="/bridgestars/game/owls/owl-1.png"
          class="scale-[1]"
        />
      </div>
    </div>

    <div
      v-if="!showImage"
      class="w-[90%] h-[2px] bg-dark-400 self-center"
    ></div>
    <div
      class="w-full h-[80%] mt-[10px] lg:flex lg:flex-col lg:w-full lg:h-full lg:justify-center"
    >
      <slot></slot>
    </div>
  </div>
</template>
