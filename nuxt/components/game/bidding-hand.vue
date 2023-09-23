<script setup>
/*
Bdding Hand
A component which displays the users hand

Props:
  hand: Array(4) [{suit (0-3), ranks: [K2A4]}....]
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

// We don't want to mutate props, bad practice
const computedHand = ref([]);

//onMounted is needed here, else the server and client will have different values of computedHand when calling dealHand()
onMounted(() => {
  if (p.hand) {
    computedHand.value = [...p.hand];
  } else {
    dealHand();
  }
});

//If we do not send a hand as a property, this will be used to assign computedHand a randomly dealt hand
function dealHand() {
  // Shuffle the deck (Fisher-Yates algorithm)
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  // Deal the first 13 cards to a hand
  const bridgeHand = deck.slice(0, 13);

  computedHand.value = [
    format(bridgeHand, 0),
    format(bridgeHand, 1),
    format(bridgeHand, 2),
    format(bridgeHand, 3),
  ];
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
  cards.sort((a, b) => cardValues[a] - cardValues[b]);

  return cards;
}

function format(bridgeHand, suit) {
  return {
    suit: suit,
    ranks: sortCards(
      bridgeHand.filter((e) => e.suit === suit).map((e) => e.rank),
    ).join(""),
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
        computedHand.filter((e) => e.suit === index)[0]?.ranks
      }}</span>
    </div>
    <!-- Only for testing, later we will provde dealt hans from parent component -->
    <button v-if="showDeal" @click="dealHand" class="bg-white text1">
      Deal
    </button>
  </div>
  <!-- text-[${suitColors[index]}] -->
</template>
