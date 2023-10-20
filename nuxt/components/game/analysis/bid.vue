<script setup>
defineProps({
  brick: {
    type: CardUtil.Card,
  },
  dir: {
    type: String,
  },
  size: {
    type: String,
  },
});
</script>

<template>
  <div class="flex flex-row justify-center mt-[5px]">
    <div
      :class="`${size} bg-dash-dark-200 flex justify-center items-center rounded-xl`"
    >
      <span class="biddingText1 text1 tracking-[2px] mr-[2px]">{{
        brick.rank
      }}</span>
      <span v-if="brick.suit > 3" class="tracking-[2px] text1 biddingText3">
        NT
      </span>
      <span
        v-else
        :class="`biddingText2 ${CardUtil.symbols[brick.suit]}`"
      ></span>
    </div>
    <div
      :class="`${size} bg-dash-dark-200 flex justify-center items-center rounded-xl ml-[5px]`"
    >
      <span class="biddingText1 text1 tracking-[2px]">{{ dir }}</span>
    </div>
  </div>
</template>

<style scoped>
.biddingText1 {
  @apply text-white text-[20px] sm:text-[20px] lg:text-[28px];
}

.biddingText2 {
  @apply text-white text-[25px] sm:text-[25px] lg:text-[23px];
}

.biddingText3 {
  @apply text-white text-[20px] sm:text-[17px] lg:text-[24px];
}
</style>
