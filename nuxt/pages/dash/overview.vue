<script setup>
// initialize components based on data attribute selectors
onMounted(() => {});

const suit = ref(0);
const nbr = ref(0);
const history = ref([]);

function bid(s, n) {
  history.value.push({ suit: s, nbr: n });
}
</script>
<template>
  <!-- <h1 class="">Overview</h1> -->
  <game-bidding-system> </game-bidding-system>
</template>
