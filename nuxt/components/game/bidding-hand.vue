<script setup>
/*
Bdding Hand
A component which displays the users hand


Props:
 hand: Array(13) [{suit: 0, rank: 2},{suit: 1, rank: 5},{suit:1, rank:12},{suit:2, rank:13} .....]
*/
const p = defineProps({
  hand: {
    type: Array,
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

const suits = ["♣", "♦", "♥", "♠"];
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

// When we print the ranks, we do not want rank 2-14, we want T, J, Q, K, A as well
const printedRanks = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "T",
  "J",
  "Q",
  "K",
  "A",
];

// Create a standard deck of 52 cards
const deck = [];
for (let suit = 0; suit < 4; suit++) {
  for (const rank of ranks) {
    deck.push({ suit: suit, rank: rank });
  }
}

function iconColor(index) {
  switch (index) {
    case 0:
      return "text-[#2B72C0]";
    case 1:
      return "text-[#f78720]";
    case 2:
      return "text-[#f26a68]";
    case 3:
      return "text-[#349e3f]";
    default:
      console.log(`wrong index.`);
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
  // Define the values for each card
  const cardValues = {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    T: 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 14,
  };

  // Sort the cards based on their values
  cards.sort((a, b) => cardValues[b] - cardValues[a]);

  return cards;
}

function format(bridgeHand, suit) {
  return {
    suit: suit,
    ranks: sortCards(
      bridgeHand
        .filter((e) => e.suit === suit)
        .map((e) => printedRanks[e.rank - 2])
    ).join(""),
  };
}
</script>

<template>
  <div :class="'flex flex-col bg-[#121c27] rounded-xl ' + wrapperClass">
    <div
      v-for="(suit, index) in suits"
      :key="index"
      class="h-1/4 flex flex-row items-center ml-[10px]"
    >
      <span :class="`text-[45px] ${iconColor(index)}`">{{ suit }} </span>
      <span class="ml-[10px] text-[25px] text1 tracking-[1px]">{{
        computedHand.filter((e) => e.suit === index)[0]?.ranks
      }}</span>
    </div>
    <!-- Only for testing, later we will provde dealt hans from parent component -->
    <button v-if="showDeal" @click="dealHand()" class="bg-white text1">
      Deal
    </button>
  </div>
  <!-- text-[${suitColors[index]}] -->
</template>
