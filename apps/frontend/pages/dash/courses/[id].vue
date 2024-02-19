<script setup lang="ts">
import type { GetCourseData } from "~/types/generated";

const route = useRoute();

const course = ref({} as GetCourseData);
const error = ref(false);
const pending = ref(true);
api
  .get<GetCourseData>(`courses/${route.params.id}`)
  .then(({ data }) => {
    course.value = data;
    pending.value = false;
  })
  .catch((e) => {
    console.log(e);
    error.value = true;
    useToast().error("Kunde inte hämta kursen.");
  });
</script>

<template>
  <div class="flex flex-col items-center space-y-5 w-full h-full">
    <span class="text-3xl text-dark dark:text-white font-semibold">{{
      course.name
    }}</span>

    <div class="w-full flex flex-row justify-center">
      <div
        v-if="!pending && !error"
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
      <div v-else-if="error">
        <span class="text-2xl text-red-500">Något gick fel</span>
      </div>
    </div>
  </div>
</template>
