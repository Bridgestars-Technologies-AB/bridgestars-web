<script setup>
//Mock data, will be fetched from DB table bidding-problems and bidding-result
const presentationText =
  "Vad bjuder du som svarshand när din partner har öppnat med 1 NT?";
const biddingAnswer =
  "Nord had 17hp och en jämn hand. Därför öppnar nord med 1NT som visar 15-17 hp och jämn hand. Syd fortsätter med 3NT som visar slutbud 10-15 hp.";
const solution = ref({
  suit: 4,
  rank: 2,
});

const suit = ref(0);
const rank = ref(0);
const pass = ref(false);
const isBidMade = ref(false);

function check() {
  isBidMade.value = true;
  if (
    suit.value === solution.value.suit &&
    rank.value === solution.value.rank
  ) {
    pass.value = true;
    history.value.push({ suit: suit.value, rank: rank.value });
  } else {
    pass.value = false;
  }
}

const history = ref([
  { suit: 10, rank: 10 },
  { suit: 4, rank: 1 },
  { suit: 0, rank: 0 },
]);
</script>

<template>
  <div class="w-full h-full flex justify-center items-center">
    <game-bidding-problem
      v-if="!pass"
      v-model:suit="suit"
      v-model:rank="rank"
      :bidMade="{ suit: suit, rank: rank }"
      :presentationText="presentationText"
      :isBidMade="isBidMade"
      :history="history"
      @check="check"
    ></game-bidding-problem>
    <game-analysis-main
      v-else
      :biddingResult="history"
      :solution="solution"
      :biddingAnswer="biddingAnswer"
    ></game-analysis-main>
    <!-- <game-analysis-main></game-analysis-main> -->
  </div>
</template>
