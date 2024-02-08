<script setup>
const route = useRoute();
console.log(route.params.id);

//Mock data, will be fetched from DB table bidding-problems and bidding-result
const presentationText =
  "Vad bjuder du som svarshand när din partner har öppnat med 1 NT?";
const biddingAnswer =
  "Nord had 17hp och en jämn hand. Därför öppnar nord med 1NT som visar 15-17 hp och jämn hand. Syd fortsätter med 3NT som visar slutbud 10-15 hp.";
const solution = {
  suit: 4,
  rank: 2,
};

const history = [
  { suit: 10, rank: 10 },
  { suit: 4, rank: 1 },
  { suit: 0, rank: 0 },
];

// used as v-model to be able to see the latest bid made
const suit = ref(0);
const rank = ref(0);
const deal = ref(1);
// used to check if the bid is correct
const pass = ref(false);
// used to check if a bid is made
const isBidMade = ref(false);
// history of bids made
const biddingHistory = ref(history);

// Checks if solution is correct and updates pass and history accordingly
// emited from bidding-problem
function check() {
  isBidMade.value = true;
  if (suit.value === solution.suit && rank.value === solution.rank) {
    pass.value = true;
    biddingHistory.value.push({ suit: suit.value, rank: rank.value });
  } else {
    pass.value = false;
  }
}
</script>

<template>
  <div class="w-full h-full justify-center items-center">
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
        :history="history"
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
  </div>
</template>
