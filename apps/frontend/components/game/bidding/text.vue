<!-- This component will display the bidding details, ex: Vad bjuder du om..... -->
<script setup>
defineProps({
  text: String,
});
</script>

<template>
  <div class="w-full h-full flex flex-row justify-start">
    <span class="text3 !text-[#FFFEFA] sm:text-[20px] ml-[12px]">{{
      text
    }}</span>
  </div>
</template>
