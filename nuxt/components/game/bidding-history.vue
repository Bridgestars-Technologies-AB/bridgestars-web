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

//lägg till funktionalitet för hover/click, tooltip?

const players = ["V", "N", "Ö", "S"];

function brick(suit, rank) {
  return suit === 0 && rank === 0 ? "PASS" : `${rank}${symbols[suit].symbol}`;
}
</script>

<template>
  <div
    :class="
      'flex flex-col items-center rounded-xl bg-[#121c27] ' + wrapperClass
    "
  >
    <div class="w-[100%] flex flex-row justify-center">
      <div class="flex flex-row w-[97%]">
        <div
          class="w-[24%] flex flex-row justify-center mt-[8px] mx-[1px]"
          v-for="p in 4"
        >
          <span class="text1 text-[26px] font-semibold mb-[4px]">
            {{ players[p - 1] }}
          </span>
        </div>
      </div>
    </div>
    <div class="w-[100%] h-[2px] bg-dash-dark-400 mb-[7px]"></div>
    <div class="flex flex-row justify-center w-full">
      <div class="flex flex-row flex-wrap w-[97%]">
        <div
          class="w-[24%] flex flex-row justify-center items-center mx-[1px] my-[3px]"
          v-for="e in history"
        >
          <div
            class="biddingBox bg-[#0E9F6E] flex flex-row justify-center items-center rounded-lg"
            v-if="e.suit === 0 && e.rank === 0"
          >
            <span class="biddingPass">
              {{ brick(e.suit, e.rank) }}
            </span>
          </div>

          <div
            class="biddingBox flex flex-row items-center justify-center rounded-lg"
            v-else
          >
            <span class="biddingText1 tracking-[2px]">{{ e.rank }}</span>
            <span
              :class="`tracking-[2px] ${
                e.suit > 3 ? 'biddingText3' : 'biddingText2'
              } ${symbols[e.suit].color}`"
              >{{ symbols[e.suit].symbol }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
