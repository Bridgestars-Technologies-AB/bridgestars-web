<script setup>
//Mock data, will be fetched from DB table bidding-problems
const presentationText =
  "Vad bjuder du som svarshand när din partner har öppnat med 1 NT?";
</script>

<template>
  <div class="w-full h-full flex justify-center items-center">
    <game-bidding-problem
      :presentationText="presentationText"
    ></game-bidding-problem>
  </div>
</template>
