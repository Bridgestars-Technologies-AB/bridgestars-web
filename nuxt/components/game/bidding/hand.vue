<script setup>
// Import statement not needed, provided for context
import { CardUtil } from "/composables/useCardUtil.ts";
/*
Bdding Hand
A component which displays the users hand


Props:
 hand: Array(13) [{suit: 0, rank: 2},{suit: 1, rank: 5},{suit:1, rank:12},{suit:2, rank:13} .....]
*/
const p = defineProps({
  hand: {
    type: Array[CardUtil.Card],
    required: false,
  },
  showDeal: {
    type: Boolean,
    required: false,
  },
});

const ranks = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
];

// Create a standard deck of 52 cards
const deck = [];
for (let suit = 0; suit < 4; suit++) {
  for (const rank of ranks) {
    deck.push({ suit: suit, rank: rank });
  }
}

// We don't want to mutate props, bad practice
const computedHand = ref([]);

//onMounted is needed here, else the server and client will have different values of computedHand when calling dealHand()
onMounted(() => {
  if (p.hand) {
    dealHand(p.hand);
  } else {
    dealHand();
  }
});

//If we do not provide an inputHand, this will be used to assign computedHand a randomly dealt hand
//Else, we format inputHand and update computedHand accordingly
function dealHand(inputHand) {
  let bridgeHand = [];

  if (!inputHand) {
    // Shuffle the deck (Fisher-Yates algorithm)
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    // Deal the first 13 cards to a hand
    bridgeHand = deck.slice(0, 13);
  } else {
    bridgeHand = [...inputHand];
  }

  computedHand.value = [
    format(bridgeHand, 0),
    format(bridgeHand, 1),
    format(bridgeHand, 2),
    format(bridgeHand, 3),
  ];

  console.log(computedHand);
}

function sortCards(cards) {
  // Sort the cards based on their values
  cards.sort((a, b) => CardUtil.cardValues[b] - CardUtil.cardValues[a]);

  return cards;
}

function format(bridgeHand, suit) {
  return {
    suit: suit,
    ranks: sortCards(
      bridgeHand
        .filter((e) => e.suit === suit)
        .map((e) => CardUtil.printedRanks[e.rank - 2]),
    ).join(""),
  };
}
</script>

<template>
  <div
    :class="`rounded-xl flex flex-row justify-center space-x-[10px] lg:flex-col lg:items-start ${$attrs.class}`"
  >
    <div
      v-for="index in 4"
      :key="index"
      class="h-1/4 flex flex-row items-center lg:ml-[10px]"
    >
      <span
        :class="`text-[25px] sm:text-[25px] lg:ml-[10px] lg:text-[30px] ${
          CardUtil.symbols[index - 1]
        }`"
      >
      </span>
      <span
        v-if="computedHand.filter((e) => e.suit === index - 1)[0]?.ranks"
        class="rank text1"
        >{{ computedHand.filter((e) => e.suit === index - 1)[0]?.ranks }}</span
      >
      <span v-else class="rank text1">-</span>
    </div>
    <!-- Only for testing, later we will provde dealt hans from parent component -->
    <button
      v-if="showDeal"
      class="bg-white text1 text-white"
      @click="dealHand()"
    >
      Deal
    </button>
  </div>
  <!-- text-[${suitColors[index]}] -->
</template>

<style scoped>
.rank {
  @apply ml-[10px] text-[20px] sm:text-[20px] lg:text-[25px] text-white tracking-[1px];
}
</style>
