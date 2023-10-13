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

function brick(suit, rank) {
  return suit === 0 && rank === 0
    ? "PASS"
    : `${rank}${CardUtil.symbols[suit].symbol}`;
}
</script>

<template>
  <div v-if="card.suit === 0 && card.rank === 0">
    <span
      class="rounded-lg dark:text-light biddingText3 tracking-[0.5px] text-white"
      >{{ brick(card.suit, card.rank) }}</span
    >
  </div>
  <div v-else>
    <span class="biddingText1 text1 tracking-[2px]">{{ card.rank }}</span>
    <span
      :class="`tracking-[2px] text1 ${
        card.suit > 3 ? 'biddingText3' : 'biddingText2'
      } ${CardUtil.symbols[card.suit].color}`"
      >{{ CardUtil.symbols[card.suit].symbol }}</span
    >
  </div>
</template>

<style scoped>
.biddingText1 {
  @apply text-white text-[15px] sm:text-[20px] lg:text-[15px] xl:text-[20px];
}

.biddingText2 {
  @apply text-white text-[20px] sm:text-[25px] lg:text-[20px] xl:text-[26px];
}

.biddingText3 {
  @apply text-white text-[12px] sm:text-[17px] lg:text-[15px] xl:text-[18px];
}
</style>
