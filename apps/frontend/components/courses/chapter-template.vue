<!-- Component for displaying different bidding practices displayed on my-courses/bridgeA... -->

<script setup>
defineProps({ header: String, problemId: String | null });
</script>

<template>
  <div
    class="flex flex-col justify-between w-[160px] h-[200px] bg-white dark:bg-dark-100 rounded-xl"
  >
    <div class="flex flex-col space-y-2">
      <div class="w-full flex flex-row justify-center mt-2">
        <span class="text-[11px] text-dark dark:text-white font-semibold">{{
          header
        }}</span>
      </div>
      <div class="w-full h-[2px] bg-dark-400"></div>
    </div>

    <div class="w-full h-[100px] flex justify-center items-center">
      <span class="text-[13px] text-dark dark:text-white px-3"
        >Giv 6 av 10</span
      >
    </div>
    <div class="flex flex-row justify-end w-full">
      <courses-button
        text="Fortsätt"
        :params="problemId"
        dashPage="bidding-problems"
      ></courses-button>
    </div>
  </div>
</template>
