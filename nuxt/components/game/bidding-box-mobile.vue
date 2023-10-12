<script setup>
const p = defineProps({
  rank: {
    type: Number,
    required: true,
  },
  suit: {
    type: Number,
    required: true,
  },
  wrapperClass: {
    type: String,
    required: false,
  },
});
const emit = defineEmits(["bid", "update:rank", "update:suit"]);

const currentRank = ref(1);

function bid(suit, rank) {
  console.log("BIDDINGBOX: ", suit, rank);
  if (rank > p.rank || (suit > p.suit && rank === p.rank)) {
    emit("update:rank", rank);
    emit("update:suit", suit);
  }
  emit("bid", suit, rank);
}
</script>

<template>
  <div class="w-full flex flex-col items-center">
    <div class="flex flex-row">
      <div
        v-for="e in 7"
        :key="e"
        :class="`border w-[30px] h-[30px] flex justify-center items-center ${
          currentRank === e ? 'bg-slate-500' : ''
        }`"
      >
        <button class="text1 text-[15px] text-white" @click="currentRank = e">
          {{ e }}
        </button>
      </div>
    </div>
    <div class="flex flex-row">
      <div v-for="e in 5" :key="e">
        <game-bidding-block
          :card="{ suit: e - 1, rank: currentRank }"
          :clickable="true"
          :onClick="bid"
          :suit="suit"
          :rank="rank"
        ></game-bidding-block>
      </div>
    </div>
    <game-bidding-block
      :card="{ suit: 0, rank: 0 }"
      :clickable="true"
      :onClick="bid"
    ></game-bidding-block>
  </div>
</template>
