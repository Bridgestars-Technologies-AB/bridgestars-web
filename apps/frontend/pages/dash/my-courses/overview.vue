<script setup>
const items = [
  {
    header: "Bridge A",
    course: "my-courses-bridgeA",
  },
  {
    header: "Bridge B",
    course: "my-courses-bridgeB",
  },
  {
    header: "Avancerad",
    course: "my-courses-advanced",
  },
  {
    header: "Expert",
    course: "my-courses-expert",
  },
  {
    header: "Master Class",
    course: "my-courses-master-class",
  },
  {
    header: "BridgeBertheau-NT",
    course: "my-courses-bridge-bertheau",
  },
];
</script>

<template>
  <div
    class="w-full h-full flex flex-col space-y-5 justify-center items-center"
  >
    <span class="text-3xl text-white font-semibold">Mina kurser</span>
    <div class="grid grid-cols-3 grid-flow-row gap-3">
      <courses-course-template
        v-for="item in items"
        :key="item.header"
        :header="item.header"
        :course="item.course"
      ></courses-course-template>
    </div>
  </div>
</template>
