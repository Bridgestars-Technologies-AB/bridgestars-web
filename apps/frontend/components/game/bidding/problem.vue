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
  handsVisible: {
    type: Number,
    default: 2,
  },
  player: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["makeBid"]);

const leadingBid = computed(() => {
  const withoutPass = props.history?.filter((bid) => !bid.is("PASS"));
  const leading = withoutPass && withoutPass[withoutPass?.length - 1];
  console.log(leading);
  return leading || new Bid(0, 0);
});

function makeBid(bid: Bid) {
  emit("makeBid", bid);
  // This is commented out because we dont use the bidding box in this way for bidding-problems
  // historyRef.value.push({ suit: s, rank: r });
}

const biddingBlockClass = "w-[43px] h-[30px]";
</script>
<template>
  <!-- <div class="w-[90%] h-[80px] border mb-[20px]"></div> -->
  <div class="w-full flex flex-row flex-wrap justify-center">
    <div class="container">
      <game-bidding-container :showImage="true" class="h-full">
        <div
          class="w-full h-full flex flex-row justify-center items-start mt-5 px-5"
        >
          <span class="text3 text-dark dark:text-white sm:text-[20px]">
            {{ presentationText }}</span
          >
        </div>
      </game-bidding-container>
    </div>

    <div class="container">
      <game-bidding-container class="h-full" header="BUDGIVNING">
        <game-bidding-history
          class="w-full h-full lg:w-full lg:h-[90%]"
          :history="history"
          :biddingBox="biddingBlockClass"
        ></game-bidding-history>
      </game-bidding-container>
    </div>

    <div class="container">
      <game-bidding-container class="h-full" header="BUDLÅDA">
        <game-bidding-box
          class="w-full lg:w-full lg:h-[70%]"
          :leadingBid="leadingBid"
          :history="history"
          @makeBid="makeBid"
        />
      </game-bidding-container>
    </div>

    <div class="container">
      <game-bidding-container class="h-full" header="DIN HAND">
        <game-bidding-showHands
          :handsVisible="handsVisible"
          :hands="hands"
          :player="player"
        >
        </game-bidding-showHands>
      </game-bidding-container>
    </div>
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
  @apply h-1/4 md:h-[450px] w-full md:w-1/2 lg:w-1/4 p-0.5;
}
div {
  @apply transition-colors duration-300;
}
</style>

<!--   sm:w-[100%]  max-w-[1000px] 
  sm:h-[400px] max-h-[500px] -->
