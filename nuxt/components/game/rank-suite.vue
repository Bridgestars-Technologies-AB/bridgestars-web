<script setup>
const props = defineProps({
  card: {
    type: Object,
    default: { suit: 1, rank: 1 },
  },
  click: Boolean,
});

function brick(suit, rank) {
  return suit === 0 && rank === 0 ? "PASS" : `${rank}${symbols[suit].symbol}`;
}

const symbols = [
  { symbol: "♣", color: "!text-clubs" },
  { symbol: "♦", color: "!text-diamonds" },
  { symbol: "♥", color: "!text-hearts" },
  { symbol: "♠", color: "!text-spades" },
  { symbol: "NT", color: "!text-white" },
];

const suits = ["♣", "♦", "♥", "♠"];
</script>

<template>
  <div v-if="card.suit === 0 && card.rank === 0">
    <span
      class="rounded-lg dark:text-light biddingText3 tracking-[0.5px] text-white"
      >{{ brick(card.suit, card.rank) }}</span
    >
  </div>
  <div v-else>
    <span class="biddingText1 tracking-[2px]">{{ card.rank }}</span>
    <span
      :class="`tracking-[2px] ${
        card.suit > 3 ? 'biddingText3' : 'biddingText2'
      } ${symbols[card.suit].color}`"
      >{{ symbols[card.suit].symbol }}</span
    >
  </div>
</template>
