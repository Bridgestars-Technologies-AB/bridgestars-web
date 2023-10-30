<script setup>
// Import statement not needed, provided for context
import { CardUtil } from "/composables/useCardUtil.ts";

defineProps({
  card: {
    type: CardUtil.Card,
    default: () => ({ suit: 1, rank: 1 }),
  },
  click: Boolean,
});
</script>

<template>
  <div class="w-full h-full rounded-lg">
    <div
      v-if="card.suit === 0 && card.rank === 0"
      class="w-full h-full flex justify-center items-center"
    >
      <span
        class="rounded-lg dark:text-light biddingText3 tracking-[0.5px] text-white cursor-pointer"
        >PASS</span
      >
    </div>
    <div v-else class="w-full h-full flex flex-row justify-center items-center">
      <span class="biddingText1 text1 tracking-[2px] cursor-pointer">{{
        card.rank
      }}</span>
      <span
        v-if="card.suit > 3"
        class="text1 cursor-pointer biddingText3 m-0 p-0"
      >
        NT
      </span>
      <span
        v-else
        :class="`biddingText2 cursor-pointer ${CardUtil.symbols[card.suit]}`"
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
  @apply text-white text-[14px] sm:text-[17px] lg:text-[15px] xl:text-[18px];
}
</style>
