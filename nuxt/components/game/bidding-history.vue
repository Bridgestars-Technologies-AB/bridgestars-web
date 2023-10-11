<script setup>
/*
This component displays the bidding history from bidding-box.
Props:
  history: List of {suit, rank}
*/

defineProps({
  history: {
    type: Array[CardUtil.Card],
    required: true,
  },
  wrapperClass: {
    type: String,
    required: false,
  },
});

//lägg till funktionalitet för hover/click, tooltip?

const players = ["V", "N", "Ö", "S"];
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
          v-for="p in 4"
          :key="p"
          class="w-[24%] flex flex-row justify-center mt-[8px]"
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
        <game-bidding-block
          v-for="(e, index) in history"
          :key="index"
          wrapperClass="w-[24%]"
          :card="e"
          :bg="e.suit || e.rank ? '' : 'bg-[#0E9F6E]'"
        ></game-bidding-block>
      </div>
    </div>
  </div>
</template>
