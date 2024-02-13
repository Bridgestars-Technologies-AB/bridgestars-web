<!-- Currently, const pointer and const opacity has commented code which stops block from being disabled -->

<script setup lang="ts">
const { bid, latestBid, size, clickable } = defineProps({
  bid: {
    type: Bid,
    default: new Bid(0, 0),
  },
  latestBid: {
    type: Bid,
    default: new Bid(0, 0),
  },
  size: String,
  clickable: {
    type: Boolean,
    default: true,
  },
});
// defineEmits<{
//   (event: "click", card: Card): void;
// }>();
const emit = defineEmits(["click", "bid"]);

//used to make the block green if the card is {suit:0, rank:0}
const isPass = computed(() => (bid.is("PASS") ? "!bg-[#0E9F6E]" : "")); // fattar inte varför den behöver "!"

const pointer = computed(
  () => (clickable && bid.isValid(latestBid) ? "" : "pointer-events-none"),
  //"",
);

const opacity = computed(
  () => (bid.isValid(latestBid) ? "" : "opacity-50 cursor-not-allowed"),
  //"",
);

const bg = computed(() =>
  !clickable && bid.explanation !== "" ? "bg-[#e3b43e]" : "bg-dark-200",
);

const hover = ref(false);
</script>

<template>
  <div
    :class="`${$attrs.class} ${
      bid.isVisible ? '' : 'invisible'
    } flex flex-row justify-center items-center my-[2px] relative ${opacity}`"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <div
      :class="`${size} rounded-lg ${pointer} ${bg} ${isPass}`"
      @click="emit('click', bid)"
    >
      <!-- <span class="text1 text-white">{{ brick(card.suit, card.rank) }}</span> -->
      <game-bidding-rank-suite :bid="bid"></game-bidding-rank-suite>
    </div>
    <span
      v-if="!clickable && bid.explanation !== '' && hover"
      class="z-10 dark:text-white bg-black absolute text-[12px] top-[-55px] w-[200px] text-center p-2 rounded-lg opacity-80"
      >{{ bid.explanation }}</span
    >
  </div>
</template>
