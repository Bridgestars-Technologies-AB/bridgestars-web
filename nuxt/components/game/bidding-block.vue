<script setup lang="ts">
const p = defineProps({
  card: {
    type: Object,
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

function getDisabled(rank, suit) {
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
      invisible ? 'invisible' : ''
    } ${
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
  @apply xl:w-[70px] xl:h-[45px] lg:w-[55px] lg:h-[35px] md:w-[35px] md:h-[30px] sm:w-[30px] sm:h-[25px] w-[20px] h-[15px] bg-dash-dark-200;
}

/* .biddingPass {
  @apply bg-green-500 hover:bg-green-400 rounded-lg
    dark:text-light biddingText3 tracking-[0.5px] text-white;
} */
</style>

<!-- <div
    :class="`${wrapperClass} flex flex-row justify-center items-center my-[3px]`"
  >
    <div
      class="biddingBox bg-[#0E9F6E] flex flex-row justify-center items-center rounded-lg"
      v-if="card.suit === 0 && card.rank === 0"
    >
      <span class="biddingPass">
        {{ brick(card.suit, card.rank) }}
      </span>
    </div>

    <div
      class="biddingBox flex flex-row items-center justify-center rounded-lg"
      v-else
    >
      <span class="biddingText1 tracking-[2px]">{{ card.rank }}</span>
      <span
        :class="`tracking-[2px] ${
          card.suit > 3 ? 'biddingText3' : 'biddingText2'
        } ${symbols[card.suit].color}`"
        >{{ symbols[card.suit].symbol }}</span
      >
    </div>
  </div> -->
