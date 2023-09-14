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
  wrapperClass: {
    type: String,
    required: false,
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
  <div :class="'flex flex-col space-y-1 ' + wrapperClass">
    <!-- Pass button -->
    <div class="flex justify-start ml-[8px]">
      <button
        @click="bid(0, 0)"
        class="flex flex-row justify-center items-center bg-green-500 hover:bg-green-400 text1 text-white dark:text-light text-[15px] rounded-sm w-[80px] h-[30px] outline-none select-none"
      >
        <span>PASS</span>
      </button>
    </div>

    <!-- 7 rows of 5 buttons -->
    <div
      v-for="nbr in 7"
      :key="nbr"
      class="flex flex-row justify-center space-x-1"
    >
      <button
        v-for="suit in 5"
        :key="suit"
        @click="bid(suit - 1, nbr)"
        :class="`bg-dash-dark-300 hover:bg-dash-dark-400 rounded-sm w-[50px] h-[30px] flex items-center justify-center overflow-x-hidden outline-none ${getDisabled(
          nbr,
          suit - 1
        )}`"
      >
        <span class="text1 text-[15px] select-none">
          {{ nbr }}
        </span>
        <span
          :class="`text1 ${
            suit < 5 ? 'text-[25px] mb-1 ml-1' : 'text-[15px]'
          } select-none`"
        >
          {{ suits[suit - 1] }}
        </span>
      </button>
    </div>
  </div>
</template>
