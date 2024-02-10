<script setup lang="ts">
import type { CourseData } from "~/types/generated";

// automatic toast error bar, in prod maybe want better errors
const { data, status } = await api.get("/courses");

//generated api type
const courses: CourseData[] = data;
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
        v-for="course in courses"
        :key="course.public_id"
        :courseId="course.public_id"
        :header="course.name"
      ></courses-course-template>
    </div>
  </div>
</template>
