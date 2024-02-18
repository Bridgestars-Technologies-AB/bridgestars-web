<script setup lang="ts">
import { Bid } from "~/composables/biddingClasses/Bid";

const { leadingBid } = defineProps({
  leadingBid: {
    type: Bid,
    required: true,
  },
  biddingBlockClass: String,
  history: {
    type: Array<Bid>,
    default: () => [new Bid(0, 0)],
  },
});
const emit = defineEmits(["makeBid"]);

function makeBid(bid: Bid) {
  emit("makeBid", bid);
}

const rank = ref(1);

const biddingArray = ref([1, 2, 3, 4, 5, 6, 7]);
</script>
<template>
  <div
    class="lg:hidden w-full h-full flex flex-col justify-center items-center"
  >
    <div class="flex flex-row items-center">
      <div
        v-for="e in biddingArray"
        :key="e"
        :class="`cursor-pointer rounded-t-[8px] bg-dark-100 border-t border-x border-light-100 w-[45px] h-[40px] sm:w-[50px] sm:h-[45px] flex justify-center items-center ${
          rank === e ? 'z-[0.9] mb-[-1px]' : 'bg-dark-200 mb-[-8px] z-[0.8]'
        }`"
        @click="rank = e"
      >
        <button class="text1 text-[18px] text-white" @click="rank = e">
          {{ e }}
        </button>
      </div>
    </div>
    <div
      class="border-light-100 bg-dark-100 border z-[0.8] rounded-[6px] px-7 sm:px-[40px] pt-2 pb-2"
    >
      <div class="flex flex-row space-x-[3px]">
        <div v-for="e in 5" :key="e">
          <game-bidding-block
            :bid="new Bid(e - 1, rank)"
            :size="biddingBlockClass"
            :leadingBid="leadingBid"
            @click="makeBid"
          ></game-bidding-block>
        </div>
      </div>
    </div>
    <game-bidding-block
      class="mt-[10px]"
      :card="{ suit: 0, rank: 0 }"
      :size="biddingBlockClass"
      @click="makeBid"
    ></game-bidding-block>
  </div>
</template>
