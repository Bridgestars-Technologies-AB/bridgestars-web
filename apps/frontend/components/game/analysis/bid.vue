<script setup lang="ts">
const { bid, player, size } = defineProps({
  bid: {
    type: Bid,
    default: new Bid(0, 0),
  },
  player: {
    type: String,
    default: "W",
  },
  size: {
    type: String,
  },
});

function getPlayerName(): String {
  switch (player) {
    case "W":
      return "Väst";
    case "N":
      return "Nord";
    case "E":
      return "Öst";
    case "S":
      return "Syd";
    default:
      return "";
  }
}
</script>

<template>
  <div class="flex flex-row justify-center mt-[5px]">
    <div
      :class="`${size} ${
        bid.is('PASS') ? 'bg-[#0E9F6E]' : 'bg-dark-200'
      } flex justify-center items-center rounded-xl`"
    >
      <span
        v-if="bid.is('PASS')"
        class="biddingText1 text1 tracking-[1px] mr-[2px] rounded-xl"
        >PASS</span
      >
      <div v-else>
        <span class="biddingText1 text1 tracking-[2px] mr-[2px]">{{
          bid.rank
        }}</span>

        <span v-if="bid.is('NT')" class="tracking-[2px] text1 biddingText3">
          NT
        </span>
        <span v-else :class="`biddingText2 ${bid.tailwindSuitSymbol()}`"></span>
      </div>
    </div>
    <div
      :class="`${size} bg-dark-200 flex justify-center items-center rounded-xl ml-[5px]`"
    >
      <span class="biddingText1 text1">{{ getPlayerName() }}</span>
    </div>
  </div>
</template>

<style scoped>
.biddingText1 {
  @apply text-white text-[20px] sm:text-[20px] lg:text-[28px];
}

.biddingText2 {
  @apply text-white text-[25px] sm:text-[25px] lg:text-[23px];
}

.biddingText3 {
  @apply text-white text-[20px] sm:text-[17px] lg:text-[24px];
}
</style>
