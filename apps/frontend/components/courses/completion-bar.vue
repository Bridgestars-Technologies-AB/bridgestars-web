<!-- This component is for displaying a bar of how much of a biddingpractice you have completed.
Part of course-template box -->
<script setup>
defineProps({ text: String });
const progress = ref(null);

onMounted(() => {
  progress.value.style.width = "0%";
  setTimeout(() => {
    progress.value.style.width = `${getDummyWidth()}%`;
  }, 100);
});

// This is a dummy function to simulate the progress bar
function getDummyWidth() {
  return Math.floor(Math.random() * (100 + 1));
}
</script>

<template>
  <div class="flex flex-col w-full items-center">
    <span class="text-white m-0 text-[14px]">{{ text }}</span>
    <div
      class="flex flex-row justify-start bg-dark-200 rounded-2xl h-[10px] w-[120px]"
    >
      <div
        ref="progress"
        class="h-[10px] rounded-2xl bg-[#168f7c] w-[width]"
      ></div>
    </div>
  </div>
</template>
