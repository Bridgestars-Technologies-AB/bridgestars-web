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
import { Bid } from "~/composables/biddingClasses/Bid";

defineProps({
  leadingBid: {
    type: Bid,
    required: true,
  },
  biddingBlockClass: {
    type: String,
    default: () => "w-full h-full min-h-[34px]",
  },
  history: {
    type: Array<Bid>,
    default: () => [new Bid(0, 0)],
  },
});
const emit = defineEmits(["makeBid"]);

function makeBid(bid: Bid) {
  emit("makeBid", bid);
}
</script>

<template>
  <!-- "Component" for larger devices -->
  <div :class="'relative hidden md:block ' + $attrs.class">
    <div :class="'flex flex-col h-full w-full px-1'">
      <div
        v-for="r in 7"
        :key="r"
        class="flex justify-center h-full relative w-full"
      >
        <div
          v-for="s in 5"
          :key="s"
          class="w-1/5 max-w-[50px] min-w-[34px] outline-none"
        >
          <game-bidding-block
            :bid="new Bid(5 - s, r)"
            :size="biddingBlockClass"
            :leadingBid="leadingBid"
            :inBiddingBox="true"
            @click="makeBid"
          ></game-bidding-block>
        </div>
      </div>
      <div
        class="w-full flex flex-row justify-center mt-3 max-w-[150px] mx-auto"
      >
        <game-bidding-block
          :bid="new Bid(0, 0)"
          :size="biddingBlockClass"
          :inBiddingBox="true"
          @click="makeBid"
        ></game-bidding-block>
      </div>
    </div>
  </div>

  <game-bidding-mobile-box
    class="block md:hidden"
    :leadingBid="leadingBid"
    :biddingBlockClass="biddingBlockClass"
    :history="history"
    @makeBid="makeBid"
  />
  <!-- "Component" smaller devices -->
</template>
