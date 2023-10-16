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
      <game-bidding-rank-suite :card="card"></game-bidding-rank-suite>
    </div>
  </div>
</template>

<style scoped>
.biddingBox {
  @apply w-[50px] h-[30px] bg-dash-dark-200 sm:w-[55px] sm:h-[30px] md:w-[65px] md:h-[30px] lg:w-[45px] lg:h-[30px] xl:w-[50px] xl:h-[35px] 2xl:w-[60px] 2xl:h-[40px];
}
</style>
