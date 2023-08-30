<script setup>

// initialize components based on data attribute selectors
onMounted(() => {

})

const suit = ref(0)
const nbr = ref(0) 

function bid(n, s){
  console.log("bidding: ", suit.value, nbr.value) //5, 5
}
</script>
<template>
  <div class="flex flex-col space-y-1">
    <h1 class="">Overview</h1> 
    <game-bidding-box v-model:suit="suit" v-model:nbr="nbr" @bid="bid"/>
  </div>
</template> 
