<!--
 Bidding Box


 Props:
   suit: Number (0-4) //  v-model:suit="suit" where suit is a ref(0)
   rank: Number (0-7) // 0 = pass


 Emits:
   bid: {suit: Number, rank: Number}
-->
<script setup>
const p = defineProps({
  rank: {
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
const emit = defineEmits(["bid", "update:rank", "update:suit"]);

function bid(suit, rank) {
  console.log("BIDDINGBOX: ", suit, rank);
  if (rank > p.rank || (suit > p.suit && rank === p.rank)) {
    emit("update:rank", rank);
    emit("update:suit", suit);
  }
  emit("bid", suit, rank);
}

function getDisabled(rank, suit) {
  if (!p.suit || !p.rank) return "";
  if (rank < p.rank || (suit <= p.suit && rank === p.rank))
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
      v-for="rank in 7"
      :key="rank"
      class="flex flex-row justify-center space-x-1"
    >
      <button
        v-for="suit in 5"
        :key="suit"
        @click="bid(suit - 1, rank)"
        :class="`biddingBox hover:bg-dash-dark-400 rounded-md flex items-center justify-center overflow-x-hidden outline-none ${getDisabled(
          rank,
          suit - 1
        )}`"
      >
        <span class="text1 text-[20px] select-none">
          {{ rank }}
        </span>
        <span
          :class="`text1 ${symbols[suit - 1].color} ${
            suit < 5 ? 'text-[26px] ml-1' : 'text-[14px] ml-[1px]'
          } select-none`"
        >
          {{ symbols[suit - 1].symbol }}
        </span>
      </button>
    </div>
  </div>
</template>
