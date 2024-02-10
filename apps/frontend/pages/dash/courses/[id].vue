<script setup lang="ts">
import type { CourseData } from "~/types/generated";

const route = useRoute();

const { data } = await api.get(`courses/${route.params.id}`);

const course: CourseData = data;

</script>

<template>
  <div class="flex flex-col items-center space-y-5 w-full h-full">
    <span class="text-3xl text-dark dark:text-white font-semibold">{{
      course.name
    }}</span>

    <div class="w-full flex flex-row justify-center">
      <div
        :class="
          course.chapters.length > 1
            ? 'grid grid-cols-3 grid-flow-row gap-3'
            : 'flex flex-row space-x-3'
        "
      >
        <courses-chapter-template
          v-for="chapter in course.chapters"
          :key="chapter.name"
          :header="chapter.name"
          :problemId="chapter.next_problem_id"
        ></courses-chapter-template>
      </div>
    </div>
  </div>
</template>
