<script setup></script>

<template>
  <div :class="`flex flex-row items-center bg-dark-100 ${$attrs.class}`">
    <!-- This will be changed with an icon later -->
    <div class="rounded-full border w-[20px] h-[20px] ml-[10px]"></div>
    <div class="flex flex-col justify-center ml-[5px]">
      <!-- This is mockup for fetching username from database -->
      <span class="text-[8px] text-white">theo</span>
      <!-- This is mockup for fetching status from database -->
      <div class="flex flex-row items-center mt-[-3px]">
        <div class="rounded-full w-[5px] h-[5px] border mr-[2px]"></div>
        <span class="text-[8px] text-white">In Lobby</span>
      </div>
    </div>
  </div>
</template>
