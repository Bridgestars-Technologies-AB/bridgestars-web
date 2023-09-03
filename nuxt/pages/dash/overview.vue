<script setup>
// initialize components based on data attribute selectors
onMounted(() => {});

//Lång lista med alla bud, completeHistory ej nästlad const completeHistory = ref([]), prop som skickas till bidding-history

const suit = ref(0);
const nbr = ref(0);
const history = ref([]);

function bid(n, s) {
  history.value.push(n, s);
  console.log(history.value);
  //console.log("bidding: ", suit.value, nbr.value); //5, 5
}
</script>
<template>
  <div class="flex flex-row space-y-1">
    <h1 class="">Overview</h1>
    <game-bidding-box v-model:suit="suit" v-model:nbr="nbr" @bid="bid" />
    <!-- <game-bidding-history :history="hist"/> -->
    <game-bidding-history :history="history"></game-bidding-history>
  </div>
</template>
