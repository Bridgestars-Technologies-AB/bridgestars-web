<script setup>
const routes = [
  { path: "/dev/test/lobby", name: "Lobby" },
  { path: "/dev/test/invite", name: "Invite" },
  { path: "/dev/test/bidding", name: "Bidding" },
  { path: "/dev/test/dash", name: "Dashboard" },
];
</script>

<template>
  <div>
    <div class="flex flex-col items-center text-center mt-[100px]">
      <h1 class="text-3xl font-bold">Bridgestars Component Tests</h1>
      <p class="text1 font-family2 text-2xl">
        These are some components that are currently being developed.
      </p>
    </div>

    <div class="mx-9 my-9 flex flex-wrap flex-col space-y-4">
      <div v-for="route in routes" :key="route.path">
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
