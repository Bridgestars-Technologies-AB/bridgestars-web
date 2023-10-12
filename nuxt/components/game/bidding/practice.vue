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
  <div
    class="flex flex-col items-center w-full h-[100%] justify-between border"
  >
    <!-- <div class="w-[90%] h-[80px] border mb-[20px]"></div> -->
    <div class="mobileSize desktopSize">
      <game-bidding-container :showImage="true" wrapperClass="biddingContainer">
        <game-bidding-text
          text="Vad bjuder du som svarshand när din partner har öppnat med 1 NT?"
        ></game-bidding-text>
      </game-bidding-container>

      <game-bidding-container
        wrapperClass="w-[80%] h-[40%] rounded-xl mt-[8px] lm:h-full lm:w-[24%]"
        header="BUDGIVNING"
      >
        <game-bidding-history
          :history="history"
          wrapperClass="w-full h-full lm:w-full lm:h-[70%]"
        ></game-bidding-history>
      </game-bidding-container>

      <game-bidding-container
        wrapperClass="w-[80%] h-[20%] mt-[8px] rounded-xl lm:h-full lm:w-[24%]"
        header="BUDLÅDA"
      >
        <game-bidding-box
          v-model:suit="suit"
          v-model:rank="rank"
          wrapperClass="w-full lm:w-full lm:h-[70%]"
          @bid="bid"
        />
      </game-bidding-container>

      <game-bidding-container
        wrapperClass="w-[80%] h-[10%] rounded-xl mt-[8px] lm:h-full lm:w-[24%]"
        header="DIN HAND"
      >
        <game-bidding-hand
          wrapperClass="w-full lm:w-full lm:h-[70%]"
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
    </div>
  </div>
</template>

<style scoped>
/* Size for the bidding-container used in bidding-practice  h-full w-[24%];*/
.biddingContainer {
  @apply w-[80%] h-[10%] rounded-xl mt-[8px] lm:h-full lm:w-[24%];
}

/* Size for all bidding-components used in bidding-practice */
.biddingComponent {
  @apply w-full lm:w-full lm:h-[70%];
}

.mobileSize {
  @apply flex flex-col h-[100%] w-[100%] items-center;
}

.desktopSize {
  @apply lm:flex-row lm:space-x-1 lm:h-[70%] lm:w-[100%] lm:justify-center;
}
</style>
