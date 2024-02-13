<!-- Currently, const pointer and const opacity has commented code which stops block from being disabled -->

<script setup lang="ts">
const p = defineProps({
  bid: {
    type: Bid,
    default: new Bid(0, 0),
  },
  size: String,
  // bg: String,
  // invisible: Boolean,
  disabled: {
    type: Boolean,
    default: false,
  },
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
const bg = computed(() => (p.bid.is("PASS") ? "!bg-[#0E9F6E]" : "")); // fattar inte varför den behöver "!"

// uncomment for feedback on disabled blocks
const pointer = computed(
  () => (p.clickable && !p.disabled ? "" : "pointer-events-none"),
  //"",
);

// uncomment for feedback on disabled blocks
const opacity = computed(
  () => (p.disabled ? "opacity-50 cursor-not-allowed" : ""),
  //"",
);
</script>

<template>
  <div
    :class="`${$attrs.class} ${
      bid.isVisible ? '' : 'invisible'
    } flex flex-row justify-center items-center my-[2px] hover:bg-transparent ${opacity}`"
  >
    <div
      :class="`${size} rounded-lg ${pointer} ${bg}`"
      @click="emit('click', bid)"
    >
      <!-- <span class="text1 text-white">{{ brick(card.suit, card.rank) }}</span> -->
      <game-bidding-rank-suite :bid="bid"></game-bidding-rank-suite>
    </div>
  </div>
</template>
