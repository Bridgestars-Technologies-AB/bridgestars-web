<!-- eslint-disable no-unused-vars -->
<!--
Bidding Box

Props:
  suit: Number (0-4) //  v-model:suit="suit" where suit is a ref(0)
  rank: Number (0-7) // 0 = pass
  biddingBox: css properties for sizing of bidding-block component
  mobile: for choosing mobile or desktop version

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
  mobile: Boolean,
  biddingBox: String,
});
const emit = defineEmits(["bid", "update:rank", "update:suit"]);

const currentRank = ref(1);
const crank = ref(0);

const biddingArray = ref([1, 2, 3, 4, 5, 6, 7]);

function isValid(suit, rank, currentSuit = p.suit, currentRank = p.rank) {
  if (rank > 7) return false;
  return rank > currentRank || (suit > currentSuit && rank === currentRank);
}

function updateBiddingArray(suit, rank) {
  biddingArray.value = biddingArray.value.filter((e) =>
    isValid(4, e, suit, rank),
  );
  if (biddingArray.value.length !== 0) {
    currentRank.value = biddingArray.value[0];
  }
}

function bid(suit, rank) {
  if (isValid(suit, rank)) {
    updateBiddingArray(suit, rank);
    emit("update:rank", rank);
    emit("update:suit", suit);
  }
  emit("bid", suit, rank);
}
</script>

<template>
  <!-- "Component" for larger devices -->
  <div class="hidden lg:block">
    <div :class="'flex flex-col space-y-1 ' + $attrs.class">
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
            :size="biddingBox"
            :disabled="!isValid(s - 1, r)"
            @click="bid"
          ></game-bidding-block>
        </div>
      </div>
      <div class="w-full flex flex-row justify-center">
        <game-bidding-block
          :card="{ suit: 0, rank: 0 }"
          :size="biddingBox"
          @click="bid"
        ></game-bidding-block>
      </div>
    </div>
  </div>
  <!-- "Component" smaller devices -->
  <div
    class="lg:hidden w-full h-full flex flex-col justify-center items-center"
  >
    <div class="flex flex-row items-center mb-[5px]">
      <div
        v-for="e in biddingArray"
        :key="e"
        :class="`border mb-[2px] w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] flex justify-center items-center ${
          currentRank === e ? 'bg-slate-500' : ''
        }`"
      >
        <button class="text1 text-[15px] text-white" @click="currentRank = e">
          {{ e }}
        </button>
      </div>
    </div>
    <div class="flex flex-row space-x-[3px]">
      <div v-for="e in 5" :key="e">
        <game-bidding-block
          :card="{ suit: e - 1, rank: Math.min(currentRank, 7) }"
          :size="biddingBox"
          :disabled="!isValid(e - 1, currentRank)"
          @click="bid"
        ></game-bidding-block>
      </div>
    </div>
    <game-bidding-block
      :card="{ suit: 0, rank: 0 }"
      :size="biddingBox"
      @click="bid"
    ></game-bidding-block>
  </div>
</template>
