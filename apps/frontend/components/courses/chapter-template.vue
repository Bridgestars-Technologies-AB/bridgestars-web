<!-- Component for displaying different bidding practices displayed on my-courses/bridgeA... -->

<script setup>
defineProps({ header: String, problemId: String | null });
</script>

<template>
  <div
    class="flex flex-col justify-between w-[270px] h-[310px] bg-white dark:bg-dark-100 rounded-xl"
  >
    <div class="flex flex-col space-y-2">
      <div class="w-full flex flex-col items-center justify-center">
        <span class="text-[18px] text-dark dark:text-white font-semibold">{{
          `${header.split("-")[0]}${header.includes("-") ? "-" : ""}`
        }}</span>
        <span class="text-[18px] text-dark dark:text-white font-semibold">
          {{ header.split("-")[1] }}
        </span>
        <br v-if="!header.split('-')[1]" />
      </div>
      <div class="w-full h-[2px] bg-dark-400"></div>
    </div>

    <div class="w-full h-[100px] flex justify-center items-center">
      <span class="text-[20px] text-dark dark:text-white px-3"
        >Giv 6 av 10</span
      >
    </div>
    <div class="flex flex-row justify-center w-full">
      <courses-button
        text="Fortsätt"
        :params="problemId"
        dashPage="bidding-problems"
      ></courses-button>
    </div>
  </div>
</template>
