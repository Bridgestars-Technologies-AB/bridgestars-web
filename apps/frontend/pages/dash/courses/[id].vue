<script setup>
const route = useRoute();
console.log(route.params.id);

//axios.get(“/prefix/courses/id”) -> response.data
// Mock up response data:
const response = {
  name: "BridgeA",
  description: "This is a course about BridgeA",
  chapters: [
    {
      name: "Kapitel 5",
      next_problem_id: 1, //id of the next problem
      //paid,       true/false
    },
    {
      name: "Kapitel 6",
      next_problem_id: 2,
    },
    {
      name: "Kapitel 7",
      next_problem_id: 2,
    },
  ],
};
</script>

<template>
  <div class="flex flex-col items-center space-y-5 w-full h-full">
    <span class="text-3xl text-dark dark:text-white font-semibold">{{
      response.name
    }}</span>

    <div class="w-full flex flex-row justify-center">
      <div
        :class="
          response.chapters.length > 1
            ? 'grid grid-cols-3 grid-flow-row gap-3'
            : 'flex flex-row space-x-3'
        "
      >
        <courses-chapter-template
          v-for="chapter in response.chapters"
          :key="chapter.name"
          :header="chapter.name"
          :problemId="chapter.next_problem_id"
        ></courses-chapter-template>
      </div>
    </div>
  </div>
</template>
