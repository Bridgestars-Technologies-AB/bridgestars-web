<script setup>
// mockup data
const response = [
  {
    name: "Beginner",
    id: 1,
    courseMaterial: [
      { name: "Val av öppningsbud", id: 1 },
      { name: "Svar på öppningsbud", id: 2 },
    ],
  },
  {
    name: "Basic",
    id: 2,
    courseMaterial: [
      { name: "Försvar mot öppningsbud", id: 1 },
      { name: "Försvar mot öppningsbud", id: 2 },
    ],
  },
  {
    name: "Avancerat",
    id: 3,
    courseMaterial: [
      { name: "Försvar mot öppningsbud", id: 1 },
      { name: "Försvar mot öppningsbud", id: 2 },
      { name: "Försvar mot öppningsbud", id: 3 },
      { name: "Försvar mot öppningsbud", id: 4 },
    ],
  },
];

// function that should navigate you to pdf of course material
function click() {
  console.log("clicked");
}
</script>

<template>
  <div class="flex flex-col justify-center items-center w-full h-full">
    <span class="text-white text-[40px] mb-1">Bibliotek</span>
    <div class="grid grid-cols-3 grid-flow-row gap-3">
      <div
        v-for="level in response"
        :key="level"
        class="rounded-xl w-[320px] h-[300px] flex flex-col space-y-2 items-center dark:bg-dark-100"
      >
        <span class="text-white text-[30px]">{{ level.name }}</span>
        <div
          v-for="(item, index) in level.courseMaterial"
          :key="item"
          class="flex flex-col items-center w-full"
        >
          <span class="text-white cursor-pointer text-[14px]" @click="click">{{
            item.name
          }}</span>
          <span
            :class="`w-[90%] h-[2px] bg-dark-400 ${
              index === level.courseMaterial.length - 1 ? 'invisible' : ''
            }`"
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>
