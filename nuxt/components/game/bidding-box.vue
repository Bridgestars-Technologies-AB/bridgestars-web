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
  <div>
    <div :class="'flex flex-col space-y-1 ' + wrapperClass">
      <div class="flex justify-center">
        <div v-for="e in 5" :key="e">
          <game-bidding-block
            :wrapperClass="e !== 1 ? 'invisible' : ''"
            :card="{ suit: 0, rank: 0 }"
            :clickable="true"
            :onClick="bid"
          ></game-bidding-block>
          <!-- <game-bidding-block
          v-else
          wrapperClass="invisible"
        ></game-bidding-block> -->
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
</template>
