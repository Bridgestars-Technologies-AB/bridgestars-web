<script setup>
/*
Bdding Hand
A component which displays the users hand

Props:
  hand: Array(4) [{suit (0-3), ranks: [K2A4]}....]
*/
const p = defineProps({
  hand: {
    type: [],
    required: true,
  },
});

const suits = ["♣", "♦", "♥", "♠"];
const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];
// Create a standard deck of 52 cards
const deck = [];
for (let suit = 0; suit < 4; suit++) {
  for (const rank of ranks) {
    deck.push({ suit: suit, rank: rank });
  }
}

const testHand = ref([]);

function dealHand() {
  // Shuffle the deck (Fisher-Yates algorithm)
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  // Deal the first 13 cards to a hand
  const bridgeHand = deck.slice(0, 13);

  testHand.value = [
    format(bridgeHand, 0),
    format(bridgeHand, 1),
    format(bridgeHand, 2),
    format(bridgeHand, 3),
  ];
}

function format(bridgeHand, suit) {
  return {
    suit: suit,
    ranks: bridgeHand
      .filter((e) => e.suit === suit)
      .map((e) => e.rank)
      .join(""),
  };
}
</script>

<template>
  <div
    class="flex flex-col w-[150px] h-[200px] bg-dash-dark-300 ml-10 rounded-xl"
  >
    <div
      v-for="(suit, index) in suits"
      :key="index"
      class="h-1/4 flex flex-row items-center ml-[10px]"
    >
      <span class="text-[30px]">{{ suit }} </span>
      <span class="ml-[10px] text-[20px] text1 tracking-[1px]">{{
        testHand.filter((e) => e.suit === index)[0]?.ranks
      }}</span>
    </div>
    <button @click="dealHand()" class="bg-white text1">Deal</button>
  </div>
</template>
