<script setup>
const p = defineProps({
  history: {
    type: [],
    required: true,
  },
});

//lägg till funktionalitet för hover/click, tooltip?

const suits = ["♣", "♦", "♥", "♠", "NT"];
const players = ["V", "N", "Ö", "S"];

//Lite ineffektivt att skapa en ny lista varje gång kanske, men det funkar iallafall
function updateHistoryList() {
  const historyList = [];
  for (let i = 0; i < p.history.length - 1; i += 2) {
    const pair = [p.history[i], p.history[i + 1]];
    historyList.push(brick(pair[0], pair[1]));
  }
  return historyList;
}

function brick(suit, nbr) {
  return suit === 0 && nbr === 0 ? "PASS" : `${nbr}${suits[suit]}`;
}
</script>

<template>
  <div
    class="flex flex-col items-center w-[300px] h-[100%] bg-dash-dark-300 ml-10 rounded-xl"
  >
    <div class="w-[100%] flex flex-row">
      <div class="w-1/4 flex flex-row justify-center mt-[16px]" v-for="p in 4">
        <span class="text1">
          {{ players[p - 1] }}
        </span>
      </div>
    </div>
    <div class="w-[100%] h-[2px] bg-dash-dark-400 mb-[10px]"></div>
    <div class="flex flex-row flex-wrap w-[100%]">
      <div
        class="w-1/4 h-[10%] flex flex-row justify-center mb-[10px]"
        v-for="e in updateHistoryList()"
      >
        <span class="text1 text-[26px]">{{ e }}</span>
      </div>
    </div>
  </div>
</template>
