<script setup>
const { data } = await useAsyncData("welcome-page", () =>
  queryContent("/welcome-page").find(),
);
</script>

<template>
  <div class="flex flex-col items-center w-full h-full">
    <div
      class="flex flex-col items-center justify-center h-[100px] sm:h-[150px] rounded-xl mt-[40px]"
    >
      <span
        class="dark:text-white text-dark text-[20px] sm:text-[35px] font-bold font-family2 leading-7 sm:leading-10"
        >{{ data?.filter((e) => e.id === "welcome-page")[0].title }}</span
      >
    </div>
    <div
      class="flex-row prose-h4:flex-wrap prose prose-lg dark:prose-invert text-dark dark:text-white h-full"
    >
      <ContentRenderer
        :value="data?.filter((e) => e.id === 'welcome-page')[0]"
      />
    </div>
  </div>
</template>
