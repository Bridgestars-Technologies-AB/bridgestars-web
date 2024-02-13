<script setup lang="ts">
import { Bid } from "~/composables/biddingClasses/Bid";
import { Hand } from "~/composables/biddingClasses/Hand";

/*
This component displays the analysis from bidding-problems.
Props:
  history: List of {suit, rank}, comes from bidding-box in bidding-problems
  solution: {suit, rank}, the correct bid in the scenario
  biddingAnswer: String, the answer to why the soultion bid is correct
  biddinghands: List of {suit, rank}, the hands of the players
*/

interface Props {
  biddingResult: Array<Bid>;
  hands: Array<Hand>;
  solution: Bid;
  biddingAnswer: string;
  player: string;
  nextProblemId: string;
  handsVisible: number;
}

const p = defineProps<Props>();

console.log(p.solution);

function getJustify(e: Number) {
  switch (e) {
    case 1:
      return "justify-end";
    case 2:
      return "justify-start";
    case 3:
      return "justify-end";
    default:
      return "";
  }
}
</script>
<template>
  <div
    class="h-[100%] w-[100%] flex flex-col bg-dark-100 lg:w-[1000px] lg:h-[500px]"
  >
    <div
      class="w-full flex flex-col justify-center items-center h-[6%] lg:items-start lg:h-[10%]"
    >
      <div class="w-full flex flex-row justify-between items-center my-[2px]">
        <span class="header flex-grow-1 mx-[10px]"> Analys </span>
        <div
          class="rounded-xl bg-dark-200 mx-[10px] flex items-center justify-center"
        >
          <button
            class="header p-[9px]"
            @click="
              navigateTo({
                name: `dash-bidding-problems-id`,
                params: { id: nextProblemId },
              })
            "
          >
            Nästa giv
          </button>
        </div>
      </div>

      <div class="w-full h-[2px] bg-dark-400"></div>
    </div>

    <!-- Here comes div for all boxes -->
    <div class="flex flex-col h-[90%] lg-flex lg:flex-row lg:w-full">
      <!-- First container -->
      <div class="bg-dark-100 w-1/3 h-full flex flex-col justify-center">
        <div class="w-full flex justify-center items-center">
          <span v-if="handsVisible === 1" class="header">Din hand</span>
        </div>

        <game-bidding-showHands
          :handsVisible="handsVisible"
          :hands="hands"
          :player="player"
        >
        </game-bidding-showHands>
      </div>

      <!-- Line -->
      <div
        class="w-[90%] h-[2px] bg-dark-400 self-center lg:h-[95%] lg:w-[2px]"
      ></div>

      <!-- Second container -->
      <div
        class="w-full h-[40%] bg-dark-100 flex flex-col items-center justify-center space-y-1 lg:w-1/3 lg:h-full"
      >
        <div class="w-full flex flex-row justify-center h-[10%] lg:h-[5%]">
          <span class="header"> Budgivning </span>
        </div>

        <div class="h-[95%] w-full flex flex-col justify-center items-center">
          <game-bidding-history
            :history="biddingResult"
            class="w-full h-[70%]"
            biddingBox="w-[50px] h-[30px] hover:bg-transparent  sm:w-[55px] sm:h-[30px] md:w-[65px] md:h-[30px] lg:w-[45px] lg:h-[30px] xl:w-[50px] xl:h-[35px] 2xl:w-[60px] 2xl:h-[40px]"
          ></game-bidding-history>

          <div class="flex justify-center items-center h-[20%] lg:w-[80%]">
            <game-analysis-bid
              :bid="solution"
              :player="player"
              size="w-[70px] h-[40px] lg:w-[120px] lg:h-[60px]"
            ></game-analysis-bid>
          </div>
        </div>
      </div>

      <!-- Line -->
      <div
        class="w-[90%] h-[2px] bg-dark-400 self-center mb-[5px] lg:h-[95%] lg:w-[2px]"
      ></div>

      <!-- Third container -->
      <div
        class="w-full h-[30%] bg-dark-100 flex flex-col items-center lg:justify-center lg:h-full lg:w-1/3"
      >
        <div
          class="w-full h-[10%] flex flex-row justify-center mb-[8px] lg:mb-[10px] lg:h-[5%]"
        >
          <span class="header"> Korrekt Slutbud </span>
        </div>

        <div class="w-full h-[95%] flex flex-col items-center">
          <game-analysis-bid
            :bid="solution"
            :player="player"
            size="w-[90px] h-[50px]"
          ></game-analysis-bid>
          <!-- Placeholder for star img -->
          <div
            class="w-auto h-[35px] sm:h-[60px] flex flex-row mb-[3px] mt-[5px]"
          >
            <div
              v-for="e in 3"
              :key="e"
              :class="`flex flex-col h-full ${getJustify(e)}`"
            >
              <img
                src="/bridgestars/game/star.png"
                alt="star"
                class="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px]"
              />
            </div>
          </div>

          <!-- Line -->
          <div class="w-[90%] h-[2px] bg-dark-400 mb-[2px] mt-[5px]"></div>

          <div class="w-full flex flex-row justify-center">
            <div class="w-[95%] ml-[10px]">
              <span
                class="text1 !text-[#FFFEFA] leading-tight text-[16px] tracking-wide sm:text-[19px] md:text-[18px]"
                >{{ biddingAnswer }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header {
  @apply text-white text-[24px] items-center font-semibold h-auto;
}
</style>
