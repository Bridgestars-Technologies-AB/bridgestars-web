<script setup lang="ts">
import type { ListCoursesData } from "~/types/generated";
import { api } from "~/composables/api";

const courses = ref({} as ListCoursesData);
api
  .get<ListCoursesData>("/courses")
  .then(({ data }) => (courses.value = data))
  .catch((e) => {
    useToast().error("Kunde inte hämta kurser, vänligen försök igen.");
  });
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
