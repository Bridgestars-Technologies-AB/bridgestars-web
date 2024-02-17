<!-- Template for displaying a course similar to budträning.se on my-course/overview -->

<script setup>
defineProps({ header: String, courseId: Number });
</script>

<template>
  <div
    class="flex flex-col bg-white dark:bg-dark-100 rounded-xl w-[200px] h-[250px] justify-between"
  >
    <div class="flex flex-col">
      <div class="w-full flex flex-row justify-center">
        <span class="text-[18px] text-dark dark:text-white font-semibold">{{
          header
        }}</span>
      </div>
      <div class="w-full h-[2px] bg-dark-400"></div>
    </div>
    <div
      class="flex flex-col items-center justify-center space-y-2 h-[150px] w-full"
    >
      <courses-completion-bar
        v-for="item in ['Kapitel 1', 'Kapitel 2', 'Kapitel 3']"
        :key="item"
        :text="item"
      ></courses-completion-bar>
    </div>
    <div class="flex flex-row justify-end p-1">
      <courses-button
        text="Fortsätt"
        dashPage="courses"
        :params="courseId"
      ></courses-button>
    </div>
  </div>
</template>
