<script setup>
import { CourseUtil } from "/composables/useCourseUtil.ts";
</script>

<template>
  <div
    class="w-full h-full flex flex-col space-y-5 justify-center items-center"
  >
    <span class="text-3xl text-dark dark:text-white font-semibold"
      >Mina kurser</span
    >
    <div class="grid grid-cols-3 grid-flow-row gap-3">
      <courses-course-template
        v-for="course in CourseUtil.courses"
        :key="course.header"
        :header="course.header"
        :url="course.url"
      ></courses-course-template>
    </div>
  </div>
</template>
