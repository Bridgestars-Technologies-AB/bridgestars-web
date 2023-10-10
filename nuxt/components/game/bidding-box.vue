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
</script>

<template>
  <div :class="'flex flex-col space-y-1 ' + wrapperClass">
    <div class="flex justify-center">
      <div v-for="e in 5" :key="e">
        <game-bidding-block
          v-if="e === 1"
          :card="{ suit: 0, rank: 0 }"
          :clickable="true"
          :onClick="bid"
        ></game-bidding-block>
        <game-bidding-block v-else :invisible="true"></game-bidding-block>
      </div>
    </div>

    <div v-for="r in 7" :key="r" class="flex flex-row justify-center space-x-1">
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
</template>

<!--   <div :class="'flex flex-col space-y-1 ' + wrapperClass">

    <div class="flex justify-center space-x-1">
      <div
        v-for="e in 5"
        :class="`${e === 1 ? 'biddingBox' : 'biddingBox invisible'}`"
      >
        <button
          v-if="e === 1"
          @click="bid(0, 0)"
          class="w-full h-full flex flex-row justify-center items-center outline-none select-none biddingPass"
        >
          <span>PASS</span>
        </button>
      </div>
    </div>

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
        <span class="biddingText1 select-none">
          {{ rank }}
        </span>
        <span
          :class="`${symbols[suit - 1].color} ${
            suit < 5 ? 'biddingText2 ml-1' : 'biddingText3 ml-[1px]'
          } select-none`"
        >
          {{ symbols[suit - 1].symbol }}
        </span>
      </button>
    </div>
  </div> -->
