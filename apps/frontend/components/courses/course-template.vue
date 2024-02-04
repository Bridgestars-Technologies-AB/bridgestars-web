<!-- Template for displaying a course similar to budträning.se on my-course/overview -->

<script setup>
defineProps({ header: String, course: String, items: Array });
import { CourseUtil } from "/composables/useCourseUtil.ts";
</script>

<template>
  <div
    class="flex flex-col bg-dash-dark-100 rounded-xl w-[200px] h-[275px] justify-between"
  >
    <div class="flex flex-col">
      <div class="w-full flex flex-row justify-center">
        <span class="text-[18px] text-white font-semibold">{{ header }}</span>
      </div>
      <div class="w-full h-[2px] bg-dash-dark-400"></div>
    </div>
    <div
      class="flex flex-col items-center justify-center space-y-2 h-[175px] w-full"
    >
      <courses-completion-bar
        v-for="item in CourseUtil.bridgeA.slice(0, 4)"
        :key="item"
        :text="item.header"
      ></courses-completion-bar>
    </div>
    <div class="flex flex-row justify-end">
      <courses-button text="Fortsätt" :course="course"></courses-button>
    </div>
  </div>
</template>
