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
  wrapperClass: {
    type: String,
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
    :class="
      'bg-[#121c27] rounded-xl flex flex-row justify-between sm:flex-col sm:items-start ' +
      wrapperClass
    "
  >
    <div
      v-for="(suit, index) in CardUtil.suits"
      :key="index"
      class="h-1/4 flex flex-row items-center sm:ml-[10px]"
    >
      <span
        :class="`text-[30px] sm:ml-[10px] sm:text-[40px] ${CardUtil.symbols[index].color}`"
        >{{ suit }}
      </span>
      <span
        class="ml-[10px] text-[17px] text1 text-white tracking-[1px] sm:text-[25px]"
        >{{ computedHand.filter((e) => e.suit === index)[0]?.ranks }}</span
      >
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
.mobileSize {
  @apply flex;
}

.desktopSize {
  @apply sm:flex sm:flex-col;
}
</style>
