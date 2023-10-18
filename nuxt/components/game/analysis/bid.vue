<script setup>
defineProps({
  brick: {
    type: String,
  },
  dir: {
    type: String,
  },
});
</script>

<template>
  <div class="flex flex-row justify-center mt-[5px]">
    <div
      class="w-[80px] h-[40px] bg-dash-dark-200 flex justify-center items-center rounded-xl"
    >
      <div>
        <span class="biddingText1 text1 tracking-[2px] mr-[2px]">{{
          brick.rank
        }}</span>
        <span
          :class="`tracking-[2px] text1 ${
            brick.suit > 3 ? 'biddingText3' : 'biddingText2'
          } ${CardUtil.symbols[brick.suit].color}`"
          >{{ CardUtil.symbols[brick.suit].symbol }}</span
        >
      </div>
    </div>
    <div
      class="w-[80px] h-[40px] bg-dash-dark-200 flex justify-center items-center rounded-xl ml-[5px]"
    >
      <span class="biddingText1 text1 tracking-[2px]">{{ dir }}</span>
    </div>
  </div>
</template>

<style scoped>
.biddingText1 {
  @apply text-white text-[25px] sm:text-[20px] lg:text-[15px] xl:text-[20px];
}

.biddingText2 {
  @apply text-white text-[40px] sm:text-[25px] lg:text-[20px] xl:text-[26px];
}

.biddingText3 {
  @apply text-white text-[25px] sm:text-[17px] lg:text-[15px] xl:text-[18px];
}
</style>
