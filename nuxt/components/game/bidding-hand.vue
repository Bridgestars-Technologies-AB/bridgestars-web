<script setup>
const p = defineProps({
  handx: {
    type: [],
    required: true,
  },
});

const suits = ["♣", "♦", "♥", "♠"];
const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];
// Create a standard deck of 52 cards
const deck = [];
for (const suit of suits) {
  for (const rank of ranks) {
    deck.push(rank + suit);
  }
}

const hand = ref(["♣A5", "♦KJ8", "♥AT4", "♠KJT2"]);

function dealHand() {
  // Shuffle the deck (Fisher-Yates algorithm)
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  // Deal the first 13 cards to a hand
  const bridgeHand = deck.slice(0, 13);
  const formatedHand = [
    format(bridgeHand, "♣"),
    format(bridgeHand, "♦"),
    format(bridgeHand, "♥"),
    format(bridgeHand, "♠"),
  ];

  hand.value = formatedHand;
}

//const x = dealHand();
//console.log(x);

function format(bridgeHand, suit) {
  return (
    suit +
    bridgeHand
      .filter((e) => e[1] === suit)
      .map((e) => e[0])
      .join("")
  );
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
      <span class="ml-[10px] text-[20px] text1">{{
        hand[index].slice(1, hand[index].length)
      }}</span>
    </div>
    <button @click="dealHand()" class="bg-white text1">Deal</button>
  </div>
</template>
