<script setup>
const routes = [
  { path: "/dev/db-schema", name: "Database Classes and Fields" },
  { path: "/dev/db-functions", name: "Database Functions" },
];
</script>

<template>
  <div>
    <div class="flex flex-col items-center text-center mt-5">
      <h1 class="text-3xl font-bold">Bridgestars Dev Reference</h1>
      <p class="text1 font-family2 text-2xl">
        Here are some documentation on basic features in the Bridgestars stack
      </p>
    </div>

    <div class="mx-9 my-9 flex flex-wrap flex-col space-y-4">
      <div v-for="route in routes" :key="route.name">
        <div
          class="w-full cursor-pointer flex items-center justify-center"
          @click="navigateTo(route.path)"
        >
          <a
            class="xs:text-[14px] md:text-[20px] text-blue font-family2 mr-1"
            >{{ route.name }}</a
          >
          <span
            class="i-material-symbols-arrow-forward-ios text-blue xs:text-[14px] md:text-[20px]"
          />
        </div>
      </div>
    </div>
  </div>
</template>
