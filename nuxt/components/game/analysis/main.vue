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
  <div class="h-[100%] w-[100%] flex flex-col bg-dash-dark-100 lg:flex-row">
    <div class="w-full h-[5%] flex flex-row justify-center items-center">
      <span class="header"> Analys </span>
    </div>
    <div class="w-[90%] h-[2px] bg-dash-dark-400 self-center mb-[5px]"></div>

    <div class="flex justify-center items-center w-full h-[5%]">
      <game-bidding-hand
        :showDeal="false"
        wrapperClass="w-full"
      ></game-bidding-hand>
    </div>

    <div class="flex flex-row justify-center">
      <div
        class="flex items-center justify-center bg-[#075B0E] w-[100px] h-[100px] rounded-xl"
      >
        <div class="flex flex-col w-[90%] h-[90%]">
          <div class="w-full h-1/3 flex justify-center items-start">
            <span class="player">N</span>
          </div>
          <div class="flex flex-row w-full h-1/3 justify-between items-center">
            <span class="player">W</span> <span class="player">E</span>
          </div>
          <div class="w-full h-1/3 flex justify-center items-end">
            <span class="player">S</span>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-center items-center w-full h-[5%]">
      <game-bidding-hand
        :showDeal="false"
        wrapperClass="w-full"
      ></game-bidding-hand>
    </div>

    <div class="w-[90%] h-[2px] bg-dash-dark-400 self-center mb-[5px]"></div>

    <div class="w-full h-[5%] flex flex-row justify-center items-center">
      <span class="header"> Budgivning </span>
    </div>

    <game-bidding-history
      :history="[{ suit: 1, rank: 1 }]"
      wrapperClass="w-full h-[25%]"
    ></game-bidding-history>

    <div class="w-[90%] h-[2px] bg-dash-dark-400 self-center mb-[5px]"></div>

    <div class="w-full h-[5%] flex flex-row justify-center">
      <span class="header"> Korrekt Slutbud </span>
    </div>
    <div class="flex flex-row justify-center mt-[5px]">
      <div
        class="w-[80px] h-[40px] bg-dash-dark-200 flex justify-center items-center rounded-xl"
      >
        <div>
          <span class="biddingText1 text1 tracking-[2px] mr-[2px]">{{
            correctBid.rank
          }}</span>
          <span
            :class="`tracking-[2px] text1 ${
              correctBid.suit > 3 ? 'biddingText3' : 'biddingText2'
            } ${CardUtil.symbols[correctBid.suit].color}`"
            >{{ CardUtil.symbols[correctBid.suit].symbol }}</span
          >
        </div>
      </div>
      <div
        class="w-[80px] h-[40px] bg-dash-dark-200 flex justify-center items-center rounded-xl ml-[5px]"
      >
        <span class="biddingText1 text1 tracking-[2px]">Nord</span>
      </div>
    </div>
    <div class="w-[90%] h-[2px] bg-dash-dark-400 self-center mt-[10px]"></div>
    <div class="w-full flex flex-row justify-center">
      <span class="text1 text-[17px] text-center">{{ biddingAnswer }}</span>
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

.biddingText1 {
  @apply text-white text-[25px] sm:text-[20px] lg:text-[15px] xl:text-[20px];
}

.biddingText2 {
  @apply text-white text-[40px] sm:text-[25px] lg:text-[20px] xl:text-[26px];
}

.biddingText3 {
  @apply text-white text-[25px] sm:text-[17px] lg:text-[15px] xl:text-[18px];
}
</style>
