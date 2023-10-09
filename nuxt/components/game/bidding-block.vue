<script setup>
const props = defineProps({
  card: {
    type: Object,
    default: { suit: 1, rank: 1 },
  },
  wrapperClass: String,
  bg: String,
  invisible: Boolean,
});
</script>

<template>
  <div
    :class="`${wrapperClass} flex flex-row justify-center items-center my-[3px] ${
      invisible ? 'invisible' : ''
    }`"
  >
    <div
      :class="`biddingBox ${
        card.suit === 0 && card.rank === 0 ? '!bg-[#0E9F6E]' : ''
      } flex flex-row justify-center items-center rounded-lg`"
    >
      <!-- <span class="text1 text-white">{{ brick(card.suit, card.rank) }}</span> -->
      <game-rank-suite :card="card"></game-rank-suite>
    </div>
  </div>
</template>

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
