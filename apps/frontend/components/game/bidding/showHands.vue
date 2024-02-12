<script setup lang="ts">
import { Hand } from "~/composables/biddingClasses/Hand";
interface Props {
  hands: Array<Hand>;
  nbrOfHands: number;
}

defineProps<Props>();

//temporary to test ui for different number of hands
const nbr = ref(2);
</script>

<template>
  <div v-if="nbr > 1" :class="`${$attrs.class} space-y-3`">
    <div class="flex w-full justify-center items-center">
      <game-bidding-hand
        :class="`${nbr >= 1 ? '' : 'invisible'}`"
        :showDeal="false"
        :hand="hands[0]"
      ></game-bidding-hand>
    </div>

    <div class="flex flex-row space-x-3 items-center justify-center">
      <game-bidding-hand
        :class="`${nbr >= 2 ? '' : 'invisible'}`"
        :showDeal="false"
        :hand="hands[0]"
      ></game-bidding-hand>

      <div
        class="flex items-center justify-center bg-[#075B0E] w-[80px] h-[80px] rounded-xl"
      >
        <div class="flex flex-col w-[90%] h-[90%]">
          <div class="w-full h-1/3 flex justify-center items-start">
            <span class="text-white font-bold">N</span>
          </div>
          <div class="flex flex-row w-full h-1/3 justify-between items-center">
            <span class="text-white font-bold">W</span>
            <span class="text-white font-bold">E</span>
          </div>
          <div class="w-full h-1/3 flex justify-center items-end">
            <span class="text-white font-bold">S</span>
          </div>
        </div>
      </div>

      <game-bidding-hand
        :class="`${nbr >= 3 ? '' : 'invisible'}`"
        :showDeal="false"
        :hand="hands[0]"
      ></game-bidding-hand>
    </div>

    <div class="flex justify-center items-center">
      <game-bidding-hand
        :class="`${nbr >= 4 ? '' : 'invisible'}`"
        :showDeal="false"
        :hand="hands[0]"
      ></game-bidding-hand>
    </div>
  </div>
  <game-bidding-hand v-else :showDeal="false" :hand="hands[0]">
  </game-bidding-hand>
</template>
