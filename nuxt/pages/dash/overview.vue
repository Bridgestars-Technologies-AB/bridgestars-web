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
  <div class="flex flex-col space-y-2 grow">
    <h1 class="">Overview</h1>
    <div class="flex flex-row items-center space-y-1 flex-wrap">
      <game-bidding-box
        v-model:suit="suit"
        v-model:nbr="nbr"
        class="scale-[80%]"
        @bid="bid"
      />
      <!-- using scale creates som space between the elements which is not nice, not sure how to handle this. Maybe start by shrinking the component a little bit and hopefully we don't need scaling after that. Maybe the size of 80-90% is good. I prefered 80 on computer and 90 on mobile (i think)-->
      <game-bidding-history
        :history="history"
        class="scale-[80%]"
      ></game-bidding-history>
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
  </div>
</template>
