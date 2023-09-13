<script setup>
// initialize components based on data attribute selectors
onMounted(() => {});
</script>
<template>
  <h1 class="">Overview</h1>
  <game-bidding-hand
    :showDeal="false"
    :hand="[
      { suit: 0, ranks: '3678K' },
      { suit: 1, ranks: '2TQ' },
      { suit: 2, ranks: '23' },
      { suit: 3, ranks: '45A' },
    ]"
  ></game-bidding-hand>
</template>
