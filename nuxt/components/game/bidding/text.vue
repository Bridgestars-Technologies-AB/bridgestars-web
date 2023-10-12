<!-- This component will display the bidding details, ex: Vad bjuder du om..... -->
<script setup>
defineProps({
  text: String,
});
</script>

<template>
  <div class="w-full h-full flex flex-row justify-start">
    <span class="text3 sm:text-[20px] m-[4px]">{{ text }}</span>
  </div>
</template>
