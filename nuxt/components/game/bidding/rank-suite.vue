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
  @apply xl:text-[20px] text-[15px] text-white;
}

.biddingText2 {
  @apply xl:text-[26px] text-[20px]  text-white;
}

.biddingText3 {
  @apply xl:text-[18px] text-[12px] text-white;
}
</style>
