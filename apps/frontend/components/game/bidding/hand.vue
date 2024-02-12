<script setup lang="ts">
// Import statement not needed, provided for context
/*
Bdding Hand
A component which displays the users hand
Props:
 hand: Array(13) [{suit: 0, rank: 2},{suit: 1, rank: 5},{suit:1, rank:12},{suit:2, rank:13} .....]
*/

import { Card } from "~/composables/biddingClasses/Card";
import { Hand } from "~/composables/biddingClasses/Hand";

const p = defineProps({
  hand: {
    type: Hand,
    required: true,
  },
  showDeal: {
    type: Boolean,
    required: false,
  },
});

console.log(p.hand.spades);

//only used for displaying
const suitNames = ["spades", "hearts", "diamonds", "clubs"];
</script>

<template>
  <div :class="`rounded-xl flex flex-col items-start ${$attrs.class}`">
    <div
      v-for="index in 4"
      :key="index"
      class="h-1/4 flex flex-row items-center"
    >
      <span
        :class="`ml-[10px] text-[14px] ${Card.suitsToTailwind.get(index - 1)}`"
      >
      </span>
      <span
        class="text-[15px] font-semibold text-dark dark:text-white tracking-[1px]"
        >{{ hand.toString(suitNames[index - 1]) }}
      </span>
    </div>
  </div>
  <!-- text-[${suitColors[index]}] -->
</template>
