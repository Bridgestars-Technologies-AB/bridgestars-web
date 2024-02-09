<script setup lang="ts">
defineProps({});
//const card = ref(new Card(0, 0));

import { Card } from "~/composables/biddingClasses/Card";
import { Bid } from "~/composables/biddingClasses/Bid";

const bid = ref(new Bid(new Card(0, 0)));

function check(bid: Bid) {
  // code...
  console.log(bid.card.rank);
}
</script>

<template>
  <div>
    <!-- <game-bidding-box
      v-model="bid"
      biddingBox="
  xs:w-[50px] xs:h-[28px] bg-color-dark dark:bg-dark-200 hover:bg-transparent lg:w-[43px] lg:h-[30px]"
      @bid="makeBid"
    ></game-bidding-box> -->
    <game-bidding-problem
      v-model:bid="bid"
      presentationText="hej"
      @check="check"
    ></game-bidding-problem>
  </div>
</template>
