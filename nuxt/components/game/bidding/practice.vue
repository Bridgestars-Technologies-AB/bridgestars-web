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

const biddingBox =
  "w-[50px] h-[30px] bg-dash-dark-200 hover:bg-transparent  sm:w-[55px] sm:h-[30px] lg:w-[43px] lg:h-[30px]";
</script>
<template>
  <!-- <div class="w-[90%] h-[80px] border mb-[20px]"></div> -->
  <div class="mobileSize desktopSize">
    <game-bidding-container
      :showImage="true"
      wrapperClass="w-[80%] h-[10%] min-h-[70px] rounded-xl mt-[8px] lg:h-full lg:w-[24%]"
    >
      <game-bidding-text
        text="Vad bjuder du som svarshand när din partner har öppnat med 1 NT?"
      ></game-bidding-text>
    </game-bidding-container>

    <game-bidding-container
      wrapperClass="w-[80%] h-[40%] rounded-xl mt-[8px] lg:h-full lg:w-[24%]"
      header="BUDGIVNING"
    >
      <game-bidding-history
        :history="history"
        wrapperClass="w-full h-full lg:w-full lg:h-[70%]"
        :biddingBox="biddingBox"
      ></game-bidding-history>
    </game-bidding-container>

    <game-bidding-container
      wrapperClass="min-h-[150px] w-[80%] h-[30%] mt-[8px] rounded-xl lg:h-full lg:w-[24%]"
      header="BUDLÅDA"
    >
      <game-bidding-box
        v-model:suit="suit"
        v-model:rank="rank"
        class="w-full lg:w-full lg:h-[70%]"
        :biddingBox="biddingBox"
        @bid="bid"
      />
    </game-bidding-container>

    <game-bidding-container
      wrapperClass="w-[80%] h-[10%] rounded-xl mt-[8px] lg:h-full lg:w-[24%]"
      header="DIN HAND"
    >
      <game-bidding-hand
        wrapperClass="bg-[#121c27] w-full lg:w-full lg:h-[70%]"
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
</template>

<style scoped>
/* Size for the bidding-container used in bidding-practice  h-full w-[24%];*/
.biddingContainer {
  @apply w-[80%] h-[10%] rounded-xl mt-[8px] lg:h-full lg:w-[24%];
}

/* Size for all bidding-components used in bidding-practice */
.biddingComponent {
  @apply w-full lg:w-full lg:h-[70%];
}

.mobileSize {
  @apply flex flex-col h-[100%] w-[100%] items-center;
}

.desktopSize {
  @apply lg:flex-row lg:space-x-1 lg:justify-center
  lg:w-[100%]  lg:max-w-[1000px] 
  lg:h-[400px] lg:max-h-[500px];

  /* @apply sm:h-[100%] sm:w-[100%] lg:h-[400px] lg:w-[1000px] lg:flex-row lg:space-x-1 lg:justify-center  xl:w-[1200px] xl:h-[450px] 2xl:w-[1400px] 2xl:h-[500px]; */
}
</style>

<!--   sm:w-[100%]  max-w-[1000px] 
  sm:h-[400px] max-h-[500px] -->
