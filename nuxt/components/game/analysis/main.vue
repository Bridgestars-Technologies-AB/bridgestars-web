<script setup>
defineProps({
  history: {
    type: Array[CardUtil.Card],
    required: true,
  },
  correctBid: {
    type: CardUtil.Card,
    default: { suit: 4, rank: 3 },
  },
  biddingAnswer: {
    type: String,
    default:
      "Nord had 17hp och en jämn hand. Därför öppnar nord med 1NT som visar 15-17 hp och jämn hand.",
  },
});
</script>
<template>
  <div
    class="h-[100%] w-[100%] flex flex-col bg-dash-dark-100 lg:w-[1000px] lg:h-[500px]"
  >
    <div class="w-full flex flex-col justify-center items-center h-[10%]">
      <span class="header flex-grow-1"> Analys </span>
      <div class="w-[90%] h-[2px] bg-dash-dark-400 self-center mb-[5px]"></div>
    </div>

    <!-- Here comes div for all boxes -->
    <div class="flex flex-col h-[90%] lg-flex lg:flex-row lg:w-full">
      <!-- First container -->
      <div
        class="w-full bg-dash-dark-100 flex flex-col space-y-2 justify-around items-center lg:w-1/3 lg:h-full"
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
                <span class="player">N</span>
              </div>
              <div
                class="flex flex-row w-full h-1/3 justify-between items-center"
              >
                <span class="player">W</span> <span class="player">E</span>
              </div>
              <div class="w-full h-1/3 flex justify-center items-end">
                <span class="player">S</span>
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
        class="w-[90%] h-[2px] bg-dash-dark-400 self-center mb-[5px] lg:h-[95%] lg:w-[2px]"
      ></div>

      <!-- Second container -->
      <div
        class="h-full bg-dash-dark-100 flex flex-col items-center lg:justify-around lg:w-1/3"
      >
        <div class="w-full flex flex-row justify-center">
          <span class="text-white text-[20px] header"> Budgivning </span>
        </div>

        <game-bidding-history
          :history="[{ suit: 1, rank: 1 }]"
          wrapperClass="w-full h-[45%]"
        ></game-bidding-history>

        <div class="flex justify-center items-center h-[30%] lg:w-[80%]">
          <game-analysis-bid :brick="correctBid" dir="Nord"></game-analysis-bid>
        </div>
      </div>

      <!-- Line -->
      <div
        class="w-[90%] h-[2px] bg-dash-dark-400 self-center mb-[5px] lg:h-[95%] lg:w-[2px]"
      ></div>

      <!-- Third container -->
      <div
        class="w-full h-full bg-dash-dark-100 flex flex-col items-center lg:w-1/3"
      >
        <div
          class="flex flex-col w-full items-center lg:justify-around lg:h-1/2 lg:w-full"
        >
          <div class="w-full flex flex-row justify-center">
            <span class="text-white text-[20px] header"> Korrekt Slutbud </span>
          </div>

          <div class="flex justify-center items-center lg:h-[30%] lg:w-[80%]">
            <game-analysis-bid
              :brick="correctBid"
              dir="Nord"
            ></game-analysis-bid>
          </div>
          <!-- Placeholder for star img -->
          <div class="lg:w-[80%] lg:h-[40%]"></div>

          <!-- Line -->
          <div class="w-[90%] h-[2px] bg-dash-dark-400"></div>
        </div>
        <div class="w-full lg:h-1/2">
          <div class="w-full flex flex-row justify-center">
            <span class="text1 text-[17px] text-center">{{
              biddingAnswer
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.player {
  @apply text1 !text-white;
}

.header {
  @apply text-[22px] items-center text-white font-semibold h-auto;
}
</style>
