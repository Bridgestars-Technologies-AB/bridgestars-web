<script setup lang="ts">
/*
This component displays the analysis from bidding-practice.
Props:
  history: List of {suit, rank}, comes from bidding-box in bidding-practice
  correct bid: {suit, rank}, the correct bid in the scenario
  biddingAnswer: String, the answer to why the correct bid is correct
  biddinghands: List of {suit, rank}, the hands of the players
*/

defineProps({
  history: {
    type: Array[CardUtil.Card],
  },
  correctBid: {
    type: CardUtil.Card,
    default: { suit: 4, rank: 3 },
  },
  biddingAnswer: {
    type: String,
    default:
      "Nord had 17hp och en jämn hand. Därför öppnar nord med 1NT som visar 15-17 hp och jämn hand. Syd fortsätter med 3NT som visar slutbud 10-15 hp.",
  },
  biddingHand: {
    type: Array[CardUtil.Card],
  },
});

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
    class="h-[100%] w-[100%] flex flex-col bg-dash-dark-100 lg:w-[1000px] lg:h-[500px]"
  >
    <div
      class="w-full flex flex-col justify-center items-center h-[6%] lg:items-start lg:h-[10%]"
    >
      <div class="w-full flex flex-row justify-between my-[2px]">
        <span class="header flex-grow-1 mx-[10px]"> Analys </span>
        <div class="rounded-xl bg-dash-dark-200 mx-[10px]">
          <span class="header flex-grow-1 p-[3px]">Nästa giv</span>
        </div>
      </div>

      <div class="w-full h-[2px] bg-dash-dark-400"></div>
    </div>

    <!-- Here comes div for all boxes -->
    <div class="flex flex-col h-[90%] lg-flex lg:flex-row lg:w-full">
      <!-- First container -->
      <div
        class="w-full h-[30%] bg-dash-dark-100 flex flex-col space-y-2 items-center justify-center lg:justify-around lg:w-1/3 lg:h-full"
      >
        <div class="flex justify-center items-center w-full lg:h-[30%]">
          <game-bidding-hand
            :showDeal="false"
            wrapperClass="w-full lg:h-full lg:w-[70%]"
          ></game-bidding-hand>
        </div>

        <div class="flex flex-row justify-center items-center">
          <div
            class="flex items-center justify-center bg-[#075B0E] w-[100px] h-[100px] rounded-xl"
          >
            <div class="flex flex-col w-[90%] h-[90%]">
              <div class="w-full h-1/3 flex justify-center items-start">
                <span class="text1 !text-white">N</span>
              </div>
              <div
                class="flex flex-row w-full h-1/3 justify-between items-center"
              >
                <span class="text1 !text-white">W</span>
                <span class="text1 !text-white">E</span>
              </div>
              <div class="w-full h-1/3 flex justify-center items-end">
                <span class="text1 !text-white">S</span>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-center items-center w-full lg:h-[30%]">
          <game-bidding-hand
            :showDeal="false"
            wrapperClass="w-full lg:h-full lg:w-[70%]"
          ></game-bidding-hand>
        </div>
      </div>

      <!-- Line -->
      <div
        class="w-[90%] h-[2px] bg-dash-dark-400 self-center lg:h-[95%] lg:w-[2px]"
      ></div>

      <!-- Second container -->
      <div
        class="w-full h-[40%] bg-dash-dark-100 flex flex-col items-center justify-center space-y-1 lg:w-1/3 lg:h-full"
      >
        <div class="w-full flex flex-row justify-center h-[10%] lg:h-[5%]">
          <span class="header"> Budgivning </span>
        </div>

        <div class="h-[95%] w-full flex flex-col justify-center items-center">
          <game-bidding-history
            :history="[{ suit: 1, rank: 1 }]"
            wrapperClass="w-full h-[70%]"
          ></game-bidding-history>

          <div class="flex justify-center items-center h-[20%] lg:w-[80%]">
            <game-analysis-bid
              :brick="correctBid"
              dir="Nord"
              size="w-[70px] h-[40px] lg:w-[120px] lg:h-[60px]"
            ></game-analysis-bid>
          </div>
        </div>
      </div>

      <!-- Line -->
      <div
        class="w-[90%] h-[2px] bg-dash-dark-400 self-center mb-[5px] lg:h-[95%] lg:w-[2px]"
      ></div>

      <!-- Third container -->
      <div
        class="w-full h-[30%] bg-dash-dark-100 flex flex-col items-center lg:justify-center lg:h-full lg:w-1/3"
      >
        <div
          class="w-full h-[10%] flex flex-row justify-center mb-[8px] lg:mb-[10px] lg:h-[5%]"
        >
          <span class="header"> Korrekt Slutbud </span>
        </div>

        <div class="w-full h-[95%] flex flex-col items-center">
          <game-analysis-bid
            :brick="correctBid"
            dir="Nord"
            size="w-[60px] h-[30px] lg:w-[80px] lg:h-[40px]"
          ></game-analysis-bid>
          <!-- Placeholder for star img -->
          <div class="w-auto h-[35px] sm:h-[60px] flex flex-row mb-[3px]">
            <div
              v-for="e in 3"
              :key="e"
              :class="`flex flex-col h-full ${getJustify(e)}`"
            >
              <NuxtImg
                src="/bridgestars/game/star.png"
                alt="star"
                class="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px]"
              />
            </div>
          </div>

          <!-- Line -->
          <div class="w-[85%] h-[2px] bg-dash-dark-400 mb-[2px]"></div>

          <div class="w-full flex flex-row justify-center">
            <div class="w-[95%]">
              <span
                class="text1 leading-tight text-[16px] sm:text-[19px] md:text-[18px]"
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
  @apply text-white text-[20px] items-center font-semibold h-auto;
}
</style>
