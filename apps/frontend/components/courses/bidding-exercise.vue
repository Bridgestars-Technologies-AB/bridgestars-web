<script setup lang="ts">
import type { CardUtil } from "#imports";

interface Props {
  presentationText: string;
  solution: CardUtil.Card;
  biddingAnswer: string;
  history: CardUtil.Card[];
}

const p = defineProps<Props>();

// used as v-model to be able to see the latest bid made
const suit = ref(0);
const rank = ref(0);
const deal = ref(1);
// used to check if the bid is correct
const pass = ref(false);
// used to check if a bid is made
const isBidMade = ref(false);
// history of bids made
const biddingHistory = ref(p.history);

// Checks if solution is correct and updates pass and history accordingly
// emited from bidding-problem
function check() {
  isBidMade.value = true;
  if (suit.value === p.solution.suit && rank.value === p.solution.rank) {
    pass.value = true;
    biddingHistory.value.push({ suit: suit.value, rank: rank.value });
  } else {
    pass.value = false;
  }
}
</script>

<template>
  <div
    v-if="!pass"
    class="w-full h-full flex flex-col justify-center items-center"
  >
    <div
      class="w-[500px] h-[50px] mb-1 bg-dark-100 rounded-xl flex justify-center items-center"
    >
      <span class="text-[30px] text-dark dark:text-white"
        >Giv {{ deal }} av 10</span
      >
    </div>
    <game-bidding-problem
      v-model:suit="suit"
      v-model:rank="rank"
      :bidMade="{ suit: suit, rank: rank }"
      :presentationText="presentationText"
      :isBidMade="isBidMade"
      :history="biddingHistory"
      @check="check"
    ></game-bidding-problem>
  </div>
  <div v-else class="w-full h-full flex justify-center items-center">
    <game-analysis-main
      :biddingResult="biddingHistory"
      :solution="solution"
      :biddingAnswer="biddingAnswer"
    ></game-analysis-main>
  </div>
</template>
