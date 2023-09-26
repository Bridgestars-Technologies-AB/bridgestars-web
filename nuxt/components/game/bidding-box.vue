<!--
  Bidding Box

  Props:
    suit: Number (0-4) //  v-model:suit="suit" where suit is a ref(0)
    nbr: Number (0-7) // 0 = pass

  Emits:
    bid: {suit: Number, nbr: Number}
-->
<script setup>
const p = defineProps({
  nbr: {
    type: Number,
    required: true,
  },
  suit: {
    type: Number,
    required: true,
  },
});
const emit = defineEmits(["bid", "update:nbr", "update:suit"]);

const suits = ["♣", "♦", "♥", "♠", "NT"]; //replace with better icons, colored?

function bid(suit, nbr) {
  console.log("BIDDINGBOX: ", suit, nbr);
  if (nbr > p.nbr || (suit > p.suit && nbr === p.nbr)) {
    emit("update:nbr", nbr);
    emit("update:suit", suit);
  }
  emit("bid", suit, nbr);
}

function getDisabled(nbr, suit) {
  if (!p.suit || !p.nbr) return "";
  if (nbr < p.nbr || (suit <= p.suit && nbr === p.nbr))
    return "opacity-50 cursor-not-allowed";
  return "";
}
</script>

<template>
  <div class="flex flex-col space-y-1">
    <!-- Pass button -->
    <div class="flex justify-start">
      <button
        class="bg-green-500 hover:bg-green-400 text1 text-white dark:text-light text-[26px] w-[120px] h-[45px] rounded-xl outline-none select-none"
        @click="bid(0, 0)"
      >
        Pass
      </button>
    </div>

    <!-- 7 rows of 5 buttons -->
    <div v-for="number in 7" :key="number" class="flex space-x-1">
      <button
        v-for="suitIt in 5"
        :key="suitIt"
        :class="`bg-dash-dark-300 hover:bg-dash-dark-400 rounded-xl w-[65px] h-[45px] flex items-center justify-center overflow-x-hidden outline-none ${getDisabled(
          number,
          suitIt - 1,
        )}`"
        @click="bid(suitIt - 1, number)"
      >
        <span class="text1 text-[26px] select-none">
          {{ number }}
        </span>
        <span
          :class="`text1 ${
            suitIt < 5 ? 'text-[35px] mb-1 ml-1' : 'text-[26px]'
          } select-none`"
        >
          {{ suits[suitIt - 1] }}
        </span>
      </button>
    </div>
  </div>
</template>
