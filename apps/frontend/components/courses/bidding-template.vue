<!-- Component for displaying different bidding practices displayed on my-courses/bridgeA... -->

<script setup>
defineProps({ header: String, course: String });
</script>

<template>
  <div class="flex flex-col border w-[125px] h-[150px]">
    <div class="w-full flex flex-row justify-center">
      <span class="text-[12px] text-white font-semibold">{{ header }}</span>
    </div>
    <div class="w-full h-[2px] bg-dash-dark-400"></div>
    <courses-button text="Fortsätt" :course="course"></courses-button>
  </div>
</template>
