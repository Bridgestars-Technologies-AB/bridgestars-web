<script setup lang="ts">
const p = defineProps({
  card: {
    type: CardUtil.Card,
    default: () => ({ suit: 1, rank: 1 }),
  },
  wrapperClass: String,
  bg: String,
  invisible: Boolean,
  clickable: Boolean,
  onClick: Function,
  suit: Number,
  rank: Number,
});

const disabled = ref(false);

function getDisabled(rank: Number, suit: Number) {
  if (rank < p.rank || (suit <= p.suit && rank === p.rank)) {
    disabled.value = true;
    return true;
  }
  //return "opacity-50 cursor-not-allowed";
}
</script>

<template>
  <div
    :class="`${wrapperClass} flex flex-row justify-center items-center my-[3px] ${
      getDisabled(card.suit, card.rank) ? 'opacity-50 cursor-not-allowed' : ''
    }`"
  >
    <div
      :class="`biddingBox ${
        card.suit === 0 && card.rank === 0 ? '!bg-[#0E9F6E]' : ''
      } ${
        clickable && !disabled ? '' : 'pointer-events-none'
      } flex flex-row justify-center items-center rounded-lg`"
      @click="onClick(card.suit, card.rank)"
    >
      <!-- <span class="text1 text-white">{{ brick(card.suit, card.rank) }}</span> -->
      <game-rank-suite :card="card"></game-rank-suite>
    </div>
  </div>
</template>

<style scoped>
.biddingBox {
  @apply w-[50px] h-[25px] bg-dash-dark-200 xl:w-[70px] xl:h-[45px] lg:w-[55px] lg:h-[35px] md:w-[35px] md:h-[30px] sm:w-[30px] sm:h-[25px];
}

/* Kanske lägga till en biddingbox för bidding-block mobile */

/* .biddingPass {
  @apply bg-green-500 hover:bg-green-400 rounded-lg
    dark:text-light biddingText3 tracking-[0.5px] text-white;
} */
</style>
