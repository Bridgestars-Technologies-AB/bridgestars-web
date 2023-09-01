<script setup>
// for bidding box status display history

const p = defineProps({
  nbr: {
    type: Number,
    required: true,
  },
  suit: {
    type: Number,
    required: true,
  },
});

const suits = ["♣", "♦", "♥", "♠", "NT"];
const players = ["V", "N", "Ö", "S"];
const historyElement = [
  { player: 0, suit: 0, nbr: 0 },
  { player: 1, suit: 3, nbr: 1 },
  { player: 2, suit: 2, nbr: 2 },
  { player: 3, suit: 2, nbr: 1 },
];
const historyElement2 = [
  { player: 0, suit: 0, nbr: 0 },
  { player: 1, suit: 0, nbr: 1 },
  { player: 2, suit: 4, nbr: 1 },
  { player: 3, suit: 2, nbr: 1 },
];

const completeHistory = [historyElement, historyElement2];

function brick(nbr, suit) {
  return suit === 0 && nbr === 0 ? "PASS" : `${nbr}${suits[suit]}`;
}
</script>

<template>
  <div
    class="flex flex-col items-center w-[300px] h-[100%] bg-dash-dark-300 ml-10 rounded-xl"
  >
    <div class="w-[100%] flex flex-row justify-between p-[16px]">
      <span class="text1" v-for="p in 4">{{ players[p - 1] }}</span>
    </div>
    <div class="bg-dash-dark-400 w-[100%] h-[2px]"></div>
    <div class="w-[100%] h-[10%]" v-for="e1 in completeHistory.length">
      <div class="flex flex-row justify-between w-[100%] p-[16px]">
        <div class="bg-dash-dark-400" v-for="e2 in 4">
          <span class="text1 text-[20px] items-center">{{
            brick(
              completeHistory[e1 - 1][e2 - 1].nbr,
              completeHistory[e1 - 1][e2 - 1].suit
            )
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
