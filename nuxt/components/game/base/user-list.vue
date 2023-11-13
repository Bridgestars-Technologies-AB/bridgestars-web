<script setup>
defineProps({
  title: String,
});
</script>

<template>
  <div
    class="bg-dash-dark-200 w-[300px] h-[300px] flex flex-col items-center space-y-[5px]"
  >
    <div class="flex items-center h-[35px] w-full">
      <span class="text1">{{ title }}</span>
    </div>
    <div class="w-[90%] h-[1px] bg-dash-dark-400 self-center"></div>
    <div class="w-[90%] h-[220px] border overflow-y-scroll space-y-[2px]">
      <game-lobby-player v-for="i in 10" :key="i"></game-lobby-player>
    </div>
    <input
      type="text"
      placeholder="Filter..."
      class="bg-dash-dark-100 rounded-lg w-[90%] h-[30px] text-white text-[10px]"
    />
  </div>
</template>
