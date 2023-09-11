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
  <div class="flex flex-row space-y-1">
    <h1 class="">Overview</h1>
    <game-bidding-box v-model:suit="suit" v-model:nbr="nbr" @bid="bid" />
    <game-bidding-history :history="history"></game-bidding-history>
  </div>
</template>
