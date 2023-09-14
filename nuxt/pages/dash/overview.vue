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
    <game-bidding-hand
      :showDeal="true"
      :hand="[
        { suit: 0, rank: 2 },
        { suit: 0, rank: 5 },
        { suit: 0, rank: 12 },
        { suit: 1, rank: 13 },
        { suit: 1, rank: 3 },
        { suit: 2, rank: 8 },
        { suit: 2, rank: 11 },
        { suit: 2, rank: 13 },
        { suit: 2, rank: 14 },
        { suit: 3, rank: 5 },
        { suit: 3, rank: 6 },
        { suit: 3, rank: 9 },
        { suit: 3, rank: 14 },
      ]"
    ></game-bidding-hand>
  </div>
</template>
