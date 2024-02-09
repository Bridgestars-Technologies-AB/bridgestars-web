<script setup>
//axios.get("/prefix/courses") => response.data.courses
const response = {
  courses: [
    {
      name: "BridgeA",
      id: 1,
      //chapters_with_progress: [{name, progress}]
    },
    {
      name: "Bridge A",
      id: 2,
    },
    {
      name: "Bridge B",
      id: 3,
    },
    {
      name: "Avancerad",
      id: 4,
    },
    {
      name: "Expert",
      id: 5,
    },
    {
      name: "Master Class",
      id: 6,
    },
    {
      name: "BridgeBertheau-NT",
      id: 7,
    },
  ],
};
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
        v-for="course in response.courses"
        :key="course.name"
        :courseId="course.id"
        :header="course.name"
      ></courses-course-template>
    </div>
  </div>
</template>
