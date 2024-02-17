<script setup lang="ts">
import type { GetCourseData } from "~/types/generated";

const route = useRoute();

const { data: course } = await api.get<GetCourseData>(`courses/${route.params.id}`);

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
          :key="chapter.public_id"
          :header="chapter.name"
          :paid="chapter.paid"
          :problemId="chapter.next_problem_id"
        ></courses-chapter-template>
      </div>
    </div>
  </div>
</template>
