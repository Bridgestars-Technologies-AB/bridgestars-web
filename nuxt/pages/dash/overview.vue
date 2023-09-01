<script setup>
// initialize components based on data attribute selectors
onMounted(() => {});

const suit = ref(0);
const nbr = ref(0);
//const hist = ref([])

function bid(n, s) {
  //hist.value.push({player:0, suit:s, nbr:n})
  console.log("bidding: ", suit.value, nbr.value); //5, 5
}
</script>
<template>
  <div class="flex flex-row space-y-1">
    <h1 class="">Overview</h1>
    <game-bidding-box v-model:suit="suit" v-model:nbr="nbr" @bid="bid" />
    <!-- <game-bidding-history :history="hist"/> -->
    <game-bidding-history></game-bidding-history>
  </div>
</template>
