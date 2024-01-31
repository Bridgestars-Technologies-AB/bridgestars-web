<!-- Component for displaying different courses similar to budträning.se -->

<script setup>
defineProps({ header: String, course: String });
</script>

<template>
  <div class="flex flex-col border w-[200px] h-[250px]">
    <div class="w-full flex flex-row justify-center">
      <span class="text-[22px] text-white font-semibold">{{ header }}</span>
    </div>
    <div class="w-full h-[2px] bg-dash-dark-400"></div>
    <courses-button text="Fortsätt" :course="course"></courses-button>
  </div>
</template>
