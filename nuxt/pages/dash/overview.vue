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
      :showDeal="false"
      :hand="[
        { suit: 0, ranks: '3678K' },
        { suit: 1, ranks: '2TQ' },
        { suit: 2, ranks: '23' },
        { suit: 3, ranks: '45A' },
      ]"
    ></game-bidding-hand>
  </div>
</template>
