<script setup lang="ts">
defineProps({
  player: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="flex items-center justify-center bg-[#075B0E]">
    <div class="flex flex-col w-[90%] h-[90%]">
      <div class="w-full h-1/3 flex justify-center items-start">
        <div
          :class="{
            'aspect-square flex justify-center items-center h-full rounded-full ': true,
            'border border-[2px] border-white': player === 'N',
          }"
        >
          <span class="text-white font-bold">N</span>
        </div>
      </div>
      <div
        class="flex flex-row w-full h-1/3 justify-between relative items-center"
      >
        <div
          :class="{
            'aspect-square flex justify-center items-center h-full rounded-full ': true,
            'border border-[2px] border-white': player === 'V',
          }"
        >
          <span class="text-white font-bold">V</span>
        </div>
        <div
          :class="{
            'aspect-square flex justify-center items-center h-full rounded-full ': true,
            'border border-[2px] border-white pt-[2px]': player === 'Ö',
          }"
        >
          <span class="text-white font-bold">Ö</span>
        </div>
      </div>
      <div class="w-full h-1/3 flex relative justify-center items-end">
        <div
          :class="{
            'aspect-square flex justify-center items-center h-full rounded-full ': true,
            'border border-[2px] border-white': player === 'S',
          }"
        >
          <span class="text-white font-bold">S</span>
        </div>
      </div>
    </div>
  </div>
</template>
