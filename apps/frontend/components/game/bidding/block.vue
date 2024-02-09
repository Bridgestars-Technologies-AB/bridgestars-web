<!-- Currently, const pointer and const opacity has commented code which stops block from being disabled -->

<script setup lang="ts">
const p = defineProps({
  card: {
    type: Card,
    default: new Card(0, 0),
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

//used to make the block invisible if the card is {suit:10, rank:10}
const invisible = computed(() =>
  p.card.suit === 10 && p.card.rank === 10 ? "invisible" : "",
);

//used to make the block green if the card is {suit:0, rank:0}
const bg = computed(() => (p.card.is("PASS") ? "!bg-[#0E9F6E]" : "")); // fattar inte varför den behöver "!"

// uncomment for feedback on disabled blocks
const pointer = computed(
  () =>
    //p.clickable && !p.disabled ? "" : "pointer-events-none",
    "",
);

// uncomment for feedback on disabled blocks
const opacity = computed(
  () =>
    //   p.disabled ? "opacity-50 cursor-not-allowed" : "",
    "",
);
</script>

<template>
  <div
    :class="`${$attrs.class} ${invisible} flex flex-row justify-center items-center my-[2px] hover:bg-transparent ${opacity}`"
  >
    <div
      :class="`${size} rounded-lg ${pointer} ${bg}`"
      @click="emit('click', new Bid(card))"
    >
      <!-- <span class="text1 text-white">{{ brick(card.suit, card.rank) }}</span> -->
      <game-bidding-rank-suite :card="card"></game-bidding-rank-suite>
    </div>
  </div>
</template>
