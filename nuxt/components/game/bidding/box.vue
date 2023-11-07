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

const biddingArray = ref([1, 2, 3, 4, 5, 6, 7]);

function isValid(suit, rank) {
  return rank > p.rank || (suit > p.suit && rank === p.rank);
}

function updateBiddingArray(suit, rank) {
  let r = 0;
  const array = [
    [4, 1],
    [4, 2],
    [4, 3],
    [4, 4],
    [4, 5],
    [4, 6],
    [4, 7],
  ];
  array.forEach((e) => {
    if ((suit === e[0] && rank === e[1]) || !isValid(e[0], e[1])) {
      r = e[1];
    }
  });
  biddingArray.value = Array.from(
    { length: 7 - r },
    (_, index) => r + 1 + index,
  );
  currentRank.value = r + 1;
}

function bid(suit, rank) {
  if (isValid(suit, rank)) {
    if (rank < 7) {
      updateBiddingArray(suit, rank);
    }
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
          :card="{ suit: e - 1, rank: currentRank }"
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
