<!-- This component is the parent to all bid-components, keeps track of cards, bids, etc, -->
<!-- Right now {suit:10, rank: 10} represents invisible bid, but this will have to be changed later.
It is supposed to be used when there is not a bid for a certain player -->
<!-- The history prop is the play history of the bidding-problem -->
<script setup lang="ts">
import { Bid } from "~/composables/biddingClasses/Bid";
import { Hand } from "~/composables/biddingClasses/Hand";
// initialize components based on data attribute selectors
onMounted(() => {});

const props = defineProps({
  presentationText: String,
  hands: {
    type: Array<Hand>,
    required: true,
  },
  history: {
    type: Array<Bid>,
  },
  handsVisable: {
    type: Number,
    default: 2,
  },
  player: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["check", "update:bid"]);

const bid = ref(
  props.history && props.history.length > 0
    ? props.history[props.history.length - 1]
    : new Bid(0, 0),
);
console.log(bid.value);

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
  <div class="flex flex-row space-x-1 justify-center w-[1100px] h-[450px]">
    <game-bidding-container :showImage="true" class="container">
      <div class="w-full h-full flex flex-row justify-start">
        <span class="text3 text-dark dark:text-white sm:text-[20px] ml-[12px]">
          {{ presentationText }}</span
        >
      </div>
    </game-bidding-container>

    <game-bidding-container class="container" header="BUDGIVNING">
      <game-bidding-history
        :history="history"
        class="w-full h-full lg:w-full lg:h-[70%]"
        :biddingBox="biddingBox"
      ></game-bidding-history>
    </game-bidding-container>

    <game-bidding-container class="container" header="BUDLÅDA">
      <game-bidding-box
        v-model:bid="bid"
        class="w-full lg:w-full lg:h-[70%]"
        :biddingBox="biddingBox"
        @bid="makeBid"
      />
    </game-bidding-container>

    <game-bidding-container class="container" header="DIN HAND">
      <game-bidding-showHands
        :handsVisable="handsVisable"
        :hands="hands"
        :player="player"
      >
      </game-bidding-showHands>
    </game-bidding-container>
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

.container {
  @apply h-full w-[33%];
}
</style>

<!--   sm:w-[100%]  max-w-[1000px] 
  sm:h-[400px] max-h-[500px] -->
