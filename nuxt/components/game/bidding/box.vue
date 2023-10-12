<!-- eslint-disable no-unused-vars -->
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
  mobile: Boolean,
});
const emit = defineEmits(["bid", "update:rank", "update:suit"]);

const currentRank = ref(1);

function bid(suit, rank) {
  console.log("BIDDINGBOX: ", suit, rank);
  if (rank > p.rank || (suit > p.suit && rank === p.rank)) {
    emit("update:rank", rank);
    emit("update:suit", suit);
  }
  emit("bid", suit, rank);
}
</script>

<template>
  <!-- "Component" for larger devices -->
  <div class="hidden lm:block">
    <div :class="'flex flex-col space-y-1 ' + wrapperClass">
      <div class="flex justify-center">
        <div v-for="e in 5" :key="e">
          <game-bidding-block
            :wrapperClass="e !== 1 ? 'invisible' : ''"
            :card="{ suit: 0, rank: 0 }"
            :clickable="true"
            :onClick="bid"
          ></game-bidding-block>
        </div>
      </div>

      <div
        v-for="r in 7"
        :key="r"
        class="flex flex-row justify-center space-x-1"
      >
        <div
          v-for="s in 5"
          :key="s"
          class="flex items-center justify-center overflow-x-hidden outline-none"
        >
          <game-bidding-block
            :card="{ suit: s - 1, rank: r }"
            :clickable="true"
            :onClick="bid"
            :suit="suit"
            :rank="rank"
          ></game-bidding-block>
        </div>
      </div>
    </div>
  </div>
  <!-- "Component" smaller devices -->
  <div class="lm:hidden w-full h-full mt-[8px] flex flex-col items-center">
    <div class="flex flex-row items-center h-full">
      <div
        v-for="e in 7"
        :key="e"
        :class="`border w-[30px] h-[30px] flex justify-center items-center ${
          currentRank === e ? 'bg-slate-500' : ''
        }`"
      >
        <button class="text1 text-[15px] text-white" @click="currentRank = e">
          {{ e }}
        </button>
      </div>
    </div>
    <div class="flex flex-row">
      <div v-for="e in 5" :key="e">
        <game-bidding-block
          :card="{ suit: e - 1, rank: currentRank }"
          :clickable="true"
          :onClick="bid"
          :suit="suit"
          :rank="rank"
        ></game-bidding-block>
      </div>
    </div>
    <game-bidding-block
      :card="{ suit: 0, rank: 0 }"
      :clickable="true"
      :onClick="bid"
    ></game-bidding-block>
  </div>
</template>
