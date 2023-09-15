<script setup>
/*
This component displays the bidding history from bidding-box.
 Props:
   history: List of {suit, rank}
*/

const p = defineProps({
  history: {
    type: Array,
    required: true,
  },
  wrapperClass: {
    type: String,
    required: false,
  },
});

function iconColor(index) {
  switch (index) {
    case 0:
      return "!text-[#2B72C0]";
    case 1:
      return "!text-[#f78720]";
    case 2:
      return "!text-[#f26a68]";
    case 3:
      return "!text-[#349e3f]";
    default:
      console.log(`wrong index.`);
  }
}

//lägg till funktionalitet för hover/click, tooltip?

const suits = ["♣", "♦", "♥", "♠", "NT"];
const players = ["V", "N", "Ö", "S"];

function brick(suit, rank) {
  return suit === 0 && rank === 0 ? "PASS" : `${rank}${suits[suit]}`;
}
</script>

<template>
  <div :class="'flex flex-col items-center bg-[#121c27] ' + wrapperClass">
    <div class="w-[100%] flex flex-row">
      <div class="w-1/4 flex flex-row justify-center mt-[8px]" v-for="p in 4">
        <span class="text1 text-[26px] font-semibold mb-[4px]">
          {{ players[p - 1] }}
        </span>
      </div>
    </div>
    <div class="w-[100%] h-[2px] bg-dash-dark-400 mb-[7px]"></div>
    <div class="flex flex-row justify-center w-full">
      <div class="flex flex-row flex-wrap w-[97%] space-x-[2px]">
        <div
          :class="`w-[24%] h-[35px] mx-[2px] flex flex-row justify-center items-center mb-[5px] rounded-sm ${
            e === 'PASS' ? 'bg-[#0E9F6E]' : 'bg-dash-dark-200'
          }`"
          v-for="e in history"
        >
          <!-- <span
            :class="`text1 text-[22px] + ${
              (e.suit === 0 && e.rank === 0) || e.suit === 4
                ? 'tracking-[0.5px] text-[18px]'
                : 'tracking-[2px]'
            }`"
            >{{ brick(e.suit, e.rank) }}</span -->
          <span
            class="text1 text-[18px] tracking-[0.5px]"
            v-if="e.suit === 0 && e.rank === 0"
          >
            {{ brick(e.suit, e.rank) }}
          </span>
          <div v-else>
            <span class="text1 text-[22px] tracking-[2px]">{{ e.rank }}</span>
            <span
              :class="`text1 text-[22px] tracking-[2px] ${iconColor(e.suit)}`"
              >{{ suits[e.suit] }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
