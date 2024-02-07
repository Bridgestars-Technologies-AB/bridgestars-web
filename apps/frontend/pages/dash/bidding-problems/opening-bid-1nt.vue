<script setup>
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
</script>

<template>
  <div class="w-full h-full justify-center items-center">
    <courses-bidding-exercise
      :presentationText="presentationText"
      :biddingAnswer="biddingAnswer"
      :solution="solution"
      :history="history"
    ></courses-bidding-exercise>
  </div>
</template>
