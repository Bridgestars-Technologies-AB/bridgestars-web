<script setup>
/*
This component displays the bidding history from bidding-box.
Props:
  history: List of {suit, rank}
  biddingBox: css properties for sizing of bidding-block component
*/

defineProps({
  history: {
    type: Array[CardUtil.Card],
    required: true,
  },
  biddingBox: String,
});

//lägg till funktionalitet för hover/click, tooltip?

const players = ["V", "N", "Ö", "S"];
</script>

<template>
  <div class="flex flex-col items-center rounded-xl bg-[#121c27]">
    <div class="w-[100%] flex flex-row justify-center">
      <div class="flex flex-row w-[97%]">
        <div
          v-for="p in 4"
          :key="p"
          class="w-[24%] flex flex-row justify-center mt-[4px]"
        >
          <span class="text1 text-[20px] font-semibold mb-[4px]">
            {{ players[p - 1] }}
          </span>
        </div>
      </div>
    </div>
    <div class="w-[100%] h-[2px] bg-dark-400 mb-[7px]"></div>
    <div class="flex flex-row justify-center w-full">
      <div class="flex flex-row flex-wrap w-[97%]">
        <game-bidding-block
          v-for="(e, index) in history"
          :key="index"
          class="w-[24%]"
          :card="e"
          :bg="e.suit || e.rank ? '' : 'bg-[#0E9F6E]'"
          :size="biddingBox"
          :clickable="false"
        ></game-bidding-block>
      </div>
    </div>
  </div>
</template>

<style scoped>
.biddingBox {
  @apply w-[50px] h-[30px] bg-dark-200 hover:bg-transparent  sm:w-[55px] sm:h-[30px] md:w-[65px] md:h-[25px] lg:w-[40px] lg:h-[30px];
}
</style>
