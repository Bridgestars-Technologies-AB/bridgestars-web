<script setup>
defineProps({
  hand: {
    type: Array[CardUtil.Card],
    default: [
      { suit: 0, rank: 2 },
      { suit: 0, rank: 5 },
      { suit: 0, rank: 12 },
      { suit: 1, rank: 13 },
      { suit: 1, rank: 3 },
      { suit: 1, rank: 8 },
      { suit: 2, rank: 11 },
      { suit: 2, rank: 13 },
      { suit: 2, rank: 14 },
      { suit: 3, rank: 5 },
      { suit: 3, rank: 6 },
      { suit: 3, rank: 9 },
      { suit: 3, rank: 14 },
    ],
  },
});
</script>

<template>
  <div
    class="flex flex-col w-full border bg-dash-dark-100 items-center h-[150px]"
  >
    <div class="w-full flex flex-row justify-start">
      <span class="ml-[10px] text-white text-[20px] font-semibold h-auto"
        >Hand</span
      >
    </div>
    <div class="w-[98%] h-[2px] bg-dash-dark-400"></div>
  </div>
</template>
