<script setup lang="ts">
const p = defineProps({
  card: {
    type: Object as PropType<{ suit: number; rank: number }>,
    default: () => ({ suit: 1, rank: 1 }),
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
defineEmits<{
  click: [suit: number, rank: number];
}>();
const bg = computed(() =>
  p.card.suit === 0 && p.card.rank === 0 ? "!bg-[#0E9F6E]" : "",
); // fattar inte varför den behöver "!"
const pointer = computed(() =>
  p.clickable && !p.disabled ? "" : "pointer-events-none",
);
const opacity = computed(() =>
  p.disabled ? "opacity-50 cursor-not-allowed" : "",
);
</script>

<template>
  <div
    :class="`${$attrs.class} flex flex-row justify-center items-center my-[2px] hover:bg-transparent ${opacity}`"
  >
    <div
      :class="`${size} rounded-lg ${pointer} ${bg}`"
      @click="$emit('click', card.suit, card.rank)"
    >
      <!-- <span class="text1 text-white">{{ brick(card.suit, card.rank) }}</span> -->
      <game-bidding-rank-suite :card="card"></game-bidding-rank-suite>
    </div>
  </div>
</template>
