<script setup>
const route = useRoute();
console.log(route.params.id);

//axios.get(“/prefix/courses/id”) -> response.data
const response = {
  name: "BridgeA",
  description: "This is a course about BridgeA",
  chapters: [
    {
      name: "Kapitel 5",
      //paid,       true/false
      //next_problem_id to get to the bidding-problem in question
    },
    {
      name: "Kapitel 6",
    },
    {
      name: "Kapitel 7",
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
        <courses-bidding-problems-template
          v-for="chapter in response.chapters"
          :key="chapter.name"
          :header="chapter.name"
          url="xxx"
        ></courses-bidding-problems-template>
      </div>
    </div>
  </div>
</template>
