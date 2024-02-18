<script setup lang="ts">
import { Hand } from "~/composables/biddingClasses/Hand";

const p = defineProps({
  hands: {
    type: Array<Hand>,
    required: true,
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
  return visiblePlayers().includes(player);
}

// function returning which players hands are visible
function visiblePlayers(): string[] {
  if (p.handsVisible === 1) {
    return [p.player];
  } else if (p.handsVisible === 2) {
    return [p.player, getPartner(p.player)];
  } else {
    return ["N", "E", "S", "W"];
  }
}

//temporary to test ui for different number of hands
const nbr = ref(2);
</script>

<template>
  <!--  FOUR HANDS   -->
  <div v-if="nbr == 4" :class="`space-y-3`">
    <div class="flex w-full justify-center items-center">
      <game-bidding-hand
        :class="`${showHand('N') ? '' : 'hidden'}`"
        :showDeal="false"
        :hand="getHand('N')"
      ></game-bidding-hand>
    </div>

    <div class="flex flex-row items-center justify-between">
      <game-bidding-hand
        :class="`${showHand('W') ? '' : 'invisible'}`"
        :showDeal="false"
        :hand="getHand('W')"
      ></game-bidding-hand>

      <game-bidding-table-compass
        :class="`w-[80px] h-[80px] rounded-xl`"
        :player="p.player"
      />

      <game-bidding-hand
        :class="`${showHand('E') ? '' : 'invisible'}`"
        :showDeal="false"
        :hand="getHand('E')"
      ></game-bidding-hand>
    </div>

    <div class="flex justify-center items-center">
      <game-bidding-hand
        :class="`${showHand('S') ? '' : 'hidden'}`"
        :showDeal="false"
        :hand="getHand('S')"
      ></game-bidding-hand>
    </div>
  </div>

  <!--  TWO HANDS   -->
  <div v-else-if="nbr == 2" :class="`space-y-3 p-2`">
    <div class="flex w-full justify-center items-center">
      <game-bidding-hand
        :class="`${showHand('N') ? '' : 'hidden'}`"
        :showDeal="false"
        :hand="getHand('N')"
      ></game-bidding-hand>
    </div>

    <div class="flex flex-row items-center justify-center">
      <game-bidding-table-compass
        :class="`w-[80px] h-[80px] rounded-xl`"
        :player="p.player"
      />
    </div>

    <div class="flex justify-center items-center">
      <game-bidding-hand
        :class="`${showHand('S') ? '' : 'hidden'}`"
        :showDeal="false"
        :hand="getHand('S')"
      ></game-bidding-hand>
    </div>
  </div>

  <!--  JUST ONE HAND   -->
  <div
    v-else
    :class="`flex flex-row h-full justify-center items-center w-full`"
  >
    <div :class="`flex flex-col`">
      <div v-for="index in 4" :key="index" class="flex flex-row items-center">
        <span
          :class="`mr-[3px] text-[30px] ${Card.toTailwindIcon.get(index - 1)}`"
        >
        </span>
        <span
          class="text-[25px] font-semibold text-dark dark:text-white tracking-[1px]"
          >{{ getHand().toString(suitNames[index - 1]) }}
        </span>
      </div>
    </div>
  </div>
</template>
