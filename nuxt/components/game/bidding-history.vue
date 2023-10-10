<script setup>
/*
This component displays the bidding history from bidding-box.
 Props:
   history: List of {suit, nbr}
   
*/

defineProps({
  history: {
    type: Array,
    required: true,
  },
});

//lägg till funktionalitet för hover/click, tooltip?

const suits = ["♣", "♦", "♥", "♠", "NT"];
const players = ["V", "N", "Ö", "S"];

function brick(suit, nbr) {
  return suit === 0 && nbr === 0 ? "PASS" : `${nbr}${suits[suit]}`;
}
</script>

<template>
  <div
    class="flex flex-col items-center w-[290px] h-[100%] bg-dash-dark-300 ml-10 rounded-xl"
  >
    <div class="w-[100%] flex flex-row">
      <div
        v-for="p in 4"
        :key="p"
        class="w-1/4 flex flex-row justify-center mt-[16px]"
      >
        <span class="text1 text-[32px] mb-[4px]">
          {{ players[p - 1] }}
        </span>
      </div>
    </div>
    <div class="w-[100%] h-[2px] bg-dash-dark-400 mb-[10px]"></div>
    <div class="flex flex-row justify-center w-full">
      <div class="flex flex-row flex-wrap w-[97%] space-x-[2px]">
        <div
          v-for="e in history.map((element) =>
            brick(element.suit, element.nbr),
          )"
          :key="e"
          :class="`w-[24%] mx-[2px] h-[40px] flex flex-row justify-center items-center mb-[10px] rounded-2xl + ${
            e === 'PASS' ? 'bg-[#0E9F6E]' : 'bg-dash-dark-200'
          }`"
        >
          <span
            :class="`text1 text-[22px] + ${
              e === 'PASS' || e.includes('NT')
                ? 'tracking-[0.5px]'
                : 'tracking-[2px]'
            }`"
            >{{ e }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
