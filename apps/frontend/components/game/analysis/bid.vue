<script setup lang="ts">
defineProps({
  bid: {
    type: Bid,
    default: new Bid(0, 0),
  },
  player: {
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
      :class="`${size} bg-dark-200 flex justify-center items-center rounded-xl`"
    >
      <span class="biddingText1 text1 tracking-[2px] mr-[2px]">{{
        bid.rank
      }}</span>
      <span v-if="bid.is('NT')" class="tracking-[2px] text1 biddingText3">
        NT
      </span>
      <span v-else :class="`biddingText2 ${bid.tailwindSuitSymbol()}`"></span>
    </div>
    <div
      :class="`${size} bg-dark-200 flex justify-center items-center rounded-xl ml-[5px]`"
    >
      <span class="biddingText1 text1 tracking-[2px]">{{ player }}</span>
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
