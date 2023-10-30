<script setup lang="ts">
const p = defineProps({
  card: {
    type: CardUtil.Card,
    default: () => ({ suit: 1, rank: 1 }),
  },
  wrapperClass: String,
  size: String,
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
    :class="`${wrapperClass} flex flex-row justify-center items-center my-[2px] hover:bg-transparent ${
      getDisabled(card.suit, card.rank) ? 'opacity-50 cursor-not-allowed' : ''
    }`"
  >
    <div
      :class="`${size} rounded-lg ${
        card.suit === 0 && card.rank === 0 ? '!bg-[#0E9F6E]' : ''
      } ${clickable && !disabled ? '' : 'pointer-events-none'}`"
      @click="onClick(card.suit, card.rank)"
    >
      <!-- <span class="text1 text-white">{{ brick(card.suit, card.rank) }}</span> -->
      <game-bidding-rank-suite :card="card"></game-bidding-rank-suite>
    </div>
  </div>
</template>
