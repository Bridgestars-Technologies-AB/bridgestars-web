<script setup lang="ts">
// Import statement not needed, provided for context

defineProps({
  bid: {
    type: Bid,
    default: () => new Bid(0, 0),
  },
  click: Boolean,
});
</script>

<template>
  <div class="w-full h-full rounded-lg">
    <div
      v-if="bid.is('PASS')"
      class="w-full h-full flex justify-center items-center"
    >
      <span
        class="rounded-lg dark:text-light biddingText3 tracking-[0.5px] text-white cursor-pointer"
        >PASS</span
      >
    </div>
    <div v-else class="w-full h-full flex flex-row justify-center items-center">
      <span class="biddingText1 text1 tracking-[2px] cursor-pointer">{{
        bid.rank
      }}</span>
      <span
        v-if="bid.is('NT')"
        class="text1 cursor-pointer biddingText3 m-0 p-0"
      >
        NT
      </span>
      <span
        v-else
        :class="`biddingText2 cursor-pointer ${bid.tailwindSuitSymbol()}`"
      ></span>
    </div>
  </div>
</template>

<style scoped>
.biddingText1 {
  @apply text-white text-[22px] sm:text-[25px] lg:text-[20px] xl:text-[23px];
}

.biddingText2 {
  @apply text-white text-[18px] sm:text-[20px] lg:text-[14px] xl:text-[17px];
}

.biddingText3 {
  @apply text-white text-[14px] sm:text-[17px] lg:text-[15px] xl:text-[16px];
}
</style>
