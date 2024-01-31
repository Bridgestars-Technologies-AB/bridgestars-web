<!-- Component for displaying different bidding practices displayed on my-courses -->

<script setup>
  defineProps({ header: String });
</script>

<template>
  <div class="flex flex-col border w-[100px] h-[125px]">
    <div class="w-full flex flex-row justify-center">
      <span class="text-[22px] text-white font-semibold">{{ header }}</span>
    </div>
    <div class="w-full h-[2px] bg-dash-dark-400"></div>
    <courses-button name="Budträning"></courses-button>
  </div>
</template>
