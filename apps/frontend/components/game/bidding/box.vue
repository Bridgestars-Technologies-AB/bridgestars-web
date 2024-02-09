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
<script setup lang="ts">
import { Card } from "~/composables/biddingClasses/Card";
import { Bid } from "~/composables/biddingClasses/Bid";

const p = defineProps({
  card: Card,
  biddingBox: String,
});
const emit = defineEmits(["bid", "update:bid"]);

// function isValid(suit, rank, currentSuit = p.suit, currentRank = p.rank) {
//   if (rank > 7) return false;
//   return rank > currentRank || (suit > currentSuit && rank === currentRank);
// }

function bid(bid: Bid) {
  emit("update:bid", bid);
  // here we maybe should emit a new Bid instead
  emit("bid", bid);
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
            :card="new Card(s - 1, r)"
            :size="biddingBox"
            @click="bid"
          ></game-bidding-block>
        </div>
      </div>
      <div class="w-full flex flex-row justify-center">
        <game-bidding-block
          :card="new Card(0, 0)"
          :size="biddingBox"
          @click="bid"
        ></game-bidding-block>
      </div>
    </div>
  </div>
</template>
