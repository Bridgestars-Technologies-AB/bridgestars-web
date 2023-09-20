<!-- This component is the parent to all bid-components, keeps track of cards, bids, etc, -->

<script setup>
// initialize components based on data attribute selectors
onMounted(() => {});

const suit = ref(0);
const rank = ref(0);
const history = ref([]);

function bid(s, r) {
  history.value.push({ suit: s, rank: r });
}
</script>
<template>
  <div class="flex flex-row space-x-1 h-[370px] w-[1200px] justify-center">
    <game-bidding-container showImage="true" wrapperClass="h-full w-[24%]">
      <game-bidding-text></game-bidding-text>
    </game-bidding-container>

    <game-bidding-container wrapperClass="h-full w-[24%]" header="DIN HAND">
      <game-bidding-hand
        wrapperClass="w-full h-[90%]"
        :showDeal="false"
        :hand="[
          { suit: 0, rank: 2 },
          { suit: 0, rank: 5 },
          { suit: 0, rank: 12 },
          { suit: 1, rank: 13 },
          { suit: 1, rank: 3 },
          { suit: 1, rank: 8 },
          { suit: 2, rank: 11 },
          { suit: 2, rank: 13 },
          { suit: 2, rank: 14 },
          { suit: 3, rank: 5 },
          { suit: 3, rank: 6 },
          { suit: 3, rank: 9 },
          { suit: 3, rank: 14 },
        ]"
      ></game-bidding-hand>
    </game-bidding-container>

    <game-bidding-container wrapperClass="h-full w-[24%]" header="BUDGIVNING">
      <game-bidding-history
        :history="history"
        wrapperClass="w-full h-[90%]"
      ></game-bidding-history>
    </game-bidding-container>

    <game-bidding-container wrapperClass="h-full w-[24%]" header="BUDLÅDA">
      <game-bidding-box
        wrapperClass="w-full h-[90%]"
        v-model:suit="suit"
        v-model:rank="rank"
        @bid="bid"
      />
    </game-bidding-container>
  </div>
</template>
