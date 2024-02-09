<!-- This component is the parent to all bid-components, keeps track of cards, bids, etc, -->
<!-- Right now {suit:10, rank: 10} represents invisible bid, but this will have to be changed later.
It is supposed to be used when there is not a bid for a certain player -->
<!-- The history prop is the play history of the bidding-problem -->
<script setup lang="ts">
import { Bid } from "~/composables/biddingClasses/Bid";
// initialize components based on data attribute selectors
onMounted(() => {});

defineProps({
  presentationText: String,
  history: {
    type: Array,
  },
});

const emit = defineEmits(["check", "update:bid"]);

const bid = ref(new Bid(0, 0));

function makeBid(bid: Bid) {
  emit("update:bid", bid);
  emit("check", bid);
  // This is commented out because we dont use the bidding box in this way for bidding-problems
  //historyRef.value.push({ suit: s, rank: r });
}

const biddingBox =
  "xs:w-[50px] xs:h-[28px] bg-color-dark dark:bg-dark-200 hover:bg-transparent lg:w-[43px] lg:h-[30px]";
</script>
<template>
  <!-- <div class="w-[90%] h-[80px] border mb-[20px]"></div> -->
  <div class="mobileSize desktopSize">
    <game-bidding-container
      :showImage="true"
      class="xs:w-[100%] sm:w-[80%] h-[10%] min-h-[70px] rounded-xl mt-[8px] lg:h-full lg:w-[24%]"
    >
      <div class="w-full h-full flex flex-row justify-start">
        <span class="text3 text-dark dark:text-white sm:text-[20px] ml-[12px]">
          {{ presentationText }}</span
        >
      </div>
    </game-bidding-container>

    <game-bidding-container
      class="xs:w-[100%] sm:w-[80%] h-[40%] rounded-xl mt-[8px] lg:h-full lg:w-[24%]"
      header="BUDGIVNING"
    >
      <game-bidding-history
        :history="history"
        class="w-full h-full lg:w-full lg:h-[70%]"
        :biddingBox="biddingBox"
      ></game-bidding-history>
    </game-bidding-container>

    <game-bidding-container
      class="min-h-[150px] xs:w-[100%] sm:w-[80%] h-[30%] mt-[8px] rounded-xl lg:h-full lg:w-[24%]"
      header="BUDLÅDA"
    >
      <game-bidding-box
        v-model:bid="bid"
        class="w-full lg:w-full lg:h-[70%]"
        :biddingBox="biddingBox"
        @bid="makeBid"
      />
    </game-bidding-container>

    <!-- temporarily disabled for testing -->
    <!-- <game-bidding-container
      class="xs:w-[100%] sm:w-[80%] h-[12%] rounded-xl mt-[8px] lg:h-full lg:w-[24%]"
      header="DIN HAND"
    >
      <game-bidding-hand
        class="bg-white dark:bg-dark-100 w-full mx-auto lg:w-full lg:h-[70%]"
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
    </game-bidding-container> -->
  </div>
</template>

<style scoped>
/* Size for the bidding-container used in bidding-problems  h-full w-[24%];*/
/* .biddingContainer { */
/*   @apply w-[80%] h-[10%] rounded-xl mt-[8px] lg:h-full lg:w-[24%]; */
/* } */

/* Size for all bidding-components used in bidding-problems */
/* .biddingComponent { */
/*   @apply w-full lg:w-full lg:h-[70%]; */
/* } */

.mobileSize {
  @apply flex flex-col h-[100%] w-[100%] items-center;
}

.desktopSize {
  @apply lg:flex-row lg:space-x-1 lg:justify-center
  lg:w-[100%]  lg:max-w-[1000px] 
  lg:h-[450px] lg:max-h-[500px];

  /* @apply sm:h-[100%] sm:w-[100%] lg:h-[400px] lg:w-[1000px] lg:flex-row lg:space-x-1 lg:justify-center  xl:w-[1200px] xl:h-[450px] 2xl:w-[1400px] 2xl:h-[500px]; */
}
</style>

<!--   sm:w-[100%]  max-w-[1000px] 
  sm:h-[400px] max-h-[500px] -->
