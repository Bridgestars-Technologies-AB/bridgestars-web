<script setup lang="ts">
import { Hand } from "~/composables/biddingClasses/Hand";

const p = defineProps({
  hands: {
    type: Array<Hand>,
    required: true,
  },
  handsVisable: Number,
  player: {
    type: String,
    required: true,
  },
});

const suitNames = ["spades", "hearts", "diamonds", "clubs"];

//function used to get the hand of a certain player
function getHand(player: string = ""): Hand {
  const hand = p.hands.find((hand) => hand.player === player);
  if (hand && player !== "") {
    return hand;
  } else {
    // if no hand is found, return first hand of the list
    return p.hands[0];
  }
}

function getPartner(player: string): string {
  switch (player) {
    case "N":
      return "S";
    case "S":
      return "N";
    case "E":
      return "W";
    case "W":
      return "E";
    default:
      return "N";
  }
}

//function returning if a certain players hand is visible
function showHand(player: string): boolean {
  console.log(player, visiblePlayers());
  return visiblePlayers().includes(player);
}

// function returning which players hands are visible
function visiblePlayers(): string[] {
  if (p.handsVisable === 1) {
    return [p.player];
  } else if (p.handsVisable === 2) {
    return [p.player, getPartner(p.player)];
  } else {
    return ["N", "E", "S", "W"];
  }
}

//temporary to test ui for different number of hands
const nbr = ref(1);
</script>

<template>
  <div v-if="nbr > 1" :class="`space-y-3`">
    <div class="flex w-full justify-center items-center">
      <game-bidding-hand
        :class="`${showHand('N') ? '' : 'invisible'}`"
        :showDeal="false"
        :hand="getHand('N')"
      ></game-bidding-hand>
    </div>

    <div class="flex flex-row space-x-3 items-center justify-center">
      <game-bidding-hand
        :class="`${showHand('W') ? '' : 'invisible'}`"
        :showDeal="false"
        :hand="getHand('W')"
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
        :class="`${showHand('E') ? '' : 'invisible'}`"
        :showDeal="false"
        :hand="getHand('E')"
      ></game-bidding-hand>
    </div>

    <div class="flex justify-center items-center">
      <game-bidding-hand
        :class="`${showHand('S') ? '' : 'invisible'}`"
        :showDeal="false"
        :hand="getHand('S')"
      ></game-bidding-hand>
    </div>
  </div>
  <div v-else :class="`flex flex-row h-full ml-7 items-center`">
    <div :class="`flex flex-col items-start`">
      <div v-for="index in 4" :key="index" class="flex flex-row items-center">
        <span
          :class="`mr-[3px] text-[30px] ${Card.suitsToTailwind.get(index - 1)}`"
        >
        </span>
        <span
          class="text-[28px] font-semibold text-dark dark:text-white tracking-[1px]"
          >{{ getHand().toString(suitNames[index - 1]) }}
        </span>
      </div>
    </div>
  </div>
</template>
