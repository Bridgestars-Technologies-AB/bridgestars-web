<!-- This component is for displaying a bar of how much of a biddingpractice you have completed.
Part of course-template box -->
<script setup>
defineProps({ text: String });
</script>

<template>
  <div class="flex flex-col w-full items-center">
    <span class="text-white m-0 text-[14px]">{{ text }}</span>
    <div class="bg-dash-dark-200 rounded-2xl w-[120px] h-[10px]"></div>
  </div>
</template>
